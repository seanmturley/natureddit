import store from "../store";
import { redditApi } from "./redditApi";

import basename from "../utils/baseName";

const removeBasename = (pathname) => pathname.replace(basename, "");

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
  const url = new URL(request.url);

  const path = removeBasename(url.pathname);

  const query = {
    path: path === "/" ? "/r/EarthPorn/hot" : path,
    parameters: url.search
  };

  await makeApiRequest(query, "getCards");

  return query;
};

export const postLoader = async ({ request }) => {
  const url = new URL(request.url);

  const query = removeBasename(url.pathname);

  await makeApiRequest(query, "getPost");

  return query;
};
