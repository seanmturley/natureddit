import React from "react";

import "./DropdownMenu.css";

function DropdownMenu() {
  return (
    <section className="menu">
      <div class="menu__button">Menu</div>
      <ul className="menu__list">
        <li className="menu__list-item">
          <form className="toggle-switch">Dark mode</form>
        </li>
        <li className="menu__list-item">
          <a className="menu__link" href="null">
            Nature subreddits
          </a>
        </li>
        <li className="menu__list-item">
          <a
            className="menu__link"
            href="https://github.com/seanmturley/natureddit"
          >
            About
          </a>
        </li>
        <li className="menu__list-item">
          <a className="menu__link" href="https://www.reddit.com">
            Reddit official
          </a>
        </li>
      </ul>
    </section>
  );
}

export default DropdownMenu;
