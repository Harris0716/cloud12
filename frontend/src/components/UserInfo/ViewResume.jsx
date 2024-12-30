import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


function ViewResume() {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const { resume_id } = useParams();

  useEffect(() => {
    const fetchResumeDetail = async () => {
      try {
        console.log(resume_id);
        const response = await fetch(`http://localhost:8000/api/resume/${resume_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch resume details');
        }
        const data = await response.json();
        // Access the first resume from the data array since API returns array
        // setResume(data.data[0]); 
        console.log(data);
      } catch (err) {
        setError(err.message);
        console.error(error);
      }
    };

    fetchResumeDetail();
  }, [resume_id]);



  // return (
  //   <div className="resume-detail">
  //     <h2>履歷資料</h2>
  //     <div className="info-group">
  //       <label>姓名:</label>
  //       <p>{resume.name}</p>
  //     </div>
  //     <div className="info-group">
  //       <label>生日:</label>
  //       <p>{resume.birthdate}</p>
  //     </div>
  //     <div className="info-group">
  //       <label>學歷:</label>
  //       <p>{resume.education}</p>
  //     </div>
  //     <div className="info-group">
  //       <label>居住地:</label>
  //       <p>{resume.residence}</p>
  //     </div>
  //     <div className="info-group">
  //       <label>證照:</label>
  //       <p>{resume.license}</p>
  //     </div>
  //     <div className="info-group">
  //       <label>自我介紹:</label>
  //       <p>{resume.introduction}</p>
  //     </div>
  //   </div>
  // );
}

export default ViewResume;