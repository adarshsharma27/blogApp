import React, { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { databases, Query } from "../config";
import conf from "../conf/conf";
import Skeleton from "./Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { useTranslation } from "react-i18next";
const TrendingBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const {t}=useTranslation();
  const arrowRef = useRef();
  var settings = {
    infinite: true,
    speed: 650,
    autoplay: true,
    autoplaySpeed: 2800,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const promise = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId,
          [Query.equal("category", "trending")]
        );
        setBlogs(promise?.documents);
      } catch (error) {}
    };
    getBlogs();
  }, []);
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded">
              <div className="w-24 h-full bg-purple-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl mb-2 sm:mb-0 dark:text-gray-400">
              {t('heroSection.Trending Blog')}
              </h1>
              <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0 dark:text-white">
              {t('heroSection.Trending Blog Description')}
              </p>
            </div>
          </div>
          <div className="relative">
            <Slider {...settings} className="pb-4" ref={arrowRef}>
              {blogs?.length === 0
                ? Array.from({ length: 10 }).map(() => <Skeleton />)
                : blogs?.map((blog) => {
                    const {
                      title,
                      category,
                      description,
                      $id,
                      imageUrl,
                      userId,
                      date
                    } = blog;
                    return (
                      <BlogCard
                        key={$id}
                        title={title}
                        category={category}
                        description={description}
                        $id={$id}
                        imageUrl={imageUrl}
                        user_Id={userId}
                        date={date}
                        marginTrendingSlider={8}
                      />
                    );
                  })}
            </Slider>
            <button className="button hidden md:block">
              <LuChevronLeft
                size={45}
                className="absolute left-0 bottom-[-50px] p-1 rounded-lg bg-indigo-500  text-white transition hover:scale-110 hover:shadow-xl focus:outline-none"
                onClick={() => {
                  arrowRef.current.slickPrev();
                }}
              />
            </button>
            <button className="button hidden md:block">
              <LuChevronRight
                size={45}
                className="absolute right-0 bottom-[-50px] p-1 rounded-lg bg-indigo-500 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none"
                onClick={() => {
                  arrowRef.current.slickNext();
                }}
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingBlog;
