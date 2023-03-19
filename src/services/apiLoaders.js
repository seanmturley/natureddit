import store from "../store";
import { redditApi } from "./redditApi";

const initiateRequest = async (endpoint, query) => {
  const apiRequest = store.dispatch(
    redditApi.endpoints[endpoint].initiate(query)
  );
  await apiRequest;
  apiRequest.unsubscribe();

  return query;
};

export const subredditPostsLoader = ({ request }) => {
  const url = new URL(request.url);

  const query = {
    path: url.pathname === "/" ? "/r/EarthPorn/hot" : url.pathname,
    parameters: url.search
  };

  return initiateRequest("getSubredditPosts", query);
};

export const searchPostsLoader = ({ request }) => {
  const url = new URL(request.url);

  const query = {
    path: url.pathname,
    parameters: url.search
  };

  return initiateRequest("getSearchPosts", query);
};
