import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import RadioButtonGroup from "../../components/radioButtonGroup/RadioButtonGroup";

import {
  selectTypeFilter,
  selectTimeFilter,
  updateSelectedTypeFilter
} from "./filtersSlice";

import "./Filters.css";

function Filters() {
  const dispatch = useDispatch();
  const typeFilter = useSelector(selectTypeFilter);
  const timeFilter = useSelector(selectTimeFilter);

  const navigate = useNavigate();
  const { subreddit } = useParams();

  const typeFilterSetState = (filterOption) => {
    dispatch(updateSelectedTypeFilter(filterOption));
    navigate(`/r/${subreddit}/${filterOption}`);
  };

  const typeFilterProps = {
    heading: "Filter type",
    hideHeading: true,
    name: "type",
    options: typeFilter.options,
    disabled: false,
    selected: typeFilter.selected,
    setState: typeFilterSetState
  };

  const timeFilterProps = {
    heading: "Timeframe",
    hideHeading: true,
    name: "time",
    options: timeFilter.options,
    disabled: timeFilter.disabled,
    selected: timeFilter.selected
    // setState: Action for new API call and updating "selected" i.e. what happens when the user clicks a filter option.
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
