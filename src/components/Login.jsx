import React, { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../config";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const uId = useId();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[nameErr,setNameErr]=useState("")
  const Login = async () => {
    await account.createEmailSession(email, password);
   toast.success("LoggedIn Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

});
    setEmail("");
    setPassword("");
    navigate("/addblog");
    
  };
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="font-montserrat font-medium text-3xl text-gray-900">
              Login for free!!!
            </h1>
            <p className="leading-relaxed mt-4">
              Create and Publish your blogs easily
            </p>
          </div>
          <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium font-montserrat mb-5">
              Login
            </h2>
            <div className="relative mb-4">
              <label htmlFor={uId} className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id={uId}
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Please Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor={uId} className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id={uId}
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Please Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-75 disabled:cursor-not-allowed" disabled={!email || !password}
              onClick={Login}
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
