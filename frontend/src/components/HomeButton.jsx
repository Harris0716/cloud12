import React from "react";
import { useNavigate } from 'react-router-dom';
import "./HomeButton.css";

function HomeButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }
    return (
        <div>
            <button className="home-btn" onClick={handleClick}>🏠 Home</button>
        </div>
    );
}

export default HomeButton;