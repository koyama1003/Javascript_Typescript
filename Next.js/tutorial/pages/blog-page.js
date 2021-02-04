import React from "react";
import Layout from "../components/Layout";
import { getAllPostsData } from "../lib/posts";
import Post from "../components/Post";

const Blog = ({ posts }) => {
  return (
    <Layout title="Blog">
      <ul className="m-10">
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const posts = await getAllPostsData();
  return {
    props: { posts },
  };
}
