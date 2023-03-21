import React from "react";

import { Outlet, useNavigation } from "react-router-dom";

import NavBar from "../../components/navBar/NavBar";
import LoadingOverlay from "../../components/loadingOverlay/LoadingOverlay";

import "./MainLayout.css";

function MainLayout() {
  const navigation = useNavigation();

  return (
    <>
      <NavBar />
      {navigation.state === "loading" && <LoadingOverlay />}
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
