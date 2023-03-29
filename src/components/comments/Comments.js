import React from "react";

import { useLoaderData } from "react-router-dom";

import { useGetPostQuery } from "../../services/redditApi";

import Comment from "../comment/Comment";

import "./Comments.css";

function Comments() {
  const query = useLoaderData();

  const { data } = useGetPostQuery(query);
  const comments = data.comments;

  return (
    <section className="comments">
      <ul className="comments__list">
        {comments.map((comment) => (
          <Comment key={comment.data.id} comment={comment.data} />
        ))}
      </ul>
    </section>
  );
}

export default Comments;
