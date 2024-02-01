// This is the recommended way to decode HTML entities in a manner
// that's robust to XSS attacks.
// Taken from: https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript/34064434#34064434

const htmlDecode = (encodedString) => {
  const doc = new DOMParser().parseFromString(encodedString, "text/html");

  return doc.documentElement.textContent;
};

export default htmlDecode;
