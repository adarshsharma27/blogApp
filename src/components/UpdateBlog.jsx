import { React, useEffect, useId, useState } from "react";
import { useParams,useNavigate, NavLink } from "react-router-dom";
import { databases,ID, storage } from "../config";
import conf from "../conf/conf";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LuChevronLeft  } from "react-icons/lu";
import { NotificationAudio } from "../utils/NotificationAudio";
const UpdateBlog = () => {
  const uId = useId();
  const navigate=useNavigate()
  const [blog, setBlog] = useState();
  const { id } = useParams();
  const { userId } = useSelector((state) => state.persistedReducer?.userData);
  const [imageUrl, setImageUrl] = useState("");
  const [createDisable, setCreateDisable] = useState(true);
  const blogHandle = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value,userId});
  };
  useEffect(() => {
    const getBlog = async () => {
      try {
        const resp = await databases.getDocument(
          conf.databaseId,
          conf.collectionId,
          id,
        );
        setBlog(resp);
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
  const updateBlog=async()=>{
 try{
    await databases.updateDocument(
        conf.databaseId,
        conf.collectionId,
        id,
        {
            title:blog.title,
            category:blog.category,
            imageUrl:imageUrl,
            description:blog.description,
            userId:userId
          }
      );
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
 }
 catch (error) {
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
      <div className="container px-20 pt-8">
          <NavLink to="/">
            <LuChevronLeft className="w-10 h-10 p-1 hover:bg-indigo-400 hover:text-white text-gray-900 rounded-full bg-gray-200 font-bold hover:cursor-pointer dark:text-white" />
          </NavLink>
        </div>
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-3xl font-bold font-montserrat mb-4 text-gray-900 dark:text-white">
              Update Blog!!!
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base  dark:text-gray-400">
              Freely Update Blog!!!!
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
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
                    value={blog?.title}
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
                    <option value={blog?.category}>{blog?.category}</option>
                    <option value="">Select Category</option>
                    <option value="Trending">Trending</option>
                    <option value="Featured">Featured</option>
                  </select>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <img
                      className="object-cover object-center rounded"
                      alt="hero"
                      src={blog?.imageUrl}
                    />
                  </div>
                  <label
                    htmlFor={uId}
                    className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                  >
                    Upload File
                  </label>
                  <input
                    type="file"
                    id={uId}
                    name="file"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                    placeholder="Please Enter Title"
                    onChange={handleImage}
                  />
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
                    value={blog?.description}
                    onChange={blogHandle}
                  ></textarea>
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
                    onClick={updateBlog}
                    disabled={createDisable}
                >
                  Update Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateBlog;
