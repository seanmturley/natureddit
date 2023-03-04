import React from "react";

import { useLocation, useParams, useNavigate } from "react-router-dom";

import RadioButtonGroup from "../radioButtonGroup/RadioButtonGroup";

import "./Filters.css";

function Filters() {
  const navigate = useNavigate();

  let { subreddit, typeFilter } = useParams();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  let timeFilter = queryParams.get("t");

  // typeFilter parameters
  typeFilter = typeFilter ?? "hot";

  let typeFilterOptions = ["hot", "new", "top"];
  if (pathname.startsWith("/search")) {
    typeFilterOptions = ["relevance", ...typeFilterOptions];
  }

  const typeFilterSetState = (typeFilterOption) => {
    navigate(`/r/${subreddit}/${typeFilterOption}`);
  };

  const typeFilterProps = {
    heading: "Filter type",
    hideHeading: true,
    name: "type",
    options: typeFilterOptions,
    disabled: false,
    selected: typeFilter,
    setState: typeFilterSetState
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
    disabled: typeFilter !== "top",
    selected: timeFilter,
    setState: timeFilterSetState
  };

  return (
    <header className="filters">
      <section className="filters__type">
        <RadioButtonGroup {...typeFilterProps} />
      </section>
      <section className="filters__time">
        <RadioButtonGroup {...timeFilterProps} />
      </section>
    </header>
  );
}

export default Filters;
