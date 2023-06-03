import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useKeyPress from "../../utils/useKeyPress";

import "./SearchDropdown.css";

const results = [
  { name: "r/PATH", members: "124" },
  { name: "r/pathofexile", members: "533k" },
  { name: "r/Pathfinder_RPG", members: "141k" }
];

function SearchDropdown({ searchInput, handleInputSubmit }) {
  const [focus, setFocus] = useState(0);

  const downPress = useKeyPress("ArrowDown", searchInput, focus);
  useEffect(() => {
    if (results.length && downPress) {
      setFocus((prevState) => {
        return prevState < results.length + 1 ? prevState + 1 : prevState;
      });
    }
  }, [downPress]);

  const upPress = useKeyPress("ArrowUp", searchInput, focus);
  useEffect(() => {
    if (results.length && upPress) {
      setFocus((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  const enterPress = useKeyPress("Enter", searchInput, focus);
  const navigate = useNavigate();
  useEffect(() => {
    if (results.length && focus && enterPress) {
      if (focus === results.length + 1) {
        handleInputSubmit();
      } else {
        navigate(`/${results[focus - 1].name}/hot`);
      }
    }
  }, [enterPress, focus, handleInputSubmit, navigate]);

  return (
    <div className="search-dropdown">
      <section className="search-dropdown__subreddits">
        <h1 className="search-dropdown__subreddits-heading">Subreddits</h1>
        {results.map((result, index) => (
          <Link
            className={`subreddit ${
              index === focus - 1 && "subreddit--focused"
            }`}
            to={`/${result.name}/hot`}
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
      <section
        className={`search-dropdown__search ${
          focus === results.length + 1 && "search-dropdown__search--focused"
        }`}
        onClick={handleInputSubmit}
      >
        <div className="search-dropdown__magnifying-glass"></div>
        Search posts for "term"
      </section>
    </div>
  );
}

export default SearchDropdown;
