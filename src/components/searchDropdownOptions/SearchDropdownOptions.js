import React from "react";

import { Link } from "react-router-dom";

import "./SearchDropdownOptions.css";

import PropTypes from "prop-types";

function SearchDropdownOptions({
  results,
  focus,
  setFocus,
  handleInputSubmit,
  trimmedSearchTerm
}) {
  const options = results.map((result) => (
    <Link className="sr-option" to={`/${result.name}/hot`}>
      <div className="sr-option__icon"></div>
      <div className="sr-option__details">
        <div className="sr-option__name">{result.name}</div>
        <div className="sr-option__members">{result.members} members</div>
      </div>
    </Link>
  ));

  options.push(
    <div className="search-option" onClick={handleInputSubmit}>
      <div className="search-option__icon"></div>
      Search posts for "{trimmedSearchTerm}"
    </div>
  );

  return options.map((option, index) => (
    <li
      key={index}
      className={`option ${index === focus && "option--focused"}`}
      onMouseEnter={() => setFocus(index)}
      onMouseLeave={() => setFocus(null)}
    >
      {option}
    </li>
  ));
}

SearchDropdownOptions.propTypes = {
  results: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  focus: PropTypes.number,
  setFocus: PropTypes.func.isRequired,
  handleInputSubmit: PropTypes.func.isRequired,
  trimmedSearchTerm: PropTypes.string.isRequired
};

export default SearchDropdownOptions;
