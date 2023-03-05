import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
  endpoints: (builder) => ({
    getSubredditPosts: builder.query({
      query: ({ subreddit, sortFilter, timeFilter }) => {
        const sortFilterString = sortFilter ? `/${sortFilter}` : "";
        const timeFilterString = timeFilter ? `?t=${timeFilter}` : "";
        return `r/${subreddit}${sortFilterString}.json${timeFilterString}`;
      },
      transformResponse: (response, meta, arg) => response.data.children
    }),
    getSearchPosts: builder.query({
      query: ({ searchTerm, sortFilter, timeFilter }) => {
        const sortFilterString = sortFilter ? `&sort=${sortFilter}` : "";
        const timeFilterString = timeFilter ? `&t=${timeFilter}` : "";
        return `search.json?q=${searchTerm}${sortFilterString}${timeFilterString}`;
      },
      transformResponse: (response, meta, arg) => response.data.children
    })
  })
});

export const { useGetSubredditPostsQuery, useGetSearchPostsQuery } = redditApi;
