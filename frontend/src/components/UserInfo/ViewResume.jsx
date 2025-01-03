import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './ViewResume.css';



function ViewResume({ resume_id, onClose }) {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [savedPhoto,setSavedPhoto] = useState([])

  async function getPhoto() {
      const userId = localStorage.getItem("userid")
  
      try {
        const response = await fetch(`http://54.238.10.84:8000/getphoto?userId=${encodeURIComponent(userId)}`, {
          method: 'GET',
        });
    
        // 處理伺服器回應
        if (response.ok) {
          const data = await response.json(); // 如果伺服器回傳 JSON 格式的回應
          const photoUrls = data.data.map(item => item.photoUrl); // 提取所有的 photoUrl
          setSavedPhoto(photoUrls); // 更新状态，保存所有图片 URL
    
        } else {
          console.error('圖片取得失敗:', response.status);
        }
      } catch (error) {
        console.error('取得發生錯誤', error);
      }
    }
   
    useEffect(() => {
      getPhoto();
    }, []); // 只在组件加载时执行一次

  useEffect(() => {
    const fetchResumeDetail = async () => {
      try {
        const response = await fetch(`http://54.238.10.84:8000/api/resume/${resume_id}`);
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
    <>
      <div className="resume-detail">
        <div className='resume-col'>
          <h1>個人履歷</h1>
          
          <div className="info-group">
            <label>姓名:</label>
            <p>{resume.name}</p>
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
        <div className="photo-grid-view">
          {savedPhoto.map((photo, index) => (
            <div className="photo-item-view" key={index}>
              <img src={photo} alt={`圖片${index + 1}`} className="photo-preview" />
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

export default ViewResume;