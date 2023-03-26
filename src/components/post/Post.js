import React from "react";

import { useLoaderData } from "react-router-dom";

import { useGetPostQuery } from "../../services/redditApi";

function Post() {
  const query = useLoaderData();

  const { data } = useGetPostQuery(query);

  console.log(data);

  return <h1>Post</h1>;
}

export default Post;
