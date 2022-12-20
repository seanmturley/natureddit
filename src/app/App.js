import React from "react";

import { Routes, Route } from "react-router-dom";

import NavBar from "../features/navBar/NavBar";
import Posts from "../features/posts/Posts";

import "./App.css";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
