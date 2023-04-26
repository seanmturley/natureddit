import basename from "./baseName";

const copyShareLink = async (relativeLink) => {
  await navigator.clipboard.writeText(
    `${document.location.host}${basename}/fullpage${relativeLink}`
  );
};

export default copyShareLink;
