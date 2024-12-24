import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import HomeButton from "./HomeButton";

function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [jobListings, setJobListings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch("http://localhost:8000/api/jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          //console.log('收到的資料:', data);
          setJobListings(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          //console.error("Error:", error);
          setError(error.message);
        });
    }, []);

    const filteredListings = jobListings.filter((listing) =>
      listing.positions.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleOnclick = (jobInfo_id) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("請先登入");
        return;
      }
      fetch("http://localhost:8000/api/wishlist", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobinfo_id: jobInfo_id
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Add wishlist successfully!") {
          alert("成功加入願望清單");
        }
      })
      .catch(err => {
        console.error(err);
        alert("加入願望清單失敗");
      });
    }

    return (
      <div className="container">
        <div className="homepage">
          <HomeButton />
          <div className="header">
            <Menu />
          </div>
          <br /><br /><br />
          <h1 className="title">所有換宿</h1>
          {/* 搜尋欄位 */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="搜尋換宿..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="listing-grid">
          {filteredListings.map((job) => (
            <div key={job.jobInfo_id} className="listing-card">
              <Link to={`/job/${job.jobInfo_id}`}>
                <img 
                  src={job.cover_image} 
                  alt={job.positions} 
                  className="listing-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://fakeimg.pl/300/';
                  }}
                />
                <div className="listing-info">
                  <h2 className="listing-title">{job.positions}</h2>
                  <div className="job-details">
                    <p className="listing-content"> {job.address}</p>
                    <p className="listing-content"> 房型: {job.room_type}</p>
                    <p className="listing-content"> {new Date(job.start_date).toLocaleDateString()} ~ {new Date(job.end_date).toLocaleDateString()}</p>
                    <p className="listing-people"> 所需人數: {job.people_needed}</p>
                  </div>
                </div>
              </Link>
              <button className="wishlist-btn" onClick={()=>handleOnclick(job.jobInfo_id)}>♡ 加入心願清單</button>
            </div>
          ))}
        </div>
      </div>
    );
}

export default HomePage;