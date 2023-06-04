import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import useKeyPress from "../../utils/useKeyPress";

import SearchDropdownOptions from "../searchDropdownOptions/SearchDropdownOptions";

import "./SearchDropdown.css";

import PropTypes from "prop-types";

const results = [
  { name: "r/PATH", members: "124" },
  { name: "r/pathofexile", members: "533k" },
  { name: "r/Pathfinder_RPG", members: "141k" }
];

function SearchDropdown({ searchInput, handleInputSubmit, trimmedSearchTerm }) {
  const [focus, setFocus] = useState(null);

  const downPress = useKeyPress("ArrowDown", searchInput, focus);
  useEffect(() => {
    if (results && downPress) {
      setFocus((prevState) => {
        if (prevState === null) return 0;
        return prevState < results.length ? prevState + 1 : prevState;
      });
    }
  }, [downPress]);

  const upPress = useKeyPress("ArrowUp", searchInput, focus);
  useEffect(() => {
    if (results && upPress) {
      setFocus((prevState) => (prevState ? prevState - 1 : null));
    }
  }, [upPress]);

  const enterPress = useKeyPress("Enter", searchInput, focus);
  const navigate = useNavigate();
  useEffect(() => {
    if (results && focus !== null && enterPress) {
      if (focus === results.length) {
        handleInputSubmit();
      } else {
        navigate(`/${results[focus].name}/hot`);
      }
    }
  }, [enterPress, focus, handleInputSubmit, navigate]);

  return (
    <div className="search-dropdown">
      <h1 className="search-dropdown__sr-heading">Subreddits</h1>
      <ul className="search-dropdown__options">
        <SearchDropdownOptions
          results={results}
          focus={focus}
          setFocus={setFocus}
          handleInputSubmit={handleInputSubmit}
          trimmedSearchTerm={trimmedSearchTerm}
        />
      </ul>
    </div>
  );
}

SearchDropdown.propTypes = {
  searchInput: PropTypes.object.isRequired,
  handleInputSubmit: PropTypes.func.isRequired,
  trimmedSearchTerm: PropTypes.string.isRequired
};

export default SearchDropdown;
