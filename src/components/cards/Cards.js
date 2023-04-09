import React, { useEffect } from "react";

import { useLoaderData } from "react-router-dom";

import { useGetCardsQuery } from "../../services/redditApi";

import MagicGrid from "magic-grid";

import Card from "../card/Card";

import "./Cards.css";

function Cards() {
  const query = useLoaderData();

  const { data } = useGetCardsQuery(query);

  useEffect(() => {
    if (data) {
      let magicGrid = new MagicGrid({
        container: ".cards__list",
        items: data.length,
        gutter: 0,
        useMin: true,
        animate: true
      });

      magicGrid.listen();
    }
  });

  return (
    <section className="cards">
      <ul className="cards__list">
        {data.map((card) => (
          <Card key={card.data.id} card={card.data} />
        ))}
      </ul>
    </section>
  );
}

export default Cards;
