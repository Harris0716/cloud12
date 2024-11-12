
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './components/LogIn';
import HomePage from './components/HomePage';
import RoomDetail from './components/RoomDetail';
import Register from './components/Register';
import "./App.css";


function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/room" element={<RoomDetail />} />
      </Routes>
      <Routes><Route path="/register" element={<Register />} /></Routes>
    </Router>
  );
}

export default App;
