import React from "react";

import Gallery from "../gallery/Gallery";

import PropTypes from "prop-types";

function Media({ media }) {
  if (media.mediaType === "image") {
    // return <Image image={media.image} />;
  }

  if (media.mediaType === "gallery") {
    return <Gallery images={media.galleryImages} />;
  }
}

Media.propTypes = {
  media: PropTypes.object.isRequired
};

export default Media;
