import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./UserApplications.css";
import Menu from "../Menu";

function UserApplications() {
  const [activeTab, setActiveTab] = useState('申請名單');
  const [applications, setApplications] = useState([]);
  const [landlordApplications, setLandlordApplications] = useState([]);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");

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

  useEffect(() => {
    if (activeTab === '審核名單') {
      const fetchLandlordApplications = () => {
        const JwtToken = localStorage.getItem("token");

        fetch("http://localhost:8000/api/landlord-applications", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch landlord applications");
            }
            return response.json();
          })
          .then((data) => {
            setLandlordApplications(data.result);
          })
          .catch((err) => {
            setError(err.message);
          });
      };

      fetchLandlordApplications();
    }
  }, [activeTab]);

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
        {activeTab === '申請名單' && applications.map((application) => (
          <div className="application" key={application.application_id}>
            <Link to={`/application/${application.application_id}`} >
              <img src={application.cover_image} alt="Cover" />
              <h2>{application.positions}</h2>
            </Link>
          </div>
        ))}
        {activeTab === '審核名單' && landlordApplications.map((application) => (
          <div className="application" key={application.application_id}>
            <Link to={`/application/${application.application_id}`} >
              <img src={application.cover_image} alt="Cover" />
              <h2>{application.positions}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserApplications;