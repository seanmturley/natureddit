import React from "react";

import formatNumber from "../../utils/numberFormatting";

import { PiArrowsDownUpFill } from "react-icons/pi";

import "./ScoreDisplay.css";

import PropTypes from "prop-types";

function ScoreDisplay({ score }) {
  const formattedScore = formatNumber(score);

  return (
    <div className="score">
      <PiArrowsDownUpFill className="score__icon" />
      {formattedScore}
    </div>
  );
}

ScoreDisplay.propTypes = {
  score: PropTypes.number.isRequired
};

export default ScoreDisplay;
