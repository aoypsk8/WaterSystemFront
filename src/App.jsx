// App.js

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./screens/home.jsx";
import LoginScreen from "./screens/auth/login_screen.jsx";
import Register from "./screens/auth/register_screen.jsx";
import NotFound from "./screens/error/notfound.jsx";
import { useDispatch } from "react-redux";
import { GetAllCategory } from "./api/category/cateAction.jsx";
import { GetAllProduct } from "./api/product/productAction.jsx";
import Manage from "./screens/manage/manage.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GetAllCategory())
    dispatch(GetAllProduct())
  },[])
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="*" element={<NotFound />} />
      <Route exact path="/login" element={<LoginScreen />} />
      <Route exact path="/manage" element={<Manage />} />
      <Route exact path="/adduser" element={<NotFound />} />
      {/* <Route exact path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
