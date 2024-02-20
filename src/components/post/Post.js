import React from "react";

import { Link, useLoaderData, useNavigate } from "react-router-dom";

import { useGetPostQuery } from "../../services/redditApi";

import ReactMarkdown from "react-markdown";

import Media from "../media/Media";
import ScoreDisplay from "../scoreDisplay/ScoreDisplay";
import ShareButton from "../shareButton/ShareButton";
import Comments from "../comments/Comments";

import formatAge from "../../utils/ageFormatting";
import formatNumber from "../../utils/numberFormatting";
import getMedia from "../../utils/mediaProcessing";
import decodeHtmlEntity from "../../utils/htmlEntityDecoding";

import { PiChats, PiRedditLogo } from "react-icons/pi";

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
  const media = getMedia(post);
  const title = decodeHtmlEntity(post.title);

  const isModal = modal ? " post-container--modal" : "";

  return (
    <>
      {modal && <div className="overlay" onClick={() => navigate(-1)}></div>}
      <div className={`post-container${isModal}`}>
        <section className="post">
          {media && (
            <div className="post__image-container">
              <Media
                media={media}
                context="post"
                subreddit={post.subreddit_name_prefixed}
                title={title}
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
            <h1 className="post__title">{title}</h1>
            {post.selftext && (
              <div className="post__text">
                <ReactMarkdown>{post.selftext}</ReactMarkdown>
              </div>
            )}
            <div className="post__stats-and-cta">
              <ScoreDisplay score={post.score} />
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
              <ShareButton relativeLink={post.permalink} />
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
