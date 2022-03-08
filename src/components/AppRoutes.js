import React from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SignUp from "../pages/SignUp";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Account from "../pages/Account";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

function AppRoutes({ children }) {
  let { user } = useUserAuth();
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/products' element={<Products />} />
      <Route path='/account' element={user ? <Account /> : <Login />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
