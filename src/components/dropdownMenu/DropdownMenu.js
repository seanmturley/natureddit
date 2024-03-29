import React, { useState } from "react";

import ToggleSwitch from "../toggleSwitch/ToggleSwitch";

import { PiListBold, PiRedditLogo } from "react-icons/pi";
import {
  IoContrastOutline,
  IoInformationCircleOutline,
  IoLeafOutline,
  IoMoon,
  IoSunny
} from "react-icons/io5";

import "./DropdownMenu.css";

import PropTypes from "prop-types";

function DropdownMenu({ lightTheme, setLightTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const themeSwitchProps = {
    icon: <IoContrastOutline />,
    heading: "Theme",
    name: "theme",
    optionLabels: { true: "light", false: "dark" },
    showLabels: false,
    optionIcons: { true: <IoSunny />, false: <IoMoon /> },
    disabled: false,
    state: lightTheme,
    setState: setLightTheme
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="menu">
      <PiListBold className="menu__button" onClick={toggleMenu} />
      {menuOpen && (
        <div className="menu__underlay" onMouseLeave={toggleMenu}>
          <div
            className="menu__underlay-nav-placeholder"
            onClick={toggleMenu}
          ></div>
          <ul className="menu__list" onMouseLeave={toggleMenu}>
            <li className="menu__list-item">
              <ToggleSwitch {...themeSwitchProps} />
            </li>
            <li className="menu__list-item">
              <a className="menu__link" href="null">
                <IoLeafOutline className="menu__list-icon" />
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
                <IoInformationCircleOutline className="menu__list-icon" />
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
                <PiRedditLogo className="menu__list-icon" />
                Reddit official
              </a>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

DropdownMenu.propTypes = {
  lightTheme: PropTypes.bool.isRequired,
  setLightTheme: PropTypes.func.isRequired
};

export default DropdownMenu;
