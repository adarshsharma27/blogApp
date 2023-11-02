import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { LuBookmarkPlus, LuBookmarkMinus, LuTrash2 } from "react-icons/lu";
import { databases, ID } from "../config";
import conf from "../conf/conf";
import { toast } from "react-toastify";

const BlogCard = ({ title, category, description, $id, imageUrl }) => {
  const pageUrl = useLocation();
  const [bookmark, setBookMark] = useState();

  useEffect(() => {
    if (pageUrl?.pathname === "/bookmark") setBookMark(true);
    else setBookMark(false);
  }, []);

  const navigate = useNavigate();
  const addBookMark = async () => {
    databases.createDocument(
      conf.databaseId,
      conf.bookMarkCollectionId,
      ID.unique(),
      {
        title,
        category,
        description,
        imageUrl: imageUrl ? imageUrl : "https://dummyimage.com/1203x503",
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
    navigate("/bookmark");
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
    } catch (error) {}
    navigate("/bookmark");
  };
  const deleteBlog = async () => {
    try {
      await databases.deleteDocument(
        conf.databaseId,
      conf.collectionId,
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
    } catch (error) {}
    navigate("/");
  };
  return (
    <>
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6 shadow-lg break-words">
        <div className="rounded-lg h-64 overflow-hidden">
          <img
            alt="content"
            className="object-cover object-center h-full w-full"
            src={imageUrl ? imageUrl : "https://dummyimage.com/1203x503"}
          />
        </div>
        <h2 className="text-xl font-bold font-montserrat text-gray-900 mt-5">
          {title}
        </h2>
        <p className="text-lg font-semibold leading-relaxed mt-2">{category}</p>
        <p className="text-base leading-relaxed mt-2">{description?.slice(0,200)}...</p>
        <NavLink
          to={`/addblog/${$id}`}
          className="text-indigo-500 inline-flex items-center mt-3"
        >
          Learn More
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
        <div>
          {bookmark ? (
            <LuBookmarkMinus
              className="text-2xl hover:text-green-600 hover:cursor-pointer"
              onClick={() => removeBookMark()}
            />
          ) : (
            <LuBookmarkPlus
              className="text-2xl hover:text-green-600 hover:cursor-pointer"
              onClick={() => addBookMark()}
            />
          )}
          <LuTrash2
              className="text-2xl hover:text-red-400 hover:cursor-pointer"
              onClick={() => deleteBlog()}
            />
        </div>
      </div>
    </>
  );
};

export default BlogCard;
