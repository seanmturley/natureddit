import React from "react";

import Card from "../../components/card/Card";

import { useSelector } from "react-redux";
import { selectPosts } from "./postsSlice";

function Posts() {
  const posts = useSelector(selectPosts);

  return (
    <section className="posts">
      <ul className="posts__list">
        {posts.map((post) => (
          <Card key={post.id} />
        ))}
      </ul>
    </section>
  );
}

export default Posts;
