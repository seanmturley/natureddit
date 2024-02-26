import React from "react";

import "./Gallery.css";

import PropTypes from "prop-types";

function Gallery({ images, altText }) {
  return (
    <div className="gallery">
      <ul className="gallery__list">
        {images.map((image, index) => (
          <li key={image.id} className="gallery__item">
            <img
              className="gallery__image"
              src={image.url.large}
              alt={`${altText} (${index + 1} of ${images.length})`}
            />
          </li>
        ))}
      </ul>
      <button className="gallery__previous">previous</button>
      <button className="gallery__next">next</button>
    </div>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  altText: PropTypes.string.isRequired
};

export default Gallery;
