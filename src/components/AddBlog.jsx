import React, { useId, useState } from "react";
import { databases, ID, storage } from "../config";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LuLightbulb, LuX } from "react-icons/lu";
import { NotificationAudio } from "../utils/NotificationAudio";
import BackButton from "../utils/BackButton";
import { useTranslation } from "react-i18next";
import MDEditor from "@uiw/react-md-editor";
import { Bars } from "react-loader-spinner";
import { AIChatSession, AIChatSessionTags } from "../service/AIModel";
const AddBlog = () => {
  const uId = useId();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [uploadFileId, setUploadFileId] = useState("");
  const [hideFileUpload, setHideFileUpload] = useState(true);
  const [createDisable, setCreateDisable] = useState(false);
  const [titleErr, setTitleErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [imageErr, setImageErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [shortDescriptionErr, setShortDescriptionErr] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [generateLoader, setGenerateLoader] = useState(false);
  const [generateLoaderTags, setGenerateLoaderTags] = useState(false);
  const [markdown, setMarkdown] = useState(t("addUpdateBlogs.Message"));
  const [tags, setTags] = useState([]);
  console.log(tags);
  console.log(markdown);
  const { userId } = useSelector((state) => state.persistedReducer?.userData);
  const date = new Date();
  const blogHandle = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const addBlog = async (e) => {
    if (!blog.title || blog.title.trim() === "" || blog.title.length >= 50) {
      setTitleErr(true);
      setCategoryErr(false);
      setImageErr(false);
      setDescriptionErr(false);
      setShortDescriptionErr(false);
      window.scrollTo(0, 0);
    } else if (!blog.category || blog.category === "") {
      setCategoryErr(true);
      setTitleErr(false);
      setImageErr(false);
      setDescriptionErr(false);
      setShortDescriptionErr(false);
      window.scrollTo(0, 0);
    } else if (!imageUrl || imageUrl.trim() === "") {
      setImageErr(true);
      setTitleErr(false);
      setCategoryErr(false);
      setDescriptionErr(false);
      setShortDescriptionErr(false);
      window.scrollTo(0, 0);
    } else if (!shortDescription || shortDescription.trim() === "") {
      setShortDescriptionErr(true);
      setDescriptionErr(false);
      setTitleErr(false);
      setCategoryErr(false);
      setImageErr(false);
      window.scrollTo(0, 0);
    } else if (!markdown || markdown.trim() === "") {
      setDescriptionErr(true);
      setTitleErr(false);
      setCategoryErr(false);
      setImageErr(false);
      setShortDescriptionErr(false);
      window.scrollTo(0, 0);
    } else {
      const tagsArray = tags?.map((tags) => tags);
      try {
        await databases.createDocument(
          conf.databaseId,
          conf.collectionId,
          ID.unique(),
          {
            ...blog,
            imageUrl,
            userId,
            uploadFileId,
            date,
            shortDescription,
            tags: tagsArray,
            markdown,
          }
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
    }
  };
  const handleImage = (e) => {
    const image = e.target.files[0];
    const imageType = image?.type.split("/")[1];
    const imageSize = image?.size;
    setCreateDisable(true);
    if (
      imageType != "jpeg" &&
      imageType != "jpg" &&
      imageType != "jpeg" &&
      imageType != "gif"
    ) {
      toast.error("Please Upload PNG, JPG or GIF  Format", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (imageSize > 2000000) {
      toast.error("Please Upload File Size less then 2MB", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const promise = storage.createFile(conf.bucketId, ID.unique(), image);
      promise.then(
        function (response) {
          const fileId = response.$id;
          if (fileId) {
            const imgUrl = storage.getFilePreview(
              "653022b9b06e66621238",
              fileId
            );
            if (imgUrl?.href) {
              setImageUrl(imgUrl?.href);
              setCreateDisable(false);
              setUploadFileId(fileId);
              setHideFileUpload(false);
            }
          }
        },
        function (error) {
          toast.error(error, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }); // Failure
        }
      );
    }
  };
  const deleteImage = () => {
    setImageUrl("");
    const promise = storage.deleteFile(conf.bucketId, uploadFileId);
    promise.then(
      function () {
        toast.success("Image Deleted Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setHideFileUpload(true);
      },
      function (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); // Failure
      }
    );
  };
  const generateAIShortDescription = async () => {
    setGenerateLoader(true);
    const result = await AIChatSession.sendMessage(
      `Given the blog title ${blog.title}, provide a concise description of 2-3 lines that summarizes the main theme or content of the blog within 90 characters.`
    );
    setShortDescription(result.response.text());
    setGenerateLoader(false);
  };
  const generateAITags = async () => {
    try {
      setGenerateLoaderTags(true);
      const createAIChatSessionTags = AIChatSessionTags(blog?.title?.trim());
      const result = await createAIChatSessionTags.sendMessage(``);
      const response = result.response.text();
      let cleanedString = response.trim();
      // Replace single quotes with double quotes to make it valid JSON
      cleanedString = cleanedString.replace(/'/g, '"');
      // Parse the string into a JavaScript array
      let array = JSON.parse(cleanedString);
      array.length ? setTags(array) : [];
      setGenerateLoaderTags(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); // Failure
      setGenerateLoaderTags(false);
      setBlog({ title: "" });
    }
  };

  const removeTag = async (removeTag) => {
    setTags((prevData) =>
      prevData?.filter((tag) => tag.toLowerCase() !== removeTag.toLowerCase())
    );
  };

  return (
    <>
      <section className="text-gray-600 font-montserrat relative dark:bg-slate-700">
        <BackButton />
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-3xl font-bold font-montserrat mb-4 text-gray-900 dark:text-white">
              {t("addUpdateBlogs.addBlogTitle")}
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base  dark:text-gray-400">
              {t("addUpdateBlogs.addBlogHeader")}
            </p>
          </div>
          <div className="md:w-10/12 mx-auto card-shadow-custom p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7 pb-2 text-base font-semibold text-gray-600  dark:text-gray-200"
                  >
                    {t("addUpdateBlogs.Title")}
                  </label>
                  <input
                    type="text"
                    id={uId}
                    name="title"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                    placeholder={t("addUpdateBlogs.Please Enter Title")}
                    value={blog.title}
                    onChange={blogHandle}
                  />
                  {titleErr && (
                    <div className="pt-2">
                      <span className="text-red-400 text-base font-semibold">
                        {t("addUpdateBlogs.Please Enter Title")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                  >
                    {t("addUpdateBlogs.Category")}
                  </label>
                  <select
                    id={uId}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                    name="category"
                    onChange={blogHandle}
                  >
                    <option value="">
                      {t("addUpdateBlogs.Please Select Category")}
                    </option>
                    <option value="trending">
                      {t("addUpdateBlogs.Trending")}
                    </option>
                    <option value="featured">
                      {t("addUpdateBlogs.Featured")}
                    </option>
                  </select>
                  {categoryErr && (
                    <div className="pt-2">
                      <span className="text-red-400 text-base font-semibold">
                        {t("addUpdateBlogs.Please Select Category")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <div className="flex flex-wrap justify-between items-center py-2">
                  <label
                    htmlFor={uId}
                    className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                  >
                    {t("addUpdateBlogs.Please Enter Short Description")}
                  </label>
                  <button
                    className={`flex justify-center items-center  border border-purple-600  py-1 px-4 focus:outline-none hover:bg-purple-600 hover:text-white cursor-pointer rounded text-lg disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-purple-400 ${
                      generateLoader
                        ? "text-white bg-purple-600"
                        : " text-purple-600 bg-white"
                    }`}
                    onClick={generateAIShortDescription}
                    disabled={!blog?.title}
                  >
                    {generateLoader ? (
                      <Bars color="#fff" height="30" width="100" />
                    ) : (
                      <>
                        {t("addUpdateBlogs.Generate from AI")}
                        <LuLightbulb
                          size={24}
                          className="hover:text-indigo-400 hover:cursor-pointer dark:text-white"
                        />
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  id={uId}
                  name="shortDescription"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                  data-gramm="false"
                  wt-ignore-input="true"
                  placeholder={t(
                    "addUpdateBlogs.Please Enter Short Description"
                  )}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                ></textarea>

                {shortDescriptionErr && (
                  <div className="pt-2">
                    <span className="text-red-400 text-base font-semibold">
                      {t("addUpdateBlogs.Please Enter Short Description")}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <div className="flex flex-wrap justify-between items-center py-2">
                  <label
                    htmlFor={uId}
                    className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                  >
                    {t("addUpdateBlogs.Please Generate  Blog Tags")}
                  </label>
                  <button
                    className={`flex justify-center items-center  border border-purple-600  px-4 py-1 focus:outline-none hover:bg-purple-600 hover:text-white cursor-pointer rounded text-lg disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-purple-400 ${
                      generateLoaderTags
                        ? "text-white bg-purple-600"
                        : " text-purple-600 bg-white"
                    }`}
                    onClick={generateAITags}
                    disabled={!blog?.title}
                  >
                    {generateLoaderTags ? (
                      <Bars color="#fff" height="30" width="100" />
                    ) : (
                      <>
                        {t("addUpdateBlogs.Generate from AI")}
                        <LuLightbulb
                          size={24}
                          className="hover:text-indigo-400 hover:cursor-pointer dark:text-white"
                        />
                      </>
                    )}
                  </button>
                </div>
                <div className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white">
                  <div className="flex flex-wrap justify-start items-center py-2 gap-2 ">
                    {tags?.length > 0 ? (
                      tags?.map((tag, index) => {
                        return (
                          <span
                            key={index}
                            className="inline-flex items-center justify-center rounded-full bg-purple-500 px-2.5 py-0.5 text-white"
                          >
                            <p className="whitespace-nowrap text-base">{tag}</p>

                            <button
                              onClick={() => removeTag(tag)}
                              className="-me-1 ms-1.5 inline-block rounded-full bg-white text-purple-500  transition hover:bg-red-400 hover:text-white"
                            >
                              <LuX size={19} className="p-0.5" />
                            </button>
                          </span>
                        );
                      })
                    ) : (
                      <span className="leading-7  text-base  text-gray-400 dark:text-gray-200">
                        {t("addUpdateBlogs.No Tags present")}
                      </span>
                    )}
                  </div>
                </div>

                {shortDescriptionErr && (
                  <div className="pt-2">
                    <span className="text-red-400 text-base font-semibold">
                      {t("addUpdateBlogs.Please Generate  Blog Tags")}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -m-2">
              {hideFileUpload && (
                <div className="p-2 w-full">
                  <div className="relative">
                    <span className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200">
                      {t("addUpdateBlogs.Upload File")}
                    </span>

                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 bg-opacity-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-white dark:hover:border-purple-600 dark:hover:bg-slate-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-10 h-10 mb-4 leading-7  text-base font-semibold text-purple-500  dark:text-gray-200 "
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
                            <span className="font-semibold">
                              {t("addUpdateBlogs.Click to upload")}
                            </span>
                            or
                            <span className="text-purple-500 text-md md:text-2xl font-bold">
                              {t("addUpdateBlogs.Drag")}
                            </span>
                            and
                            <span className="text-purple-500 text-md md:text-2xl font-bold">
                              {t("addUpdateBlogs.Drop")}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t("addUpdateBlogs.PNG, JPG or GIF (MAX-2MB)")}
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
                  {imageErr && (
                    <div className="pt-2">
                      <span className="text-red-400 text-base font-semibold">
                        {t("addUpdateBlogs.Please Upload Image")}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {imageUrl && (
                <>
                  <div className="p-2 w-full">
                    <div className="relative flex flex-col items-center justify-center p-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 bg-opacity-50 dark:hover:bg-bray-800 dark:bg-slate-700  dark:border-white">
                      <img src={imageUrl} className="relative" />
                      <LuX
                        size={40}
                        className=" bg-purple-600 text-white p-1 hover:bg-red-400 transition hover:scale-110  hover:cursor-pointer dark:text-white absolute top-6 right-6"
                        onClick={() => deleteImage()}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                  >
                    {t("addUpdateBlogs.Message")}
                  </label>
                  <MDEditor
                    className="font-montserrat w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                    value={markdown}
                    height="500px"
                    onChange={setMarkdown}
                    theme="light"
                  />

                  {descriptionErr && (
                    <div className="pt-2">
                      <span className="text-red-400 text-base font-semibold">
                        {t("addUpdateBlogs.Please Enter Message")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg disabled:opacity-80 disabled:cursor-not-allowed"
                  onClick={addBlog}
                  disabled={createDisable}
                >
                  {t("addUpdateBlogs.Create Blog")}
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
