import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./jobDetail.css";

function JobDetail() {
  const { jobInfo_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/job_details/${jobInfo_id}`);
        if (!response.ok) {
          throw new Error('工作資訊獲取失敗');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobInfo_id]);

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤: {error}</div>;
  if (!job) return <div>工作機會不存在</div>;

  // 解析 JSON 字串
  const detailImages = JSON.parse(job.detail_images);
  const benefits = JSON.parse(job.benefits);

  return (
    <div className="job-detail">
      <div className="job-images">
        {detailImages.map((image, index) => (
          <img key={index} src={image} alt={`工作環境 ${index + 1}`} />
        ))}
      </div>
      <div className="job-info-container">
        <div className="job-info">
          <h1 className="job-title">{job.positions}</h1>
          <div className="job-location">
            <i className="location-icon">📍</i> {job.address}
          </div>
          <div className="job-basics">
            <div className="room-type">住宿類型: {job.room_type}</div>
            <div className="period">工作期間: {job.dates}</div>
            <div className="positions">需求人數: {job.people_needed}人</div>
          </div>
          
          <div className="job-description">
            <h3>工作內容</h3>
            <pre className="description-text">{job.job_description}</pre>
          </div>

          <div className="host-info">
            <div className="host-avatar">
              <img src={job.landlord_image} alt="主管照片" />
            </div>
            <div className="host-details">
              <h3>負責人: {job.landlord_name}</h3>
              <div className="host-rating">評分: {job.landlord_rating} ★</div>
            </div>
          </div>

          <div className="job-benefits">
            <h3>提供福利</h3>
            <ul>
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="application-form">
          <h3>申請職缺</h3>
          <form>
            <label htmlFor="start-date">預計開始日期</label>
            <input type="date" id="start-date" name="start-date" required />

            <label htmlFor="duration">預計工作時長</label>
            <select id="duration" name="duration" required>
              <option value="">請選擇</option>
              <option value="1">1個月</option>
              <option value="2">2個月</option>
              <option value="3">3個月</option>
              <option value="6">6個月</option>
            </select>

            <label htmlFor="message">自我介紹與申請動機</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4"
              placeholder="請簡短描述您的經驗和申請這份工作的原因"
              required
            ></textarea>

            <button type="submit">立即申請</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;