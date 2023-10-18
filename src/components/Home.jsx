import React from "react";
import FeaturedBlog from "./FeaturedBlog";
import Hero from "./Hero";
import TrendingBlog from "./TrendingBlog";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedBlog />
      <TrendingBlog />
      <FeaturedBlog />
    </>
  );
};

export default Home;
