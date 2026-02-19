import React from "react";
import Nav from "../../nav/nav";
import "./price.css";
import { Link } from "react-router-dom";

export const PRODUCTS = [
  { id: 1, name: "RIFAZOX", pack:"10x10",sch:"5+1",mrp:3800, pts: 2546,ptr:2800.60,gst:"5%"},
  { id: 2, name: "CALOCIT-XT",pack:"10x15",sch:"5+1",mrp:3500, pts: 2345,ptr:2579.50,gst:"5%" },
  { id: 3, name: "NEXODOL-SP",pack:"10x10",sch:"5+1",mrp:1200, pts: 804,ptr:884.40,gst:"5%" },
  { id: 4, name: "MOXIV-CV LB",pack:"10x10",sch:"5+1",mrp:2750, pts: 1842,ptr:2026.75,gst:"5%"},
  { id: 5, name: "DROGIN M",pack:"10x10",sch:"5+1",mrp:950, pts: 636.50,ptr:700.15,gst:"5%"},
  { id: 6, name: "RABBIALL DSR",pack:"10x10",sch:"5+1",mrp:950, pts: 636.50,ptr:700.15,gst:"5%" },
  { id: 7, name: "DOXYVIT B6",pack:"10x10",sch:"5+1",mrp:950, pts: 636.50,ptr:700.15,gst:"5%"},
  { id: 8, name: "CEFOPOX O",pack:"10x10",sch:"5+1",mrp:2625, pts: 1758.75,ptr:1934.62,gst:"5%"},
  { id: 9, name: "SHENOM",pack:"200ML",sch:"5+1",mrp:150, pts: 100.50,ptr:110.55,gst:"5%"},
  { id: 10, name: "CARVITAZYME 100ML",pack:"100ML",sch:"5+1",mrp:105, pts: 70.35,ptr:77.38,gst:"5%"},
  { id: 11, name: "CARVITAZYME 200ML",pack:"200ML",sch:"5+1",mrp:150, pts: 100.50,ptr:110.55,gst:"5%"},
  { id: 12, name: "REXTYL D",pack:"100ML",sch:"5+1",mrp:92, pts: 61.64,ptr:67.80,gst:"5%"},
  { id: 13, name: "OXIZEST L",pack:"200ML",sch:"5+1",mrp:150, pts:100.50,ptr:110.55,gst:"5%"},
  { id: 14, name: "CARVITAZYME DROP",pack:"30ML",sch:"5+1",mrp:100, pts: 67,ptr:73.70,gst:"5%"},
  { id: 15, name: "CONREST DROP",pack:"30ML",sch:"5+1",mrp:78, pts: 52.26,ptr:57.48,gst:"5%"},
  { id: 16, name: "PREFROZ DROP",pack:"30ML",sch:"5+1",mrp:110, pts: 73.70,ptr:81.07,gst:"5%"},
  { id: 17, name: "CEFOPOX DRY SYRUP 50",pack:"30ML",sch:"5+1",mrp:85, pts: 56.95,ptr:62.64,gst:"5%"},
  { id: 18, name: "CEFOPOX DRY SYRUP 100",pack:"30ML",sch:"5+1",mrp:98, pts: 65.66,ptr:72.22,gst:"5%"},
];

function Price() {
  return (
    <>
      <Nav/>
      <h1>PRICE LIST</h1>
      <Link to="/home">
                  <button className="p1">🏠 Home</button>
      </Link>
      <table className="priceList">
  <thead>
    <tr>
      <th>PRODUCT NAME</th>
      <th>PACK</th>
      <th>SCHEME</th>
      <th>MRP</th>
      <th>P.T.S</th>
      <th>P.T.R</th>
      <th>GST</th>
    </tr>
  </thead>

  <tbody>
    {PRODUCTS.map((i) => (
      <tr key={i.id}>
        <td>{i.name}</td>
        <td>{i.pack}</td>
        <td>{i.sch}</td>
        <td>{i.mrp}</td>
        <td>{i.pts}</td>
        <td>{i.ptr}</td>
        <td>{i.gst}</td>
      </tr>
    ))}
  </tbody>
</table>

    </>
  );
}

export default Price;