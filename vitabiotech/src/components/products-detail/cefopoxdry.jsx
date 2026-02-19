import React from "react";
import { Link } from "react-router-dom";
import "./details.css";
import Nav from "../nav/nav";

function Cefopoxdry() {
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
            src={require("../images/CEFOPOX DRY SYRUP 2.png")}
            alt="CEFOPOX DRY SYRUP"
            className="product-img"
          />
        </div>
      </div>
    </>
  );
}

export default Cefopoxdry;
