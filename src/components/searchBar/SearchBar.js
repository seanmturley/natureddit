import React, { useCallback, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useGetSubredditsQuery } from "../../services/redditApi";

import SearchDropdown from "../searchDropdown/SearchDropdown";

import "./SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();

  const searchInput = useRef(null);
  const [inputFocused, setInputFocused] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const trimmedSearchTerm = searchTerm.trim();
  const { data } = useGetSubredditsQuery(trimmedSearchTerm);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputSubmit = useCallback(
    (event) => {
      event?.preventDefault();

      if (trimmedSearchTerm) {
        navigate(`/search?q=${trimmedSearchTerm}&sort=relevance&t=all`);
      }

      searchInput.current.blur();
    },
    [navigate, searchInput, trimmedSearchTerm]
  );

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
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={handleInputChange}
        />
      </form>

      {inputFocused && data && (
        <SearchDropdown
          handleInputSubmit={handleInputSubmit}
          searchInput={searchInput}
          trimmedSearchTerm={trimmedSearchTerm}
        />
      )}
    </section>
  );
}

export default SearchBar;
