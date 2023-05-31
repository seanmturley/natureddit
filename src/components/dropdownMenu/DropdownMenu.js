import React, { useState } from "react";

import ToggleSwitch from "../toggleSwitch/ToggleSwitch";

import "./DropdownMenu.css";

function DropdownMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(true);

  const themeSwitchProps = {
    heading: "Theme",
    name: "theme",
    optionLabels: { true: "D", false: "L" },
    showLabels: true,
    disabled: false,
    state: darkmode,
    setState: setDarkmode
  };

  return (
    <section className="menu">
      <div className="menu__button" onClick={() => setMenuOpen(!menuOpen)}>
        Menu
      </div>
      {menuOpen && (
        <ul className="menu__list" onMouseLeave={() => setMenuOpen(false)}>
          <li className="menu__list-item">
            <ToggleSwitch {...themeSwitchProps} />
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
              target="_blank"
              rel="noreferrer noopener"
            >
              About
            </a>
          </li>
          <li className="menu__list-item">
            <a
              className="menu__link"
              href="https://www.reddit.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Reddit official
            </a>
          </li>
        </ul>
      )}
    </section>
  );
}

export default DropdownMenu;
