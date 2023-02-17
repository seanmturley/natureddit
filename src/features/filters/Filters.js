import React from "react";

import RadioButtonGroup from "../../components/radioButtonGroup/RadioButtonGroup";

import { useSelector } from "react-redux";
import { selectTypeFilter, selectTimeFilter } from "./filtersSlice";

import "./Filters.css";

function Filters() {
  const typeFilter = useSelector(selectTypeFilter);
  const timeFilter = useSelector(selectTimeFilter);

  const filtersTypeProps = {
    heading: "Filter type",
    hideHeading: true,
    name: "type",
    options: typeFilter.options,
    disabled: false,
    selected: typeFilter.selected
    // setState: Action for new API call and updating "selected" i.e. what happens when the user clicks a filter option.
  };

  const filtersTimeProps = {
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
        <RadioButtonGroup {...filtersTypeProps} />
      </section>
      <section className="filters__time">
        <RadioButtonGroup {...filtersTimeProps} />
      </section>
    </header>
  );
}

export default Filters;
