import React,{useState, useEffect}from "react";
import "./HomePage.css";
import Notification from "./Notification";
import Menu from "./Menu";
import { Link } from "react-router-dom";


function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [jobListings, setJobListings] = useState([]);

    const filteredListings = jobListings.filter((listing) =>
      listing.positions.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
      fetch("http://localhost:8000/api/jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setJobListings(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, []);
  
    return (
      <div className="container">
        <div className="homepage">
          <div className="header">
            <Notification />
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
        {/* 房源列表 */}
        <div className="listing-grid">
          {filteredListings.map((job) => (
            <div key={job.jobInfo_id} className="listing-card">
              <Link to={`/job/${job.jobInfo_id}`}>
                <img src={job.image} alt={job.positions} className="listing-image" />
                <div className="listing-info">
                  <h2 className="listing-title">{job.positions}</h2>
                  <p className="listing-location">{job.address}</p>
                  <p className="listing-price">所需人數:{job.people_needed}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  
}

export default HomePage;
