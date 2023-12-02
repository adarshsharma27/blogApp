import React from "react";
import FeaturedBlog from "./FeaturedBlog";
import Hero from "./Hero";
import TrendingBlog from "./TrendingBlog";
import AllStories from "./AllStories";

const Home = () => {
  return (
    <>
      <Hero
        title="Before they sold out"
        imageUrl="../images/header.svg"
        description=" Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray."
              padding={16}
      />
      <FeaturedBlog />
      <TrendingBlog />
      <AllStories />
    </>
  );
};

export default Home;
