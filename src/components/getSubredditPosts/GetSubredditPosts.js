import React from "react";

import { useLocation, useParams } from "react-router-dom";

import { useGetSubredditPostsQuery } from "../../app/redditApi";

import ErrorPage from "../error/Error";
import Loading from "../loading/Loading";
import Posts from "../posts/Posts";

function GetSubredditPosts() {
  let { subreddit } = useParams();
  subreddit = subreddit ?? "EarthPorn";

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sortFilter = queryParams.get("sort") ?? "hot";
  const timeFilter = queryParams.get("t");

  const { data, isError, isLoading } = useGetSubredditPostsQuery({
    subreddit,
    sortFilter,
    timeFilter
  });

  if (isError) return <ErrorPage />;

  if (isLoading) return <Loading />;

  return <Posts data={data} />;
}

export default GetSubredditPosts;
