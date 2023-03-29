import React from "react";

import ReactMarkdown from "react-markdown";

import formatAge from "../../utils/ageFormatting";
import formatNumber from "../../utils/numberFormatting";
import copyShareLink from "../../utils/copyShareLink";

function Comment({ comment }) {
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
        <span className="comment__author">{comment.author}</span>
        {comment.distinguished === "moderator" && (
          <>
            <span className="comment__mod">MOD</span>{" "}
          </>
        )}
        {comment.is_submitter && (
          <>
            <span className="comment__op">OP</span>{" "}
          </>
        )}
        <span> · </span>
        <span className="comment__age">{age}</span> ago
        {comment.stickied && (
          <>
            <span> · </span>
            <span className="comment__mod">Stickied</span>{" "}
          </>
        )}
      </div>
      <div className="comment__text">
        <ReactMarkdown>{commentText}</ReactMarkdown>
      </div>
      <div className="comment__stats-and-cta">
        <div className="comment__score">{`${formattedScore} upvotes`}</div>
        <button type="button" className="comment__share" onClick={shareOnClick}>
          share
        </button>
      </div>
    </li>
  );
}

export default Comment;
