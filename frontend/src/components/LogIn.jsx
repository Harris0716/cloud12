import React from 'react';
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

function LogIn() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error based on the response
        if (data.message != "Login success!") {
          alert(data.message);
        }else{
          alert(data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username",data.user.username);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">登入</h2>
        
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">使用者</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="your username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">密碼</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="submit-btn">
            登入
          </button>

        </form>
      </div>
    </div>
  );
}

export default LogIn;
