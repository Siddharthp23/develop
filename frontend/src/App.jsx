// File: src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import OrderSummary from "./components/OrderSummary";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import "./index.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div className="main-section">
        <MainContent/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
