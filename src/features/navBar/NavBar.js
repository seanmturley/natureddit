import React from "react";

import "./NavBar.css";

function NavBar() {
  return (
    <header className="nav">
      <h1 className="nav__logo">Natureddit</h1>
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
