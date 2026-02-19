import React, { useEffect, useState } from "react";
import Nav from "../../nav/nav";
import "./profit.css";
import { Link } from "react-router-dom";

function Profit() {
  const [month, setMonth] = useState("");

  // 🔹 Function to create empty rows
  const createEmptyRows = () =>
    Array.from({ length: 30 }, () => ({
      date: "",
      chemistname: "",
      area: "",
      amount: "",
      baseAmount: "",
      profit: 0,
    }));

  const [items, setItems] = useState(createEmptyRows());

  /* 🔹 LOAD DATA FOR SELECTED MONTH */
  useEffect(() => {
    if (!month) return;

    const key = `Profit-${month}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(createEmptyRows());
    }
  }, [month]);

  /* 🔹 HANDLE INPUT CHANGE */
  const handleChange = (index, field, value) => {
    const updatedRows = [...items];

    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };

    // ✅ Auto calculate profit
    const amount = Number(updatedRows[index].amount) || 0;
    const baseAmount = Number(updatedRows[index].baseAmount) || 0;

    updatedRows[index].profit = amount - baseAmount;

    setItems(updatedRows);
  };

  /* 🔹 TOTAL PROFIT */
  const totalFinalAmount = items.reduce(
    (sum, row) => sum + (Number(row.profit) || 0),
    0
  );

  /* 🔹 SAVE DATA */
  const handleSave = () => {
    if (!month) {
      alert("Please select month first");
      return;
    }

    localStorage.setItem(`Profit-${month}`, JSON.stringify(items));
    alert("Profit data saved ✅");
  };

  return (
    <>
      <Nav />
      <h1>PROFIT</h1>

      {/* 🔹 MONTH SELECT */}
      <select
        className="pp1"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="">Select Month</option>
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

      <div className="g1">
        <button className="g2" onClick={handleSave}>
          SAVE
        </button>

        <Link to="/home">
          <button className="g3">🏠 Home</button>
        </Link>
      </div>

      {/* 🔹 TABLE */}
      {month && (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Date</th>
              <th>Chemist Name</th>
              <th>Area</th>
              <th>Amount</th>
              <th>Base Amount</th>
              <th>Profit</th>
            </tr>
          </thead>

          <tbody>
            {items.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) =>
                      handleChange(index, "date", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={row.chemistname}
                    onChange={(e) =>
                      handleChange(index, "chemistname", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={row.area}
                    onChange={(e) =>
                      handleChange(index, "area", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={row.amount}
                    onChange={(e) =>
                      handleChange(index, "amount", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={row.baseAmount}
                    onChange={(e) =>
                      handleChange(index, "baseAmount", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={row.profit}
                    readOnly
                  />
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan="6">
                <strong>
                  Total Profit: ₹ {totalFinalAmount.toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default Profit;
