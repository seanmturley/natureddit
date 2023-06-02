import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();

    navigate(`/search?q=${searchTerm}&sort=relevance&t=all`);
  };
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
