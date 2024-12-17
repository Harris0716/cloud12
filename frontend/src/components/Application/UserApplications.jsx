import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./UserApplications.css";
import Menu from "../Menu";

function UserApplications() {
  const [activeTab, setActiveTab] = useState('已申請名單');
  const [applications, setApplications] = useState([]);
  const [landlordApplications, setLandlordApplications] = useState([]);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const currentTime = new Date().getTime();

  const handleButtonClick = (application_id, status, end_date) => {
    if (status !== "同意" || currentTime > end_date) {
      fetch(`http://localhost:8000/api/delete-application/${application_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "成功刪除申請") {
          alert("刪除成功");
          window.location.reload();
        }else{
          alert("刪除失敗");
        }
      })
      .catch((error) => {
          setError(error.message);
      });
    }else{
      alert("已經同意的申請或結束截止日期比今天晚的無法刪除");
    }
  };

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
    if (activeTab === '未審核名單') {
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
        <button className={activeTab === '已申請名單' ? 'active' : ''} onClick={() => setActiveTab('已申請名單')}>
          已申請名單
        </button>
        <button className={activeTab === '未審核名單' ? 'active' : ''} onClick={() => setActiveTab('未審核名單')}>
          未審核名單
        </button>
      </div>
      <div className="application-container">
        {activeTab === '已申請名單' && applications.map((application) => (
          <div className="application" key={application.application_id}>
            <Link to={`/application/${application.application_id}`} >
              <img src={application.cover_image} alt="Cover" />
              <h2>{application.positions}</h2>
            </Link>
            <button className="button-custom" onClick={() => handleButtonClick(application.application_id, application.status, application.end_date)}>刪除</button>
          </div>
        ))}
        {activeTab === '審核名單' && landlordApplications.map((application) => (
          <div className="application" key={application.application_id}>
            <Link to={`/review-application/${application.application_id}`} >
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