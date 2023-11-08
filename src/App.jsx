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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookMarkBlog from "./components/BookMarkBlog";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const addDarkMode = () => {
    let darkmode = document.querySelector("html");
    darkmode.classList.toggle("dark");
    setDarkMode(!darkMode);
  };
  const user = useSelector((state) => state.blogsReducer?.userData);
  return (
    <>
      <Header addDarkMode={addDarkMode} darkMode={darkMode} />
      <Routes>
        <Route element={<ProtectedRoutes isAuthenticated={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/addblog/:id" element={<BlogDetail />} />
          <Route path="/bookmark" element={<BookMarkBlog />} />
        </Route>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer bodyClassName="font-montserrat font-bold" />
      <Footer />
    </>
  );
};

export default App;
