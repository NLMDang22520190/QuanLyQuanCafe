import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { use } from "react";

const AdminLogin = () => {
  const userRole = useSelector((state) => state.auth.userRole);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole === "Admin") {
      navigate("/dashboard", { replace: true });
    }
    if (userRole === "Staff") {
      navigate("/orderAndBilling", { replace: true });
    }
  }, []);
  return <div>AdminLogin</div>;
};

export default AdminLogin;
