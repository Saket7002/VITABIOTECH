import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ added
import "./signup.css";

function Signup() {
  const navigate = useNavigate();   // ✅ added

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://vitabiotech.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.errors?.[0] || data.message || "Signup failed");
        setLoading(false);
        return;
      }

      alert("Signup successful!");

      // ✅ FIXED: Use React Router navigation
      navigate("/login");

    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="container-box1-signup">
        <div className="logo-container-signup"></div>
        <h2 className="welcome-tag"><i>WELCOME TO VITABIOTECH</i></h2>
        <h2 className="welcome-tag1-signup"><i>PHARMACEUTICALS</i></h2>
      </div>

      <div className="signup-box1">
        <div className="box">
          <h1 className="box1-heading1">CREATE NEW ACCOUNT</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              name="firstname"
              placeholder="Enter Your First Name"
              className="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              name="lastname"
              placeholder="Enter Your Last Name"
              className="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <span className="icon">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              className="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? "CREATING..." : "SIGNUP"}
          </button>
        </form>

        <p className="signup-para">
          Already have an account?{" "}
          <span
            className="link-to-login"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
