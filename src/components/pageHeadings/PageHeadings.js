import React from "react";

import { Link, useLocation, useParams } from "react-router-dom";

import "./PageHeadings.css";

function PageHeadings() {
  const { subreddit } = useParams();
  const { pathname, search } = useLocation();
  let navLocation;

  if (pathname.startsWith("/search")) {
    const queryParams = new URLSearchParams(search);
    navLocation = `Results for "${queryParams.get("q")}"`;
  } else if (
    pathname.startsWith("/r/") ||
    pathname.startsWith("/fullpage/r/")
  ) {
    navLocation = (
      <Link
        className="page-headings__location-link"
        to={`../r/${subreddit}/hot`}
      >
        {`r/${subreddit}`}
      </Link>
    );
  }

  return (
    <section className="page-headings">
      <Link className="page-headings__homepage" to="/">
        <div className="page-headings__logo"></div>
        <h1 className="page-headings__title">Natureddit</h1>
      </Link>

      {navLocation && (
        <h2 className="page-headings__location">{navLocation}</h2>
      )}
    </section>
  );
}

export default PageHeadings;
