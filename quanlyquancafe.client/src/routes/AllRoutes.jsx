import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/Users/Home/Home";
import Menu from "../pages/Users/Menu/Menu";
import OrderConfirmation from "../pages/Users/Order/OrderConfirmation";
import Login from "../pages/Auth/Login/Login";
import SignUp from "../pages/Auth/SignUp/SignUp";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import VerifyCode from "../pages/Auth/VerifyCode/VerifyCode";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";

// import { Home } from "./pages/Home";
import { OrderAndBilling } from "../pages/order_and_billing/OrderAndBilling";
import { CreateOrder } from "../pages/order_and_billing/CreateOrder";
import { OrderPayment } from "../pages/order_and_billing/OrderPayment";
import { ManagerDashboard } from "../pages/dashboard/ManagerDashboard";
import Schedule from "../pages/schedule/Schedule";
import StaffSchedule from "../pages/schedule/StaffSchedule";
import UserPage from "../pages/user/UserPage";
import { MenuPage } from "../pages/menu/MenuPage";
import { Profile } from "../pages/personalization/profile";
import { InventoryControlPage } from "../pages/Inventory/InventoryControlPage";

import TableManagementPage from "../pages/table_management/TableManagementPage";
import { PromotionPage } from "../pages/promotion/PromotionPage";
import UserRole from "../constant/UserRole";

import AdminLogin from "../pages/Auth/AdminLogin/AdminLogin";
import AdminStaffSchedule from "../pages/Auth/AdminLogin/AdminStaffSchedule";

const AllRoutes = () => {
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <Routes>
      {/* <>
        <Route path="/" element={<Home />} />
        <Route path="/menuAll" element={<Menu />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-code" element={<VerifyCode />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
      </> */}

      {userRole === "Admin" && (
        <>
          <Route path="/auth/login" element={<AdminLogin />} />
          <Route path="/staff-schedule" element={<AdminStaffSchedule />} />
          <Route path="/dashboard" element={<ManagerDashboard />} />
          <Route path="/schedule" element={<Schedule />} />

          <Route path="/user" element={<UserPage />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
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
          </Route>
          <Route path="/table-management" element={<TableManagementPage />} />
        </>
      )}
      {userRole === "Staff" && (
        <>
          <Route path="/auth/login" element={<AdminLogin />} />
          {/* <Route path="/schedule" element={<Schedule />} /> */}
          <Route path="/staff-schedule" element={<StaffSchedule />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orderAndBilling">
            <Route path="" element={<OrderAndBilling />} />
            <Route path="create" element={<CreateOrder />} />
            <Route path="payment" element={<OrderPayment />} />
          </Route>
          {/* <Route path="/menu">
            <Route path="" element={<MenuPage />} />
          </Route>
          <Route path="/inventory">
            <Route path="" element={<InventoryControlPage />} />
            <Route path="add" element={<AddMaterials />} />
          </Route> */}
        </>
      )}
    </Routes>
  );
};

export default AllRoutes;
