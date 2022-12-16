import React from "react";

import Card from "../../components/card/Card";

import { useSelector } from "react-redux";
import { selectPostIds } from "./postsSlice";

function Posts() {
  const postIds = useSelector(selectPostIds);

  return (
    <section className="posts">
      <ul className="posts__list">
        {postIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
    </section>
  );
}

export default Posts;
