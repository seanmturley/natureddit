import React from "react";

import { Link } from "react-router-dom";

import formatAge from "../../utils/ageFormatting";
import formatNumber from "../../utils/numberFormatting";
import getImageUrl from "../../utils/imageUrlProcessing";

import "./Card.css";

import PropTypes from "prop-types";

function Card({ post }) {
  const age = formatAge(post.created);
  const formattedNumComments = formatNumber(post.num_comments);
  const formattedScore = formatNumber(post.score);
  const imageUrl = getImageUrl(post);

  return (
    <li className="card">
      {imageUrl && (
        <img
          className="card__image"
          src={imageUrl.medium}
          alt={`${post.subreddit_name_prefixed} - ${post.title}`}
        />
      )}
      <section className="card__body">
        <div className="card__details">
          Posted in{" "}
          <Link
            className="card__subreddit"
            to={`../${post.subreddit_name_prefixed}/hot`}
          >
            {post.subreddit_name_prefixed}
          </Link>{" "}
          <span className="card__age">{age}</span> ago
        </div>
        <h1 className="card__title">
          <Link className="card__link" to={`..${post.permalink}`}>
            {post.title}
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
  post: PropTypes.object.isRequired
};

export default Card;
