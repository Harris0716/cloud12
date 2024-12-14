import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './components/LogIn';
import HomePage from './components/HomePage';
import JobDetail from './components/JobDetail';
import WishlistPage from './components/wishlist/Wishlist';
import Resume from './components/UserInfo/Resume';
import Register from './components/Register';
import UserApplications from './components/UserApplications';
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/job/:jobInfo_id" element={<JobDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-applications" element={<UserApplications />} />
      </Routes>
    </Router>
  );
}

export default App;
