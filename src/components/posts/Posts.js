import React, { useEffect } from "react";

import MagicGrid from "magic-grid";

import Card from "../card/Card";

import "./Posts.css";

function Posts({ data, isError, isLoading }) {
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
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <ul className="posts__list">
          {data.map((post) => (
            <Card key={post.data.id} post={post.data} />
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default Posts;
