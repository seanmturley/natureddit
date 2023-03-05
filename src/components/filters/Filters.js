import React from "react";

import { useLocation, useParams, useNavigate } from "react-router-dom";

import RadioButtonGroup from "../radioButtonGroup/RadioButtonGroup";

import "./Filters.css";

function Filters() {
  const navigate = useNavigate();

  let { subreddit, sortFilter } = useParams();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  let timeFilter = queryParams.get("t");

  // sortFilter parameters
  sortFilter = sortFilter ?? "hot";

  let sortFilterOptions = ["hot", "new", "top"];
  if (pathname.startsWith("/search")) {
    sortFilterOptions = ["relevance", ...sortFilterOptions];
  }

  const sortFilterSetState = (sortFilterOption) => {
    navigate(`/r/${subreddit}/${sortFilterOption}`);
  };

  const sortFilterProps = {
    heading: "Filter type",
    hideHeading: true,
    name: "type",
    options: sortFilterOptions,
    disabled: false,
    selected: sortFilter,
    setState: sortFilterSetState
  };

  // timeFilter parameters
  timeFilter = timeFilter ?? "day";

  const timeFilterSetState = (timeFilterOption) => {
    navigate(`${pathname}?t=${timeFilterOption}`);
  };

  const timeFilterProps = {
    heading: "Timeframe",
    hideHeading: true,
    name: "time",
    options: ["hour", "day", "week", "month", "year", "all"],
    disabled: sortFilter !== "top",
    selected: timeFilter,
    setState: timeFilterSetState
  };

  return (
    <header className="filters">
      <section className="filters__type">
        <RadioButtonGroup {...sortFilterProps} />
      </section>
      <section className="filters__time">
        <RadioButtonGroup {...timeFilterProps} />
      </section>
    </header>
  );
}

export default Filters;
