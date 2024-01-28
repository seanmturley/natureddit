const getPostHotness = (post) => {
  const postData = post.data;

  const abScore = Math.abs(postData.score);
  const sign = postData.score / abScore;

  // Official Reddit "hotness" algorithm
  // const hotness = Math.log10(abScore) + sign * (postData.created / 45000);

  // The official "hotness" algorithm (above) strongly favours
  // larger and more active subreddits, which is not ideal when
  // attempting to present a mixture of subreddits with very
  // different subscriber counts. The modified hotness formula
  // below makes a few changes:
  // 1. Properly handles negative scores
  // 2. Normalizes score by the log of the subscriber count
  // 3. De-emphasizes the importantance of recency

  const recencyWeighting = 0.01;
  const modifiedHotness =
    (sign * Math.log10(abScore)) / Math.log10(postData.subreddit_subscribers) +
    (recencyWeighting * postData.created) / 45000;

  return modifiedHotness;
};

const sortAndSelectByHotness = (posts, numPostsRequired) => {
  const sortedPosts = posts.toSorted(
    (a, b) => getPostHotness(b) - getPostHotness(a)
  );

  return sortedPosts.slice(0, numPostsRequired);
};

export default sortAndSelectByHotness;
