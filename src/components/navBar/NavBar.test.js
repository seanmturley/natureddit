import React from "react";

import NavBar from "./NavBar";

import { fireEvent, screen } from "@testing-library/react";

import { setupWithUrl, setupWithRouting } from "../../testingUtilities";

const searchRoutes = [
  {
    path: "/",
    element: <NavBar />
  },
  {
    path: "/search",
    element: <NavBar />
  }
];

describe("The navLocation heading", () => {
  it("should display nothing on the home page", () => {
    setupWithUrl(<NavBar />);

    const headings = screen.getAllByRole("heading");
    // On the homepage there should only be one heading in the NavBar (the h1)
    // The h2.navLocation should not be present
    expect(headings.length).toEqual(1);
  });

  it("should display 'r/[subreddit]' on subreddit pages", () => {
    const subreddit = "r/EarthPorn";
    setupWithUrl(<NavBar />, subreddit);

    const navLocation = screen.getByRole("heading", { name: subreddit });
    expect(navLocation).toBeInTheDocument();
  });

  it("should display 'Results for \"[searchTerm]\"' on search pages", () => {
    const searchTerm = "EarthPorn";
    setupWithUrl(<NavBar />, `/search?q=${searchTerm}`);

    const navLocation = screen.getByRole("heading", {
      name: `Results for "${searchTerm}"`
    });
    expect(navLocation).toBeInTheDocument();
  });
});

describe("The SearchBar", () => {
  it("Should display user input", async () => {
    const { user } = setupWithUrl(<NavBar />);

    const searchBar = screen.getByRole("searchbox", {
      name: "Search Reddit content"
    });
    const searchTerm = "Earth Porn";
    await user.type(searchBar, searchTerm);

    expect(searchBar).toHaveValue(searchTerm);
  });

  it("Should correctly update the URL upon user submit", async () => {
    const { user, router } = setupWithRouting(searchRoutes);

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
