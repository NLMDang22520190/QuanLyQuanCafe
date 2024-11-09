import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import Navbar from "./components/Users/Navbar/Navbar";

function App() {
  <div className="App">
    <Router>
      <Navbar />
      <AllRoutes />
    </Router>
  </div>;
}

export default App;
