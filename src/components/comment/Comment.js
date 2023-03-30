import React from "react";

import ReactMarkdown from "react-markdown";

import Comments from "../comments/Comments";

import formatAge from "../../utils/ageFormatting";
import formatNumber from "../../utils/numberFormatting";
import copyShareLink from "../../utils/copyShareLink";

import "./Comment.css";

import PropTypes from "prop-types";

function Comment({ comment }) {
  const replyComments = comment.replies ? comment.replies.data.children : null;

  const age = formatAge(comment.created);
  const formattedScore = formatNumber(comment.score);

  // Replace HTML-encoded ">" symbols
  const commentText = comment.body.replace(/&gt;/g, ">");

  const shareOnClick = async () => {
    await copyShareLink(comment.permalink);
  };

  return (
    <li className="comment">
      <div className="comment__details">
        <div className="comment__author">{comment.author}</div>
        {comment.distinguished === "moderator" && (
          <div className="comment__mod">MOD</div>
        )}
        {comment.is_submitter && <div className="comment__op">OP</div>}
        <div className="comment__age">{age} ago</div>
        {comment.stickied && <div className="comment__mod">Stickied</div>}
      </div>
      <div className="comment__body">
        <div className="comment__text">
          <ReactMarkdown>{commentText}</ReactMarkdown>
        </div>
        <div className="comment__stats-and-cta">
          <div className="comment__score">{`${formattedScore} upvotes`}</div>
          <button
            type="button"
            className="comment__share"
            onClick={shareOnClick}
          >
            share
          </button>
        </div>
        {replyComments && <Comments comments={replyComments} />}
      </div>
    </li>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;
