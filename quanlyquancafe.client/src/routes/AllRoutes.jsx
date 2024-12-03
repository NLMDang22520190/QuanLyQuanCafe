import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Users/Home/Home";
import Menu from "../pages/Users/Menu/Menu";


// import { Home } from "./pages/Home";
import { OrderAndBilling } from "../pages/order_and_billing/OrderAndBilling";
import { CreateOrder } from "../pages/order_and_billing/CreateOrder";
import { OrderPayment } from "../pages/order_and_billing/OrderPayment";
import {ManagerDashboard} from "../pages/dashboard/ManagerDashboard"
import Schedule from "../pages/schedule/Schedule"
import StaffSchedule from "../pages/schedule/StaffSchedule";
import UserPage from "../pages/user/UserPage";
import { MenuPage } from "../pages/menu/MenuPage";
import { Profile } from "../pages/personalization/profile";
import { InventoryControlPage } from "../pages/Inventory/InventoryControlPage";

import  TableManagementPage  from "../pages/table_management/TableManagementPage";
import { AddMaterials } from "../pages/Inventory/AddMaterials";
import {PromotionPage} from "../pages/promotion/PromotionPage";
import UserRole from "../constant/UserRole";    

const AllRoutes = () => {
  const userRole = UserRole.ADMIN;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {userRole === UserRole.ADMIN && (
        <>
          <Route path="/dashboard" element={<ManagerDashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/staff-schedule" element={<StaffSchedule />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orderAndBilling">
            <Route path="" element={<OrderAndBilling />} />
            <Route path="create" element={<CreateOrder />} />
            <Route path="payment" element={<OrderPayment />} />
          </Route>
          <Route path="/menu">
            <Route path="" element={<MenuPage />} />
          </Route>
          <Route path="/promotions">
            <Route path="" element={<PromotionPage />} />
          </Route>
          <Route path="/inventory">
            <Route path="" element={<InventoryControlPage />} />
            <Route path="add" element={<AddMaterials />} />
          </Route>
          <Route path="/table-management" element={<TableManagementPage />} />
        </>
      )}
      {userRole === UserRole.STAFF && (
        <>
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/staff-schedule" element={<StaffSchedule />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orderAndBilling">
            <Route path="" element={<OrderAndBilling />} />
            <Route path="create" element={<CreateOrder />} />
            <Route path="payment" element={<OrderPayment />} />
          </Route>
          <Route path="/menu">
            <Route path="" element={<MenuPage />} />
          </Route>
          <Route path="/inventory">
            <Route path="" element={<InventoryControlPage />} />
            <Route path="add" element={<AddMaterials />} />
          </Route>
        </>
      )}
    </Routes>
  );
};

export default AllRoutes;
