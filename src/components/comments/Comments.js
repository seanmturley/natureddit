import React from "react";

import Comment from "../comment/Comment";

import "./Comments.css";

import PropTypes from "prop-types";

function Comments({ comments }) {
  return (
    <ul className="comments__list">
      {comments.map((comment) => (
        <Comment key={comment.data.id} comment={comment.data} />
      ))}
    </ul>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Comments;
