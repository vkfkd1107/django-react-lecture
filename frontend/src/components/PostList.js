import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";
import { useAppContext } from "../store";
import { Alert } from "antd";

const apiUrl = "http://localhost:8000/api/posts/";

function PostList() {
  const {
    store: { jwtToken },
    dispatch,
  } = useAppContext();
  console.log(">>>>store: ", { jwtToken });
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${jwtToken}` };
    Axios.get(apiUrl, { headers })
      .then((response) => {
        const { data } = response;
        console.log("loaded response: ", response);
        setPostList(data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("mounted");
  }, []);

  return (
    <div>
      {postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. :-(" />
      )}
      {postList.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
