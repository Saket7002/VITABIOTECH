import React, { useEffect, useState } from "react";
import Nav from "../../nav/nav";
import { Link } from "react-router-dom";

function Soutstanding() {
  const [rows, setRows] = useState(
    Array.from({ length: 10 }, () => ({
      stockist: "",
      area: "",
      date: "",
      billNo: "",
      billAmount: 0,
    }))
  );
  useEffect(() => {
  const savedData = localStorage.getItem("Soutstanding");

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    setRows(parsedData.rows);
  }
}, []);
  const handleSave = () => {
  localStorage.setItem(
    "Soutstanding",
    JSON.stringify({ rows })
  );
  alert("OUTSTANDING SAVED SUCCESSFULLY ✅");
};

   
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows]; 
    updatedRows[index][field] =
      field === "billAmount" ? Number(value) : value;
    setRows(updatedRows);
  };

  const totalFinalAmount = rows.reduce(
    (sum, row) => sum + row.billAmount,
    0
  );

  return (
    <>
      <Nav />

      <h1 className="S2">STOCKIST OUTSTANDING</h1>
      <button className="ot1" onClick={handleSave}>SAVE</button>
      <Link to="/home">
        <button className="back-ot1">🏠 Home</button>
      </Link>

      <table className="outstanding-table">
        <thead>
          <tr>
            <th>STOCKIST NAME</th>
            <th>AREA</th>
            <th>BILL DATE</th>
            <th>BILL NO.</th>
            <th>BILL AMOUNT</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.stockist}
                  onChange={(e) =>
                    handleChange(index, "stockist", e.target.value)
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
                  value={row.billNo}
                  onChange={(e) =>
                    handleChange(index, "billNo", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.billAmount}
                  onChange={(e) =>
                    handleChange(index, "billAmount", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}

          {/* TOTAL ROW */}
          <tr className="total-row">
            <td colSpan="4" style={{ textAlign: "right" }}>
              TOTAL
            </td>
            <td>
              <input
                type="number"
                value={totalFinalAmount.toFixed(2)}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Soutstanding;
