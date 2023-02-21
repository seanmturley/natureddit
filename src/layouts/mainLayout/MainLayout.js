import React from "react";

import { Outlet } from "react-router-dom";

import NavBar from "../../features/navBar/NavBar";

import "./MainLayout.css";

function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
