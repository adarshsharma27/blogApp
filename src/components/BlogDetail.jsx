import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databases } from "../config";
import conf from "../conf/conf";
import BackButton from "../utils/BackButton";
import MDEditor from "@uiw/react-md-editor";
import Loader from "./Loader";
const BlogDetail = () => {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const getBlog = async () => {
      try {
        const resp = await databases.getDocument(
          conf.databaseId,
          conf.collectionId,
          id
        );
        setBlog(resp);
        setLoader(false);
      } catch (error) {}
    };
    getBlog();
  }, []);
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <BackButton />
        <div className="container mx-auto flex flex-col px-5  justify-center items-center">
          {loader ? (
            <Loader />
          ) : (
            <>
              <img
                className="lg:w-6/12 md:w-full w-full  mb-10 object-cover object-center rounded"
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
                  {blog?.shortDescription}
                </p>
                <div className="flex flex-wrap justify-center items-center py-2 gap-2">
                  {blog?.tags?.length > 0
                    ? blog.tags?.map((tag, index) => {
                        return (
                          <span
                            key={index}
                            className="inline-flex items-center justify-center rounded-full bg-purple-500 px-4 py-2 capitalize text-white"
                          >
                            <p className="whitespace-nowrap text-base">{tag}</p>
                          </span>
                        );
                      })
                    : ""}
                </div>
                <MDEditor.Markdown
                  source={blog?.markdown}
                  className="font-montserrat"
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
