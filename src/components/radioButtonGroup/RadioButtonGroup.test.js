import React from "react";

import RadioButtonGroup from "./RadioButtonGroup";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setup = (buttonGroupProps, disabled) => {
  render(
    <RadioButtonGroup {...buttonGroupProps} disabled={disabled || false} />
  );
};

const twoButtonsProps = {
  heading: "WCAG standard",
  name: "contrast-standard",
  options: ["aa", "aaa"],
  selected: "aa",
  setState: jest.fn()
};

describe("Default radio button group", () => {
  it("should render one button for each option", () => {
    setup(twoButtonsProps);
    const buttons = screen.queryAllByRole(/^radio$/i);
    expect(buttons.length).toBe(twoButtonsProps.options.length);
  });

  it("should render with the default value input checked", () => {
    setup(twoButtonsProps);
    const defaultButtonInput = screen.getByLabelText(twoButtonsProps.selected);
    expect(defaultButtonInput).toHaveAttribute("checked");
  });

  it("should render with the default value label styled appropriately", () => {
    setup(twoButtonsProps);
    const defaultButtonLabel = screen
      .getByText(twoButtonsProps.selected)
      .closest("label");
    expect(defaultButtonLabel).toHaveClass(
      "radio-button-group__label--selected"
    );
  });
});

describe("Selecting a radio button", () => {
  it("should fire the handleChange function when an unselected button is clicked", () => {
    setup(twoButtonsProps);
    const unselectedButtonInput = screen.getByLabelText("aaa");
    userEvent.click(unselectedButtonInput);
    expect(twoButtonsProps.setState).toHaveBeenCalledTimes(1);
  });

  it("should NOT fire the handleChange function when the currently selected button is clicked", () => {
    setup(twoButtonsProps);
    const selectedButtonInput = screen.getByLabelText(twoButtonsProps.selected);
    userEvent.click(selectedButtonInput);
    expect(twoButtonsProps.setState).toHaveBeenCalledTimes(0);
  });
});

describe("The disabled radio button group", () => {
  it("should NOT be styled as clickable", () => {
    setup(twoButtonsProps, true);
    const radioButtonGroupForm = screen
      .getByLabelText(twoButtonsProps.heading)
      .closest("form");
    expect(radioButtonGroupForm).toHaveClass("radio-button-group--disabled");
  });

  it("should NOT have clickable buttons", () => {
    setup(twoButtonsProps, true);
    const buttons = screen.getAllByRole(/^radio$/i);
    expect(buttons[0]).toHaveAttribute("disabled");
    expect(buttons[1]).toHaveAttribute("disabled");
  });

  it("should NOT fire the handleChange function when an unselected button is clicked", () => {
    setup(twoButtonsProps, true);
    const unselectedButtonInput = screen.getByLabelText("aaa");
    userEvent.click(unselectedButtonInput);
    expect(twoButtonsProps.setState).toHaveBeenCalledTimes(0);
  });
});
