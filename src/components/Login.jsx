import React, { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logIn } from "../features/blogsSlice";
const Login = () => {
  const uId = useId();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState("");
  const dispatch = useDispatch();
  const Login = async () => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailErr(true);
      setPasswordErr(false);
    } else if (!password || password.trim().length <= 8) {
      setPasswordErr(true);
      setEmailErr(false);
    } else {
      try {
        const userData = await account.createEmailSession(email, password);
        dispatch(logIn(userData));
        toast.success("LoggedIn Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEmail("");
        setPassword("");
        navigate("/addblog");
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
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div className="container px-5 py-16 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="../images/login.svg"
            />
          </div>
          <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 dark:bg-slate-700 dark:shadow-2xl">
            <h2 className="text-gray-900 text-2xl font-semibold font-montserrat mb-5 dark:text-white">
              Login
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor={uId}
                className="leading-7 text-base font-semibold text-gray-600 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id={uId}
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                placeholder="Please Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErr(false);
                }}
              />
              {emailErr && (
                <div className="pt-2">
                  <span className="text-red-400 text-base font-semibold">
                    Please Enter Email
                  </span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor={uId}
                className="leading-7 text-base font-semibold text-gray-600 dark:text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                id={uId}
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                placeholder="Please Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordErr(false);
                }}
              />
              {passwordErr && (
                <div className="pt-2">
                  <span className="text-red-400 text-base font-semibold">
                    Please Enter Password
                  </span>
                </div>
              )}
            </div>
            <button
              className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg disabled:opacity-75 disabled:cursor-not-allowed"
              onClick={Login}
              disabled={emailErr || passwordErr}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
