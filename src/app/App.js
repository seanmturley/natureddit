import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";

import MainLayout from "../layouts/mainLayout/MainLayout";
import FiltersLayout from "../layouts/filtersLayout/FiltersLayout";
import Posts from "../components/posts/Posts";

import {
  useGetSubredditPostsQuery,
  useGetSearchPostsQuery
} from "../services/redditApi";
import {
  searchPostsLoader,
  subredditPostsLoader
} from "../services/apiLoaders";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route
        index
        element={<Posts useQuery={useGetSubredditPostsQuery} />}
        loader={subredditPostsLoader}
      />
      <Route element={<FiltersLayout />}>
        <Route
          path="r/:subreddit/:sortFilter"
          element={<Posts useQuery={useGetSubredditPostsQuery} />}
          loader={subredditPostsLoader}
        />
        <Route
          path="search"
          element={<Posts useQuery={useGetSearchPostsQuery} />}
          loader={searchPostsLoader}
        />
      </Route>
      <Route path="error" element={<errorPage />} />
    </Route>
  )
);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
