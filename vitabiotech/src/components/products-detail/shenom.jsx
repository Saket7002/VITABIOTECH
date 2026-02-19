import React from "react";
import { Link } from "react-router-dom";
import "./details.css";
import Nav from "../nav/nav";

function Shenom() {
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
            src={require("../images/SHENOM 2.png")}
            alt="SHENOM"
            className="product-img"
          />
        </div>
      </div>
    </>
  );
}

export default Shenom;
