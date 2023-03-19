import React from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";

import RadioButtonGroup from "../radioButtonGroup/RadioButtonGroup";

import "./Filters.css";

function Filters() {
  const navigate = useNavigate();

  let { subreddit, sortFilter } = useParams();
  const { pathname, search } = useLocation();

  const queryParams = new URLSearchParams(search);

  // Relative URLs require a valid base - this is never actually used.
  const baseUrl = "https://ignore.it";

  // sortFilter parameters
  sortFilter = sortFilter ?? queryParams.get("sort");

  let sortFilterOptions = ["hot", "new", "top"];
  if (pathname === "/search") {
    sortFilterOptions = ["relevance", ...sortFilterOptions];
  }

  const sortFilterSetState = (clickedSortFilter) => {
    let newUrl;
    let defaultTimeFilter;

    if (subreddit) {
      newUrl = new URL(`/r/${subreddit}/${clickedSortFilter}`, baseUrl);
      defaultTimeFilter = "day";
    } else {
      newUrl = new URL(`${pathname}${search}`, baseUrl);
      newUrl.searchParams.set("sort", clickedSortFilter);
      defaultTimeFilter = "all";
    }

    if (clickedSortFilter === "relevance" || clickedSortFilter === "top") {
      newUrl.searchParams.set("t", defaultTimeFilter);
    } else {
      newUrl.searchParams.delete("t");
    }

    navigate(`${newUrl.pathname}${newUrl.search}`);
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
    const newUrl = new URL(`${pathname}${search}`, baseUrl);

    newUrl.searchParams.set("t", clickedTimeFilter);

    navigate(`${newUrl.pathname}${newUrl.search}`);
  };

  const timeFilterProps = {
    heading: "Timeframe",
    hideHeading: true,
    name: "time",
    options: ["hour", "day", "week", "month", "year", "all"],
    disabled: sortFilter !== "relevance" && sortFilter !== "top",
    selected: queryParams.get("t") ?? "",
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
