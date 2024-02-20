import React from "react";

import PropTypes from "prop-types";

function Gallery({ images, altText }) {
  return (
    <ul>
      {images.map((image) => (
        <li>
          <img
            className="gallery__image"
            src={image.medium}
            alt={`Alt text with number in gallery e.g. "2 of 4"`}
          />
        </li>
      ))}
    </ul>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Gallery;
