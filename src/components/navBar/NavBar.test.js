import React from "react";

import NavBar from "./NavBar";

import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider
} from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setup = (route = "/") => {
  window.history.pushState({}, "Test page", route);

  render(<NavBar />, { wrapper: BrowserRouter });
};

const setupUrlTest = () => {
  const router = createMemoryRouter(
    // An array of routes to be mocked, with the elemement to render for each path
    [
      {
        path: "/",
        element: <NavBar />
      },
      {
        path: "/search",
        element: <NavBar />
      }
    ],
    {
      // An array of routes to manually set the "browser" history
      initialEntries: ["/"],
      // The array index of where to start in the history
      initialIndex: 0
    }
  );

  render(<RouterProvider router={router} />);

  // Returning the router allows direct access to its state.location property
  return router;
};

describe("The navLocation heading", () => {
  it("should display nothing on the home page", () => {
    setup();
    const headings = screen.getAllByRole("heading");
    // On the homepage there should only be one heading in the NavBar (the h1)
    // The h2.navLocation should not be present
    expect(headings.length).toEqual(1);
  });

  it("should display 'r/[subreddit]' on subreddit pages", () => {
    const subreddit = "r/EarthPorn";
    setup(subreddit);
    const navLocation = screen.getByRole("heading", { name: subreddit });
    expect(navLocation).toBeInTheDocument();
  });

  it("should display 'Results for \"[searchTerm]\"' on search pages", () => {
    const searchTerm = "EarthPorn";
    setup(`/search?q=${searchTerm}`);
    const navLocation = screen.getByRole("heading", {
      name: `Results for "${searchTerm}"`
    });
    expect(navLocation).toBeInTheDocument();
  });
});

describe("The SearchBar", () => {
  it("Should display user input", async () => {
    const user = userEvent.setup();
    setup();
    const searchBar = screen.getByRole("searchbox", {
      name: "Search Reddit content"
    });
    const searchTerm = "Earth Porn";
    await user.type(searchBar, searchTerm);
    expect(searchBar).toHaveValue(searchTerm);
  });

  it("Should correctly update the URL upon user submit", async () => {
    const user = userEvent.setup();
    const router = setupUrlTest();

    const searchBar = screen.getByRole("searchbox", {
      name: "Search Reddit content"
    });
    const searchTerm = "Earth Porn";
    await user.type(searchBar, searchTerm);

    fireEvent.submit(searchBar);

    expect(router.state.location.pathname).toBe("/search");
    expect(router.state.location.search).toBe(
      `?q=${searchTerm}&sort=relevance&t=all`
    );
  });
});
