import React, { useState } from "react";

import ToggleSwitch from "../toggleSwitch/ToggleSwitch";

import "./DropdownMenu.css";

function DropdownMenu() {
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
      <div class="menu__button">Menu</div>
      <ul className="menu__list">
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
