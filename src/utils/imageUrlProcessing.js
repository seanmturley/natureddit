import decodeHtmlEntity from "./htmlEntityDecoding";

const getMediaUrls = (post) => {
  // This will be the default export from this file
  // It will return URLs for supported media types
  if (Object.hasOwn(post, "preview")) {
    // Run getImageUrl minus the guard clause
    // return a single image URL
  }

  if (Object.hasOwn(post, "gallery_data")) {
    // Extract gallery image URLs
    // Should be similar logic to existing getImageUrl
    // return object describing media type and an
    // array of image URLs for the gallery
  }

  // If a supported media type isn't found, do nothing
  return null;
};

const getImageUrl = (post) => {
  // If no image
  if (!Object.hasOwn(post, "preview")) return null;

  const images = post.preview.images[0].resolutions;

  // The index of the last image in the "resolutions" array is the highest downsampled resolution available
  const maxResIndex = images.length - 1;

  // The maximum available downsampled resolution image, used as a fallback if the desired size isn't provided
  const maxRes = decodeHtmlEntity(images[maxResIndex].url);

  const imageUrl = {
    small: maxResIndex >= 2 ? decodeHtmlEntity(images[2].url) : maxRes,
    medium: maxResIndex >= 3 ? decodeHtmlEntity(images[3].url) : maxRes,
    large: maxResIndex >= 4 ? decodeHtmlEntity(images[4].url) : maxRes
  };

  return imageUrl;
};

export default getImageUrl;
