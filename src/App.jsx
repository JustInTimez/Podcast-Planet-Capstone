import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="content"></div>
      <Footer />
    </div>
  );
}

export default App;