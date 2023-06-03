import React from "react";

import { Link } from "react-router-dom";

import "./SearchDropdown.css";

const results = [
  { name: "r/PATH", members: "124" },
  { name: "r/pathofexile", members: "533k" },
  { name: "r/Pathfinder_RPG", members: "141k" }
];

function SearchDropdown() {
  return (
    <div className="search-dropdown">
      <section className="search-dropdown__subreddits">
        <h1 className="search-dropdown__subreddits-heading">Subreddits</h1>
        <ul className="search-dropdown__subreddits-list">
          {results.map((result, index) => (
            <li className="subreddit" key={index}>
              <Link className="subreddit__link" to={`../${result.name}/hot`}>
                <div className="subreddit__icon"></div>
                <div className="subreddit__details">
                  <div className="subreddit__name">{result.name}</div>
                  <div className="subreddit__members">
                    {result.members} members
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="search-dropdown__search">
        <div className="search-dropdown__magnifying-glass"></div>
        Search posts for "term"
      </section>
    </div>
  );
}

export default SearchDropdown;
