import React from "react";

import LeafLogo from "../../assets/LeafLogo";

import "./LoadingOverlay.css";

import PropTypes from "prop-types";

function LoadingOverlay({ loadingType }) {
  return (
    <div className={`loading-overlay loading-overlay--${loadingType}`}>
      <div className="loader"></div>
      <LeafLogo />
    </div>
  );
}

LoadingOverlay.propTypes = {
  loadingType: PropTypes.oneOf(["load", "nav"]).isRequired
};

export default LoadingOverlay;
