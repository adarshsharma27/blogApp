import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { Query, databases } from "../config";
import conf from "../conf/conf";
import BackButton from "../utils/BackButton";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
const BookMarkBlog = () => {
  const [blogs, setBlogs] = useState();
  const {userId} = useParams();
  const { t } = useTranslation();
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const promise = await databases.listDocuments(
          conf.databaseId,
          conf.bookMarkCollectionId,
          [Query.equal("userId", userId)]
        );
        setBlogs(promise?.documents);
      } catch (error) {}
    };
    getBlogs();
  }, []);

  const filteredBlogs = Array.from(new Set(blogs?.map(a => a.id))).map(id => {
    return blogs?.find(a => a.id === id);
});
// console.log(uniqueData)

  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <BackButton />
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-purple-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl mb-2 sm:mb-0 dark:text-white">
                {t("heroSection.BookMarked Blogs")}
              </h1>
              <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0 dark:text-gray-400">
                {t("heroSection.BookMarked Blog Description")}
              </p>
            </div>
          </div>
          <div
            className={
              filteredBlogs?.length === 0
                ? "grid  gap-4 place-content-center"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            }
          >
            {filteredBlogs?.length !== 0 ? (
              filteredBlogs?.map((blog) => {
                const { title, category, description, $id, imageUrl, userId,date } =
                  blog;
                return (
                  <BlogCard
                    title={title}
                    category={category}
                    description={description}
                    $id={$id}
                    key={$id}
                    imageUrl={imageUrl}
                    user_Id={userId}
                    date={date}
                  />
                );
              })
            ) : (
              <>
                <div className="text-center">
                  <h4 className="text-gray-900 font-bold  pb-4 font-montserrat text-3xl mb-2 sm:mb-0 dark:text-white">
                    No BookMarks
                  </h4>
                  <img
                    className="w-3/5"
                    alt="bookmark"
                    src="../images/bookmark.svg"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookMarkBlog;
