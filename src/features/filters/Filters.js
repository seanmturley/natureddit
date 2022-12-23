import React from "react";

import RadioButtonGroup from "../../components/radioButtonGroup/RadioButtonGroup";

import "./Filters.css";

function Filters() {
  // In props objects below, the following need to be connected to the store:
  // - options
  // - disabled (for time filters)
  // - selected
  // - setState
  //
  // Need to consider whether to pass all of these as props, or hook up RadioButtonGroup directly to the store. Keeping RadioButtonGroup as a standalone reusable component makes sense...

  const filtersTypeProps = {
    heading: "Filter type",
    hideHeading: true,
    name: "type",
    options: ["Relevance", "Hot", "New", "Top"],
    disabled: false,
    selected: "Hot"
    // setState: Action for new API call and updating "selected"
  };

  const filtersTimeProps = {
    heading: "Timeframe",
    hideHeading: true,
    name: "time",
    options: ["Any time", "Past day", "Past week", "Past month", "Past year"],
    disabled: true,
    selected: "Any time"
    // setState: Action for new API call and updating "selected"
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
