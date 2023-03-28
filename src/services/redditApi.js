import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ path, parameters }) => {
        return `${path}.json${parameters}`;
      },
      transformResponse: (response, meta, arg) => response.data.children
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
    })
  })
});

export const { useGetPostsQuery, useGetPostQuery } = redditApi;