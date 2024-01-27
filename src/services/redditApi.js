import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import sortAndSelectByHotness from "../utils/postHotness";

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
  endpoints: (builder) => ({
    getCards: builder.query({
      query: ({ path, parameters }) => {
        return `${path}.json${parameters}`;
      },
      transformResponse: (response, meta, arg) => response.data.children
    }),
    getHomeCards: builder.query({
      async queryFn(query, _queryApi, _extraOptions, fetchWithBQ) {
        let collatedSubredditData = [];

        for (const path of query.paths) {
          const result = await fetchWithBQ(
            `${path.subreddit}.json?limit=${path.limit}`
          );
          if (result.error) return { error: result.error };

          collatedSubredditData = [
            ...collatedSubredditData,
            ...result.data.data.children
          ];
        }

        return collatedSubredditData
          ? {
              data: sortAndSelectByHotness(
                collatedSubredditData,
                query.numPostsRequired
              )
            }
          : { error: "Error collating subreddit data" };
      }
    }),
    getPost: builder.query({
      query: (query) => {
        return `${query}.json`;
      },
      transformResponse: (response, meta, arg) => {
        const transformedResponse = {
          post: response[0].data.children[0].data,
          comments: response[1].data.children
        };
        return transformedResponse;
      }
    }),
    getSubreddits: builder.query({
      query: (query) => {
        return `search.json?q=${query}&type=sr&limit=5`;
      },
      transformResponse: (response, meta, arg) =>
        response.data?.children.length > 0 ? response.data.children : null
    })
  })
});

export const {
  useGetCardsQuery,
  useGetHomeCardsQuery,
  useGetPostQuery,
  useGetSubredditsQuery
} = redditApi;
