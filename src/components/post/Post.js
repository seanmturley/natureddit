import React from "react";

import { Link, useLoaderData } from "react-router-dom";

import { useGetPostQuery } from "../../services/redditApi";

import ReactMarkdown from "react-markdown";

import formatAge from "../../utils/ageFormatting";
import formatNumber from "../../utils/numberFormatting";
import getImageUrl from "../../utils/imageUrlProcessing";

import "./Post.css";

function Post() {
  const query = useLoaderData();

  const { data } = useGetPostQuery(query);
  const post = data.post;

  const age = formatAge(post.created);
  const formattedNumComments = formatNumber(post.num_comments);
  const formattedScore = formatNumber(post.score);
  const imageUrl = getImageUrl(post);

  const copyPostLink = async () => {
    await navigator.clipboard.writeText(document.location.href);
  };

  return (
    <div className="post-container">
      <div className="post">
        {imageUrl && (
          <div className="post__image-container">
            <img
              className="post__image"
              src={imageUrl.large}
              alt={`${post.subreddit_name_prefixed} - ${post.title}`}
            />
          </div>
        )}
        <section className="post__body">
          <div className="post__details">
            Posted in{" "}
            <Link
              className="post__subreddit"
              to={`../${post.subreddit_name_prefixed}/hot`}
            >
              {post.subreddit_name_prefixed}
            </Link>{" "}
            by <span>u/{post.author}</span>{" "}
            <span className="post__age">{age}</span> ago
          </div>
          <h1 className="post__title">{post.title}</h1>
          {post.selftext && (
            <div className="post__text">
              <ReactMarkdown>{post.selftext}</ReactMarkdown>
            </div>
          )}
          <div className="post__stats-and-cta">
            <div className="post__comments">{`${formattedNumComments} comments`}</div>
            <div className="post__upvotes">{`${formattedScore} upvotes`}</div>
            <a
              href={`https://www.reddit.com${post.permalink}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              view on Reddit
            </a>
            <button
              type="button"
              className="post__share"
              onClick={copyPostLink}
            >
              share
            </button>
          </div>
        </section>
      </div>
      {/* Render Comments */}
    </div>
  );
}

export default Post;
