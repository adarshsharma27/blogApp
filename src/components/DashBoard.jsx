import React, { useState, useEffect } from "react";
import DashBoardCharts from "./DashBoardCharts";
import DashBoardTable from "./DashBoardTable";
import { LuUsers, LuScrollText, LuTrendingUp } from "react-icons/lu";
import conf from "../conf/conf";
import { Query, databases } from "../config";

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.usersCollectionId
        );
        setUsers(resp?.total);
        setAllUsers(resp?.documents);
      } catch (error) {}
    };
    getUsers();
  }, []);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId
        );

        setBlogs(resp?.total);
      } catch (error) {}
    };
    getBlogs();
  }, []);
  useEffect(() => {
    const getTrendingBlogs = async () => {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId,
          [Query.equal("category", "trending")]
        );
        setTrendingBlogs(resp?.total);
      } catch (error) {}
    };
    getTrendingBlogs();
  }, []);
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div className="container px-5  mx-auto">
          <div className="flex flex-col">
            <div className="flex flex-wrap sm:flex-row flex-col py-6">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl mb-2 sm:mb-0 dark:text-white">
                DashBoard
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="py-6 sm:mb-0 mb-6 card-shadow-custom rounded-lg flex flex-wrap gap-2  items-center flex-col">
              <div className="">
                <LuUsers
                  size={50}
                  className="text-indigo-400 hover:text-green-400 hover:cursor-pointer"
                />
              </div>
              <h2 className="text-6xl  font-bold font-montserrat text-gray-900 dark:text-white capitalize">
                {users}
              </h2>

              <p className="text-xl font-bold leading-relaxed  text-gray-600  dark:text-gray-300 capitalize">
                Total Users
              </p>
            </div>
            <div className="py-6 sm:mb-0 mb-6 card-shadow-custom rounded-lg flex flex-wrap gap-2  items-center flex-col">
              <div className="">
                <LuScrollText
                  size={50}
                  className="text-red-400 hover:text-green-400 hover:cursor-pointer"
                />
              </div>
              <h2 className="text-6xl font-bold font-montserrat text-gray-900 dark:text-white capitalize">
                {blogs}
              </h2>

              <p className="text-xl font-bold leading-relaxed text-gray-600 dark:text-gray-300 capitalize">
                Total Blogs
              </p>
            </div>
            <div className="py-6 sm:mb-0 mb-6 card-shadow-custom rounded-lg flex flex-wrap gap-2  items-center flex-col">
              <div className="">
                <LuTrendingUp
                  size={50}
                  className=" text-blue-400 hover:text-green-400 hover:cursor-pointer"
                />
              </div>
              <h2 className="text-6xl font-bold font-montserrat text-gray-900 dark:text-white capitalize">
                {trendingBlogs}
              </h2>

              <p className="text-xl font-bold leading-relaxed text-gray-600  dark:text-gray-300 capitalize">
                Trending Blogs
              </p>
            </div>
          </div>
          <DashBoardTable users={allUsers} />
          <DashBoardCharts users={users} blogs={blogs} trendingBlogs={trendingBlogs}/>
        </div>
      </section>
    </>
  );
};

export default DashBoard;
