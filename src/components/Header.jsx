import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { account } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/blogsSlice";

const Header = ({ addDarkMode, darkMode }) => {
  const dispatch = useDispatch();
  const LogOut = async () => {
    await account.deleteSession("current");
    dispatch(logOut(null));
    navigate("/login");
  };
  const user = useSelector((state) => state.persistedReducer?.userData);
  return (
    <>
      <header className="text-gray-600 font-montserrat bg-gray-100 dark:bg-slate-700">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <NavLink
            to="/"
            className="flex font-montserrat font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-xl">DesiBlogs</span>
          </NavLink>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            { user && <NavLink
              to="/"
              className="mr-5 hover:text-gray-900 dark:text-white  font-semibold"
            >
              Home
            </NavLink>
            }
            <NavLink
              to="/aboutus"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              About Us
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/login"
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                  onClick={LogOut}
                >
                  LogOut
                </NavLink>
                <NavLink to="/addblog" className="lg:mr-5 md:mr-0 mt-2 md:mt-0">
                  <div className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full text-center font-bold">
                    {user?.providerUid?.slice(0, 1)?.toUpperCase()}
                  </div>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/signUp"
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                >
                  SignUp
                </NavLink>

                <NavLink
                  to="/login"
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                >
                  Login
                </NavLink>
              </>
            )}
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
      </header>
    </>
  );
};

export default Header;
