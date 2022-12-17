import React from "react";

import { useSelector } from "react-redux";
import { selectPosts } from "../../features/posts/postsSlice";

import formatAge from "../../utils/ageFormatting";
import formatNumber from "../../utils/numberFormatting";

import "./Card.css";

function Card({ id }) {
  const posts = useSelector(selectPosts);
  const post = posts[id];
  const age = formatAge(post.created);
  const formattedNumComments = formatNumber(post.num_comments);
  const formattedScore = formatNumber(post.score);

  return (
    <li className="card">
      <img
        className="card__image"
        src={post.image}
        alt={`${post.subreddit} - ${post.title}`}
      />
      <section className="card__text">
        <div className="card__details">
          Posted in <span className="card__subreddit">{post.subreddit}</span>{" "}
          <span className="card__age">{age}</span> ago
        </div>
        <h1 className="card__title">{post.title}</h1>
        <div className="card__stats">
          <div className="card__comments">{`${formattedNumComments} comments`}</div>
          <div className="card__upvotes">{`${formattedScore} upvotes`}</div>
        </div>
      </section>
    </li>
  );
}

export default Card;
