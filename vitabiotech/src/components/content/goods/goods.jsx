import { useState, useEffect } from "react";
import "./goods.css";
import { Link } from "react-router-dom";
import Nav from "../../nav/nav";

/* 🔹 PRODUCTS MASTER */
export const PRODUCTS = [
  { id: 1, name: "RIFAZOX", rate: 84.00 },
  { id: 2, name: "CALOCIT-XT", rate: 24.15 },
  { id: 3, name: "NEXODOL-SP", rate: 11.02 },
  { id: 4, name: "MOXIV-CV LB", rate: 59.85 },
  { id: 5, name: "DROGIN M", rate: 10.50 },
  { id: 6, name: "RABBIALL DSR", rate: 10.50 },
  { id: 7, name: "DOXYVIT B6", rate: 10.50 },
  { id: 8, name: "CEFOPOX O", rate: 59.85 },
  { id: 9, name: "SHENOM", rate: 18.90 },
  { id: 10, name: "CARVITAZYME 100ML", rate: 12.60 },
  { id: 11, name: "CARVITAZYME 200ML", rate: 17.85 },
  { id: 12, name: "REXTYL D", rate: 14.17 },
  { id: 13, name: "OXIZEST L", rate: 18.90 },
  { id: 14, name: "CARVITAZYME DROP", rate: 10.50 },
  { id: 15, name: "CONREST DROP", rate: 13.65 },
  { id: 16, name: "PREFROZ DROP", rate: 16.80 },
  { id: 17, name: "CEFOPOX DRY SYRUP 50", rate: 26.25 },
  { id: 18, name: "CEFOPOX DRY SYRUP 100", rate: 30.45 },
];

/* 🔹 EMPTY ROW */
const createRow = (p, openingQty = 0) => ({
  ...p,
  openingQty,
  receiptQty: 0,
  secQty: 0,
  sampleQty: 0,
});

function GoodsBalance() {
  const [month, setMonth] = useState("");
  const [items, setItems] = useState([]);

  /* 🔹 LOAD MONTH DATA */
  useEffect(() => {
    if (!month) return;

    const currentKey = `goods-${month}`;
    const savedCurrent = localStorage.getItem(currentKey);

    if (savedCurrent) {
      setItems(JSON.parse(savedCurrent));
      return;
    }

    // 🔹 PREVIOUS MONTH LOGIC
    const [year, mon] = month.split("-");
    const prevMonth = `${year}-${String(Number(mon) - 1).padStart(2, "0")}`;
    const prevKey = `goods-${prevMonth}`;
    const prevData = localStorage.getItem(prevKey);

    if (prevData) {
      const prevItems = JSON.parse(prevData);

      const newItems = prevItems.map((i) => {
        const closingQty =
          i.openingQty + i.receiptQty - i.secQty - i.sampleQty;

        return createRow(i, closingQty);
      });

      setItems(newItems);
    } else {
      setItems(PRODUCTS.map((p) => createRow(p)));
    }
  }, [month]);

  /* 🔹 SAVE MONTH DATA */
  const handleSave = () => {
    if (!month) {
      alert("Please select month first");
      return;
    }

    localStorage.setItem(`goods-${month}`, JSON.stringify(items));
    alert("Goods balance saved successfully ✅");
  };

  /* 🔹 INPUT HANDLER */
  const handleChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, [field]: Number(value) || 0 } : i
      )
    );
  };

  /* 🔹 TOTAL CALCULATION */
  const totals = items.reduce(
    (t, i) => {
      const closingQty =
        i.openingQty + i.receiptQty - i.secQty - i.sampleQty;

      return {
        openingQty: t.openingQty + i.openingQty,
        openingAmt: t.openingAmt + i.openingQty * i.rate,
        receiptQty: t.receiptQty + i.receiptQty,
        receiptAmt: t.receiptAmt + i.receiptQty * i.rate,
        secQty: t.secQty + i.secQty,
        secAmt: t.secAmt + i.secQty * i.rate,
        sampleQty: t.sampleQty + i.sampleQty,
        sampleAmt: t.sampleAmt + i.sampleQty * i.rate,
        closingQty: t.closingQty + closingQty,
        closingAmt: t.closingAmt + closingQty * i.rate,
      };
    },
    {
      openingQty: 0,
      openingAmt: 0,
      receiptQty: 0,
      receiptAmt: 0,
      secQty: 0,
      secAmt: 0,
      sampleQty: 0,
      sampleAmt: 0,
      closingQty: 0,
      closingAmt: 0,
    }
  );

  return (
    <>
      <Nav />
      <div className="goods-container">
        <h2 className="title">GOODS BALANCE</h2>

        {/* 🔹 MONTH SELECT */}
        <select
          className="month-select1"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
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
            <option value="2026-11">Novemebr 2026</option>
            <option value="2026-12">December 2026</option>
        </select>

        <div className="g1">
          <button className="g2" onClick={handleSave}>SAVE</button>
          <Link to="/home">
            <button className="g3">🏠 Home</button>
          </Link>
        </div>

        {/* 🔹 TABLE */}
        <table className="goods-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Rate</th>
              <th>Opening Qty</th>
              <th>Opening Val</th>
              <th>Receipt Qty</th>
              <th>Receipt Val</th>
              <th>Sec Qty</th>
              <th>Sec Val</th>
              <th>Sample Qty</th>
              <th>Sample Val</th>
              <th>Closing Qty</th>
              <th>Closing Val</th>
            </tr>
          </thead>

          <tbody>
            {items.map((i) => {
              const closingQty =
                i.openingQty + i.receiptQty - i.secQty - i.sampleQty;

              return (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>₹ {i.rate}</td>

                  <td><input type="number" value={i.openingQty}
                    onChange={(e) => handleChange(i.id, "openingQty", e.target.value)} /></td>
                  <td>₹ {(i.openingQty * i.rate).toFixed(2)}</td>

                  <td><input type="number" value={i.receiptQty}
                    onChange={(e) => handleChange(i.id, "receiptQty", e.target.value)} /></td>
                  <td>₹ {(i.receiptQty * i.rate).toFixed(2)}</td>

                  <td><input type="number" value={i.secQty}
                    onChange={(e) => handleChange(i.id, "secQty", e.target.value)} /></td>
                  <td>₹ {(i.secQty * i.rate).toFixed(2)}</td>

                  <td><input type="number" value={i.sampleQty}
                    onChange={(e) => handleChange(i.id, "sampleQty", e.target.value)} /></td>
                  <td>₹ {(i.sampleQty * i.rate).toFixed(2)}</td>

                  <td>{closingQty}</td>
                  <td>₹ {(closingQty * i.rate).toFixed(2)}</td>
                </tr>
              );
            })}

            <tr className="total-row">
              <td colSpan="2">TOTAL</td>
              <td>{totals.openingQty}</td>
              <td>₹ {totals.openingAmt.toFixed(2)}</td>
              <td>{totals.receiptQty}</td>
              <td>₹ {totals.receiptAmt.toFixed(2)}</td>
              <td>{totals.secQty}</td>
              <td>₹ {totals.secAmt.toFixed(2)}</td>
              <td>{totals.sampleQty}</td>
              <td>₹ {totals.sampleAmt.toFixed(2)}</td>
              <td>{totals.closingQty}</td>
              <td>₹ {totals.closingAmt.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GoodsBalance;


