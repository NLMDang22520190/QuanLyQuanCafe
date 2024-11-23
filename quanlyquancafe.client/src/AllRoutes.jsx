import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { OrderAndBilling } from "./pages/order_and_billing/OrderAndBilling";
import { CreateOrder } from "./pages/order_and_billing/CreateOrder";
import { OrderPayment } from "./pages/order_and_billing/OrderPayment";
import {ManagerDashboard} from "./pages/dashboard/ManagerDashboard"
import { MenuPage } from "./pages/menu/MenuPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<ManagerDashboard/>} />
      <Route path='/orderAndBilling' >
      <Route path="" element={<OrderAndBilling/>}/>
        <Route path="create" element={<CreateOrder/>}/>
        <Route path="payment" element={<OrderPayment/>}/>
      </Route>
      <Route path='/menu' >
      <Route path="" element={<MenuPage/>}/>
        
      </Route>
    </Routes>
  );
};

export default AllRoutes;
