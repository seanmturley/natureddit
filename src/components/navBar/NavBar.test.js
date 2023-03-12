import React from "react";

import NavBar from "./NavBar";

import { BrowserRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

const setup = (route = "/") => {
  window.history.pushState({}, "Test page", route);

  render(<NavBar />, { wrapper: BrowserRouter });
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
