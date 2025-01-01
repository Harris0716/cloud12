import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './ViewResume.css';


function ViewResume({ resume_id, onClose }) {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeDetail = async () => {
      try {
        const response = await fetch(`/api/resume/${resume_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch resume details');
        }
        const data = await response.json();
        const resumeData = data.results[0];
        setResume(resumeData);
        //console.log('Fetched resume:', resumeData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching resume:', err);
      }
    };

    fetchResumeDetail();
  }, [resume_id]);

  if (error) return <div>Error: {error}</div>;
  if (!resume) return <div>Loading...</div>;

  return (
    <div className="resume-detail">
      <h1>個人履歷</h1>
      
      <div className="info-group">
        <label>姓名:</label>
        <p>{resume.name}</p>
      </div>

      <div className="info-group">
        <label className=''>生日:</label>
        <p>{new Date(resume.birthdate).toLocaleDateString('zh-TW')}</p>
      </div>

      <div className="info-group">
        <label className=''>學歷:</label>
        <p>{resume.education}</p>
      </div>

      <div className="info-group">
        <label className=''>居住地:</label>
        <p>{resume.residence}</p>
      </div>

      <div className="info-group">
      <label className=''>證照:</label>
        <p>{resume.license}</p>
      </div>

      <div className="info-group">
      <label className=''>自我介紹:</label>
        <p>{resume.introduction}</p>
      </div>
    </div>
  );
}

export default ViewResume;