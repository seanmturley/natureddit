import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";

import useLocalStorage from "use-local-storage";

import MainLayout from "../layouts/mainLayout/MainLayout";
import FiltersLayout from "../layouts/filtersLayout/FiltersLayout";
import ErrorPage from "../components/errorPage/ErrorPage";
import CardsContainer from "../components/cardsContainer/CardsContainer";
import Post from "../components/post/Post";

import { cardsLoader, postLoader } from "../services/apiLoaders";

import basename from "../utils/baseName";

import "./App.css";

const modalRoute = (
  <Route
    path="modal/r/:subreddit/comments/:id/:title/:commentId?"
    loader={postLoader}
    element={<Post modal={true} />}
  />
);

const router = (lightTheme, setLightTheme) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <MainLayout lightTheme={lightTheme} setLightTheme={setLightTheme} />
        }
      >
        <Route errorElement={<ErrorPage />}>
          <Route path="/" loader={cardsLoader} element={<CardsContainer />}>
            {modalRoute}
          </Route>
          <Route element={<FiltersLayout />}>
            <Route
              path="/r/:subreddit/:sortFilter"
              loader={cardsLoader}
              element={<CardsContainer />}
            >
              {modalRoute}
            </Route>
            <Route
              path="/search"
              element={<CardsContainer />}
              loader={cardsLoader}
            >
              {modalRoute}
            </Route>
          </Route>
          <Route
            path="/fullpage/r/:subreddit/comments/:id/:title/:commentId?"
            loader={postLoader}
            element={<Post modal={false} />}
          />
        </Route>
      </Route>
    ),
    {
      basename: `${basename}/`
    }
  );

function App() {
  const [lightTheme, setLightTheme] = useLocalStorage("lightTheme", false);

  return (
    <div className="app" data-light-theme={lightTheme}>
      <RouterProvider router={router(lightTheme, setLightTheme)} />
    </div>
  );
}

export default App;
