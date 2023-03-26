import store from "../store";
import { redditApi } from "./redditApi";

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

export const postsLoader = async ({ request }) => {
  const url = new URL(request.url);

  const query = {
    path: url.pathname === "/" ? "/r/EarthPorn/hot" : url.pathname,
    parameters: url.search
  };

  await makeApiRequest(query, "getPosts");

  return query;
};

export const postLoader = async ({ request }) => {
  const url = new URL(request.url);

  const query = url.pathname;

  await makeApiRequest(query, "getPost");

  return query;
};
