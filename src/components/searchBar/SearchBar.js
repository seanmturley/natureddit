import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchDropdown from "../searchDropdown/SearchDropdown";

import "./SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const searchInput = useRef(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm) {
      navigate(`/search?q=${trimmedSearchTerm}&sort=relevance&t=all`);
    }
  };

  return (
    <section className="search">
      <form className="search__form" role="search" onSubmit={handleInputSubmit}>
        <input
          ref={searchInput}
          className="search__input"
          type="search"
          id="search"
          name="q"
          placeholder="Search Reddit"
          aria-label="Search Reddit content"
          autoComplete="off"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>

      <SearchDropdown searchInput={searchInput} />
    </section>
  );
}

export default SearchBar;
