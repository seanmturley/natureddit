import React, { useEffect } from "react";

import { useGetPostsBySubredditQuery } from "../../app/redditApi";

import MagicGrid from "magic-grid";

import Card from "../../components/card/Card";

import "./Posts.css";

function Posts() {
  const { data, isError, isLoading } = useGetPostsBySubredditQuery();

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
            <Card key={post.id} post={post.data} />
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default Posts;
