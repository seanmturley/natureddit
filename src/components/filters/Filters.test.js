import React from "react";

import Filters from "./Filters";

import { screen } from "@testing-library/react";

import { setupWithRouting } from "../../testingUtilities";

const searchBaseRoute = "/search";
const searchDefaultRoute = `${searchBaseRoute}?q=EarthPorn&sort=relevance&t=all`;
const searchRoutes = [
  {
    path: searchBaseRoute,
    element: <Filters />
  }
];
const searchInitialEntries = [searchDefaultRoute];

const subredditDefaultRoute = "/r/EarthPorn/hot";
const subredditRoutes = [
  {
    path: "/r/:subreddit/:sortFilter",
    element: <Filters />
  }
];
const subredditInitialEntries = [subredditDefaultRoute];

describe("On search pages", () => {
  it("'relevance' should be selected by default", () => {
    setupWithRouting(searchRoutes, searchInitialEntries);

    const relevance = screen.getByText("relevance");

    expect(relevance).toHaveClass("radio-button-group__label--selected");
  });

  it("'all' should be selected by default", () => {
    setupWithRouting(searchRoutes, searchInitialEntries);

    const all = screen.getByText("all");

    expect(all).toHaveClass("radio-button-group__label--selected");
  });

  it("The timeFilter should be enabled by default", () => {
    setupWithRouting(searchRoutes, searchInitialEntries);

    const timeFilter = screen.getByRole("radiogroup", { name: "Timeframe" });

    expect(timeFilter).toHaveClass("radio-button-group--clickable");
  });

  describe("Clicking another timeFilter", () => {
    it("Should select that filter", async () => {
      const { user } = setupWithRouting(searchRoutes, searchInitialEntries);

      const anotherTimeFilter = screen.getByText("day");
      await user.click(anotherTimeFilter);

      expect(anotherTimeFilter).toHaveClass(
        "radio-button-group__label--selected"
      );
    });

    it("Should correctly update the URL sort parameters", async () => {
      const { user, router } = setupWithRouting(
        searchRoutes,
        searchInitialEntries
      );

      const anotherTime = "day";
      const anotherTimeFilter = screen.getByText(anotherTime);
      await user.click(anotherTimeFilter);

      expect(router.state.location.search).toBe(
        `?q=EarthPorn&sort=relevance&t=${anotherTime}`
      );
    });
  });

  describe("Clicking a time-independent typeFilter", () => {
    it("Should select that filter", async () => {
      const { user } = setupWithRouting(searchRoutes, searchInitialEntries);

      const timeIndependentTypeFilter = screen.getByText("hot");
      await user.click(timeIndependentTypeFilter);

      expect(timeIndependentTypeFilter).toHaveClass(
        "radio-button-group__label--selected"
      );
    });

    it("Should select the 'all' timeFilter'", async () => {
      const { user } = setupWithRouting(searchRoutes, searchInitialEntries);

      const timeIndependentTypeFilter = screen.getByText("hot");
      await user.click(timeIndependentTypeFilter);

      const all = screen.getByText("all");
      expect(all).toHaveClass("radio-button-group__label--selected");
    });

    it("Should display the timeFilter as disabled", async () => {
      const { user } = setupWithRouting(searchRoutes, searchInitialEntries);

      const timeIndependentTypeFilter = screen.getByText("hot");
      await user.click(timeIndependentTypeFilter);

      const timeFilter = screen.getByRole("radiogroup", { name: "Timeframe" });
      expect(timeFilter).toHaveClass("radio-button-group--disabled");
    });

    it("Should correctly update the URL sort parameters", async () => {
      const { user, router } = setupWithRouting(
        searchRoutes,
        searchInitialEntries
      );

      const timeIndependentType = "hot";
      const timeIndependentTypeFilter = screen.getByText(timeIndependentType);
      await user.click(timeIndependentTypeFilter);

      expect(router.state.location.search).toBe(
        `?q=EarthPorn&sort=${timeIndependentType}`
      );
    });
  });

  describe("Clicking a time-dependent sortFilter e.g. 'top'", () => {
    it("Should select 'top'", async () => {
      const { user } = setupWithRouting(searchRoutes, searchInitialEntries);

      const top = screen.getByText("top");
      await user.click(top);

      expect(top).toHaveClass("radio-button-group__label--selected");
    });

    it("Should display the timeFilter as enabled", async () => {
      const { user } = setupWithRouting(searchRoutes, searchInitialEntries);

      const top = screen.getByText("top");
      await user.click(top);

      const timeFilter = screen.getByRole("radiogroup", { name: "Timeframe" });
      expect(timeFilter).toHaveClass("radio-button-group--clickable");
    });

    it("Should on subsequent clicks remember the previous timeFilter value", async () => {
      const { user } = setupWithRouting(searchRoutes, searchInitialEntries);

      const top = screen.getByText("top");
      await user.click(top);

      const week = screen.getByText("week");
      await user.click(week);

      const hot = screen.getByText("hot");
      await user.click(hot);

      const all = screen.getByText("all");
      await user.click(all);

      await user.click(top);
      expect(week).toHaveClass("radio-button-group__label--selected");
    });
  });
});

describe("On subreddit pages", () => {
  it("'hot' should be selected by default", () => {
    setupWithRouting(subredditRoutes, subredditInitialEntries);

    const hot = screen.getByText("hot");

    expect(hot).toHaveClass("radio-button-group__label--selected");
  });

  it("'all' should be selected by default", () => {
    setupWithRouting(subredditRoutes, subredditInitialEntries);

    const all = screen.getByText("all");

    expect(all).toHaveClass("radio-button-group__label--selected");
  });

  it("The timeFilter should be disabled by default", () => {
    setupWithRouting(subredditRoutes, subredditInitialEntries);

    const timeFilter = screen.getByRole("radiogroup", { name: "Timeframe" });

    expect(timeFilter).toHaveClass("radio-button-group--disabled");
  });

  describe("Clicking 'top'", () => {
    it("Should initially default to the timeFilter to 'day'", async () => {
      const { user } = setupWithRouting(
        subredditRoutes,
        subredditInitialEntries
      );

      const top = screen.getByText("top");
      await user.click(top);

      const day = screen.getByText("day");
      expect(day).toHaveClass("radio-button-group__label--selected");
    });

    it("Should correctly update the URL sort parameters", async () => {
      const { user, router } = setupWithRouting(
        subredditRoutes,
        subredditInitialEntries
      );

      const top = screen.getByText("top");
      await user.click(top);

      expect(router.state.location.search).toBe(`?t=day`);
    });
  });
});
