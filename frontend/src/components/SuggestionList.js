import React, { useEffect, useState, useMemo } from "react";
import "./SuggestionList.scss";
import { Card } from "antd";
import Suggestion from "./Suggestion";
import { useAppContext } from "../store";
import useAxios from "axios-hooks";

export default function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [userList, setUserList] = useState();

  const headers = { Authorization: `Bearer ${jwtToken}` };

  const [{ data: origuserList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/accounts/suggestions/",
    headers,
  });

  useEffect(() => {
    if (!origuserList) setUserList([]);
    else
      setUserList(origuserList.map((user) => ({ ...user, is_follow: false })));
  }, [origuserList]);

  const onFollowUser = (username) => {
    setUserList((prevUserList) =>
      prevUserList.map((user) =>
        user.username !== username ? user : { ...user, is_follow: true }
      )
    );
  };

  return (
    <div style={style}>
      {loading && <div>Loading...</div>}
      {error && <div>로딩 중에 에러가 발생했습니다.</div>}

      <button onClick={() => refetch()}>Reload</button>

      <Card title="Suggestions for you" size="small">
        {userList &&
          userList.map((suggestionUser) => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
              onFollowUser={onFollowUser}
            />
          ))}
      </Card>
    </div>
  );
}
