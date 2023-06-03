import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import useKeyPress from "../../utils/useKeyPress";

import "./SearchDropdown.css";
import SearchDropdownOptions from "../searchDropdownOptions/SearchDropdownOptions";

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
      <h1 className="search-dropdown__sr-heading">Subreddits</h1>
      <ul className="search-dropdown__options">
        <SearchDropdownOptions
          focus={focus}
          handleInputSubmit={handleInputSubmit}
          results={results}
        />
      </ul>
    </div>
  );
}

export default SearchDropdown;
