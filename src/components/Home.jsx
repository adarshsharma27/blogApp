import React from "react";
import FeaturedBlog from "./FeaturedBlog";
import Hero from "./Hero";
import TrendingBlog from "./TrendingBlog";
import AllStories from "./AllStories";
import { useTranslation } from "react-i18next";

const Home = () => {
  const{t}=useTranslation();
  return (
    <>
      <Hero
        title={t('heroSection.heroSectionTitle')}
        imageUrl="../images/header.svg"
        description={t('heroSection.heroSectionDescription')}
              padding={24}
      />
      <FeaturedBlog />
      <TrendingBlog />
      <AllStories />
    </>
  );
};

export default Home;
