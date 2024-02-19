import React from "react";

import Gallery from "../gallery/Gallery";

import PropTypes from "prop-types";

function Media({ media, context, size, subreddit, title }) {
  if (media.mediaType === "image") {
    return (
      <img
        className={`${context}__image`}
        src={media.image[size]}
        alt={`${subreddit} - ${title}`}
      />
    );
  }

  if (media.mediaType === "gallery") {
    return <Gallery images={media.galleryImages} />;
  }
}

Media.propTypes = {
  media: PropTypes.object.isRequired,
  context: PropTypes.oneOf(["card", "post"]).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
  subreddit: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Media;
