import React from "react";

import { Routes, Route } from "react-router-dom";

import NavBar from "../features/navBar/NavBar";
import Home from "../features/home/Home";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
