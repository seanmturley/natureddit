import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import SearchBar from "../searchBar/SearchBar";

import "./NavBar.css";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();

    navigate(`/search?q=${searchTerm}&sort=relevance&t=all`);
  };

  const { subreddit } = useParams();
  const { pathname, search } = useLocation();
  let navLocation;

  if (pathname === "/search") {
    const queryParams = new URLSearchParams(search);
    navLocation = `Results for "${queryParams.get("q")}"`;
  } else if (subreddit) {
    navLocation = `r/${subreddit}`;
  }

  return (
    <header className="nav">
      <section className="nav__headings">
        <div className="nav__logo"></div>
        <h1 className="nav__brand">Natureddit</h1>
        {navLocation && <h2 className="nav__location">{navLocation}</h2>}
      </section>
      <SearchBar
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
        handleInputSubmit={handleInputSubmit}
      />
      <nav className="menu">
        <form className="toggle-switch">Dark mode</form>
        <a className="menu__link" href="null">
          Nature subreddits
        </a>
        <a
          className="menu__link"
          href="https://github.com/seanmturley/natureddit"
        >
          About
        </a>
        <a className="menu__link" href="https://www.reddit.com">
          Reddit official
        </a>
      </nav>
    </header>
  );
}

export default NavBar;
