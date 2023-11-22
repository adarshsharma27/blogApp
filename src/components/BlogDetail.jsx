import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { databases } from "../config";
import conf from "../conf/conf";
import { LuChevronLeft  } from "react-icons/lu";
const BlogDetail = () => {
  const [blog, setBlog] = useState();
  const {id} =useParams()
  useEffect(() => {
    const getBlog = async () => {
      try {
        const resp = await databases.getDocument(
          conf.databaseId,
          conf.collectionId,
           id
        );
        setBlog(resp);
      } catch (error) {
      }
    };
    getBlog();
  }, []);
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div className="container px-20 pt-8">
          <NavLink to="/">
            <LuChevronLeft className="w-10 h-10 p-1 hover:bg-indigo-400 hover:text-white text-gray-900 rounded-full bg-gray-200 font-bold hover:cursor-pointer dark:text-white" />
          </NavLink>
        </div>
        <div className="container mx-auto flex flex-col px-5 py-4 justify-center items-center">
          <img
            className="lg:w-5/6 md:w-full w-full  mb-10 object-cover object-center rounded"
            alt={blog?.title}
            src={
              blog?.imageUrl
                ? blog?.imageUrl
                : "https://blog.logrocket.com/wp-content/uploads/2023/10/validating-structural-data-valibot-nocdn.png"
            }
          />
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <h1 className="font-montserrat sm:text-4xl text-3xl mb-4 font-bold text-gray-900 dark:text-white">
              {blog?.title}
            </h1>
            <p className="mb-8 leading-relaxed  text-base  dark:text-gray-400">
              {blog?.description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
