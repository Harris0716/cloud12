
import React from "react";
import "./LogIn.css";

function LogIn() {
  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error based on the response
        if (data.message != "Login success!") {
          alert(data.message);
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
            <label htmlFor="email">電子郵件</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="example@domain.com"
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
