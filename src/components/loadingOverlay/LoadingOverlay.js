import React from "react";

import LeafLogo from "../../assets/LeafLogo";

import "./LoadingOverlay.css";

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loader"></div>
      <LeafLogo />
    </div>
  );
}

export default LoadingOverlay;
