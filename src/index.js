import React from "react";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements
} from "react-router-dom";

import { Provider } from "react-redux";

import store from "./store.js";
import App from "./app/App.js";

import MainLayout from "./layouts/mainLayout/MainLayout";
import FiltersLayout from "./layouts/filtersLayout/FiltersLayout";
import ErrorPage from "./components/errorPage/ErrorPage";
import CardsContainer from "./components/cardsContainer/CardsContainer";
import Post from "./components/post/Post";

import { cardsLoader, postLoader } from "./services/apiLoaders";

import basename from "./utils/baseName";

import "normalize.css";
import "./index.css";

import reportWebVitals from "./reportWebVitals.js";

const container = document.getElementById("root");
const root = createRoot(container);

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

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
