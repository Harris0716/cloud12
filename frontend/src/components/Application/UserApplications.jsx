import React, { useEffect, useState } from "react";
import "./UserApplications.css";
import Menu from "../Menu";
import { useNavigate } from "react-router-dom";

function UserApplications() {
  const [activeTab, setActiveTab] = useState('申請名單');
  const [applications, setApplications] = useState([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = () => {
      const JwtToken = localStorage.getItem("token");

      fetch("http://localhost:8000/api/my-applications", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${JwtToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch applications");
          }
          return response.json();
        })
        .then((data) => {
          setApplications(data.result);
        })
        .catch((err) => {
          setError(err.message);
          
        });
    };

    fetchApplications();
  }, []);

  
  return (
    <div>
      <div className="header"><Menu /></div>
      <div className="top-banner">{username}的申請列表</div>
      <div className="tabs">
        <button className={activeTab === '申請名單' ? 'active' : ''} onClick={() => setActiveTab('申請名單')}>
          申請名單
        </button>
        <button className={activeTab === '審核名單' ? 'active' : ''} onClick={() => setActiveTab('審核名單')}>
          審核名單
        </button>
      </div>
      <div className="application-container">
        {applications.map((application) => (
          <div className="application" key={application.applications_id}>
            <img src={application.cover_image} alt="Cover" />
            <h2>{application.positions}</h2>
            <p>{application.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserApplications;