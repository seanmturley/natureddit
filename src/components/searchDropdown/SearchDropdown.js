import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import useKeyPress from "../../utils/useKeyPress";

import { useGetSubredditsQuery } from "../../services/redditApi";

import SearchDropdownOption from "../searchDropdownOption/SearchDropdownOption";

import { PiMagnifyingGlass } from "react-icons/pi";

import "./SearchDropdown.css";

import PropTypes from "prop-types";

function SearchDropdown({ handleInputSubmit, searchInput, trimmedSearchTerm }) {
  const [focus, setFocus] = useState(null);

  const { data } = useGetSubredditsQuery(trimmedSearchTerm);

  const downPress = useKeyPress("ArrowDown", searchInput, focus);
  useEffect(() => {
    if (data && downPress) {
      setFocus((prevState) => {
        if (prevState === null) return 0;
        return prevState < data.length ? prevState + 1 : prevState;
      });
    }
  }, [downPress, data]);

  const upPress = useKeyPress("ArrowUp", searchInput, focus);
  useEffect(() => {
    if (data && upPress) {
      setFocus((prevState) => (prevState ? prevState - 1 : null));
    }
  }, [upPress, data]);

  const enterPress = useKeyPress("Enter", searchInput, focus);
  const navigate = useNavigate();
  useEffect(() => {
    if (data && focus !== null && enterPress) {
      if (focus === data.length) {
        handleInputSubmit();
      } else {
        navigate(`${data[focus]?.data.url}hot`);
        searchInput.current.blur();
      }
    }
  }, [data, enterPress, focus, handleInputSubmit, navigate, searchInput]);

  return (
    <div className="search-dropdown">
      <ul className="search-dropdown__options">
        {data.map((subreddit, index) => (
          <li
            key={index}
            className={`option${index === focus ? " option--focused" : ""}`}
            onMouseEnter={() => setFocus(index)}
            onMouseLeave={() => setFocus(null)}
          >
            <SearchDropdownOption
              key={subreddit.data.id}
              searchInput={searchInput}
              subreddit={subreddit.data}
            />
          </li>
        ))}
        <li
          className={`option${data.length === focus ? " option--focused" : ""}`}
        >
          <div
            className="search-option"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleInputSubmit}
          >
            <PiMagnifyingGlass className="search-option__icon" />
            Search posts for "{trimmedSearchTerm}"
          </div>
        </li>
      </ul>
    </div>
  );
}

SearchDropdown.propTypes = {
  handleInputSubmit: PropTypes.func.isRequired,
  searchInput: PropTypes.object.isRequired,
  trimmedSearchTerm: PropTypes.string.isRequired
};

export default SearchDropdown;
