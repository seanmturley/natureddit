import React from "react";

import LeafLogo from "../../assets/LeafLogo";

import "./LoadingSplash.css";

function LoadingSplash() {
  return (
    <div className="loading-splash">
      <div className="loader"></div>
      <LeafLogo />
    </div>
  );
}

export default LoadingSplash;
