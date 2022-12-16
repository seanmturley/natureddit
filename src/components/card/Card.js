import React from "react";

import formatAge from "../../utils/ageFormatting";

import "./Card.css";

function Card() {
  // Static post details
  const card = {
    id: "zl5p2t",
    url:
      "https://www.reddit.com/r/natureporn/comments/zl5p2t/the_aleutian_islands_look_like_ireland/", // "permalink"
    image: "https://i.redd.it/rzwjiu2rlr5a1.jpg", // "url"
    subreddit: "r/natureporn", // subreddit_name_prefixed
    created: 1670962613, // Unix time
    title:
      "The Aleutian Islands look like Ireland Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    num_comments: 3,
    upvotes: 101 // score
  };

  card.age = formatAge(card.created);

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.image}
        alt={`${card.subreddit} - ${card.title}`}
      />
      <section className="card__text">
        <div className="card__details">
          Posted in <span className="card__subreddit">{card.subreddit}</span>{" "}
          <span className="card__age">{card.age}</span> ago
        </div>
        <h1 className="card__title">{card.title}</h1>
        <div className="card__stats">
          <div className="card__comments">{`${card.num_comments} comments`}</div>
          <div className="card__upvotes">{`${card.upvotes} upvotes`}</div>
        </div>
      </section>
    </li>
  );
}

export default Card;
