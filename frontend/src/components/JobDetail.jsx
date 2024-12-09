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
        const response = await fetch(
          `http://localhost:8000/api/job/${jobInfo_id}`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404 ? "工作機會不存在" : "載入失敗"
          );
        }

        const data = await response.json();
        console.log("獲取的資料:", data); // 檢查獲取的資料
        setJob(data);
      } catch (err) {
        console.error("錯誤:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (jobInfo_id) {
      fetchJobDetail();
    }
  }, [jobInfo_id]);

  if (loading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>錯誤: {error}</div>;
  }

  if (!job) {
    return <div>工作機會不存在</div>;
  }

  return (
    <div className="job-detail">
      <div className="job-images">
        {console.log("圖片資料:", job.images)} {/* 調試用 */}
        {Array.isArray(job.images) && job.images.length > 0 ? (
          job.images.map((image, index) => (
            <img
              key={index}
              src={image || "https://fakeimg.pl/800x600?text=No+Image"}
              alt={`工作環境 ${index + 1}`}
              onError={(e) => {
                console.log("圖片載入失敗:", image);
                e.target.src = "https://fakeimg.pl/800x600?text=No+Image";
                e.target.onerror = null;
              }}
            />
          ))
        ) : (
          <div className="no-images">
            <img
              src="https://fakeimg.pl/800x600?text=No+Images+Available"
              alt="無可用圖片"
            />
          </div>
        )}
      </div>
      <div className="job-info-container">
        <div className="job-info">
          <h1 className="job-title">{job.title || job.positions}</h1>
          <div className="job-location">
            <i className="location-icon">📍</i> {job.location || job.address}
          </div>
          <div className="job-basics">
            <div className="room-type">
              住宿類型: {job.roomType || job.room_type}
            </div>
            <div className="period">工作期間: {job.period || job.dates}</div>
            <div className="positions">
              需求人數: {job.peopleNeeded || job.people_needed}人
            </div>
          </div>

          <div className="job-description">
            <h3>工作內容</h3>
            <pre className="description-text">
              {job.description || job.job_description}
            </pre>
          </div>

          <div className="host-info">
            <div className="host-avatar">
              <img src={job.host?.image || job.host_image} alt="主管照片" />
            </div>
            <div className="host-details">
              <h3>負責人: {job.host?.name || job.host_name}</h3>
              <div className="host-rating">
                評分: {job.host?.rating || job.host_rating} ★
              </div>
            </div>
          </div>

          <div className="job-benefits">
            <h3>提供福利</h3>
            <ul>
              {Array.isArray(job.benefits) &&
                job.benefits.map((benefit, index) => (
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
