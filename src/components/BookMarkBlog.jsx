import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { databases} from "../config";
import conf from "../conf/conf";

const BookMarkBlog = () => {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const promise = await databases.listDocuments(
          conf.databaseId,
          conf.bookMarkCollectionId
        );
        setBlogs(promise?.documents);
      } catch (error) {}
    };
    getBlogs();
  }, [blogs]);
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-purple-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl mb-2 sm:mb-0">
                Featured Blog
              </h1>
              <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
                Street art subway tile salvia four dollar toast bitters selfies
                quinoa yuccie synth meditation iPhone intelligentsia prism tofu.
                Viral gochujang bitters dreamcatcher.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs?.map((blog) => {
              const { title, category, description, $id, imageUrl } = blog;
              return (
                <BlogCard
                  title={title}
                  category={category}
                  description={description}
                  $id={$id}
                  key={$id}
                  imageUrl={imageUrl}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookMarkBlog;
