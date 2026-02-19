import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://vitabiotech-backend.onrender.com/api/login",  {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("role", data.role);
      navigate("/home");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="main-container">
      <div className="container">

        <div className="container-box1">
          <div className="logo-container"></div>
          <h2 className="welcome-tag"><i>WELCOME TO VITABIOTECH</i></h2>
          <h2 className="welcome-tag1"><i>PHARMACEUTICALS</i></h2>
        </div>

        <div className="container-box2">
          <h2 className="box2-heading"><i>LOGIN TO VITABIOTECH</i></h2>

          <form onSubmit={handleSubmit}>
            <input
              className="email-container"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="password-container"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">LOGIN</button>
          </form>

          <p className="box-3">
            Don't have an account? <a href="/signup">Create one</a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;

