import React, { useId, useState } from "react";
import { databases, ID, storage } from "../config";
import { NavLink, useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LuChevronLeft  } from "react-icons/lu";
import { NotificationAudio } from "../utils/NotificationAudio";
import BackButton from "../utils/BackButton";
const AddBlog = () => {
  const uId = useId();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [createDisable, setCreateDisable] = useState(true);
  const { userId } = useSelector((state) => state.persistedReducer?.userData);
  const blogHandle = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value, imageUrl, userId });
  };

  const addBlog = async (e) => {
    try {
      await databases.createDocument(
        conf.databaseId,
        conf.collectionId,
        ID.unique(),
        blog
      );
      toast.success("Blog Created Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      NotificationAudio();
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleImage = (e) => {
    const image = e.target.files[0];
    const promise = storage.createFile(conf.bucketId, ID.unique(), image);
    promise.then(
      function (response) {
        const fileId = response.$id;
        if (fileId) {
          const imgUrl = storage.getFilePreview("653022b9b06e66621238", fileId);
          if (imgUrl?.href) {
            setImageUrl(imgUrl?.href);
            setCreateDisable(false);
          }
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
      <BackButton/>
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-3xl font-bold font-montserrat mb-4 text-gray-900 dark:text-white">
              Create Blog!!!
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base  dark:text-gray-400">
              Freely Create Blog!!!!
            </p>
          </div>
          <div className="lg:w-50 md:w-2/3 mx-auto card-shadow-custom p-6 rounded-lg">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7 pb-2 text-base font-semibold text-gray-600  dark:text-gray-200"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id={uId}
                    name="title"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
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
                    className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                  >
                    Category
                  </label>
                  <select
                    id={uId}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
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
                  <span className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200">
                    Upload File
                  </span>

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 bg-opacity-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-white dark:hover:border-indigo-600 dark:hover:bg-slate-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-4 leading-7  text-base font-semibold text-indigo-500  dark:text-gray-200 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2  text-sm  text-center md:text-lg text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or{" "}
                          <span className="text-indigo-500 text-md md:text-2xl font-bold">
                            Drag
                          </span>{" "}
                          and
                          <span className="text-indigo-500 text-md md:text-2xl font-bold">
                            {" "}
                            Drop
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX-2MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        id="file-upload"
                        name="file"
                        className="hidden"
                        onChange={handleImage}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                  >
                    Message
                  </label>
                  <textarea
                    id={uId}
                    name="description"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
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
                  disabled={createDisable}
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
