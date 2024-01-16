import React from "react";

import { Link, useLoaderData, useNavigate } from "react-router-dom";

import { useGetPostQuery } from "../../services/redditApi";

import ReactMarkdown from "react-markdown";

import Comments from "../comments/Comments";

import formatAge from "../../utils/ageFormatting";
import formatNumber from "../../utils/numberFormatting";
import getImageUrl from "../../utils/imageUrlProcessing";
import copyShareLink from "../../utils/copyShareLink";

import { PiArrowsDownUpFill, PiChats, PiRedditLogo } from "react-icons/pi";
import { IoArrowRedoOutline } from "react-icons/io5";

import "./Post.css";

import PropTypes from "prop-types";

function Post({ modal }) {
  const navigate = useNavigate();
  const query = useLoaderData();

  const { data } = useGetPostQuery(query);
  const post = data.post;
  const comments = data.comments;

  const age = formatAge(post.created);
  const formattedNumComments = formatNumber(post.num_comments);
  const formattedScore = formatNumber(post.score);
  const imageUrl = getImageUrl(post);

  const shareOnClick = async () => {
    await copyShareLink(post.permalink);
  };

  const isModal = modal ? " post-container--modal" : "";

  return (
    <>
      {modal && <div className="overlay" onClick={() => navigate(-1)}></div>}
      <div className={`post-container${isModal}`}>
        <section className="post">
          {imageUrl && (
            <div className="post__image-container">
              <img
                className="post__image"
                src={imageUrl.large}
                alt={`${post.subreddit_name_prefixed} - ${post.title}`}
              />
            </div>
          )}
          <div className="post__body">
            <div className="post__details">
              Posted in{" "}
              <Link
                className="post__subreddit"
                to={`/${post.subreddit_name_prefixed}/hot`}
              >
                {post.subreddit_name_prefixed}
              </Link>{" "}
              by <span>u/{post.author}</span>{" "}
              <span className="post__age">{age}</span>
            </div>
            <h1 className="post__title">{post.title}</h1>
            {post.selftext && (
              <div className="post__text">
                <ReactMarkdown>{post.selftext}</ReactMarkdown>
              </div>
            )}
            <div className="post__stats-and-cta">
              <div className="post__score">
                <PiArrowsDownUpFill className="post__icon" />
                {formattedScore}
              </div>
              <div className="post__comments">
                <PiChats className="post__icon" /> {formattedNumComments}{" "}
                comments
              </div>

              <a
                className="post__view-on-reddit"
                href={`https://www.reddit.com${post.permalink}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <PiRedditLogo className="post__icon" /> view on Reddit
              </a>
              <button
                type="button"
                className="post__share"
                onClick={shareOnClick}
              >
                <IoArrowRedoOutline className="post__icon" /> share
              </button>
            </div>
          </div>
        </section>
        <section className="comments">
          {comments.length ? (
            <Comments comments={comments} />
          ) : (
            <div className="comments__no-comments">No comments yet</div>
          )}
        </section>
      </div>
    </>
  );
}

Post.propTypes = {
  modal: PropTypes.bool.isRequired
};

export default Post;
