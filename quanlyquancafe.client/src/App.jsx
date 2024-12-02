import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import { ConfigProvider } from "antd";
import { AppLayout } from "./layouts/AppLayout";
import './assets/themes/material-dark.min.css';
import { themeConfig } from "./config/ThemeConfig";


function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="App text-white">
        <AppLayout>
      
            <AllRoutes />
    
        </AppLayout>
      </div>
    </ConfigProvider>
  );
}

export default App;
