import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import MainContent from "./components/MainContent"; // acts as Home
import "./index.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Hero />

        <div className="main-section">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart"
              element={token ? <Cart /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
