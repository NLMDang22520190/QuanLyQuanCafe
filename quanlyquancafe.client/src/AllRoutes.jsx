import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Users/Home/Home";
import Menu from "./pages/Users/Menu/Menu";
import OrderConfirmation from "./pages/Users/Order/OrderConfirmation";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
    </Routes>
  );
};

export default AllRoutes;
