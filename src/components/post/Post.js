import React from "react";

import { useLoaderData } from "react-router-dom";

import { useGetPostQuery } from "../../services/redditApi";

import ReactMarkdown from "react-markdown";

import formatAge from "../../utils/ageFormatting";
import formatNumber from "../../utils/numberFormatting";
import getImageUrl from "../../utils/imageUrlProcessing";

function Post() {
  const query = useLoaderData();

  const { data } = useGetPostQuery(query);
  const post = data.post;

  const age = formatAge(post.created);
  const formattedNumComments = formatNumber(post.num_comments);
  const formattedScore = formatNumber(post.score);
  const imageUrl = getImageUrl(post);

  return (
    <div className="post-container">
      <div className="post">
        {imageUrl && (
          <img
            className="post__image"
            src={imageUrl.large}
            alt={`${post.subreddit_name_prefixed} - ${post.title}`}
          />
        )}
        <section>
          <div className="post__details">
            Posted in{" "}
            <span className="post__subreddit">
              {post.subreddit_name_prefixed}
            </span>{" "}
            by <span>{post.author}</span>{" "}
            <span className="post__age">{age}</span> ago
          </div>
          <h1 className="post__title">{post.title}</h1>
          <div className="post__text">
            <ReactMarkdown>{post.selftext}</ReactMarkdown>
          </div>
          <div className="post__stats">
            <div className="post__comments">{`${formattedNumComments} comments`}</div>
            <div className="post__upvotes">{`${formattedScore} upvotes`}</div>
            <div className="post__share">share</div>
          </div>
        </section>
      </div>
      {/* Render Comments */}
    </div>
  );
}

export default Post;
