import basename from "./baseName";

const extractPaths = (pathname) => {
  // The start of the pathname can be removed as it doesn't
  // participate in the API query i.e. the basename (possibly
  // followed by "fullpage/" or "modal/").
  const re = new RegExp(`^${basename}/(?:fullpage/|modal/)?`, "gi");
  const truncatedPathname = pathname.replace(re, "");

  // When the pathname starts with the basename directly
  // followed by "fullpage/" or "modal/", the pathname
  // doesn't need to be divided into background and modal
  // queries.

  // The cardsPath (i.e. background) is an empty string,
  // and the postPath is simply the truncatedPathname.
  if (
    pathname.startsWith(`${basename}/fullpage/`) ||
    pathname.startsWith(`${basename}/modal/`)
  ) {
    return {
      cardsPath: "",
      postPath: truncatedPathname
    };
  }

  // Otherwise, it is necessary to extract background and
  // modal query paths from the pathname.

  // The "/modal/" in the path effectively divides it in two:

  // Before "/modal/" is the path for fetching cards i.e.
  // the background of the modal.

  // After "/modal/" is the path for the post itself i.e.
  // the data presented in the modal.
  const paths = truncatedPathname.split("/modal/");
  return {
    cardsPath: paths[0],
    postPath: paths[1]
  };
};

export default extractPaths;
