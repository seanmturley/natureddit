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
  media: PropTypes.object.isRequired
};

export default Media;
