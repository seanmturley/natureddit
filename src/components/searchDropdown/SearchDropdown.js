import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useKeyPress from "../../utils/useKeyPress";

import "./SearchDropdown.css";

const results = [
  { name: "r/PATH", members: "124" },
  { name: "r/pathofexile", members: "533k" },
  { name: "r/Pathfinder_RPG", members: "141k" }
];

function SearchDropdown({ searchInput }) {
  const [focus, setFocus] = useState(0);

  const downPress = useKeyPress("ArrowDown", searchInput);
  const upPress = useKeyPress("ArrowUp", searchInput);

  useEffect(() => {
    if (results.length && downPress) {
      setFocus((prevState) =>
        prevState < results.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (results.length && upPress) {
      setFocus((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  return (
    <div className="search-dropdown">
      <section className="search-dropdown__subreddits">
        <h1 className="search-dropdown__subreddits-heading">Subreddits</h1>
        {results.map((result, index) => (
          <Link
            className={`subreddit ${index === focus && "subreddit--focused"}`}
            to={`../${result.name}/hot`}
            key={index}
          >
            <div className="subreddit__icon"></div>
            <div className="subreddit__details">
              <div className="subreddit__name">{result.name}</div>
              <div className="subreddit__members">{result.members} members</div>
            </div>
          </Link>
        ))}
      </section>
      <section className="search-dropdown__search">
        <div className="search-dropdown__magnifying-glass"></div>
        Search posts for "term"
      </section>
    </div>
  );
}

export default SearchDropdown;
