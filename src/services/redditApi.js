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
    })
  })
});

export const { useGetPostsQuery } = redditApi;
