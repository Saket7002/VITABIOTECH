import { Link } from "react-router-dom";
import "./first.css";

function Firstpage() {
  return (
    <>
    <div className="home-btn">
                 <Link to="/home">
                            <button className="home-btn1">🏠 Home</button>
                 </Link> 
        </div>
    <div className="about-page">

      {/* SECTION 1 */}
      <section className="about-section">
        <div className="text">
          <h1>VITABIOTECH PHARMACEUTICALS</h1>
          <p>Established in 2011</p>
          <p>Head Office: Bangalore</p>

          <Link to="/products">
            <button className="btn-primary">Our Products</button>
          </Link>
        </div>

        <img src={require("./vita.png")} alt="Vitabiotech" />
      </section>

      {/* SECTION 2 */}
      <section className="about-section light">
        <div className="text">
          <h2 className="red">WHO Certified Company</h2>
          <p>
            Certified for maintaining global standards in quality, safety,
            and manufacturing excellence.
          </p>
        </div>

        <img src={require("./who.png")} alt="WHO" />
      </section>

      {/* SECTION 3 */}
      <section className="about-section">
        <div className="text">
          <h2 className="green">GLP Certified Company</h2>
          <p>
            Following Good Laboratory Practices to ensure reliable
            and accurate results.
          </p>
        </div>

        <img src={require("./glp.png")} alt="GLP" />
      </section>

      {/* SECTION 4 */}
      <section className="about-section light">
        <div className="text">
          <h2 className="blue">ISO 9001:2015 Certified</h2>
          <p>
            Commitment to continuous improvement and customer satisfaction.
          </p>
        </div>

        <img src={require("./iso.png")} alt="ISO" />
      </section>

    </div>
    </>
  );
}

export default Firstpage;

