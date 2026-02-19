import React from "react";
import { Link } from "react-router-dom";
import "./details.css";
import Nav from "../nav/nav";

function Nexodol() {
  return (
    <>
      <Nav/>
      <div className="detail">
        <div className="detail1">
          <Link to="/products">
            <button className="back">⬅ Back</button>
          </Link>
          <Link to="/home">
            <button className="back">🏠 Home</button>
          </Link>
        </div>
        <div>
          <img
            src={require("../images/NEXODOL SP 2.png")}
            alt="Nexodol"
            className="product-img"
          />
        </div>
      </div>
    </>
  );
}

export default Nexodol;
