import store from "../store";
import { redditApi } from "./redditApi";

import basename from "../utils/baseName";

const extractPaths = (pathname) => {
  // The start of the pathname can be removed as it doesn't
  // participate in the API query i.e. the basename (possibly
  // followed by "fullpage/" or "modal/").
  const re = new RegExp(`^${basename}/(?:fullpage/|modal/)?`, "gi");
  const truncatedPathname = pathname.replace(re, "");

  // When the pathname starts with the basename directly
  // followed by "fullpage/" or "modal/", the pathname
  // doesn't need to be divided into background and modal
  // queries.

  // The cardsPath (i.e. background) is an empty string,
  // and the postPath is simply the truncatedPathname.
  if (
    pathname.startsWith(`${basename}/fullpage/`) ||
    pathname.startsWith(`${basename}/modal/`)
  ) {
    return {
      cardsPath: "",
      postPath: truncatedPathname
    };
  }

  // Otherwise, it is necessary to extract background and
  // modal query paths from the pathname.

  // The "/modal/" in the path effectively divides it in two:

  // Before "/modal/" is the path for fetching cards i.e.
  // the background of the modal.

  // After "/modal/" is the path for the post itself i.e.
  // the data presented in the modal.
  const paths = truncatedPathname.split("/modal/");
  return {
    cardsPath: paths[0],
    postPath: paths[1]
  };
};

const makeApiRequest = async (query, endpoint) => {
  const apiRequest = store.dispatch(
    redditApi.endpoints[endpoint].initiate(query)
  );

  try {
    await apiRequest.unwrap();
  } catch (error) {
    throw new Response(error.data.message, {
      status: error.status,
      statusText: error.data.message
    });
  } finally {
    apiRequest.unsubscribe();
  }
};

export const cardsLoader = async ({ request }) => {
  const modal = window.history.state?.usr?.modal;

  const url = new URL(request.url);
  const pathname = url.pathname;

  const { cardsPath, postPath } = extractPaths(pathname);

  if (
    !modal &&
    pathname.includes("/modal/") &&
    pathname.includes("/comments/")
  ) {
    // If the modal state isn't true, redirect to the modal view to
    // the fullpage version of the post

    // The redirect uses window.location.replace because React
    // Router's native redirect function doesn't support replac-
    // -ing the current entry in the browser's history stack
    return window.location.replace(`${basename}/fullpage/${postPath}`);
  }

  const query = {
    // On the homepage (i.e. the cardsPath is an empty string),
    // the query for cards defaults to the "EarthPorn" subreddit
    path: cardsPath || "r/EarthPorn/hot",
    parameters: url.search
  };
  console.log(query);

  await makeApiRequest(query, "getCards");

  return query;
};

export const postLoader = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const query = extractPaths(pathname).postPath;
  console.log(query);

  await makeApiRequest(query, "getPost");

  return query;
};
