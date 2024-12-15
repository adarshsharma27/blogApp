import { React, useEffect, useId, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases, ID, storage } from "../config";
import conf from "../conf/conf";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  LuLightbulb,
  LuPencil,
  LuUndo2,
  LuX, LuCheckCircle
} from "react-icons/lu";
import { NotificationAudio } from "../utils/NotificationAudio";
import BackButton from "../utils/BackButton";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import MDEditor from "@uiw/react-md-editor";
import { AIChatSession, AIChatSessionTags } from "../service/AIModel";
import { Bars } from "react-loader-spinner";
const UpdateBlog = () => {
  const uId = useId();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const { id } = useParams();
  const { userId } = useSelector((state) => state.persistedReducer?.userData);
  const [imageUrl, setImageUrl] = useState();
  const [uploadFileId, setUploadFileId] = useState();
  const [hideFileUpload, setHideFileUpload] = useState(false);
  const [imageFileUpload, setImageFileUpload] = useState(false);
  const [createDisable, setCreateDisable] = useState(false);
  const [titleErr, setTitleErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [imageErr, setImageErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [shortDescriptionErr, setShortDescriptionErr] = useState(false);
  const [tagsErr, setTagsErr] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [generateLoader, setGenerateLoader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [markdown, setMarkdown] = useState();
  const [generateLoaderTags, setGenerateLoaderTags] = useState(false);
  const [tags, setTags] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [onDelete, setDelete] = useState(false);
  const blogHandle = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value, userId });
  };
  useEffect(() => {
    const getBlog = async () => {
      try {
        const resp = await databases.getDocument(
          conf.databaseId,
          conf.collectionId,
          id
        );
        setBlog(resp);
        setMarkdown(resp?.markdown);
        setImageUrl(resp?.imageUrl);
        setUploadFileId(resp?.uploadFileId);
        setShortDescription(resp?.shortDescription);
        setTags(resp?.tags);
        setCreateDisable(false);
        setLoader(false);
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
    getBlog();
  }, []);
  const updateBlog = async () => {
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
    } else if (!shortDescription || shortDescription.trim() === "") {
      setShortDescriptionErr(true);
      setDescriptionErr(false);
      setTitleErr(false);
      setCategoryErr(false);
      setImageErr(false);
      setShortDescriptionErr(false);
      window.scrollTo(0, 0);
    } else if (!imageUrl || imageUrl.trim() === "") {
      setImageErr(true);
      setTitleErr(false);
      setCategoryErr(false);
      setDescriptionErr(false);
      setShortDescriptionErr(false);
      window.scrollTo(0, 0);
    } else if (!tags) {
      setTags(true);
      setDescriptionErr(false);
      setTitleErr(false);
      setCategoryErr(false);
      setImageErr(false);
      setShortDescriptionErr(false);
      window.scrollTo(0, 0);
    } else if (!markdown || markdown.trim() === "") {
      setDescriptionErr(true);
      setTitleErr(false);
      setCategoryErr(false);
      setImageErr(false);
      window.scrollTo(0, 0);
    } else {
      try {
        const tagsArray = tags?.map((tags) => tags);
        await databases.updateDocument(conf.databaseId, conf.collectionId, id, {
          title: blog.title,
          category: blog.category,
          imageUrl: imageUrl,
          userId: userId,
          uploadFileId: uploadFileId,
          markdown: markdown,
          shortDescription: shortDescription,
          tags: tagsArray,
        });
        toast.success("Blog Updated Successfully", {
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
      if (imageFileUpload) {
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
            console.log(error); // Failure
          }
        );
      } else {
        const promise = storage.updateFile(conf.bucketId, ID.unique(), image);
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
            console.log(error); // Failure
          }
        );
      }
      const promise = storage.updateFile(conf.bucketId, ID.unique(), image);
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
          console.log(error); // Failure
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
        setImageFileUpload(true);
      },
      function (error) {
        console.log(error); // Failure
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
  const handleEdit = async (fieldName) => {
    setFieldName(fieldName);
    setOnEdit(true);
  };
  return (
    <>
      <section className="text-gray-600 font-montserrat relative dark:bg-slate-700">
        <BackButton />
        {loader ? (
          <Loader />
        ) : (
          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-3xl font-bold font-montserrat mb-4 text-gray-900 dark:text-white">
                {t("addUpdateBlogs.updateBlogTitle")}
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base  dark:text-gray-400">
                {t("addUpdateBlogs.updateBlogHeader")}
              </p>
            </div>
            <div className="md:w-10/12 mx-auto card-shadow-custom p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div className="p-4 w-full bg-slate-100 rounded-md border border-gray-100">
                  <div className="relative">
                    <div className="flex justify-between items-center gap-1">
                      <label
                        htmlFor={uId}
                        className="leading-7 pb-2 text-base font-semibold text-gray-600  dark:text-gray-200"
                      >
                        {t("addUpdateBlogs.Title")}
                      </label>
                      <div className="flex justify-end items-center gap-1">
                        {!onEdit && (
                          <LuPencil
                            size={25}
                            className=" text-indigo-500 hover:text-indigo-400 hover:cursor-pointer dark:text-white"
                            onClick={() => handleEdit("title")}
                          />
                        )}

                        {onEdit && fieldName === "title" && (
                          <>
                            <LuUndo2
                              size={25}
                              title="undo"
                              className="text-red-400 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                              onClick={() => setOnEdit(false)}
                            />
                            <LuCheckCircle
                              size={25}
                              title="save"
                              className=" text-green-800 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                              onClick={() => updateBlog()}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    {onEdit && fieldName === "title" ? (
                      <>
                        {" "}
                        <input
                          type="text"
                          id={uId}
                          name="title"
                          className="w-full bg-white  rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                          placeholder={t("addUpdateBlogs.Please Enter Title")}
                          value={blog?.title}
                          onChange={blogHandle}
                        />
                        {titleErr && (
                          <div className="pt-2">
                            <span className="text-red-400 text-base font-semibold">
                              {t("addUpdateBlogs.Please Enter Title")}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <h4 className="text-base">{blog?.title}</h4>
                    )}
                  </div>
                </div>
                <div className="p-4 w-full bg-slate-100 rounded-md border border-gray-100">
                  <div className="relative">
                    <div className="flex justify-between gap-1">
                      <label
                        htmlFor={uId}
                        className="leading-7  pb-2  text-base font-semibold text-gray-600 dark:text-gray-200"
                      >
                        {t("addUpdateBlogs.Category")}
                      </label>
                      <div className="flex justify-end gap-1">
                        {!onEdit && (
                          <LuPencil
                            size={25}
                            className="text-indigo-500 hover:text-indigo-400 hover:cursor-pointer dark:text-white"
                            onClick={() => handleEdit("category")}
                          />
                        )}

                        {onEdit && fieldName === "category" && (
                          <>
                            <LuUndo2
                              size={25}
                              title="undo"
                              className="text-red-400 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                              onClick={() => setOnEdit(false)}
                            />
                            <LuCheckCircle
                              size={25}
                              title="save"
                              className=" text-green-800 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                              onClick={() => updateBlog()}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    {onEdit && fieldName === "category" ? (
                      <>
                        <select
                          id={uId}
                          className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                          name="category"
                          onChange={blogHandle}
                        >
                          <option value={blog?.category}>
                            {blog?.category}
                          </option>
                          <option value="">
                            {" "}
                            {t("addUpdateBlogs.Please Select Category")}
                          </option>
                          <option value="Trending">
                            {t("addUpdateBlogs.Trending")}
                          </option>
                          <option value="Featured">
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
                      </>
                    ) : (
                      <h4 className="text-base">{blog?.category}</h4>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="p-4 w-full bg-slate-100 rounded-md border border-gray-100">
                  <div className="relative">
                    <div className="flex flex-wrap justify-between items-center py-2">
                      <label
                        htmlFor={uId}
                        className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                      >
                        {t("addUpdateBlogs.Please Enter Short Description")}
                      </label>
                      <div className="flex justify-end items-center gap-1">
                        {!onEdit && (
                          <LuPencil
                            className="text-2xl text-indigo-500 hover:text-indigo-400 hover:cursor-pointer dark:text-white"
                            onClick={() => handleEdit("shortDescription")}
                          />
                        )}

                        {onEdit && fieldName === "shortDescription" && (
                          <>
                            <LuUndo2
                              size={25}
                              title="undo"
                              className="text-red-400 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                              onClick={() => setOnEdit(false)}
                            />
                            <button
                              className={`flex justify-center items-center  hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out ${
                                generateLoader
                                  ? "text-white bg-purple-600"
                                  : " text-purple-600"
                              }`}
                              onClick={generateAIShortDescription}
                              disabled={!blog?.title}
                              title={t("addUpdateBlogs.Generate from AI")}
                            >
                              {generateLoader ? (
                                <Bars color="#fff" height="30" width="100" />
                              ) : (
                                <>
                                  <LuLightbulb
                                    size={25}
                                    className="hover:text-indigo-400 hover:cursor-pointer dark:text-white"
                                  />
                                </>
                              )}
                            </button>
                            <LuCheckCircle
                              size={25}
                              title="save"
                              className=" text-green-800 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                              onClick={() => updateBlog()}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    {onEdit && fieldName === "shortDescription" ? (
                      <>
                        <textarea
                          id={uId}
                          name="shortDescription"
                          className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                          data-gramm="false"
                          wt-ignore-input="true"
                          placeholder={t(
                            "addUpdateBlogs.Please Enter Short Description"
                          )}
                          value={shortDescription}
                          onChange={(e) => setShortDescription(e.target.value)}
                        ></textarea>
                      </>
                    ) : (
                      <h4 className="text-base">{shortDescription}</h4>
                    )}

                    {shortDescriptionErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          {t("addUpdateBlogs.Please Enter Short Description")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="p-4 w-full bg-slate-100 rounded-md border border-gray-100">
                  <div className="relative">
                    <div className="flex flex-wrap justify-between items-center py-2">
                      <label
                        htmlFor={uId}
                        className="leading-7 pb-2 text-base font-semibold text-gray-600 dark:text-gray-200"
                      >
                        {t("addUpdateBlogs.Please Generate  Blog Tags")}
                      </label>
                      <div className="flex justify-end items-center gap-1">
                        {!onEdit && (
                          <LuPencil
                            size={25}
                            className="text-indigo-500 hover:text-indigo-400 hover:cursor-pointer dark:text-white"
                            onClick={() => handleEdit("tags")}
                          />
                        )}

                        {onEdit && fieldName === "tags" && (
                          <>
                            <LuUndo2
                              size={25}
                              title="undo"
                              className="text-red-400 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                              onClick={() => setOnEdit(false)}
                            />
                            <button
                              className={`flex justify-center items-center  hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out ${
                                generateLoaderTags
                                  ? "text-white bg-purple-600"
                                  : " text-purple-600"
                              }`}
                              onClick={generateAITags}
                              disabled={!blog?.title}
                              title={t("addUpdateBlogs.Generate from AI")}
                            >
                              {generateLoaderTags ? (
                                <Bars color="#fff" height="30" width="100" />
                              ) : (
                                <>
                                  <LuLightbulb
                                    size={25}
                                    className="hover:text-indigo-400 hover:cursor-pointer dark:text-white"
                                  />
                                </>
                              )}
                            </button>
                            <LuCheckCircle
                              size={25}
                              title="save"
                              className=" text-green-800 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                              onClick={() => updateBlog()}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    {onEdit && fieldName === "tags" ? (
                      <>
                        <div className="w-full bg-white rounded  border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white">
                          <div className="flex flex-wrap justify-start items-center py-3 gap-2 ">
                            {tags?.length > 0 ? (
                              tags?.map((tag, index) => {
                                return (
                                  <span
                                    key={index}
                                    className="inline-flex items-center justify-center rounded-full bg-purple-500 px-2.5 py-0.5 text-white"
                                  >
                                    <p className="whitespace-nowrap text-base">
                                      {tag}
                                    </p>

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

                        {tagsErr && (
                          <div className="pt-2">
                            <span className="text-red-400 text-base font-semibold">
                              {t("addUpdateBlogs.Please Generate  Blog Tags")}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-wrap justify-start items-center py-3 gap-2 ">
                        {tags?.length > 0 ? (
                          tags?.map((tag, index) => {
                            return (
                              <span
                                key={index}
                                className="inline-flex items-center justify-center rounded-full bg-purple-500 px-2.5 py-0.5 text-white"
                              >
                                <p className="whitespace-nowrap text-base">
                                  {tag}
                                </p>
                              </span>
                            );
                          })
                        ) : (
                          <span className="leading-7  text-base  text-gray-400 dark:text-gray-200">
                            {t("addUpdateBlogs.No Tags present")}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-2">
                {hideFileUpload && onEdit && (
                  <>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <div className="flex justify-between items-center gap-1">
                          <span className="leading-7  pb-2 text-base font-semibold text-gray-600 dark:text-gray-200">
                            {t("addUpdateBlogs.Upload File")}
                          </span>
                        </div>
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
                  </>
                )}

                {imageUrl && (
                  <>
                    <div className="p-2 w-full">
                      <div className="relative flex flex-col items-center justify-center p-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 bg-opacity-50 dark:hover:bg-bray-800 dark:bg-slate-700  dark:border-white">
                        <img src={imageUrl} className="relative" />
                        <div className="flex justify-end items-center gap-1">
                          <LuPencil
                            size={40}
                            className="bg-indigo-500  text-white p-1.5 hover:scale-110 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white absolute top-6 right-6"
                            onClick={() => handleEdit("image")}
                          />

                          {onEdit && fieldName === "image" && (
                            <>
                              {!onDelete && (
                                <LuUndo2
                                  size={40}
                                  title="undo"
                                  className="bg-red-400  text-white p-1 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white absolute top-6 right-[7.5rem]"
                                  onClick={() => setOnEdit(false)}
                                />
                              )}

                              <LuCheckCircle
                                size={40}
                                title="save"
                                className=" bg-green-800   text-white p-1 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white  absolute top-6 right-[4.5rem]"
                                onClick={() => updateBlog()}
                              />
                              <LuX
                                size={40}
                                className=" bg-purple-600 text-white p-1 hover:bg-red-400 transition hover:scale-125  hover:cursor-pointer dark:text-white absolute top-6 right-6"
                                onClick={() => {
                                  deleteImage();
                                  setDelete(true);
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <div className="flex flex-wrap justify-between items-center py-2">
                    <label
                      htmlFor={uId}
                      className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                    >
                      {t("addUpdateBlogs.Message")}
                    </label>
                    <div className="flex justify-end items-center gap-1">
                      {!onEdit && (
                        <LuPencil
                          size={25}
                          className="text-indigo-500 hover:text-indigo-400 hover:cursor-pointer dark:text-white"
                          onClick={() => handleEdit("markdown")}
                        />
                      )}

                      {onEdit && fieldName === "markdown" && (
                        <>
                          <LuUndo2
                            size={25}
                            title="undo"
                            className="text-red-400 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                            onClick={() => setOnEdit(false)}
                          />
                          <LuCheckCircle
                            size={25}
                            title="save"
                            className=" text-green-800 hover:scale-125 hover:cursor-pointer transition-scale duration-200 ease-in-out dark:text-white"
                            onClick={() => updateBlog()}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {onEdit && fieldName === "markdown" ? (
                    <>
                      <MDEditor
                        className="font-montserrat w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                        value={markdown}
                        height="500px"
                        onChange={setMarkdown}
                      />
                      {descriptionErr && (
                        <div className="pt-2">
                          <span className="text-red-400 text-base font-semibold">
                            {t("addUpdateBlogs.Please Enter Message")}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <MDEditor.Markdown
                      source={blog?.markdown}
                      className="font-montserrat"
                    />
                  )}
                </div>
              </div>

              {/* <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg disabled:opacity-80 disabled:cursor-not-allowed"
                  onClick={updateBlog}
                  disabled={createDisable}
                >
                  {t("addUpdateBlogs.Update Blog")}
                </button>
              </div> */}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default UpdateBlog;
