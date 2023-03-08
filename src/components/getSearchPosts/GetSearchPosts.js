import React from "react";

import { useLocation } from "react-router-dom";

import { useGetSearchPostsQuery } from "../../app/redditApi";

import ErrorPage from "../error/Error";
import Loading from "../loading/Loading";
import Posts from "../posts/Posts";

function GetSearchPosts() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get("q");
  const sortFilter = queryParams.get("sort");
  const timeFilter = queryParams.get("t");

  const { data, isError, isLoading } = useGetSearchPostsQuery({
    searchTerm,
    sortFilter,
    timeFilter
  });

  if (isError) return <ErrorPage />;

  if (isLoading) return <Loading />;

  return <Posts data={data} />;
}

export default GetSearchPosts;
