import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { AppLayout } from "./layouts/AppLayout";

function App() {
  return ( <div className="App text-white">
    <AppLayout>
   
      {/* <Navbar /> */}
      <AllRoutes />
  
    </AppLayout>
   
  </div>)
 
}

export default App;
