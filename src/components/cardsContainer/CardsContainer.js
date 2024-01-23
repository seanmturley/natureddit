import React from "react";

import { useLocation } from "react-router-dom";

import {
  useGetCardsQuery,
  useGetHomeCardsQuery
} from "../../services/redditApi";

import extractPaths from "../../utils/extractPaths";
import basename from "../../utils/baseName";

import Cards from "../cards/Cards";

function CardsContainer() {
  const { pathname } = useLocation();

  const { cardsPath } = extractPaths(`${basename}${pathname}`);

  // On the homepage (i.e. the cardsPath is an empty string),
  // query the getHomeCards API endpoint, otherwise query the
  // default getCards endpoint
  const queryFunction = !cardsPath ? useGetHomeCardsQuery : useGetCardsQuery;

  return <Cards queryFunction={queryFunction} />;
}

export default CardsContainer;
