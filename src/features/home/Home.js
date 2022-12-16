import React from "react";

import Card from "../../components/card/Card";
import Posts from "../posts/Posts";

import "./Home.css";

function Home() {
  return (
    <section className="home">
      <Posts />
    </section>
  );
}

export default Home;
