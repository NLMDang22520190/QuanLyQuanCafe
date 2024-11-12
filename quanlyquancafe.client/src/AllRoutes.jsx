import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Users/Home/Home";
import Menu from "./pages/Users/Menu/Menu";


// import { Home } from "./pages/Home";
import { OrderAndBilling } from "./pages/order_and_billing/OrderAndBilling";


import  TableManagementPage  from "./pages/table_management/TableManagementPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/menu" element={<Menu />} />

      <Route path='/orderAndBilling' element={<OrderAndBilling/>}/>

      <Route path='/customers' element={<TableManagementPage/>}/>

    </Routes>
  );
};

export default AllRoutes;
