import React from "react";

import RadioButtonGroup from "./RadioButtonGroup";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setup = (buttonGroupProps, hideHeading = true, disabled = false) => {
  render(
    <RadioButtonGroup
      {...buttonGroupProps}
      hideHeading={hideHeading}
      disabled={disabled}
    />
  );

  return { user: userEvent.setup() };
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

    const buttons = screen.queryAllByRole("radio");
    expect(buttons.length).toBe(twoButtonsProps.options.length);
  });

  it("should render with the default selected value input checked", () => {
    setup(twoButtonsProps);

    const defaultButtonInput = screen.getByLabelText(twoButtonsProps.selected);
    expect(defaultButtonInput).toHaveAttribute("checked");
  });

  it("should render with the default value label styled appropriately", () => {
    setup(twoButtonsProps);

    const defaultButtonLabel = screen.getByText(twoButtonsProps.selected);
    expect(defaultButtonLabel).toHaveClass(
      "radio-button-group__label--selected"
    );
  });
});

describe("Selecting a radio button", () => {
  it("should fire the handleChange function when an unselected button is clicked", async () => {
    const { user } = setup(twoButtonsProps);

    const unselectedButtonInput = screen.getByLabelText(
      twoButtonsProps.options[1]
    );
    await user.click(unselectedButtonInput);

    expect(twoButtonsProps.setState).toHaveBeenCalledTimes(1);
  });

  it("should NOT fire the handleChange function when the currently selected button is clicked", async () => {
    const { user } = setup(twoButtonsProps);

    const selectedButtonInput = screen.getByLabelText(twoButtonsProps.selected);
    await user.click(selectedButtonInput);

    expect(twoButtonsProps.setState).toHaveBeenCalledTimes(0);
  });
});

describe("The disabled radio button group", () => {
  it("should NOT be styled as clickable", () => {
    setup(twoButtonsProps, true, true);

    const radioButtonGroupForm = screen.getByLabelText(twoButtonsProps.heading);
    expect(radioButtonGroupForm).toHaveClass("radio-button-group--disabled");
  });

  it("should NOT have clickable buttons", () => {
    setup(twoButtonsProps, true, true);

    const buttons = screen.getAllByRole("radio");
    expect(buttons[0]).toHaveAttribute("disabled");
    expect(buttons[1]).toHaveAttribute("disabled");
  });

  it("should NOT fire the handleChange function when an unselected button is clicked", () => {
    const { user } = setup(twoButtonsProps, true, true);

    const unselectedButtonInput = screen.getByLabelText(
      twoButtonsProps.options[1]
    );
    user.click(unselectedButtonInput);

    expect(twoButtonsProps.setState).toHaveBeenCalledTimes(0);
  });
});

describe("The radio button group heading", () => {
  it("Should be displayed when hideHeading is false", () => {
    setup(twoButtonsProps, false);

    const heading = screen.getByRole("heading", {
      name: twoButtonsProps.heading
    });

    expect(heading).toHaveClass("radio-button-group__heading--visible");
  });

  it("Should NOT be displayed when hideHeading is true", () => {
    setup(twoButtonsProps, true);

    const heading = screen.getByRole("heading", {
      name: twoButtonsProps.heading
    });

    expect(heading).toHaveClass("radio-button-group__heading--hidden");
  });
});
