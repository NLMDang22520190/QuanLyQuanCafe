import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Users/Home/Home";
import Menu from "./pages/Users/Menu/Menu";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
};

export default AllRoutes;
