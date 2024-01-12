import React, { useEffect, useState } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";

import RadioButtonGroup from "../radioButtonGroup/RadioButtonGroup";

import "./Filters.css";

function Filters() {
  const navigate = useNavigate();

  let { subreddit, sortFilter } = useParams();
  const { pathname, search } = useLocation();

  const queryParams = new URLSearchParams(search);

  const [storedTimeFilter, setStoredTimeFilter] = useState(null);
  // useEffects for resetting the storedTimeFilter...
  // ... on search pages, whenever query parameter t changes
  const timeQueryParam = queryParams.get("t");
  useEffect(() => {
    setStoredTimeFilter((s) => timeQueryParam ?? s);
  }, [timeQueryParam]);

  // ... on new subreddit load, based on change in the subreddit URL param
  useEffect(() => {
    if (subreddit) {
      setStoredTimeFilter("day"); // i.e. defaults to "day" on new subreddit load
    }
  }, [subreddit]);

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

    if (subreddit) {
      newUrl = new URL(`/r/${subreddit}/${clickedSortFilter}`, baseUrl);
    } else {
      newUrl = new URL(`${pathname}${search}`, baseUrl);
      newUrl.searchParams.set("sort", clickedSortFilter);
    }

    if (clickedSortFilter === "relevance" || clickedSortFilter === "top") {
      newUrl.searchParams.set("t", storedTimeFilter);
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
    optionDisplayValues: {
      relevance: "Relevance",
      hot: "Hot",
      new: "New",
      top: "Top"
    },
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
    optionDisplayValues: {
      hour: "Now",
      day: "Today",
      week: "This Week",
      month: "This Month",
      year: "This Year",
      all: "All Time"
    },
    disabled: sortFilter !== "relevance" && sortFilter !== "top",
    selected: queryParams.get("t") ?? "all",
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
