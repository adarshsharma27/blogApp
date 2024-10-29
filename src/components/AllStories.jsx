import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { databases} from "../config";
import conf from "../conf/conf";
import Skeleton from "./Skeleton";
import { useTranslation } from "react-i18next";

const AllStories = () => {
  const [blogs, setBlogs] = useState([]);
  const [reload ,setReload]=useState(false)
  const{t}=useTranslation();
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId,
        );

        setBlogs(resp?.documents);
      } catch (error) {
      }
    };
    getBlogs();
    setReload(false)
  }, [reload]);
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-purple-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl mb-2 sm:mb-0 dark:text-white">
              {t('heroSection.All Stories')}
              </h1>
              <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0 dark:text-gray-400">
              {t('heroSection.All Stories Blog Description')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs?.length === 0
              ? Array.from({ length: 10 }).map(() => <Skeleton />)
              : blogs?.map((blog) => {
                  const {
                    title,
                    category,
                    shortDescription,
                    $id,
                    imageUrl,
                    userId,
                    id,
                    date
                  } = blog;
                  return (
                    <BlogCard
                      title={title}
                      category={category}
                      shortDescription={shortDescription}
                      $id={$id}
                      key={$id}
                      imageUrl={imageUrl}
                      user_Id={userId}
                      id={id}
                      date={date}
                      setReload={setReload}
                    />
                  );
                })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllStories;
