import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { databases} from "../config";
import conf from "../conf/conf";
import { NavLink } from "react-router-dom";
import { LuChevronLeft  } from "react-icons/lu";
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
      } catch (error) {
      }
    };
    getBlogs();
  }, []);
  
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
      <div className="container px-6 md:px-20 pt-16">
          <NavLink to="/">
            <LuChevronLeft className="w-10 h-10 p-1 hover:bg-indigo-400 hover:text-white text-gray-900 rounded-full bg-gray-200 font-bold hover:cursor-pointer dark:text-white" />
          </NavLink>
        </div>
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-purple-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl mb-2 sm:mb-0 dark:text-white">
                BookMarked Blog
              </h1>
              <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0 dark:text-gray-400">
                Street art subway tile salvia four dollar toast bitters selfies
                quinoa yuccie synth meditation iPhone intelligentsia prism tofu.
                Viral gochujang bitters dreamcatcher.
              </p>
            </div>
          </div>
          <div className={blogs?.length===0 ? 'grid  gap-4 place-content-center' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
            {blogs?.length!==0 ? blogs?.map((blog) => {
              const { title, category, description, $id, imageUrl ,userId} = blog;
              return (
                <BlogCard
                  title={title}
                  category={category}
                  description={description}
                  $id={$id}
                  key={$id}
                  imageUrl={imageUrl}
                  user_Id={userId}
                />
              );
            }):<>
            <div
            className="text-center"
            >
              <h4 className="text-gray-900 font-bold  pb-4 font-montserrat text-3xl mb-2 sm:mb-0 dark:text-white">No BookMarks</h4>
              <img
              className="w-3/5"
              alt="bookmark"
              src="../images/bookmark.svg"
            />
            </div> 
            </>}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookMarkBlog;
