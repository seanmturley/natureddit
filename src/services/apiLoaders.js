import store from "../store";
import { redditApi } from "./redditApi";

import extractPaths from "../utils/extractPaths";
import basename from "../utils/baseName";

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

  if (!cardsPath) {
    // On the homepage (i.e. the cardsPath is an empty string),
    // query the homepage API endpoint with a curated list of
    // nature subreddits
    const query = {
      paths: [
        { subreddit: "r/AutumnPorn/hot", limit: "10" },
        { subreddit: "r/beautifultrees/hot", limit: "10" },
        { subreddit: "r/EarthPorn/hot", limit: "10" },
        { subreddit: "r/LandscapePhotography/hot", limit: "10" },
        { subreddit: "r/natureporn/hot", limit: "10" },
        { subreddit: "r/winterporn/hot", limit: "10" }
      ],
      numPostsRequired: 40
    };

    await makeApiRequest(query, "getHomeCards");

    return query;
  }

  const query = {
    path: cardsPath,
    parameters: url.search
  };

  await makeApiRequest(query, "getCards");

  return query;
};

export const postLoader = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const query = extractPaths(pathname).postPath;

  await makeApiRequest(query, "getPost");

  return query;
};
