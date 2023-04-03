// Sets the basename for the URL path throughout the app
// e.g. "[origin]/[basename]/r/:subreddit/:sortFilter"

// This is necessary for React Router to route correctly on
// GitHub Pages where the app is hosted in a subdirectory
// rather than the root of the domain i.e.:
// https://seanmturley.github.io/natureddit/

const basename = "/natureddit";

export default basename;
