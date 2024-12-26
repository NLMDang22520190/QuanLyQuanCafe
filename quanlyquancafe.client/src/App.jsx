import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import { ConfigProvider } from "antd";
import { AppLayout } from "./layouts/AppLayout";
import "./assets/themes/material-dark.min.css";
import { themeConfig } from "./config/ThemeConfig";
import AllUserRoutes from "./routes/AllUserRoutes";
import Navbar from "./components/Users/Navbar/Navbar";
import { getAuthCookies } from "./features/Cookies/CookiesHelper";
import { useSelector } from "react-redux";

function App() {
  const userRole = useSelector((state) => state.auth.userRole); // Lấy từ trạng thái Redux

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="App ">

        {userRole === "Admin" || userRole === "Staff" ? (
          <AppLayout>
            <AllRoutes />
          </AppLayout>
        ) : (
          <>
            <Navbar />
            <AllUserRoutes />
          </>
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
