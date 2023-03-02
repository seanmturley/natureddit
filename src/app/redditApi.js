import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
  endpoints: (builder) => ({
    getPostsBySubreddit: builder.query({
      query: ({ subreddit, filter, time }) => {
        const filterString = filter ? `/${filter}` : "";
        const timeString = time ? `?t=${time}` : "";
        return `r/${subreddit}${filterString}.json${timeString}`;
      },
      transformResponse: (response, meta, arg) => response.data.children
    })
  })
});

export const { useGetPostsBySubredditQuery } = redditApi;
