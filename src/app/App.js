import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet
} from "react-router-dom";

import NavBar from "../features/navBar/NavBar";
import Filters from "../features/filters/Filters";
import Posts from "../features/posts/Posts";

import "./App.css";

const NavBarLayout = () => (
  <>
    <NavBar />
    <main className="app__main">
      <Outlet />
    </main>
  </>
);

const FiltersLayout = () => (
  <>
    <Filters />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBarLayout />}>
      <Route index element={<Posts />} />
      <Route element={<FiltersLayout />}>
        <Route path=":subreddit" element={<Posts />} />
        <Route path="search" element={<Posts />} />
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
