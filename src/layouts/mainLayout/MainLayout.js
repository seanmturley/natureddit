import React from "react";

import { Outlet, useNavigation } from "react-router-dom";

import PageHeadings from "../../components/pageHeadings/PageHeadings";
import SearchBar from "../../components/searchBar/SearchBar";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";
import LoadingOverlay from "../../components/loadingOverlay/LoadingOverlay";

import "./MainLayout.css";

function MainLayout({ lightTheme, setLightTheme }) {
  const navigation = useNavigation();

  return (
    <>
      <header className="nav">
        <PageHeadings />
        <SearchBar />
        <DropdownMenu lightTheme={lightTheme} setLightTheme={setLightTheme} />
      </header>
      {navigation.state === "loading" && <LoadingOverlay />}
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
