import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const setupWithRouting = (
  routes,
  initialEntries = ["/"],
  initialIndex = 0
) => {
  const router = createMemoryRouter(
    // An array of routes to be mocked, with the elemement to render for each path
    routes,
    {
      // An array of URLs to manually set the "browser" history
      initialEntries: initialEntries,
      // The array index of where to start in the history
      initialIndex: initialIndex
    }
  );

  render(<RouterProvider router={router} />);

  // Returning the router allows direct access to its state.location property
  return { user: userEvent.setup(), router };
};
