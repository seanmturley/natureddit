import React from "react";

import "./SearchBar.css";

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

export default SearchBar;
