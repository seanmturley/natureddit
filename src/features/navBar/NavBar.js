import React from "react";
import { useLocation } from "react-router-dom";

import "./NavBar.css";

function NavBar() {
  const { pathname, search } = useLocation();
  let navLocation;

  if (pathname.startsWith("/search")) {
    const queryParams = new URLSearchParams(search);
    navLocation = `Results for "${queryParams.get("q")}"`;
  } else if (pathname.startsWith("/r/")) {
    // Match "r/" followed by any number of alphanumeric values or _ i.e. exclude "/filterType"
    navLocation = pathname.match(/r\/[\w]+/)[0];
  }

  return (
    <header className="nav">
      <section className="nav__headings">
        <div className="nav__logo"></div>
        <h1 className="nav__brand">Natureddit</h1>
        {navLocation && <h2 className="nav__location">{navLocation}</h2>}
      </section>
      <form className="search" role="search">
        <input
          className="search__input"
          type="search"
          id="search"
          name="q"
          placeholder="Search Reddit"
          aria-label="Search Reddit content"
        />
      </form>
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
