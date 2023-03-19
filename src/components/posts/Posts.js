import React, { useEffect } from "react";

import { useLoaderData } from "react-router-dom";

import { useGetPostsQuery } from "../../services/redditApi";

import MagicGrid from "magic-grid";

import Card from "../card/Card";

import "./Posts.css";

function Posts() {
  const query = useLoaderData();

  const { data } = useGetPostsQuery(query);

  useEffect(() => {
    if (data) {
      let magicGrid = new MagicGrid({
        container: ".posts__list",
        items: data.length,
        gutter: 0,
        // useMin: true,
        animate: true
      });

      magicGrid.listen();
    }
  });

  return (
    <section className="posts">
      <ul className="posts__list">
        {data.map((post) => (
          <Card key={post.data.id} post={post.data} />
        ))}
      </ul>
    </section>
  );
}

export default Posts;
