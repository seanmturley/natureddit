import React from "react";

import { useLocation } from "react-router-dom";

import { useGetSearchPostsQuery } from "../../app/redditApi";

import Posts from "../posts/Posts";

function GetSearchPosts() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get("q");
  const typeFilter = queryParams.get("sort");
  const timeFilter = queryParams.get("t");

  const { data, isError, isLoading } = useGetSearchPostsQuery({
    searchTerm,
    typeFilter,
    timeFilter
  });

  return <Posts data={data} isError={isError} isLoading={isLoading} />;
}

export default GetSearchPosts;
