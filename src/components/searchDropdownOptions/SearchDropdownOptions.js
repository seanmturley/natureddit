import React from "react";

import { Link } from "react-router-dom";

import "./SearchDropdownOptions.css";

function SearchDropdownOptions({ focus, handleInputSubmit, results }) {
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
      Search posts for "term"
    </div>
  );

  return options.map((option, index) => (
    <li
      key={index}
      className={`option ${index === focus - 1 && "option--focused"}`}
    >
      {option}
    </li>
  ));
}

export default SearchDropdownOptions;
