import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminStaffSchedule = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("AdminStaffSchedule");
    navigate("/dashboard", { replace: true });
  }, []);
  return <div>bruh</div>;
};

export default AdminStaffSchedule;
