import React from "react";

import Gallery from "../gallery/Gallery";

import PropTypes from "prop-types";

function Media({ media, context, subreddit, title }) {
  const imageSrc = media?.image || media?.galleryImages[0].url;
  const altText = `${subreddit} - ${title}`;

  if (context === "card") {
    return (
      <img className={"card__image"} src={imageSrc.medium} alt={altText} />
    );
  }

  if (context === "post") {
    if (media.mediaType === "gallery") {
      return <Gallery images={media.galleryImages} altText={altText} />;
    }

    return <img className={"post__image"} src={imageSrc.large} alt={altText} />;
  }
}

Media.propTypes = {
  media: PropTypes.object.isRequired,
  context: PropTypes.oneOf(["card", "post"]).isRequired,
  subreddit: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Media;
