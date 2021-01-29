import React, { useState } from "react";
import moment from "moment";
import { db } from "../firebase";
import Article from "./Article";
const Blog = () => {
  const [article, setArticle] = useState([
    {
      id: "",
      title: "",
      body: "",
      timestamp: {},
    },
  ]);

  //useEffect(() => {
  const unSub = db
    .collection("article")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) =>
      setArticle(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          timestamp: doc.data().timestamp.toDate(),
        }))
      )
    );

  //   return () => {
  //    unSub();
  //  };
  //}, []);
  return (
    <>
      {article[0]?.id &&
        article.map((art, index) => (
          <Article
            key={index}
            title={art.title}
            body={art.body}
            timestamp={moment(art.timestamp).format("YYYY/MM/DD HH:mm")}
          />
        ))}
      <div> Now constructing</div>
    </>
  );
};

export default Blog;
