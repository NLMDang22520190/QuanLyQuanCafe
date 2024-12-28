import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Users/Home/Home";
import Menu from "../pages/Users/Menu/Menu";
import OrderConfirmation from "../pages/Users/Order/OrderConfirmation";
import Login from "../pages/Auth/Login/Login";
import SignUp from "../pages/Auth/SignUp/SignUp";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import VerifyCode from "../pages/Auth/VerifyCode/VerifyCode";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import UpdatePersonalData from "../pages/Users/UpdatePersonalData/UpdatePersonalData";

const AllUserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menuAll" element={<Menu />} />
      <Route path="/update-personal-data" element={<UpdatePersonalData />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/verify-code" element={<VerifyCode />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AllUserRoutes;
