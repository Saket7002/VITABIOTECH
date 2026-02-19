import React, { useEffect, useState } from "react";
import Nav from "../../nav/nav";
import "./transaction.css";
import { Link } from "react-router-dom";

function Transaction() {
  const [month, setMonth] = useState("");

  const emptyRows = Array.from({ length: 20 }, () => ({
    date: "",
    amount: "",
    from: "",
    sendersbank: "",
    to: "",
    receiverbank: "",
    transactionid: "",
    utrno: "",
    paymentmethod: "",
    remark: "",
  }));

  const [items, setItems] = useState(emptyRows);

  /* 🔹 LOAD DATA FOR SELECTED MONTH */
  useEffect(() => {
    if (!month) return;

    const key = `Transaction-${month}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      // New month → fresh empty rows
      setItems(emptyRows);
    }
  }, [month]);

  /* 🔹 HANDLE INPUT CHANGE */
  const handleChange = (index, field, value) => {
    const updatedRows = [...items];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };
    setItems(updatedRows);
  };

  /* 🔹 TOTAL AMOUNT */
  const totalFinalAmount = items.reduce(
    (sum, row) => sum + (Number(row.amount) || 0),
    0
  );

  /* 🔹 SAVE DATA */
  const handleSave = () => {
    if (!month) {
      alert("Please select month first");
      return;
    }

    localStorage.setItem(
      `Transaction-${month}`,
      JSON.stringify(items)
    );
    alert("Transaction saved ✅");
  };

  return (
    <>
      <Nav />
      <h1>TRANSACTION HISTORY</h1>
      
      {/* MONTH SELECT */}
      <select className="t1" value={month} onChange={(e) => setMonth(e.target.value)}>
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
            <option value="2026-11">Novemebr 2026</option>
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

      {/* TABLE */}
      {month && (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>From</th>
              <th>Sender Bank</th>
              <th>To</th>
              <th>Receiver Bank</th>
              <th>Transaction ID</th>
              <th>UTR No</th>
              <th>Payment Method</th>
              <th>Remark</th>
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
                    type="number"
                    value={row.amount}
                    onChange={(e) =>
                      handleChange(index, "amount", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={row.from}
                    onChange={(e) =>
                      handleChange(index, "from", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={row.sendersbank}
                    onChange={(e) =>
                      handleChange(index, "sendersbank", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={row.to}
                    onChange={(e) =>
                      handleChange(index, "to", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={row.receiverbank}
                    onChange={(e) =>
                      handleChange(index, "receiverbank", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={row.transactionid}
                    onChange={(e) =>
                      handleChange(index, "transactionid", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={row.utrno}
                    onChange={(e) =>
                      handleChange(index, "utrno", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={row.paymentmethod}
                    onChange={(e) =>
                      handleChange(index, "paymentmethod", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={row.remark}
                    onChange={(e) =>
                      handleChange(index, "remark", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan="10">
                <strong>Total Amount: ₹ {totalFinalAmount.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default Transaction;
