import React, { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { account, databases, ID } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuEye, LuEyeOff } from "react-icons/lu";
import conf from "../conf/conf";
const SignUp = () => {
  const uId = useId();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const SignUp = async () => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    let nameReg = /^[A-Za-z]*$/;
    if (!name || !nameReg.test(name) || name.trim().length > 50) {
      debugger;
      setNameErr(true);
      setEmailErr(false);
      setPasswordErr(false);
    } else if (!emailRegex.test(email)) {
      setEmailErr(true);
      setNameErr(false);
      setPasswordErr(false);
    } else if (!password || password.trim().length <= 8) {
      setPasswordErr(true);
      setNameErr(false);
      setEmailErr(false);
    } else {
      try {
        const response = await account.create(
          ID.unique(),
          email,
          password,
          name
        );
        setName("");
        setEmail("");
        setPassword("");
        toast.success("SignUp Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (response) {
          await databases.createDocument(
            conf.databaseId,
            conf.usersCollectionId,
            response?.$id,
            {
              name,
              email,
            }
          );
        }
        navigate("/login");
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
              src="../images/signup.svg"
            />
          </div>
          <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 dark:shadow-2xl dark:bg-slate-700">
            <h2 className="text-gray-900 text-2xl font-semibold font-montserrat mb-5 dark:text-white">
              Sign Up
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor={uId}
                className="leading-7 text-base font-semibold text-gray-600 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                type="text"
                id={uId}
                name="full-name"
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                placeholder="Please Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameErr(false);
                }}
              />
              {nameErr && (
                <div className="pt-2">
                  <span className="text-red-400 text-base font-semibold">
                    Please Enter Name
                  </span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor={uId}
                className="leading-7 text-base font-semibold text-gray-600 dark:text-gray-300"
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
                type={showPassword ? "text" : "password"}
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
              {password && (
                <span
                  className="absolute inset-y-0  top-[25px] end-0 grid place-content-center px-4 hover:cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword == true ? (
                    <LuEyeOff size={24} className="text-purple-600" />
                  ) : (
                    <LuEye size={24} className="text-purple-600" />
                  )}
                </span>
              )}
            </div>
            <button
              className="text-white font-semibold bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg disabled:opacity-75 disabled:cursor-not-allowed"
              onClick={SignUp}
              disabled={nameErr || emailErr || passwordErr}
            >
              SignUp
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
