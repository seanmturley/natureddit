import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
  endpoints: (builder) => ({
    getPostsBySubreddit: builder.query({
      query: ({ subreddit, typeFilter, timeFilter }) => {
        const typeFilterString = typeFilter ? `/${typeFilter}` : "";
        const timeFilterString = timeFilter ? `?t=${timeFilter}` : "";
        return `r/${subreddit}${typeFilterString}.json${timeFilterString}`;
      },
      transformResponse: (response, meta, arg) => response.data.children
    })
  })
});

export const { useGetPostsBySubredditQuery } = redditApi;
