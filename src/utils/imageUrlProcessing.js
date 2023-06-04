const getImageUrl = (post) => {
  // If no image
  if (!Object.hasOwn(post, "preview")) return null;

  // The index of the last image in the "resolutions" array is the highest downsampled resolution available
  const maxResIndex = post.preview.images[0].resolutions.length - 1;

  // The maximum available downsampled resolution image, used as a fallback if the desired size isn't provided
  const maxRes = decodeHtmlEntity(
    post.preview.images[0].resolutions[maxResIndex].url
  );

  const imageUrl = {
    small:
      maxResIndex >= 2
        ? decodeHtmlEntity(post.preview.images[0].resolutions[2].url)
        : maxRes,
    medium:
      maxResIndex >= 3
        ? decodeHtmlEntity(post.preview.images[0].resolutions[3].url)
        : maxRes,
    large:
      maxResIndex >= 4
        ? decodeHtmlEntity(post.preview.images[0].resolutions[4].url)
        : maxRes
  };

  return imageUrl;
};

const decodeHtmlEntity = (encodedString) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encodedString;
  return textArea.value;
};

export default getImageUrl;