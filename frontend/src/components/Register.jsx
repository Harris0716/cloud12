import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

function Register() {
  const navigate = useNavigate();
  const handleSqlInit = async (user_id, username) => {

    const userInfo = {
      user_id: user_id,
      username: username,
      education: "未填寫",
      residence: "未填寫",
      license: "未填寫",
      introduction: "未填寫",
    }
    
    try {
      const response = await fetch("http://54.238.10.84:8000/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo), // 傳送 userInfo
      });
  
      if (!response.ok) {
        throw new Error("初始新增用戶資料失敗");
      }
      alert("初始新增用戶資料成功！"); 
    } catch (error) {
      console.error("初始新增用戶資料發生錯誤:", error);
      alert("儲存失敗，請稍後再試！");
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const username = formData.get('name');
    const user_id = formData.get('user_id');
    const email = formData.get('email');
    const password = formData.get('password');
    fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, user_id, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error based on the response
        if (data.message === "註冊成功!") {
          handleSqlInit(user_id, username)
          alert(data.message);
          navigate("/login");
        }
        else{
          alert(`${data.message}:${data.error.sqlMessage}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      }); 
  }
  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">註冊</h2>
        
        <form className="form" onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
  );
}

export default Register;