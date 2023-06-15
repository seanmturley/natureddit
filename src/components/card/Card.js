import React from "react";

import { Link, useLocation, useParams } from "react-router-dom";

import formatAge from "../../utils/ageFormatting";
import formatNumber from "../../utils/numberFormatting";
import getImageUrl from "../../utils/imageUrlProcessing";

import "./Card.css";

import PropTypes from "prop-types";

function Card({ card }) {
  const { subreddit } = useParams();
  const { search } = useLocation();

  const age = formatAge(card.created);
  const formattedNumComments = formatNumber(card.num_comments);
  const formattedScore = formatNumber(card.score);
  const imageUrl = getImageUrl(card);

  let authorOrSubreddit;
  if (subreddit) {
    authorOrSubreddit = (
      <>
        Posted by <span className="card__author">u/{card.author}</span>
      </>
    );
  } else {
    authorOrSubreddit = (
      <>
        Posted in{" "}
        <Link
          className="card__subreddit"
          to={`/${card.subreddit_name_prefixed}/hot`}
        >
          {card.subreddit_name_prefixed}
        </Link>
      </>
    );
  }

  return (
    <li className="card">
      {imageUrl && (
        <img
          className="card__image"
          src={imageUrl.medium}
          alt={`${card.subreddit_name_prefixed} - ${card.title}`}
        />
      )}
      <section className="card__body">
        <div className="card__details">
          {authorOrSubreddit} <span className="card__age">{age}</span> ago
        </div>
        <h1 className="card__title">
          <Link
            className="card__link"
            to={`modal${card.permalink}${search}`}
            state={{ modal: true }}
          >
            {card.title}
          </Link>
        </h1>
        <div className="card__stats">
          <div className="card__comments">{`${formattedNumComments} comments`}</div>
          <div className="card__upvotes">{`${formattedScore} upvotes`}</div>
        </div>
      </section>
    </li>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
