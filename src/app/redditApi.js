import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
  endpoints: (builder) => ({
    getPostsBySubreddit: builder.query({
      query: ({ subreddit, filter }) => {
        let filterString = filter ? `/${filter}` : "";
        return `r/${subreddit}${filterString}.json`;
      },
      transformResponse: (response, meta, arg) => response.data.children
    })
  })
});

export const { useGetPostsBySubredditQuery } = redditApi;
