const copyShareLink = async (relativeLink) => {
  await navigator.clipboard.writeText(
    `${document.location.host}${relativeLink}`
  );
};

export default copyShareLink;
