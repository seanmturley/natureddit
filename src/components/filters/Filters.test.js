import React from "react";

import Filters from "./Filters";

import { BrowserRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const searchDefaultRoute = "search?q=EarthPorn&sort=relevance&t=all";
const subredditDefaultRoute = "r/EarthPorn?sort=hot";

const setup = (route = "/") => {
  window.history.pushState({}, "Test page", route);
  return {
    user: userEvent.setup(),
    ...render(<Filters />, { wrapper: BrowserRouter })
  };
};

describe("On search pages", () => {
  it("'relevance' should be selected by default", () => {
    setup(searchDefaultRoute);
    const relevance = screen.getByText("relevance");
    expect(relevance).toHaveClass("radio-button-group__label--selected");
  });

  it("'all' should be selected by default", () => {
    setup(searchDefaultRoute);
    const all = screen.getByText("all");
    expect(all).toHaveClass("radio-button-group__label--selected");
  });

  it("The timeFilter should be enabled by default", () => {
    setup(searchDefaultRoute);
    const timeFilter = screen.getByRole("radiogroup", { name: "Timeframe" });
    expect(timeFilter).toHaveClass("radio-button-group--clickable");
  });

  describe("Clicking another timeFilter", () => {
    it("Should select that filter", async () => {
      const { user } = setup(searchDefaultRoute);
      const anotherTimeFilter = screen.getByText("day");
      await user.click(anotherTimeFilter);
      expect(anotherTimeFilter).toHaveClass(
        "radio-button-group__label--selected"
      );
    });
  });

  describe("Clicking a time independent typeFilter", () => {
    it("Should select that filter", async () => {
      const { user } = setup(searchDefaultRoute);
      const aTimeIndependentFilter = screen.getByText("hot");
      await user.click(aTimeIndependentFilter);
      expect(aTimeIndependentFilter).toHaveClass(
        "radio-button-group__label--selected"
      );
    });

    it("Should have no timeFilter selected", async () => {
      const { user } = setup(searchDefaultRoute);
      const aTimeIndependentFilter = screen.getByText("hot");
      await user.click(aTimeIndependentFilter);
      const timeFilters = ["hour", "day", "week", "month", "year", "all"];
      timeFilters.forEach((timeFilter) => {
        const filterLabel = screen.getByText(timeFilter);
        expect(filterLabel).not.toHaveClass(
          "radio-button-group__label--selected"
        );
      });
    });

    it("Should display the timeFilter as disabled", async () => {
      const { user } = setup(searchDefaultRoute);
      const aTimeIndependentFilter = screen.getByText("hot");
      await user.click(aTimeIndependentFilter);
      const timeFilter = screen.getByRole("radiogroup", { name: "Timeframe" });
      expect(timeFilter).toHaveClass("radio-button-group--disabled");
    });
  });

  describe("Clicking 'top'", () => {
    it("Should select 'top'", async () => {
      const { user } = setup(searchDefaultRoute);
      const top = screen.getByText("top");
      await user.click(top);
      expect(top).toHaveClass("radio-button-group__label--selected");
    });

    it("Should reset the timeFilter to 'all'", async () => {
      const { user } = setup(searchDefaultRoute);
      const top = screen.getByText("top");
      await user.click(top);
      const all = screen.getByText("all");
      expect(all).toHaveClass("radio-button-group__label--selected");
    });

    it("Should display the timeFilter as enabled", async () => {
      const { user } = setup(searchDefaultRoute);
      const top = screen.getByText("top");
      await user.click(top);
      const timeFilter = screen.getByRole("radiogroup", { name: "Timeframe" });
      expect(timeFilter).toHaveClass("radio-button-group--clickable");
    });
  });
});

describe("On subreddit pages", () => {
  describe("Clicking 'top'", () => {
    it("Should reset the timeFilter to 'day'", async () => {
      const { user } = setup(subredditDefaultRoute);
      const top = screen.getByText("top");
      await user.click(top);
      const day = screen.getByText("day");
      expect(day).toHaveClass("radio-button-group__label--selected");
    });
  });
});
