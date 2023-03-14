import React from "react";

import SearchBar from "./SearchBar";

import { BrowserRouter } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const searchBarProps = {
  searchTerm: "Earth Porn",
  handleInputChange: jest.fn(),
  handleInputSubmit: jest.fn()
};

const setup = (route = "/") => {
  window.history.pushState({}, "Test page", route);

  render(<SearchBar {...searchBarProps} />, { wrapper: BrowserRouter });
};

describe("The SearchBar", () => {
  it("Should fire the handleInputSubmit function on submit", () => {
    setup();
    const searchBar = screen.getByRole("searchbox", {
      name: "Search Reddit content"
    });
    fireEvent.submit(searchBar);
    expect(searchBarProps.handleInputSubmit).toHaveBeenCalledTimes(1);
  });

  it("Should fire the handleInputChange function on user input", async () => {
    const user = userEvent.setup();
    setup();
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
