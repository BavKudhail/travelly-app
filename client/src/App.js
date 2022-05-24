import React from "react";

// pages
import Home from "./pages/Home";

// components
import { Navbar } from "./components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Navbar />
      </div>

      {/* <Home /> */}
    </div>
  );
}

export default App;
