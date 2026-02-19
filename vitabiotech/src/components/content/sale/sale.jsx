import React, { useEffect, useState } from "react";
import Nav from "../../nav/nav";
import "./sale.css";

function Sale() {
  const [month, setMonth] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!month) {
      setItems([]);
      return;
    }

    const skData = JSON.parse(
      localStorage.getItem(`Sk-sec-${month}`) || "[]"
    );

    const ganeshData = JSON.parse(
      localStorage.getItem(`ganesh-sec-${month}`) || "[]"
    );

    const selfData = JSON.parse(
      localStorage.getItem(`self-sec-${month}`) || "[]"
    );

    const combined = [...skData, ...ganeshData, ...selfData].reduce(
      (acc, item) => {
        if (!item?.name) return acc;

        if (!acc[item.name]) {
          acc[item.name] = {
            name: item.name,
            secQty: 0,
            secVal: 0,
          };
        }

        acc[item.name].secQty += Number(item.secQty || 0);
        acc[item.name].secVal += Number(item.secVal || 0);

        return acc;
      },
      {}
    );

    setItems(Object.values(combined));
  }, [month]);

  // ✅ TOTAL SALE VALUE
  const totalSecVal = items.reduce(
    (sum, item) => sum + Number(item.secVal || 0),
    0
  );

  return (
    <>
      <Nav />

      <h1 className="sale-title">SALE FIGURE</h1>

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="month-select"
      >
        <option value="">SELECT MONTH</option>
        <option value="2025-12">December 2025</option>
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
        <option value="2026-11">November 2026</option>
        <option value="2026-12">December 2026</option>
      </select>

      <table className="sale-table">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>SALE QTY</th>
            <th>SALE VALUE (₹)</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          ) : (
            <>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.secQty}</td>
                  <td>₹ {item.secVal.toLocaleString()}</td>
                </tr>
              ))}

              {/* ✅ TOTAL ROW */}
              <tr style={{ fontWeight: "bold", background: "#f5f5f5" }} colSpan="2">
                <td>TOTAL</td>
                <td>—</td>
                <td>₹ {totalSecVal.toLocaleString()}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Sale;


