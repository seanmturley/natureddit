import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import RadioButtonGroup from "../radioButtonGroup/RadioButtonGroup";

import "./Filters.css";

function Filters() {
  const navigate = useNavigate();

  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sortFilter = queryParams.get("sort");
  let timeFilter = queryParams.get("t");

  // sortFilter parameters
  let sortFilterOptions = ["hot", "new", "top"];
  if (pathname.startsWith("/search")) {
    sortFilterOptions = ["relevance", ...sortFilterOptions];
  }

  const sortFilterSetState = (sortFilterOption) => {
    let timeFilterString = "";
    if (sortFilterOption === "top") {
      timeFilterString = "&t=day";
    }

    navigate(`${pathname}?sort=${sortFilterOption}${timeFilterString}`);
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
  const timeFilterSetState = (timeFilterOption) => {
    navigate(`${pathname}?sort=${sortFilter}&t=${timeFilterOption}`);
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
