import React, { useState } from "react";
import Nav from "../../nav/nav";
import "./stock.css";
import { useNavigate } from "react-router-dom";

const STOCKISTS = [
  {
    id: 1,
    name: "S K DRUG AGENCY",
    route: "/sk",
    area: "MUZAFFARPUR",
  },
  {
    id: 2,
    name: "GANESH PHARMA",
    route: "/ganesh",
    area: "MOTIHARI",
  },
  {
    id: 3,
    name: "SELF",
    route: "/self",
    area: "MUZAFFARPUR",
  },
];

function Stockstatement() {
  const navigate = useNavigate();

  const [selectedArea, setSelectedArea] = useState("");
  const [selectedStockist, setSelectedStockist] = useState("");

  // Get unique areas automatically
  const AREAS = [...new Set(STOCKISTS.map((s) => s.area))];

  // Filter stockists by selected area
  const filteredStockists = STOCKISTS.filter(
    (s) => s.area === selectedArea
  );

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedStockist(""); // reset stockist
  };

  const handleStockistChange = (e) => {
    const route = e.target.value;
    setSelectedStockist(route);

    if (route) {
      navigate(route);
    }
  };

  return (
    <>
      <Nav />
      <h1 className="S1">STOCK STATEMENT</h1>
      {/* AREA SELECT */}
      <select
        value={selectedArea}
        onChange={handleAreaChange}
        className="stock-select2"
      >
        <option value="" disabled>
          SELECT AREA
        </option>

        {AREAS.map((area, index) => (
          <option key={index} value={area}>
            {area}
          </option>
        ))}
      </select>

      {/* STOCKIST SELECT */}
      <select
        value={selectedStockist}
        onChange={handleStockistChange}
        disabled={!selectedArea}
        className="stock-select3"
      >
        <option value="" disabled>
          {selectedArea
            ? "SELECT STOCKIST"
            : "SELECT AREA FIRST"}
        </option>

        {filteredStockists.map((stockist) => (
          <option key={stockist.id} value={stockist.route}>
            {stockist.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default Stockstatement;
