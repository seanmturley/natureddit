import React from "react";

import Gallery from "../gallery/Gallery";

import PropTypes from "prop-types";

function Media({ media }) {
  if (media.mediaType === "image") {
    return (
      // Image class, size, subreddit name, and title can
      // all be provided by useContext that wraps the Media
      // component
      <img
        className="context__image"
        src={media.image.medium}
        alt={`r/subreddit - post title`}
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
