import React from "react";

import PageHeadings from "../pageHeadings/PageHeadings";
import SearchBar from "../searchBar/SearchBar";
import DropdownMenu from "../dropdownMenu/DropdownMenu";

import "./NavBar.css";

function NavBar() {
  return (
    <header className="nav">
      <PageHeadings />
      <SearchBar />
      <DropdownMenu />
    </header>
  );
}

export default NavBar;
