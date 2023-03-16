import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider
} from "react-router-dom";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const setupWithUrl = (component, url = "/") => {
  window.history.pushState({}, "Test page", url);

  render(component, { wrapper: BrowserRouter });

  return {
    user: userEvent.setup()
  };
};
