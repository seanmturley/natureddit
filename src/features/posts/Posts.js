import React, { useEffect } from "react";

import Card from "../../components/card/Card";

import { useSelector } from "react-redux";
import { selectPostIds } from "./postsSlice";

import "./Posts.css";

import MagicGrid from "magic-grid";

function Posts() {
  const postIds = useSelector(selectPostIds);

  useEffect(() => {
    let magicGrid = new MagicGrid({
      container: ".posts__list",
      items: postIds.length,
      gutter: 0,
      // useMin: true,
      animate: true
    });

    magicGrid.listen();
  });

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
