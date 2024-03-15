import React, { useState } from "react";
import { NavLink, useLocation ,Link } from "react-router-dom";
import { account } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/blogsSlice";
import { LuAlignRight, LuX } from "react-icons/lu";
import conf from "../conf/conf";
import { useTranslation } from "react-i18next";
const Header = ({ addDarkMode, darkMode }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const pageUrl = useLocation();
  const LogOut = async () => {
    await account.deleteSession("current");
    dispatch(logOut(null));
    setOpen(!open);
  };
  const user = useSelector((state) => state.persistedReducer?.userData);
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => {
    setOpen(!open);
  };
  return (
    <>
      <header className="text-gray-600 font-montserrat bg-gray-100 dark:bg-slate-700">
        {/* Desktop Navigation start */}
        <div className="hidden container mx-auto md:flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex font-montserrat font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img src="../images/logo.png" width="40px" />
            <span className="ml-2 text-xl font-bold text-purple-500">
              DesiBlogs
            </span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {user && (
              <NavLink
                to="/"
                className="mr-5 hover:text-gray-900 dark:text-white  font-semibold"
              >
                {t("navigationTitle.Home")}
              </NavLink>
            )}
            <NavLink
              to="/aboutus"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              {t("navigationTitle.About Us")}
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/addblog"
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                >
                  {t("navigationTitle.AddBlog")}
                </NavLink>
                {
                  (pageUrl?.pathname.split("/")[1] === `bookmark`) && <NavLink
                  to={""}
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold active"
                >
                  {t("navigationTitle.BookMarks")}
                </NavLink>
                }
                
                {user?.userId === conf.adminUserId &&
                  user?.providerUid === conf.adminUserEmail && (
                    <NavLink
                      to="/dashboard"
                      className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                    >
                      {t("navigationTitle.DashBoard")}
                    </NavLink>
                  )}
                <NavLink
                  to="/login"
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                  onClick={LogOut}
                >
                  {t("navigationTitle.LogOut")}
                </NavLink>

                <Link to="/addblog" className="lg:mr-5 md:mr-0 mt-2 md:mt-0">
                  <div className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full text-center font-bold">
                    {user?.providerUid?.slice(0, 1)?.toUpperCase()}
                  </div>
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to="/signUp"
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                >
                  {t("commonTitle.signUpButton")}
                </NavLink>

                <NavLink
                  to="/login"
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                >
                  {t("commonTitle.logInTitle")}
                </NavLink>
              </>
            )}
            <select
              name="langSelector"
              id="langSelector"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold cursor-pointer bg-transparent focus:outline-none"
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
              }}
              value={i18n.language}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
            </select>
          </nav>
          <button
            className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none text-base mt-2 md:mt-0"
            onClick={() => {
              addDarkMode();
            }}
          >
            {darkMode ? (
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                  className="fill-sky-400/20"
                ></path>
                <path
                  d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                  className="fill-sky-500"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                  className="fill-sky-500"
                ></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  className="stroke-slate-400 dark:stroke-slate-500"
                ></path>
                <path
                  d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                  className="stroke-slate-400 dark:stroke-slate-500"
                ></path>
              </svg>
            )}
          </button>
        </div>
        {/* Desktop Navigation end */}
        {/* Mobile Navigation start */}
        <div className="md:hidden container mx-auto flex flex-wrap px-4 pt-3 flex-col">
          <div className="fixed top-0 left-0 right-0 z-30 container mx-auto flex flex-wrap px-4 pt-3 flex-col bg-gray-100 dark:bg-slate-600 ">
            <div className="flex justify-between z-30 text-gray-600 dark:text-white">
              <NavLink
                to="/"
                className="flex font-montserrat font-medium items-center  mb-4 md:mb-0"
              >
                <img src="../images/logo.png" width="30px" />
                <span className="ml-2 text-xl font-bold text-purple-500">
                  DesiBlogs
                </span>
              </NavLink>
              <div>
                {open === true ? (
                  <LuX
                    className="text-2xl"
                    onClick={() => toggleNavigation()}
                  />
                ) : (
                  <LuAlignRight
                    className="text-2xl"
                    onClick={() => toggleNavigation()}
                  />
                )}
              </div>
            </div>
          </div>

          <nav
            className={
              open === true
                ? "text-center z-20 mx-auto flex flex-col  justify-center  bg-gray-100 text-gray-600 dark:bg-slate-600 w-full h-screen items-center text-base gap-2 fixed top-0 left-0 transition-all duration-1000 ease-in-out "
                : "text-center z-20 mx-auto flex flex-col  justify-center  bg-gray-100 text-gray-600 dark:bg-slate-600 w-full h-screen items-center text-base gap-2 fixed top-0  left-[-500px] transition-all duration-1000 ease-in-out "
            }
          >
            {user && (
              <NavLink
                to="/"
                className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-purple-500  font-semibold"
                onClick={() => toggleNavigation()}
              >
                {t("navigationTitle.Home")}
              </NavLink>
            )}
            <NavLink
              to="/aboutus"
              className="hover:text-purple-500 dark:text-white  py-2 border-b-2 w-10/12 border-gray-500  hover:border-purple-500  font-semibold"
              onClick={() => toggleNavigation()}
            >
              {t("navigationTitle.About Us")}
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/addblog"
                  className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-purple-500  font-semibold"
                  onClick={() => toggleNavigation()}
                >
                  {t("navigationTitle.AddBlog")}
                </NavLink>
                {
                  (pageUrl?.pathname.split("/")[1] === `bookmark`) && <NavLink
                  to={""}
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold active"
                >
                  {t("navigationTitle.BookMarks")}
                </NavLink>
                }
                {user?.userId === conf.adminUserId &&
                  user?.providerUid === conf.adminUserEmail && (
                    <NavLink
                      to="/dashboard"
                      className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-purple-500  font-semibold"
                    >
                      {t("navigationTitle.DashBoard")}
                    </NavLink>
                  )}
                <NavLink
                  to="/login"
                  className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-purple-500  font-semibold"
                  onClick={LogOut}
                >
                  {t("navigationTitle.LogOut")}
                </NavLink>
                <Link
                  to="/addblog"
                  className="hover:text-purple-500 flex justify-center items-center	 dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-purple-500  font-semibold"
                  onClick={() => toggleNavigation()}
                >
                  <div className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full text-center font-bold">
                    {user?.providerUid?.slice(0, 1)?.toUpperCase()}
                  </div>
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to="/signUp"
                  className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-purple-500  font-semibold"
                >
                  {t("commonTitle.signUpTitle")}
                </NavLink>

                <NavLink
                  to="/login"
                  className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-purple-500  font-semibold"
                >
                  {t("commonTitle.logInTitle")}
                </NavLink>
              </>
            )}
            <select
              name="langSelector"
              id="langSelector"
              className="hover:text-purple-500 dark:text-white  text-center w-10/12 py-2 border-b-2  border-gray-500 hover:border-purple-500  font-semibold bg-transparent  focus:outline-none"
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
              }}
              value={i18n.language}
            >
              <option value="en" className="text-center">
                English
              </option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
            </select>
            <button
              className="inline-flex items-center justify-center  border-b-2 w-10/12 border-gray-500 hover:border-purple-500  border-0 py-1 px-3 focus:outline-none text-base mt-2 md:mt-0"
              onClick={() => {
                addDarkMode();
              }}
            >
              {darkMode ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                    className="fill-sky-400/20"
                  ></path>
                  <path
                    d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                    className="fill-sky-500"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                    className="fill-sky-500"
                  ></path>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    className="stroke-slate-400 dark:stroke-slate-500"
                  ></path>
                  <path
                    d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                    className="stroke-slate-400 dark:stroke-slate-500"
                  ></path>
                </svg>
              )}
            </button>
          </nav>
        </div>
        {/* mobile navigation end */}
      </header>
    </>
  );
};

export default Header;
