import React from "react";

import { useParams, Link } from "react-router-dom";

import ReactMarkdown from "react-markdown";

import ScoreDisplay from "../scoreDisplay/ScoreDisplay";
import ShareButton from "../shareButton/ShareButton";
import Comments from "../comments/Comments";

import formatAge from "../../utils/ageFormatting";

import "./Comment.css";

import PropTypes from "prop-types";

function Comment({ comment }) {
  const { commentId } = useParams();

  // Gaurd clause for empty comments that crash the whole page
  if (!comment.created) return;

  const replyComments = comment.replies ? comment.replies.data.children : null;

  const age = formatAge(comment.created);

  // Replace HTML-encoded ">" symbols
  const commentText = comment.body.replace(/&gt;/g, ">");

  const isReply = comment.depth > 0 ? "reply" : "new";

  const commentStatus = commentId === comment.id ? "selected" : "normal";

  const replyDepthLimitReached = comment.depth === 4;

  return (
    <li className={`comment comment--${isReply}`}>
      <div
        className={`comment__container comment__container--${commentStatus}`}
      >
        <div className="comment__details">
          <div className="comment__author">{comment.author}</div>
          {comment.distinguished === "moderator" && (
            <div className="comment__mod">MOD</div>
          )}
          {comment.is_submitter && <div className="comment__op">OP</div>}
          <div className="comment__age">{age}</div>
          {comment.stickied && (
            <div className="comment__stickied">Stickied</div>
          )}
        </div>
        <div className="comment__body">
          <div className="comment__text">
            <ReactMarkdown>{commentText}</ReactMarkdown>
          </div>
          <div className="comment__stats-and-cta">
            {!comment.score_hidden && <ScoreDisplay score={comment.score} />}
            <ShareButton relativeLink={comment.permalink} />
          </div>
          {replyDepthLimitReached && replyComments && (
            <div className="comment__view-replies-container">
              <Link
                className="comment__view-replies-link"
                to={`../fullpage/${comment.permalink}`}
              >
                View replies
              </Link>
            </div>
          )}
        </div>
      </div>
      {replyComments && !replyDepthLimitReached && (
        <Comments comments={replyComments} depth={comment.depth + 1} />
      )}
    </li>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;
