import React, { useEffect, useState } from "react";
import Nav from "../nav/nav";
import "./home.css";

import vita from "../images/V1.png";
import who from "../images/V2.png";
import glp from "../images/V3.png";
import iso from "../images/V4.png";

const images = [vita, who, glp, iso];

function Home() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <>
      <Nav />

      {/* TEXT SECTION */}
      <div className="hero-text">
        <h1 className="V2">WELCOME TO</h1>
        <h1 className="V1">VITABIOTECH PHARMACEUTICALS</h1>
      </div>

      {/* SLIDER */}
      <div className="slider">
        <img src={images[current]} alt="slide" className="slide-img" />

        <button className="prev" onClick={prevSlide}>❮</button>
        <button className="next" onClick={nextSlide}>❯</button>
      </div>
    </>
  );
}

export default Home;
