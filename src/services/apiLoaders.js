import { redirect } from "react-router-dom";

import store from "../store";
import { redditApi } from "./redditApi";

import basename from "../utils/baseName";

const extractPaths = (pathname) => {
  // Remove the site's basename and "fullpage" from the pathname
  // as neither of these are used for the API request
  const re = new RegExp(`${basename}|/fullpage/`, "gi");
  const truncatedPathname = pathname.replace(re, "");

  // When a post is presented in fullpage view there's
  // no need to extract the background and modal query
  // paths from the pathname. The pathname (after RegExp
  // replacements) is the postPath.
  if (pathname.includes("/fullpage/")) {
    return { postPath: truncatedPathname };
  }

  // When a post is presented in modal view it's necessary
  // to extract background and modal query paths from the
  // pathname

  // The "modal/" in the path effectively divides it in two:

  // Before "modal/" is the path for fetching cards i.e.
  // the background of the modal

  // After "modal/" is the path for the post itself i.e.
  // the data presented in the modal

  const paths = truncatedPathname.split("modal/");
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

  if (!modal && pathname.includes("/comments/")) {
    // If the modal state isn't true, redirect to the fullpage
    // version of the post

    return redirect(`/fullpage/${postPath}`);
  }

  const query = {
    // On the homepage, the query for cards defaults to the
    // "EarthPorn" subreddit
    path: cardsPath === "/" ? "/r/EarthPorn/hot" : cardsPath,
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
