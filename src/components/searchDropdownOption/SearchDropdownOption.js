import React from "react";

import { Link } from "react-router-dom";

import formatNumber from "../../utils/numberFormatting";

import { ReactComponent as DefaultSubredditIcon } from "../../assets/defaultSubredditIcon.svg";
import "./SearchDropdownOption.css";

import PropTypes from "prop-types";

function SearchDropdownOption({ searchInput, subreddit }) {
  const formattedSubscribers = formatNumber(subreddit.subscribers);

  return (
    <Link
      className="sr-option"
      to={`${subreddit.url}hot`}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => searchInput.current.blur()}
    >
      {subreddit.icon_img ? (
        <img className="sr-option__icon" src={subreddit.icon_img} alt="" />
      ) : (
        <DefaultSubredditIcon className="sr-option__icon" alt="" />
      )}
      <div className="sr-option__details">
        <div className="sr-option__name">{subreddit.display_name_prefixed}</div>
        <div className="sr-option__members">{formattedSubscribers} members</div>
      </div>
    </Link>
  );
}

SearchDropdownOption.propTypes = {
  searchInput: PropTypes.object.isRequired,
  subreddit: PropTypes.object.isRequired
};

export default SearchDropdownOption;
