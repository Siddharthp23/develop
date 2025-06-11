import React, { useState } from "react";
import { FaSearch, FaMicrophone, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/Logo.png";
// import "./Navbar.css"; // Make sure to style your modals here

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        closeModals();
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong!");
    }
  };

  const [registerData, setRegisterData] = useState({
  name: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful!");
      closeModals();
    } else {
      alert(`Registration failed: ${data.detail || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Server error during registration.");
  }
};


  return (
    <>
      <nav className="navbar">
        <div className="navbar-top">
          <div className="navbar-left">
            <img src={logo} alt="ClicKart Logo" className="logo" />
            <h2 className="brand-name">ClicKart</h2>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <FaSearch className="icon" />
            <FaMicrophone className="icon" />
          </div>

          <div className="navbar-right">
            <button className="btn green" onClick={() => setShowLogin(true)}>Sign-In</button>
            <button className="btn blue" onClick={() => setShowRegister(true)}>Register</button>
            <FaShoppingCart className="icon cart" />
            <button className="btn settings">☰</button>
          </div>
        </div>

        <div className="navbar-menu">
          <ul className="menu-list">
            <li><a href="#">Home</a></li>
            <li><a href="#">Men</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Kids</a></li>
            <li><a href="#">Beauty</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </nav>

      {/* Sign-In Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button className="btn green" onClick={handleLogin}>
              Login
            </button>
            <button className="btn gray" onClick={closeModals}>
              Close
            </button>
          </div>
        </div>
      )}


      {/* Register Modal */}
      {showRegister && (
  <div className="modal-overlay" onClick={closeModals}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={registerData.name}
        onChange={(e) =>
          setRegisterData({ ...registerData, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={registerData.email}
        onChange={(e) =>
          setRegisterData({ ...registerData, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={registerData.password}
        onChange={(e) =>
          setRegisterData({ ...registerData, password: e.target.value })
        }
      />
      <button className="btn blue" onClick={handleRegister}>
        Register
      </button>
      <button className="btn gray" onClick={closeModals}>
        Close
      </button>
    </div>
  </div>
)}

    </>
  );
}
