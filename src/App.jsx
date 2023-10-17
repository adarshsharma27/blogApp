import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import Home from "./components/Home";
import BlogDetail from "./components/BlogDetail";
import AboutUs from "./components/AboutUs";
import {ToastContainer} from "react-toastify";
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const addDarkMode = () => {
    let darkmode = document.querySelector("html");
    darkmode.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Header addDarkMode={addDarkMode} darkMode={darkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/addblog/:id" element={<BlogDetail />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default App;
