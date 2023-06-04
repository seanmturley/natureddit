import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import useKeyPress from "../../utils/useKeyPress";

import { useGetSubredditsQuery } from "../../services/redditApi";

import SearchDropdownOptions from "../searchDropdownOptions/SearchDropdownOptions";

import "./SearchDropdown.css";

import PropTypes from "prop-types";

function SearchDropdown({ searchInput, handleInputSubmit, trimmedSearchTerm }) {
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
      }
    }
  }, [enterPress, data, focus, handleInputSubmit, navigate]);

  return (
    <div className="search-dropdown">
      <ul className="search-dropdown__options">
        <SearchDropdownOptions
          data={data}
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
