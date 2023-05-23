import React from "react";

import "./DropdownMenu.css";

function DropdownMenu() {
  return (
    <section className="menu">
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
    </section>
  );
}

export default DropdownMenu;
