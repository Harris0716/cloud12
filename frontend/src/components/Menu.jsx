import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Menu.css';


function Menu () {

  const userIconURL="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-unb6q333.png";
  const hamburgerMenuURL="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/What%20is%20a%20Hamburger%20Button.png?width=225&name=What%20is%20a%20Hamburger%20Button.png";
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate()
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    if(localStorage.getItem("username")){
      setUsername(localStorage.getItem("username"));
    }
  }, []);
  
  const logOut = () => {
    navigate("/");
    localStorage.clear();
    setIsLoggedIn(false);
  }

  const wishList = () => {
    navigate("/wishlist")
  }

  const resume = () => {
    navigate("/resume")
  }

  const application = () => {
    navigate("/my-applications")
  }


  return (
    <div className="menu">
      <button onClick={toggleDropdown} className="menu-button">
        <img src={hamburgerMenuURL} alt="Hamburger Menu" className="icon" />&nbsp;&nbsp;&nbsp;
        <img src={userIconURL} alt="User Icon" className="icon" /> &nbsp;&nbsp;
        {isLoggedIn && username}
      </button>
      {
        isOpen && !isLoggedIn &&(
        <ul className="dropdown-menu">
            <li className="dropdown-item"><a href="/login">登入</a></li>
            <li className="dropdown-item"><a href="/register">註冊</a></li>
        </ul>
      )}
      {
        isOpen && isLoggedIn && (
          <ul className="dropdown-menu">
            {/* 可以根據不同的功能再更改或新增 */}
            <li className="dropdown-item"onClick={resume}>個人履歷</li>
            <li className="dropdown-item">管理房源</li>
            <li className="dropdown-item" onClick={application}>申請及審核</li> 
            <li className="dropdown-item"onClick={wishList}>心願清單</li>
            <li className="dropdown-item"onClick={logOut}>登出</li>
          </ul>
        )
      }
    </div>
  );
};

export default Menu;