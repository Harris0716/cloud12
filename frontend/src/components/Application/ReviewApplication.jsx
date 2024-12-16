import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ApplicationDetail.css";


function ReviewApplication() {
  const { application_id } = useParams();
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  const statusOptions = ['審核中', '已核准', '已拒絕'];
  const [status, setStatus] = useState('審核中');


  useEffect(() => {
    const fetchApplicationDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/application-detail/${application_id}`);
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

  const handleSubmit = () => {
    // Handle the submit logic here
    console.log('Submitted status:', status);
    // You can add more logic to handle the form submission, such as making an API call
  };

  return (
    application.map((application) => (
      <div key={application.application_id} className="application-detail">
        <h1>申請詳情</h1>
        
        <div className="detail-row">
          <span className="detail-label">申請人名字:</span>
          <span className="detail-value">{application.username}</span>
        </div>
  
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

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="status-dropdown">
            {statusOptions.map((option) => (
                <option key={option} value={option}>
                {option}
                </option>
            ))}
        </select>

        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
    ))
  );
}

export default ReviewApplication;