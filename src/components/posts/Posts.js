import React, { useEffect } from "react";

import MagicGrid from "magic-grid";

import Card from "../card/Card";

import "./Posts.css";

import PropTypes from "prop-types";

function Posts({ data }) {
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

Posts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Posts;
