const getPostHotness = (post) => {
  const postData = post.data;

  const abScore = Math.abs(postData.score);
  const sign = postData.score / abScore;

  const hotness = Math.log10(abScore) + sign * (postData.created / 45000);

  return hotness;
};

const sortAndSelectByHotness = (posts, numPostsRequired) => {
  const sortedPosts = posts.toSorted(
    (a, b) => getPostHotness(b) - getPostHotness(a)
  );

  return sortedPosts.slice(0, numPostsRequired);
};

export default sortAndSelectByHotness;
