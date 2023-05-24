import React from "react";

import ToggleSwitch from "./ToggleSwitch";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setup = (switchProps, state, disabled) => {
  render(
    <ToggleSwitch
      {...switchProps}
      state={state || false}
      disabled={disabled || false}
    />
  );
};

const switchProps = {
  heading: "Heading",
  name: "button-name",
  optionLabels: { true: "on", false: "off" },
  showLabels: true,
  setState: jest.fn()
};

describe("Toggle switch", () => {
  it("should display the supplied heading", () => {
    setup(switchProps);
    const switchHeading = screen.queryByText(switchProps.heading);
    expect(switchHeading).toBeInTheDocument();
  });

  it("should display the 'true' label", () => {
    setup(switchProps);
    const switchTrueLabel = screen.queryByText(switchProps.optionLabels.true);
    expect(switchTrueLabel).toBeInTheDocument();
  });

  it("should display the 'false' label", () => {
    setup(switchProps);
    const switchFalseLabel = screen.queryByText(switchProps.optionLabels.false);
    expect(switchFalseLabel).toBeInTheDocument();
  });

  it("should fire the setState function on click", () => {
    setup(switchProps);
    const switchCheckbox = screen.getByRole(/^checkbox$/i);
    userEvent.click(switchCheckbox);
    expect(switchProps.setState).toHaveBeenCalledTimes(1);
  });

  it("should be styled as 'off' when state is 'false'", () => {
    setup(switchProps, false);
    const switchForm = screen.getByRole(/^checkbox$/i).closest("form");
    expect(switchForm).toHaveClass("toggle-switch--false");
  });

  it("should be styled as 'on' when state is 'true'", () => {
    setup(switchProps, true);
    const switchForm = screen.getByRole(/^checkbox$/i).closest("form");
    expect(switchForm).toHaveClass("toggle-switch--true");
  });
});

describe("The disabled toggle switch", () => {
  it("should NOT be styled as clickable", () => {
    setup(switchProps, false, true);
    const switchForm = screen.getByRole(/^checkbox$/i).closest("form");
    expect(switchForm).toHaveClass("toggle-switch--disabled");
  });

  it("should NOT be clickable", () => {
    setup(switchProps, false, true);
    const switchCheckbox = screen.getByRole(/^checkbox$/i);
    expect(switchCheckbox).toHaveAttribute("disabled");
  });

  it("should NOT fire the setState function on click", () => {
    setup(switchProps, false, true);
    const switchCheckbox = screen.getByRole(/^checkbox$/i);
    userEvent.click(switchCheckbox);
    expect(switchProps.setState).toHaveBeenCalledTimes(0);
  });
});
