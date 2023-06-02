import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import SearchBar from "../searchBar/SearchBar";
import DropdownMenu from "../dropdownMenu/DropdownMenu";

import "./NavBar.css";

function NavBar() {
  const { subreddit } = useParams();
  const { pathname, search } = useLocation();
  let navLocation;

  if (pathname.startsWith("/search")) {
    const queryParams = new URLSearchParams(search);
    navLocation = `Results for "${queryParams.get("q")}"`;
  } else if (
    pathname.startsWith("/r/") ||
    pathname.startsWith("/fullpage/r/")
  ) {
    navLocation = (
      <Link className="nav__location-link" to={`../r/${subreddit}/hot`}>
        {`r/${subreddit}`}
      </Link>
    );
  }

  return (
    <header className="nav">
      <section className="nav__headings">
        <Link className="nav__homepage" to="/">
          <div className="nav__logo"></div>
          <h1 className="nav__title">Natureddit</h1>
        </Link>

        {navLocation && <h2 className="nav__location">{navLocation}</h2>}
      </section>
      <SearchBar />
      <DropdownMenu />
    </header>
  );
}

export default NavBar;
