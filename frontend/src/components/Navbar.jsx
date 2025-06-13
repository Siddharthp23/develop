import React, { useState } from "react";
import { FaSearch, FaMicrophone, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLogin,
  toggleRegister,
  closeModals,
} from "../features/ui/uiSlice";
import { loginSuccess, logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { showLogin, showRegister } = useSelector((state) => state.ui);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(loginSuccess({ user: data.user, token: data.access_token }));
        alert("Login successful!");
        dispatch(closeModals());
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong!");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        dispatch(closeModals());
      } else {
        alert(`Registration failed: ${data.detail || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Server error during registration.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
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
            {!isAuthenticated ? (
              <>
                <button className="btn green" onClick={() => dispatch(toggleLogin())}>
                  Sign-In
                </button>
                <button className="btn blue" onClick={() => dispatch(toggleRegister())}>
                  Register
                </button>
              </>
            ) : (
              <>
                <span className="welcome-msg">Hi, {user?.name}</span>
                <button className="btn blue" onClick={handleLogout}>
                  Sign-Out
                </button>
              </>
            )}
            <div className="cart-icon">
              <FaShoppingCart className="icon cart" />
              <span className="cart-count">{cartItems.length}</span>
            </div>
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
        <div className="modal-overlay" onClick={() => dispatch(closeModals())}>
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
            <button className="btn gray" onClick={() => dispatch(closeModals())}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal-overlay" onClick={() => dispatch(closeModals())}>
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
            <button className="btn gray" onClick={() => dispatch(closeModals())}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
