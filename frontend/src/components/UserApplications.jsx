import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserApplications.css";

function UserApplications() {
  const [applications, setApplications] = useState([]);
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
  }, [navigate]);

  
  return (
    <div className="applications-container">
      <h1>我的申請項目</h1>
      <div className="applications-list">
        {applications.map((application) => (
          <div key={application.application_id} className="application-card">
            <h2>申請項目</h2>
            <p>Status: {application.status}</p>
            <p>Start Date: {application.start_date}</p>
            <p>End Date: {application.end_date}</p>
            <p>Message: {application.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserApplications;