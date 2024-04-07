import React, { useEffect } from "react";

import { Outlet, useNavigation } from "react-router-dom";

import PageHeadings from "../../components/pageHeadings/PageHeadings";
import SearchBar from "../../components/searchBar/SearchBar";
import DropdownMenu from "../../components/dropdownMenu/DropdownMenu";
import LoadingOverlay from "../../components/loadingOverlay/LoadingOverlay";

import "./MainLayout.css";

import PropTypes from "prop-types";

function MainLayout({ lightTheme, setLightTheme, setLoaded }) {
  const navigation = useNavigation();

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <>
      <header className="nav">
        <PageHeadings />
        <SearchBar />
        <DropdownMenu lightTheme={lightTheme} setLightTheme={setLightTheme} />
      </header>
      <main className="main">
        {navigation.state === "loading" && <LoadingOverlay />}
        <Outlet />
      </main>
    </>
  );
}

MainLayout.propTypes = {
  lightTheme: PropTypes.bool.isRequired,
  setLightTheme: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired
};

export default MainLayout;
