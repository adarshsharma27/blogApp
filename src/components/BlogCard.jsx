import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LuBookmarkPlus,
  LuBookmarkMinus,
  LuTrash2,
  LuPencilLine,
} from "react-icons/lu";
import { databases } from "../config";
import conf from "../conf/conf";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { NotificationAudio } from "../utils/NotificationAudio";

const BlogCard = ({
  title,
  category,
  description,
  $id,
  imageUrl,
  user_Id,
  date,
  marginTrendingSlider,
}) => {
  const pageUrl = useLocation();
  const [bookmark, setBookMark] = useState();
  const { userId } = useSelector((state) => state.persistedReducer?.userData);
  useEffect(() => {
    if (pageUrl?.pathname === `/bookmark/${userId}`) setBookMark(true);
    else setBookMark(false);
  }, []);
  const navigate = useNavigate();
  const addBookMark = async () => {
    try {
      const response = await databases.createDocument(
        conf.databaseId,
        conf.bookMarkCollectionId,
        $id,
        {
          title,
          category,
          description,
          imageUrl: imageUrl ? imageUrl : "https://dummyimage.com/1203x503",
          user_Id,
        }
      );
      toast.success("Bookmark Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate(`/bookmark/${user_Id}`);
    } catch (error) {
      toast.error("Bookmark Already Saved", {
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
  const removeBookMark = async () => {
    try {
      await databases.deleteDocument(
        conf.databaseId,
        "65390dca0d53e330d986",
        $id
      );
      toast.success("Bookmark Remove", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    navigate("/");
  };
  const deleteBlog = async () => {
    try {
      await databases.deleteDocument(conf.databaseId, conf.collectionId, $id);
      await databases.deleteDocument(
        conf.databaseId,
        "65390dca0d53e330d986",
        $id
      );
      toast.success("Blog Removed Successfully", {
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
  return (
    <>
      <div
        className={
          marginTrendingSlider
            ? `m-2 p-4 card-shadow-custom break-words rounded-lg`
            : `p-4 sm:mb-0 mb-6 card-shadow-custom break-words rounded-lg`
        }
      >
        <div className="rounded-lg h-64 overflow-hidden">
          <img
            alt="content"
            className="object-cover object-center h-full w-full"
            src={imageUrl ? imageUrl : "https://dummyimage.com/1203x503"}
          />
        </div>
        <h2 className="text-xl font-bold font-montserrat text-gray-900 mt-5 dark:text-white capitalize">
          {title}
        </h2>
        <p className="text-lg font-semibold leading-relaxed mt-2 dark:text-gray-300 capitalize">
          {category}
        </p>
        <p className="text-base leading-relaxed mt-2 dark:text-gray-400 capitalize">
          {description?.slice(0, 200)}...
        </p>
        <p className="text-base text-right leading-relaxed mt-2 dark:text-gray-800 font-bold capitalize">
          {new Date(date).toLocaleString()}
        </p>
        <NavLink
          to={`/addblog/${$id}`}
          className="text-purple-500 inline-flex items-center py-3  font-semibold underline underline-offset-2 "
        >
          Read More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </NavLink>

        <div className="flex flex-wrap gap-3 justify-end">
          {userId == user_Id && (
            <LuPencilLine
              className="text-3xl hover:text-indigo-400 hover:cursor-pointer dark:text-white"
              onClick={() => navigate(`/updateblog/${$id}`)}
            />
          )}
          {userId == user_Id && (
            <LuTrash2
              className="text-3xl hover:text-red-400 hover:cursor-pointer dark:text-white"
              onClick={() => deleteBlog()}
            />
          )}
          {bookmark ? (
            <LuBookmarkMinus
              className="text-3xl hover:text-green-600 hover:cursor-pointer dark:text-white"
              onClick={() => removeBookMark()}
            />
          ) : (
            userId == user_Id && (
              <LuBookmarkPlus
                className="text-3xl hover:text-green-600 hover:cursor-pointer dark:text-white"
                onClick={() => addBookMark()}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default BlogCard;
