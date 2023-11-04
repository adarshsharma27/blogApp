import React, { useId, useState } from "react";
import { databases, ID, storage } from "../config";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";

const AddBlog = () => {
  const uId = useId();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const blogHandle = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value, imageUrl });
  };
  const addBlog = async (e) => {
    databases.createDocument(
      conf.databaseId,
      conf.collectionId,
      ID.unique(),
      blog
    );
    navigate("/");
  };
  const handleImage = (e) => {
    const image = e.target.files[0];
    const promise = storage.createFile(
      conf.bucketId,
      ID.unique(),
      image
    );
    promise.then(
      function (response) {
        const fileId = response.$id;
        if (fileId) {
          debugger;
          const imgUrl = storage.getFilePreview("653022b9b06e66621238", fileId);
          if (imgUrl) setImageUrl(imgUrl?.href);
        }
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  return (
    <>
      <section className="text-gray-600 font-montserrat relative dark:bg-slate-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-3xl font-semibold font-montserrat mb-4 text-gray-900">
              Create Blog
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Freely Create Blog!!!!
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id={uId}
                    name="title"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Please Enter Title"
                    value={blog.title}
                    onChange={blogHandle}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7 text-sm text-gray-600"
                  >
                    Category
                  </label>
                  <select
                    id={uId}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    name="category"
                    onChange={blogHandle}
                  >
                    <option value="">Select Category</option>
                    <option value="trending">Trending</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="file"
                    id={uId}
                    name="file"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Please Enter Title"
                    // value={}
                    onChange={handleImage}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id={uId}
                    name="description"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    data-gramm="false"
                    wt-ignore-input="true"
                    placeholder="Please Enter Description"
                    value={blog.description}
                    onChange={blogHandle}
                  ></textarea>
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
                  onClick={addBlog}
                >
                  Create Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBlog;
