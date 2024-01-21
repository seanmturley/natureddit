import React from "react";

import "./ToggleSwitch.css";

import PropTypes from "prop-types";

function ToggleSwitch({
  heading,
  name,
  optionLabels,
  showLabels,
  optionIcons,
  disabled,
  state,
  setState
}) {
  const handleChange = (event) => {
    setState(event.target.value !== optionLabels.true);
  };

  const clickability = disabled ? "disabled" : "clickable";

  return (
    <form
      className={`toggle-switch toggle-switch--${state} toggle-switch--${clickability}`}
      aria-label="toggle-switch"
    >
      <label htmlFor={name} className="toggle-switch__label">
        <span className="toggle-switch__icon"></span>
        <h1 className="toggle-switch__heading">{heading}</h1>
        <input
          className="toggle-switch__input"
          type="checkbox"
          name={name}
          id={name}
          value={optionLabels[state]}
          onChange={handleChange}
          checked={state}
          disabled={disabled}
        />
        <div className="toggle-switch__container">
          <div className="toggle-switch__sliding-container">
            <div className="toggle-switch__text-container">
              <span className="toggle-switch__text-true">
                {showLabels && optionLabels.true}
                {optionIcons && optionIcons.true}
              </span>
            </div>
            <div className="toggle-switch__circle"></div>
            <div className="toggle-switch__text-container">
              <span className="toggle-switch__text-false">
                {showLabels && optionLabels.false}
                {optionIcons && optionIcons.false}
              </span>
            </div>
          </div>
        </div>
      </label>
    </form>
  );
}

ToggleSwitch.propTypes = {
  heading: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  optionLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  showLabels: PropTypes.bool.isRequired,
  optionIcons: PropTypes.elementType,
  disabled: PropTypes.bool.isRequired,
  state: PropTypes.bool.isRequired,
  setState: PropTypes.func.isRequired
};

export default ToggleSwitch;
