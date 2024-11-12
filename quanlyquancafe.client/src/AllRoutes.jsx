import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { OrderAndBilling } from "./pages/order_and_billing/OrderAndBilling";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/orderAndBilling' element={<OrderAndBilling/>}/>
    </Routes>
  );
};

export default AllRoutes;
