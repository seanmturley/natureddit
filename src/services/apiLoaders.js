import store from "../store";
import { redditApi } from "./redditApi";

export const searchPostsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  console.log(request);
  console.log(url);
  console.log(queryParams);

  const query = {
    searchTerm: queryParams.get("q"),
    sortFilter: queryParams.get("sort"),
    timeFilter: queryParams.get("t")
  };

  const apiRequest = store.dispatch(
    redditApi.endpoints.getSearchPosts.initiate(query)
  );
  await apiRequest;
  apiRequest.unsubscribe();

  return query;
};

export const subredditPostsLoader = async ({ request, params }) => {
  const subreddit = params.subreddit ?? "EarthPorn";

  const url = new URL(request.url);
  const queryParams = url.searchParams;
  console.log(request);
  console.log(url);
  console.log(queryParams);
  const query = {
    subreddit: subreddit,
    sortFilter: queryParams.get("sort") ?? "hot",
    timeFilter: queryParams.get("t")
  };

  const apiRequest = store.dispatch(
    redditApi.endpoints.getSubredditPosts.initiate(query)
  );
  await apiRequest;
  apiRequest.unsubscribe();

  return query;
};
