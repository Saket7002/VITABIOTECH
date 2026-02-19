import React from "react";
import { Link } from "react-router-dom";
import "./product.css";
import Nav from "../nav/nav";

import rifazox from "../images/RIFAZOX 2.png";
import calocit from "../images/CALOCIT XT 1.png";
import nexodol from "../images/NEXODOL SP 1.png";
import drogin from "../images/DROGIN M 1.png";
import doxyvit from "../images/DROGIN M 1.png";
import cefopox from "../images/CEFOPOX O 1.png";
import moxiv from "../images/MOXIV CV 1.png";
import carvitDrop from "../images/CARVITAZYME DROP 1.png";
import prefroz from "../images/PREFROZ 1.png";
import conrest from "../images/CONREST DROP 1.png";
import cefopoxDry from "../images/CEFOPOX DRY SYRUP 1.png";
import carvitSyrup from "../images/CARVITAZYME 3.png";
import oxizest from "../images/OXIZEST L 1.png";
import shenom from "../images/SHENOM 1.png";
import rextyl from "../images/REXTRL D 1.png";

const DETAILS = [
  { id: 1, name: "RIFAZOX 400mg", image: rifazox, link: "/rifazox" },
  { id: 2, name: "CALOCIT-XT", image: calocit, link: "/calocit" },
  { id: 3, name: "NEXODOL-SP", image: nexodol, link: "/nexodol" },
  { id: 4, name: "DROGIN-M", image: drogin, link: "/drogin" },
  { id: 5, name: "DOXYVIT B6", image: doxyvit, link: "/doxyvit" },
  { id: 6, name: "CEFOPOX O", image: cefopox, link: "/cefopox" },
  { id: 7, name: "MOXIV CV LB", image: moxiv, link: "/moxiv" },
  { id: 8, name: "CARVITAZYME DROP", image: carvitDrop, link: "/carvitazymedrop" },
  { id: 9, name: "PREFROZ DROP", image: prefroz, link: "/prefroz" },
  { id: 10, name: "CONREST DROP", image: conrest, link: "/conrest" },
  { id: 11, name: "CEFOPOX DRY SYRUP", image: cefopoxDry, link: "/cefopoxdry" },
  { id: 12, name: "CARVITAZYME 100/200 ML", image: carvitSyrup, link: "/carvitazyme" },
  { id: 13, name: "OXIZEST L SYRUP", image: oxizest, link: "/oxizest" },
  { id: 14, name: "SHENOM SYRUP", image: shenom, link: "/shenom" },
  { id: 15, name: "REXTYL D SYRUP", image: rextyl, link: "/rextyl" },
];


function Products() {
  

  return (
    <>
    <Nav/>
    <h1 className="title"> OUR PRODUCTS</h1>
    <div className="detail1">
             <Link to="/home">
                        <button className="back">🏠 Home</button>
             </Link> 
    </div>
    <div className="product-grid">
      {DETAILS.map((products) => (
        <div className="product-card" key={products.id}>
          <img src={products.image} alt={products.name}/>
          <h2>{products.name}</h2>
          <Link to={products.link}>
                <button className="detail-btn">Detail</button>
          </Link>
        </div>
      ))

      }
    </div>
    
    </>
  );
}

export default Products;