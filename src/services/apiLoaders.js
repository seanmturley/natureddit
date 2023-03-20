import store from "../store";
import { redditApi } from "./redditApi";

export const postsLoader = async ({ request }) => {
  const url = new URL(request.url);

  const query = {
    path: url.pathname === "/" ? "/r/EarthPorn/hot" : url.pathname,
    parameters: url.search
  };

  const apiRequest = store.dispatch(
    redditApi.endpoints.getPosts.initiate(query)
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

  return query;
};
