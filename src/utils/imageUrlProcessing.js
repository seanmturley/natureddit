const getImageUrl = (post) => {
  // If no image
  if (post.post_hint !== "image") return null;

  // This is currently hardcoded to arbitrarily choose the image resolution with width of 640px
  const encodedUrl = post.preview.images[0].resolutions[3].url;
  return decodeHtmlEntity(encodedUrl);
};

const decodeHtmlEntity = (encodedString) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encodedString;
  return textArea.value;
};

export default getImageUrl;
