import React, { useEffect } from "react";

import { Outlet, useLoaderData } from "react-router-dom";

import MagicGrid from "magic-grid";
import imagesloaded from "imagesloaded";

import Card from "../card/Card";

import "./Cards.css";

import PropTypes from "prop-types";

function Cards({ queryFunction }) {
  const query = useLoaderData();

  const { data } = queryFunction(query);

  useEffect(() => {
    // Checks if all images in ".cards__list" are
    // loaded before applying MagicGrid formatting
    imagesloaded(".cards__list", () => {
      const magicGrid = new MagicGrid({
        container: ".cards__list",
        items: data.length,
        gutter: 0,
        useMin: true,
        animate: true
      });

      magicGrid.listen();
    });
    // }
  }, [data]);

  return (
    <>
      <section className="cards">
        <ul className="cards__list">
          {data.map((card) => (
            <Card key={card.data.id} card={card.data} />
          ))}
        </ul>
      </section>
      <Outlet />
    </>
  );
}

Cards.propTypes = {
  queryFunction: PropTypes.func.isRequired
};

export default Cards;
