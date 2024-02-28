import React, { useState } from "react";

import "./Gallery.css";

import PropTypes from "prop-types";

function Gallery({ images, altText }) {
  const [focusedItem, setFocusedItem] = useState(0);

  const isFocused = (index) => {
    return index === focusedItem ? "focused" : "hidden";
  };

  const prevItem = () => {
    setFocusedItem((index) => index - 1);
  };

  const nextItem = () => {
    setFocusedItem((index) => index + 1);
  };

  return (
    <div className="gallery">
      <ul className="gallery__list">
        {images.map((image, index) => (
          <li key={image.id} className={`gallery__item ${isFocused(index)}`}>
            <img
              className="gallery__image"
              src={image.url.large}
              alt={`${altText} (${index + 1} of ${images.length})`}
            />
          </li>
        ))}
      </ul>
      <button className="gallery__previous" onClick={prevItem}>
        previous
      </button>
      <button className="gallery__next" onClick={nextItem}>
        next
      </button>
    </div>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  altText: PropTypes.string.isRequired
};

export default Gallery;
