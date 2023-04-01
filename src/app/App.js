import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet
} from "react-router-dom";

import MainLayout from "../layouts/mainLayout/MainLayout";
import FiltersLayout from "../layouts/filtersLayout/FiltersLayout";
import ErrorPage from "../components/errorPage/ErrorPage";
import Posts from "../components/posts/Posts";
import Post from "../components/post/Post";

import { postsLoader, postLoader } from "../services/apiLoaders";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route element={<Outlet />} errorElement={<ErrorPage />}>
        <Route path="/" loader={postsLoader} element={<Posts />} />
        <Route element={<FiltersLayout />}>
          <Route
            path="/r/:subreddit/:sortFilter"
            loader={postsLoader}
            element={<Posts />}
          />
          <Route path="/search" element={<Posts />} loader={postsLoader} />
        </Route>
        <Route
          path="/r/:subreddit/comments/:id/:title/:commentId?"
          loader={postLoader}
          element={<Post />}
        />
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
