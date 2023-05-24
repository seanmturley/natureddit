import React from "react";

import "./ToggleSwitch.css";

import PropTypes from "prop-types";

function ToggleSwitch({
  heading,
  name,
  optionLabels,
  showLabels,
  disabled,
  state,
  setState
}) {
  const handleChange = (event) => {
    setState(event.target.value === optionLabels.true);
  };

  const clickability = disabled ? "disabled" : "clickable";

  return (
    <form
      className={`toggle-switch toggle-switch--${state} toggle-switch--${clickability}`}
    >
      <label htmlFor={name} className="toggle-switch__label">
        <h1 className="toggle-switch__heading">{heading}</h1>
        <input
          className="toggle-switch__input"
          type="checkbox"
          name={name}
          id={name}
          value={state ? optionLabels.false : optionLabels.true}
          onChange={handleChange}
          checked={state}
          disabled={disabled}
        />
        <div className="toggle-switch__container">
          <div className="toggle-switch__sliding-container">
            <div className="toggle-switch__text-container">
              <span className="toggle-switch__text-true">
                {showLabels && optionLabels.true}
              </span>
            </div>
            <div className="toggle-switch__circle"></div>
            <div className="toggle-switch__text-container">
              <span className="toggle-switch__text-false">
                {showLabels && optionLabels.false}
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
  disabled: PropTypes.bool.isRequired,
  state: PropTypes.bool.isRequired,
  setState: PropTypes.func.isRequired
};

export default ToggleSwitch;
