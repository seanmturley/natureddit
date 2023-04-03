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
import Cards from "../components/cards/Cards";
import Post from "../components/post/Post";

import { cardsLoader, postLoader } from "../services/apiLoaders";

import basename from "../utils/baseName";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route element={<Outlet />} errorElement={<ErrorPage />}>
        <Route path="/" loader={cardsLoader} element={<Cards />} />
        <Route element={<FiltersLayout />}>
          <Route
            path="/r/:subreddit/:sortFilter"
            loader={cardsLoader}
            element={<Cards />}
          />
          <Route path="/search" element={<Cards />} loader={cardsLoader} />
        </Route>
        <Route
          path="/r/:subreddit/comments/:id/:title/:commentId?"
          loader={postLoader}
          element={<Post />}
        />
      </Route>
    </Route>
  ),
  {
    basename: basename
  }
);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
