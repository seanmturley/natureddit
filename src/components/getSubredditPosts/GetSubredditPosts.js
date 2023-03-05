import React from "react";

import { useLocation, useParams } from "react-router-dom";

import { useGetSubredditPostsQuery } from "../../app/redditApi";

import Posts from "../posts/Posts";

function GetSubredditPosts() {
  let { subreddit, sortFilter } = useParams();
  subreddit = subreddit ?? "EarthPorn";

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const timeFilter = queryParams.get("t");

  const { data, isError, isLoading } = useGetSubredditPostsQuery({
    subreddit,
    sortFilter,
    timeFilter
  });

  return <Posts data={data} isError={isError} isLoading={isLoading} />;
}

export default GetSubredditPosts;
