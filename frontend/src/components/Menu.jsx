import React, { useState, useEffect } from 'react';
import './Menu.css';


function Menu () {

  const userIconURL="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-unb6q333.png";
  const hamburgerMenuURL="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/What%20is%20a%20Hamburger%20Button.png?width=225&name=What%20is%20a%20Hamburger%20Button.png";
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <div className="menu">
      <button onClick={toggleDropdown} className="menu-button">
        <img src={hamburgerMenuURL} alt="Hamburger Menu" className="icon" />&nbsp;&nbsp;&nbsp;
        <img src={userIconURL} alt="User Icon" className="icon" />
      </button>
      {isOpen && !isLoggedIn &&(
        <ul className="dropdown-menu">
            <li className="dropdown-item"><a href="/login">登入</a></li>
            <li className="dropdown-item"><a href="/register">註冊</a></li>
      </ul>
      )}
      {
        isOpen && isLoggedIn && (
          <ul className="dropdown-menu">
            <li className="dropdown-item"onClick={logOut}>登出</li>
          </ul>
        )
      }
    </div>
  );
};

export default Menu;