import decodeHtmlEntity from "./htmlEntityDecoding";

const getMediaUrls = (post) => {
  if (Object.hasOwn(post, "preview")) {
    // If the post has a "normal" image

    return {
      mediaType: "image",
      image: getImageUrl(post.preview.images[0].resolutions)
    };
  }

  if (Object.hasOwn(post, "gallery_data")) {
    // If the post has a gallery of images

    const galleryImages = [];

    // Loop through gallery image arrays
    for (const galleryItem of post.gallery_data.items) {
      galleryImages.push(
        getImageUrl(post.media_metadata[galleryItem.media_id].p, "gallery")
      );
    }

    return {
      mediaType: "gallery",
      galleryImages
    };
  }

  // If a supported media type isn't found, do nothing
  return null;
};

const getImageUrl = (imageArray, mediaType = null) => {
  const urlKey = mediaType === "gallery" ? "u" : "url";

  // The index of the last image in the "resolutions" array is the highest downsampled resolution available
  const maxResIndex = imageArray.length - 1;

  // The maximum available downsampled resolution image, used as a fallback if the desired size isn't provided
  const maxRes = decodeHtmlEntity(imageArray[maxResIndex][urlKey]);

  const imageUrl = {
    small: maxResIndex >= 2 ? decodeHtmlEntity(imageArray[2][urlKey]) : maxRes,
    medium: maxResIndex >= 3 ? decodeHtmlEntity(imageArray[3][urlKey]) : maxRes,
    large: maxResIndex >= 4 ? decodeHtmlEntity(imageArray[4][urlKey]) : maxRes
  };

  return imageUrl;
};
export default getMediaUrls;
