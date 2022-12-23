import React from "react";

import { Routes, Route } from "react-router-dom";

import NavBar from "../features/navBar/NavBar";
import Filters from "../features/filters/Filters";
import Posts from "../features/posts/Posts";

import "./App.css";

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="app__main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filters />
                <Posts />
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
