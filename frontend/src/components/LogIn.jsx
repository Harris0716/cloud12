import React from 'react';
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
const api_base_url = import.meta.env.VITE_API_URL;

function LogIn() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user_id = formData.get("user_id");
    const password = formData.get("password");
    fetch(`${api_base_url}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error based on the response
        if (data.message != "登入成功!") {
          alert(data.message);
        }else{
          alert(data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username",data.user.username);
          localStorage.setItem("userid",data.user.user_id);
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
            <label htmlFor="username">使用者ID</label>
            <input
              id="user_id"
              name="user_id"
              type="text"
              required
              placeholder="your userid"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">密碼</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="your password"
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
