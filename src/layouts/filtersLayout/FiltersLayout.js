import React from "react";

import Filters from "../../components/filters/Filters";

import { Outlet } from "react-router-dom";

function FiltersLayout() {
  return (
    <>
      <Filters />
      <Outlet />
    </>
  );
}

export default FiltersLayout;
