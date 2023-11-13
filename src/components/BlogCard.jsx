import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { LuBookmarkPlus, LuBookmarkMinus, LuTrash2 } from "react-icons/lu";
import { databases, ID } from "../config";
import conf from "../conf/conf";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const BlogCard = ({ title, category, description, $id, imageUrl,user_Id}) => {
  const pageUrl = useLocation();
  const [bookmark, setBookMark] = useState();
  const {userId} = useSelector((state) => state.persistedReducer?.userData);
  console.log(user_Id,"1");
  console.log(userId,"2");
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
      <div className="p-4 sm:mb-0 mb-6 shadow-xl break-words">
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
        <p className="text-lg font-semibold leading-relaxed mt-2 dark:text-gray-300 capitalize">{category}</p>
        <p className="text-base leading-relaxed mt-2 dark:text-gray-400 capitalize">{description?.slice(0,200)}...</p>
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
          {bookmark || userId==user_Id ? (
            <LuBookmarkMinus
              className="text-3xl hover:text-green-600 hover:cursor-pointer dark:text-white"
              onClick={() => removeBookMark()}
            />
          ) : (
            userId==user_Id && <LuBookmarkPlus
              className="text-3xl hover:text-green-600 hover:cursor-pointer dark:text-white"
              onClick={() => addBookMark()}
            />
          )}
          {
            userId==user_Id &&
          <LuTrash2
              className="text-3xl hover:text-red-400 hover:cursor-pointer dark:text-white"
              onClick={() => deleteBlog()}
            />
          }
        </div>
        
         
        
       
      </div>
    </>
  );
};

export default BlogCard;
