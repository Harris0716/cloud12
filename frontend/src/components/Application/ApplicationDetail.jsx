import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ViewResume from '../UserInfo/ViewResume';
import "./ApplicationDetail.css";


function ApplicationDetail() {
  const { application_id } = useParams();
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const statusMapping = {
    '審核中': 'pending',
    '同意': 'approved', 
    '拒絕': 'rejected'
  };

  useEffect(() => {
    const fetchApplicationDetail = async () => {
      try {
        const response = await fetch(`http://54.238.10.84:8000/api/application-detail/${application_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch application details');
        }
        const data = await response.json();
        setApplication(data.result);

      } catch (err) {
        setError(err.message);

      }
    };

    fetchApplicationDetail();
  }, [application_id]);


  if (error) return <div>Error: {error}</div>;
  if (!application) return <div>No application found</div>;


  return (
    application.map((application) => (
      <div key={application.application_id} className="application-detail">
        <h1>申請詳情</h1>
        
        <div className="detail-row">
              <span className="detail-label">申請人名字:</span>
              <button className="username-link" onClick={() => setShowResume(!showResume)}>{application.username}</button>
        </div>

        {showResume && (
          <div className="resume-overlay-backdrop" onClick={() => setShowResume(false)}>
            <div className="resume-overlay" onClick={e => e.stopPropagation()}>
              <button className="close-button" onClick={() => setShowResume(false)}>×</button>
              <ViewResume resume_id={application.resume_id} onClose={() => setShowResume(false)} />
            </div>
          </div>
        )}
  
        <div className="detail-row">
          <span className="detail-label">申請職位:</span>
          <a className="detail-value" href={`/job/${application.job_id}`} >{application.positions}</a>
        </div>
  
        <div className="detail-row">
          <span className="detail-label">開始日:</span>
          <span className="detail-value">{new Date(application.start_date).toLocaleDateString()}</span>
        </div>
  
        <div className="detail-row">
          <span className="detail-label">結束日:</span>
          <span className="detail-value">{new Date(application.end_date).toLocaleDateString()}</span>
        </div>
  
        <div className="message-box">
          <span className="detail-label">申請原因:</span>
          <div className="detail-value">{application.message}</div>
        </div>
  
        <div className="detail-row">
          <span className="detail-label">狀態:</span>
          <span className={`status-badge status-${statusMapping[application.status] || 'pending'}`}>
            {application.status}
          </span>
        </div>
      </div>
    ))
  );
}

export default ApplicationDetail;