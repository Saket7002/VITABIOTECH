import React, { useState, useEffect } from "react";
import Nav from "../../../nav/nav";
import "./sk.css";
import { Link } from "react-router-dom";

/* ================= PRODUCTS MASTER ================= */
const PRODUCTS = [
  { id: 1, name: "RIFAZOX", rate: 2546.00 },
  { id: 2, name: "CALOCIT-XT", rate: 2345.00 },
  { id: 3, name: "NEXODOL-SP", rate: 804.00 },
  { id: 4, name: "MOXIV-CV LB", rate: 1842.50 },
  { id: 5, name: "DROGIN M", rate: 636.0 },
  { id: 6, name: "RABBIALL DSR", rate: 636.50 },
  { id: 7, name: "DOXYVIT B6", rate: 636.50 },
  { id: 8, name: "CEFOPOX O", rate: 1758.50 },
  { id: 9, name: "SHENOM", rate: 100.50 },
  { id: 10, name: "CARVITAZYME 100ML", rate: 70.35 },
  { id: 11, name: "CARVITAZYME 200ML", rate: 100.50 },
  { id: 12, name: "REXTYL D", rate: 61.64 },
  { id: 13, name: "OXIZEST L", rate: 100.50 },
  { id: 14, name: "CARVITAZYME DROP", rate: 67.00 },
  { id: 15, name: "CONREST DROP", rate: 52.26 },
  { id: 16, name: "PREFROZ DROP", rate: 73.70 },
];

/* ================= COMPONENT ================= */
function Ganesh() {
  const [month, setMonth] = useState("");
  const [items, setItems] = useState([]);

  /* ===== LOAD DATA BASED ON MONTH ===== */
  useEffect(() => {
    if (!month) return;

    const currentKey = `ganesh-${month}`;
    const savedCurrent = localStorage.getItem(currentKey);

    // If month already exists → load it
    if (savedCurrent) {
      setItems(JSON.parse(savedCurrent).items);
      return;
    }

    // Else load previous month data
    const [year, mon] = month.split("-");
    const prevMonth = `${year}-${String(Number(mon) - 1).padStart(2, "0")}`;
    const prevKey = `ganesh-${prevMonth}`;
    const prevData = localStorage.getItem(prevKey);

    if (prevData) {
      const prevItems = JSON.parse(prevData).items;

      const newItems = prevItems.map((item) => {
        const closingQty =
          item.openingQty + item.receiptQty - item.secQty;

        return {
          ...item,
          openingQty: closingQty,
          receiptQty: 0,
          secQty: 0,
        };
      });

      setItems(newItems);
    } else {
      // First month ever
      setItems(
        PRODUCTS.map((p) => ({
          ...p,
          openingQty: 0,
          receiptQty: 0,
          secQty: 0,
        }))
      );
    }
  }, [month]);

  /* ===== HANDLE INPUT CHANGE ===== */
  const handleChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: Number(value) } : item
      )
    );
  };

  /* ===== SAVE MONTH DATA ===== */
  const handleSave = () => {
    if (!month) {
      alert("Please select a month first ❗");
      return;
    }

    localStorage.setItem(`ganesh-${month}`, JSON.stringify({ items }));

    const secData = items.map((item) => ({
    id: item.id,
    name: item.name,
    secQty: item.secQty,
    secVal: item.secQty * item.rate,
  }));

    localStorage.setItem(
      `ganesh-sec-${month}`,
      JSON.stringify(secData)
    );
    alert(`Stock saved for ${month} ✅`);
  };

  return (
    <>
      <Nav />

      <div className="goods-container">
        <h1 className="S1">GANESH PHARMA</h1>
        <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="month-select"
          >
            <option value="">SELECT MONTH</option>
            <option value="2026-01">January 2026</option>
            <option value="2026-02">February 2026</option>
            <option value="2026-03">March 2026</option>
            <option value="2026-04">April 2026</option>
            <option value="2026-05">May 2026</option>
            <option value="2026-06">June 2026</option>
            <option value="2026-07">July 2026</option>
            <option value="2026-08">August 2026</option>
            <option value="2026-09">September 2026</option>
            <option value="2026-10">October 2026</option>
            <option value="2026-11">Novemebr 2026</option>
            <option value="2026-12">December 2026</option>

          </select>

        {/* ===== TOP CONTROLS ===== */}
        <div className="top-controls">
          

          <button className="sk2" onClick={handleSave}>
            💾 SAVE
          </button>

          <Link to="/stockstatement">
            <button className="back-sk">⬅ Back</button>
          </Link>

          <Link to="/home">
            <button className="back-sk1">🏠 Home</button>
          </Link>
        </div>

        {/* ===== TABLE ===== */}
        <table className="goods-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Rate</th>
              <th>Opening Qty</th>
              <th>Opening Value</th>
              <th>Receipt Qty</th>
              <th>Receipt Value</th>
              <th>Sale Qty</th>
              <th>Sale Value</th>
              <th>Closing Qty</th>
              <th>Closing Value</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const openingVal = item.openingQty * item.rate;
              const receiptVal = item.receiptQty * item.rate;
              const saleVal = item.secQty * item.rate;
              const closingQty =
                item.openingQty + item.receiptQty - item.secQty;
              const closingVal = closingQty * item.rate;

              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹ {item.rate}</td>

                  <td>
                    <input
                      type="number"
                      value={item.openingQty}
                      onChange={(e) =>
                        handleChange(item.id, "openingQty", e.target.value)
                      }
                    />
                  </td>

                  <td>₹ {openingVal}</td>

                  <td>
                    <input
                      type="number"
                      value={item.receiptQty}
                      onChange={(e) =>
                        handleChange(item.id, "receiptQty", e.target.value)
                      }
                    />
                  </td>

                  <td>₹ {receiptVal}</td>

                  <td>
                    <input
                      type="number"
                      value={item.secQty}
                      onChange={(e) =>
                        handleChange(item.id, "secQty", e.target.value)
                      }
                    />
                  </td>

                  <td>₹ {saleVal}</td>
                  <td>{closingQty}</td>
                  <td>₹ {closingVal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Ganesh;
