import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useTranslation } from "react-i18next";
import { Query, databases } from "../config";
import conf from "../conf/conf";
import Skeleton from "./Skeleton";
import { toast } from "react-toastify";

const Search = () => {
  const [blogs, setBlogs] = useState([]);
  const { t } = useTranslation();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getBlogs = async () => {
      if (category === "all") {
        try {
          const resp = await databases.listDocuments(
            conf.databaseId,
            conf.collectionId
          );

          setBlogs(resp?.documents);
        } catch (error) {}
      } else {
        try {
          const resp = await databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            [Query.equal("category", category)]
          );

          setBlogs(resp?.documents);
        } catch (error) {}
      }
    };
    getBlogs();
  }, [category]);

  const SearchBlogs = async () => {
    if (search === "") {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId
        );

        setBlogs(resp?.documents);
      } catch (error) {}
    } else if (search.length < 3) {
      toast.error("Search with more Characters", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (search.length >= 3) {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId,
          [Query.equal("title", search)]
        );
        if (resp?.documents?.length === 0) {
          toast.error("No Search Results", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setBlogs(resp?.documents);
        } else {
          setBlogs(resp?.documents);
        }
      } catch (error) {}
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 font-montserrat">
        <div className="flex h-screen flex-col justify-between border-e bg-white">
          <div className="px-4 py-6">
            <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-lg  font-semibold text-gray-500">
              Filters
            </span>

            <ul className="mt-6 space-y-4">
              <li
                className="block rounded-lg bg-gray-100 px-4 py-2 text-base font-semibold text-gray-700   cursor-pointer"
                onClick={() => setCategory("all")}
              >
                All Stories
              </li>
              <li
                className="block rounded-lg bg-gray-100 px-4 py-2 text-base font-semibold text-gray-700 cursor-pointer"
                onClick={() => setCategory("featured")}
              >
                Featured
              </li>

              <li
                className="block rounded-lg bg-gray-100 px-4 py-2 text-base font-semibold text-gray-700 cursor-pointer"
                onClick={() => setCategory("trending")}
              >
                Trending
              </li>
            </ul>
          </div>
        </div>
        <div className="container px-5 py-4 mx-auto font-montserrat col-span-3">
          <div className="card-shadow-custom p-6 rounded">
            <div className="relative">
              <label htmlFor="Search" className="sr-only">
                {" "}
                Search{" "}
              </label>

              <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                onChange={(e) => setSearch(e.target.value)}
              />

              <span
                className="absolute inset-y-0 end-0 grid w-10 place-content-center"
                onClick={SearchBlogs}
              >
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
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
                    id,
                    date,
                  } = blog;
                  return (
                    <BlogCard
                      title={title}
                      category={category}
                      description={description}
                      $id={$id}
                      key={$id}
                      imageUrl={imageUrl}
                      user_Id={userId}
                      id={id}
                      date={date}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
