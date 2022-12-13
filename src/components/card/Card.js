import React from "react";

function Card() {
  const card = {
    url:
      "https://www.reddit.com/r/natureporn/comments/zl5p2t/the_aleutian_islands_look_like_ireland/", // "permalink"
    image: "https://i.redd.it/rzwjiu2rlr5a1.jpg", // "url"
    subreddit: "r/natureporn", // subreddit_name_prefixed
    age: "3 hours", // "created" gives the Unix time e.g. 1670962613
    title: "The Aleutian Islands look like Ireland",
    num_comments: 3,
    upvotes: 101 // score
  };

  return (
    <article className="card">
      <img
        className="card__image"
        src={card.image}
        alt={`${card.subreddit} - ${card.title}`}
      ></img>
      <section className="card__text">
        <div className="card__details">
          Posted in <span className="card__subreddit">{card.subreddit}</span>{" "}
          <span className="card__age">{card.age}</span> ago
        </div>
        <h1 className="card__title">{card.title}</h1>
        <div>
          <div className="card__comments">{`${card.num_comments} comments`}</div>
          <div className="card__upvotes">{`${card.upvotes} upvotes`}</div>
        </div>
      </section>
    </article>
  );
}

export default Card;
