import React from "react";
import FeaturedBlog from "./FeaturedBlog";
import Hero from "./Hero";
import TrendingBlog from "./TrendingBlog";
import AllStories from "./AllStories";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedBlog />
      <TrendingBlog />
      <AllStories />
    </>
  );
};

export default Home;
