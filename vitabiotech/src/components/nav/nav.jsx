import React, { useState } from "react";
import "./nav.css";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Get role from localStorage
  const role = localStorage.getItem("role"); // "admin" | "user"
  const isAdmin = role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="top-nav">
        <div className="hero-section">
          <div className="menu-icon" onClick={() => setOpen(true)}>
            ☰
          </div>

          <img
            src={require("../images/vitaLogo.png")}
            alt="VITABIOTECH"
            className="logo-img"
          />

          <h2 className="logo">VITABIOTECH PHARMACEUTICALS</h2>

          <button className="lt1" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <span className="close-btn" onClick={() => setOpen(false)}>
          ✖
        </span>

        <div className="vita">
          <img
            src={require("../images/vitaLogo.png")}
            alt="VITABIOTECH"
            className="vita1"
          />
          <h2 className="logo1">VITABIOTECH</h2>
        </div>

        {/* COMMON FOR ALL */}
        <Link to="/home">HOME</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/products">PRODUCT DETAILS</Link>
        <Link to="/price">PRICE LIST</Link>

        {/* 🔒 ADMIN ONLY */}
        {isAdmin && (
          <>
        <Link to="/goods">GOODS BALANCE</Link>
        <Link to="/stockstatement">STOCK STATEMENT</Link>
        <Link to="/outstanding">CHEMIST OUTSTANDING</Link>
        <Link to="/soutstanding">STOCKIST OUTSTANDING</Link>
        <Link to="/sale">SALE FIGURE</Link>
        <Link to="/profit">PROFIT</Link>
        <Link to="/transaction">TRANSACTION HISTORY</Link>
          </>
        )}
      </div>
    </>
  );
}

export default Nav;
