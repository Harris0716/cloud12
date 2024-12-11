import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./jobDetail.css";

function JobDetail() {
  const { jobInfo_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateError, setDateError] = useState("");

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
        console.log("獲取的資料:", data);
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

  // 日期驗證處理函數
  const handleDateChange = (e) => {
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    if (startDate && endDate) {
      if (new Date(endDate) <= new Date(startDate)) {
        setDateError("結束時間必須晚於開始時間");
        document.getElementById("end-date").value = "";
      } else {
        setDateError("");
      }
    }
  };

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target["applier-name"].value,
      email: e.target.email.value,
      startDate: e.target["start-date"].value,
      endDate: e.target["end-date"].value,
      message: e.target.message.value,
      jobId: jobInfo_id,
    };

    try {
      const response = await fetch("http://localhost:8000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("申請失敗");
      }

      alert("申請成功！");
      e.target.reset();
    } catch (err) {
      alert(err.message);
    }
  };

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
        {console.log("圖片資料:", job.images)}
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
            <div className="period">{job.start_date} ~ {job.end_date}</div>
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
          <br />
          <form onSubmit={handleSubmit}>
            <label>姓名</label>
            <input type="text" id="applier-name" name="applier-name" required />

            <label>email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="start-date">預計開始日期</label>
            <input
              type="date"
              id="start-date"
              name="start-date"
              min={new Date().toISOString().split("T")[0]}
              onChange={handleDateChange}
              required
            />

            <label htmlFor="end-date">預計結束時間</label>
            <input
              type="date"
              id="end-date"
              name="end-date"
              min={new Date().toISOString().split("T")[0]}
              onChange={handleDateChange}
              required
            />
            {dateError && (
              <div
                className="error-message"
                style={{ color: "red", fontSize: "0.8em", marginTop: "0.2em" }}
              >
                {dateError}
              </div>
            )}

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
