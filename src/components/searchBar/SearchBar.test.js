import React from "react";

import SearchBar from "./SearchBar";

import { fireEvent, screen } from "@testing-library/react";

import { setupWithRouting } from "../../testingUtilities";

const searchBarProps = {
  searchTerm: "Earth Porn",
  handleInputChange: jest.fn(),
  handleInputSubmit: jest.fn()
};

const routes = [
  {
    path: "/",
    element: <SearchBar {...searchBarProps} />
  }
];

describe("The SearchBar", () => {
  it("Should fire the handleInputSubmit function on submit", () => {
    setupWithRouting(routes);

    const searchBar = screen.getByRole("searchbox", {
      name: "Search Reddit content"
    });
    fireEvent.submit(searchBar);

    expect(searchBarProps.handleInputSubmit).toHaveBeenCalledTimes(1);
  });

  it("Should fire the handleInputChange function on user input", async () => {
    const { user } = setupWithRouting(routes);

    const searchBar = screen.getByRole("searchbox", {
      name: "Search Reddit content"
    });

    const searchTerm = "Earth Porn";
    await user.type(searchBar, searchTerm);

    expect(searchBarProps.handleInputChange).toHaveBeenCalledTimes(
      searchTerm.length
    );
  });
});
