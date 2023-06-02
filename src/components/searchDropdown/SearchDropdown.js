import React from "react";

import { Link } from "react-router-dom";

function SearchDropdown() {
  return (
    <div className="search-dropdown">
      <section className="search-dropdown__subreddits">
        <h1 className="search-dropdown__subreddits-heading">Subreddits</h1>
        <ul className="search-dropdown__subreddits-list">
          <li className="subreddit">
            <Link className="subreddit__link">
              <div className="subreddit__icon"></div>
              <div className="subreddit__details">
                <div className="subreddit__name">r/PATH</div>
                <div className="subreddit__members">124 members</div>
              </div>
            </Link>
          </li>
          <li className="subreddit">
            <Link className="subreddit__link">
              <div className="subreddit__icon"></div>
              <div className="subreddit__details">
                <div className="subreddit__name">r/pathofexile</div>
                <div className="subreddit__members">533k members</div>
              </div>
            </Link>
          </li>
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
