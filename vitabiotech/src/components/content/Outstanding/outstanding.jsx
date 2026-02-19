import React, { useEffect, useState } from "react";
import Nav from "../../nav/nav";
import "./outstanding.css";
import { Link } from "react-router-dom";

function Outstanding() {
  const [rows, setRows] = useState(
    Array.from({ length: 20 }, () => ({
      chemist: "",
      area: "",
      stockist: "",
      date: "",
      billNo: "",
      billAmount: 0,
      discount: 0,
    })),
  );

  useEffect(() => {
    const savedData = localStorage.getItem("Outstanding");
    if(savedData){
      const parseData = JSON.parse(savedData);
      setRows(parseData.rows);
    }
  },[])
  
  const handleSave = () =>{
    localStorage.setItem("Outstanding",JSON.stringify({rows})
  );
  alert("OUTSTANDING SAVED SUCCESSFULLY ✅");
  }; 

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  const calculateFinalAmount = (bill, discount) => {
    if (!bill) return 0;
    return bill - (bill * discount) / 100;
  };

  const totalFinalAmount = rows.reduce(
    (sum, row) => sum + calculateFinalAmount(row.billAmount, row.discount),
    0,
  );

  return (
    <>
      <Nav />
      <h1 className="S1">CHEMIST OUTSTANDING</h1>
      <button className="ot1" onClick={handleSave}>SAVE</button>
      <Link to="/home">
                   <button className="back-ot1">🏠 Home</button>
                 </Link>
      <table className="outstanding-table">
        <thead>
          <tr>
            <th>CHEMIST NAME</th>
            <th>AREA</th>
            <th>STOCKIST NAME</th>
            <th>BILL DATE</th>
            <th>BILL NO.</th>
            <th>BILL AMOUNT</th>
            <th>DISCOUNT (%)</th>
            <th>FINAL AMOUNT</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => {
            const finalAmount = calculateFinalAmount(
              row.billAmount,
              row.extraDiscount,
            );

            return (
              <tr key={index}>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="date" />
                </td>
                <td>
                  <input type="text" />
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

                <td>
                  <input
                    type="number"
                    value={row.extraDiscount}
                    onChange={(e) =>
                      handleChange(index, "extraDiscount", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={finalAmount.toFixed(2)}
                    readOnly
                  />
                </td>
              </tr>
            );
          })}

          {/* TOTAL ROW */}
          <tr style={{ backgroundColor: "#eef1ff", fontWeight: "700" }}>
            <td
              colSpan="7"
              style={{ textAlign: "right", paddingRight: "15px" }}
            >
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

export default Outstanding;
