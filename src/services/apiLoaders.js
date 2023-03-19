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
  await apiRequest;
  apiRequest.unsubscribe();

  return query;
};
