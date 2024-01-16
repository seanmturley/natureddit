import React from "react";

import copyShareLink from "../../utils/copyShareLink";

import { IoArrowRedoOutline } from "react-icons/io5";

import "./ShareButton.css";

import PropTypes from "prop-types";

function ShareButton({ relativeLink }) {
  const shareOnClick = async () => {
    await copyShareLink(relativeLink);
  };

  return (
    <button type="button" className="share" onClick={shareOnClick}>
      <IoArrowRedoOutline className="share__icon" /> share
    </button>
  );
}

ShareButton.propTypes = {
  relativeLink: PropTypes.string.isRequired
};

export default ShareButton;
