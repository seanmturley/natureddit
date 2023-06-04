import React from "react";

import { Link } from "react-router-dom";

import { useGetSubredditsQuery } from "../../services/redditApi";

import formatNumber from "../../utils/numberFormatting";

import { ReactComponent as DefaultSubredditIcon } from "../../assets/defaultSubredditIcon.svg";
import "./SearchDropdownOptions.css";

import PropTypes from "prop-types";

function SearchDropdownOptions({
  focus,
  setFocus,
  handleInputSubmit,
  trimmedSearchTerm
}) {
  const { data } = useGetSubredditsQuery(trimmedSearchTerm);

  const options = data.map((subreddit) => (
    <Link className="sr-option" to={subreddit.data.url}>
      {subreddit.data.icon_img ? (
        <img className="sr-option__icon" src={subreddit.data.icon_img} alt="" />
      ) : (
        <DefaultSubredditIcon className="sr-option__icon" />
      )}

      <div className="sr-option__details">
        <div className="sr-option__name">
          {subreddit.data.display_name_prefixed}
        </div>
        <div className="sr-option__members">
          {formatNumber(subreddit.data.subscribers)} members
        </div>
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
  focus: PropTypes.number,
  setFocus: PropTypes.func.isRequired,
  handleInputSubmit: PropTypes.func.isRequired,
  trimmedSearchTerm: PropTypes.string.isRequired
};

export default SearchDropdownOptions;
