import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

const Hero = ({ title, description, imageUrl, padding }) => {
  const { t } = useTranslation();
  const pageUrl = useLocation();
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div
          className={`container mx-auto flex px-5  md:flex-row flex-col items-center py-${padding}`}
        >
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="font-montserrat sm:text-4xl text-3xl mb-4 font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="mb-8 leading-relaxed text-lg dark:text-gray-400">
              {description}
            </p>
            <div className="flex justify-center">
              <NavLink
                to="/addblog"
                className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg"
              >
                {t("navigationTitle.AddBlog")}
              </NavLink>
              {pageUrl.pathname === "/aboutus" ? (
                ""
              ) : (
                <NavLink
                  to="/aboutus"
                  className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                >
                  {t("navigationTitle.About Us")}
                </NavLink>
              )}
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt={title}
              src={imageUrl}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
