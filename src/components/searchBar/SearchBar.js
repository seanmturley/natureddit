import React from "react";

import "./SearchBar.css";

import PropTypes from "prop-types";

function SearchBar({ searchTerm, handleInputChange, handleInputSubmit }) {
  return (
    <form className="search" role="search" onSubmit={handleInputSubmit}>
      <input
        className="search__input"
        type="search"
        id="search"
        name="q"
        placeholder="Search Reddit"
        aria-label="Search Reddit content"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </form>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputSubmit: PropTypes.func.isRequired
};

export default SearchBar;
