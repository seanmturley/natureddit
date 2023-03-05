import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";

import MainLayout from "../layouts/mainLayout/MainLayout";
import FiltersLayout from "../layouts/filtersLayout/FiltersLayout";
import GetSubredditPosts from "../components/getSubredditPosts/GetSubredditPosts";
import GetSearchPosts from "../components/getSearchPosts/GetSearchPosts";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<GetSubredditPosts />} />
      <Route element={<FiltersLayout />}>
        <Route
          path="r/:subreddit/:sortFilter?"
          element={<GetSubredditPosts />}
        />
        <Route path="search" element={<GetSearchPosts />} />
      </Route>
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
