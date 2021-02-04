import React from "react";

const Post = ({ post }) => {
  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <span className="cursor-pointer text-blue-500 border-b border-blue-500 hover:bg-gray-200">
        {post.title}
      </span>
    </div>
  );
};

export default Post;
