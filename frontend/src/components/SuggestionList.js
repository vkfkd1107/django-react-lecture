import React from "react";
import "./SuggestionList.scss";
import { Card } from "antd";
import Suggestion from "./Suggestion";

export default function SuggestionList({ style }) {
  return (
    <div style={style}>
      <Card title="Suggestions for you" size="small">
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </Card>
    </div>
  );
}
