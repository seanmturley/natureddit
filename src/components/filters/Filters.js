import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import RadioButtonGroup from "../radioButtonGroup/RadioButtonGroup";

import "./Filters.css";

function Filters() {
  const navigate = useNavigate();

  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get("q");
  const sortFilter = queryParams.get("sort");
  const timeFilter = queryParams.get("t");

  let baseUrl = `${pathname}?`;
  let sortFilterOptions = ["hot", "new", "top"];
  if (pathname === "/search") {
    baseUrl += `q=${searchTerm}&`;
    sortFilterOptions = ["relevance", ...sortFilterOptions];
  }

  // sortFilter parameters
  const sortFilterSetState = (clickedSortFilter) => {
    let timeFilterString = "";
    if (clickedSortFilter === "relevance" || clickedSortFilter === "top") {
      timeFilterString = pathname === "/search" ? "&t=all" : "&t=day";
    }

    navigate(`${baseUrl}sort=${clickedSortFilter}${timeFilterString}`);
  };

  const sortFilterProps = {
    heading: "Sort",
    hideHeading: true,
    name: "sort",
    options: sortFilterOptions,
    disabled: false,
    selected: sortFilter,
    setState: sortFilterSetState
  };

  // timeFilter parameters
  const timeFilterSetState = (clickedTimeFilter) => {
    navigate(`${baseUrl}sort=${sortFilter}&t=${clickedTimeFilter}`);
  };

  const timeFilterProps = {
    heading: "Timeframe",
    hideHeading: true,
    name: "time",
    options: ["hour", "day", "week", "month", "year", "all"],
    disabled: sortFilter !== "relevance" && sortFilter !== "top",
    selected: timeFilter ?? "",
    setState: timeFilterSetState
  };

  return (
    <header className="filters">
      <section className="filters__sort">
        <RadioButtonGroup {...sortFilterProps} />
      </section>
      <section className="filters__time">
        <RadioButtonGroup {...timeFilterProps} />
      </section>
    </header>
  );
}

export default Filters;
