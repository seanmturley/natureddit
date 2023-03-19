import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
  endpoints: (builder) => ({
    getSubredditPosts: builder.query({
      query: ({ subreddit, sortFilter, timeFilter }) => {
        const timeFilterString = timeFilter ? `?t=${timeFilter}` : "";
        return `r/${subreddit}/${sortFilter}.json${timeFilterString}`;
      },
      transformResponse: (response, meta, arg) => response.data.children
    }),
    getSearchPosts: builder.query({
      query: ({ path, parameters }) => {
        return `${path}.json${parameters}`;
      },
      transformResponse: (response, meta, arg) => response.data.children
    })
  })
});

export const { useGetSubredditPostsQuery, useGetSearchPostsQuery } = redditApi;
