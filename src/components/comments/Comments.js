import React from "react";

import Comment from "../comment/Comment";

import "./Comments.css";

import PropTypes from "prop-types";

function Comments({ comments, depth = 0 }) {
  const isReply = depth > 0 ? "reply" : "new";

  return (
    <ul className={`comments__list comments__list--${isReply}`}>
      {comments.map((comment) => (
        <Comment key={comment.data.id} comment={comment.data} />
      ))}
    </ul>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  depth: PropTypes.number
};

export default Comments;
