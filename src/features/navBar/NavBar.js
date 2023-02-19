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
    navLocation = pathname;
  }

  return (
    <header className="nav">
      <h1 className="nav__logo">Natureddit</h1>
      {navLocation && <h2 className="nav__location">{navLocation}</h2>}
      <form className="search" role="search">
        <div>
          <input
            type="search"
            id="search"
            name="q"
            placeholder="Search Reddit"
            aria-label="Search Reddit content"
          />
          <button>Search</button>
        </div>
      </form>
      <nav className="menu">
        <form className="toggle-switch">Dark mode</form>
        <a className="menu__link" href="#">
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
