import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { databases, Query } from "../config";

const FeaturedBlog = () => {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const promise = await databases.listDocuments(
          "652eb22b3816222d0ab0",
          "652eb23e85ff23c6fa5b",
          [Query.equal("category", "featured")]
        );
        setBlogs(promise?.documents);
      } catch (error) {
      }
    };
    getBlogs();
  }, []);
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-indigo-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-medium font-montserrat text-2xl mb-2 sm:mb-0">
                Featured Blog
              </h1>
              <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
                Street art subway tile salvia four dollar toast bitters selfies
                quinoa yuccie synth meditation iPhone intelligentsia prism tofu.
                Viral gochujang bitters dreamcatcher.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {blogs?.map((blog) => {
              const { title, category, description, $id } = blog;
              return (
                <BlogCard
                  title={title}
                  category={category}
                  description={description}
                  $id={$id}
                  key={$id}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedBlog;
