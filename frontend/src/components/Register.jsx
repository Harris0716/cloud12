import React from "react";
import "./LogIn.css";

function Register() {
  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">註冊</h2>
        
        <form className="form">
          <div className="input-group">
            <label htmlFor="name">使用者名稱</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your Name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="user_id">使用者id</label>
            <input
              id="user_id"
              name="user_id"
              type="text"
              required
              placeholder="Your User ID"
            />
          </div>

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
            註冊
          </button>

          <p className="register-link">
            已經有帳號了？<a href="/login">立即登入</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;