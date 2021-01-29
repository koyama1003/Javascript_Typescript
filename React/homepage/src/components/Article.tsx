import React from "react";

interface Props {
  title: string;
  body: string;
  timestamp: string;
}
const Article: React.FC<Props> = ({ title, body, timestamp }) => {
  return <div>test</div>;
};

export default Article;
