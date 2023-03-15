import React from "react";

import Filters from "./Filters";

import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider
} from "react-router-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const searchBaseRoute = "/search";
const searchDefaultRoute = `${searchBaseRoute}?q=EarthPorn&sort=relevance&t=all`;
const searchRoutes = [
  {
    path: searchBaseRoute,
    element: <Filters />
  }
];
const searchInitialEntries = [searchDefaultRoute];

const subredditBaseRoute = "/r/EarthPorn";
const subredditDefaultRoute = `${subredditBaseRoute}?sort=hot`;
const subredditRoutes = [
  {
    path: subredditBaseRoute,
    element: <Filters />
  }
];
const subredditInitialEntries = [subredditDefaultRoute];

const setup = (route = "/") => {
  window.history.pushState({}, "Test page", route);
  return {
    user: userEvent.setup(),
    ...render(<Filters />, { wrapper: BrowserRouter })
  };
};

const setupUrlTest = (routes, initialEntries, initialIndex = 0) => {
  const router = createMemoryRouter(
    // An array of routes to be mocked, with the elemement to render for each path
    routes,
    {
      // An array of URLs to manually set the "browser" history
      initialEntries: initialEntries,
      // The array index of where to start in the history
      initialIndex: initialIndex
    }
  );

  render(<RouterProvider router={router} />);

  // Returning the router allows direct access to its state.location property
  return router;
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

    it("Should correctly update the URL sort parameters", async () => {
      const user = userEvent.setup();
      const router = setupUrlTest(searchRoutes, searchInitialEntries);

      const anotherTime = "day";
      const anotherTimeFilter = screen.getByText(anotherTime);
      await user.click(anotherTimeFilter);

      expect(router.state.location.search).toBe(
        `?q=EarthPorn&sort=relevance&t=${anotherTime}`
      );
    });
  });

  describe("Clicking a time independent typeFilter", () => {
    it("Should select that filter", async () => {
      const { user } = setup(searchDefaultRoute);

      const timeIndependentTypeFilter = screen.getByText("hot");
      await user.click(timeIndependentTypeFilter);

      expect(timeIndependentTypeFilter).toHaveClass(
        "radio-button-group__label--selected"
      );
    });

    it("Should have no timeFilter selected", async () => {
      const { user } = setup(searchDefaultRoute);

      const timeIndependentTypeFilter = screen.getByText("hot");
      await user.click(timeIndependentTypeFilter);

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

      const timeIndependentTypeFilter = screen.getByText("hot");
      await user.click(timeIndependentTypeFilter);

      const timeFilter = screen.getByRole("radiogroup", { name: "Timeframe" });
      expect(timeFilter).toHaveClass("radio-button-group--disabled");
    });

    it("Should correctly update the URL sort parameters", async () => {
      const user = userEvent.setup();
      const router = setupUrlTest(searchRoutes, searchInitialEntries);

      const timeIndependentType = "hot";
      const timeIndependentTypeFilter = screen.getByText(timeIndependentType);
      await user.click(timeIndependentTypeFilter);

      expect(router.state.location.search).toBe(
        `?q=EarthPorn&sort=${timeIndependentType}`
      );
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

    it("Should correctly update the URL sort parameters", async () => {
      const user = userEvent.setup();
      const router = setupUrlTest(subredditRoutes, subredditInitialEntries);

      const top = screen.getByText("top");
      await user.click(top);

      expect(router.state.location.search).toBe(`?sort=top&t=day`);
    });
  });
});
