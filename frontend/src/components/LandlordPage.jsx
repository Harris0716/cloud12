import React, { useState, useEffect } from "react";
import "./LandlordPage.css";
import HomeButton from "./HomeButton";
import Menu from "./Menu";
import CreateJob from "./CreateJob";
const api_base_url = import.meta.env.VITE_API_URL;
console.log(api_base_url);

const LandlordPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editJob, setEditJob] = useState({});
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const JwtToken = localStorage.getItem("token");
    
    fetch(`${api_base_url}/api/landlord/jobs`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${JwtToken}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch landlord jobs");
      }
      return response.json();
    })
    .then(data => {
      setJobs(data);
      //console.log(data);
    })
    .catch(err => {
      setError(err.message);
      console.error("Error fetching landlord jobs:", err);
    });
  }, []);

  const handleDelete = (jobId) => {
    if (window.confirm('確定要刪除這個職缺嗎？')) {
      const token = localStorage.getItem('token');
      
      fetch(`${api_base_url}/api/jobinfo/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === "刪除 JobInfo 成功") {
          // Remove the job from local state after successful deletion
          setJobs(jobs.filter(job => job.jobInfo_id !== jobId));
          alert('職缺已成功刪除');
        } else {
          alert(data.message || '刪除失敗');
        }
      })
      .catch(error => {
        console.error('Error deleting job:', error);
        alert('刪除失敗，請稍後再試');
      });
    }
  };
  
  // 更新編輯中職缺的圖片
  const handleEditImageChange = (field, value) => {
    setEditJob({ ...editJob, [field]: value });
  };

  // 處理封面照片上傳
  const handleEditCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleEditImageChange('cover_image', url);
    }
  };

  // 處理多張工作環境照片上傳
  const handleEditDetailImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + editJob.detail_images.length <= 5) {
      const urls = files.map(file => URL.createObjectURL(file));
      handleEditImageChange('detail_images', [...editJob.detail_images, ...urls]);
    } else {
      alert('最多只能上傳5張照片');
    }
  };

  // 移除工作環境照片
  const removeEditDetailImage = (index) => {
    const newImages = editJob.detail_images.filter((_, i) => i !== index);
    handleEditImageChange('detail_images', newImages);
  };


  const handleEdit = (jobId) => {
    const job = jobs.find(j => j.jobInfo_id === jobId);
    setEditJob({ ...job });
    setEditingId(jobId);
  };

  const handleSave = (jobId) => {
    const token = localStorage.getItem('token');
    
    // Create FormData object for file upload
    const formData = new FormData();
    
    // Add all job info fields
    formData.append('address', editJob.address);
    formData.append('room_type', editJob.room_type);
    formData.append('start_date', editJob.start_date);
    formData.append('end_date', editJob.end_date);
    formData.append('job_description', editJob.job_description);
    formData.append('positions', editJob.positions);
    formData.append('people_needed', editJob.people_needed);
    formData.append('benefits', JSON.stringify(editJob.benefits));
  
    fetch(`${api_base_url}/api/jobinfo/${jobId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "修改 JobInfo 成功") {
        // Update local state with edited job
        setJobs(jobs.map(job => 
          job.jobInfo_id === jobId ? editJob : job
        ));
        setEditingId(null);
        alert('職缺已成功更新');
      } else {
        throw new Error(data.message || '更新失敗');
      }
    })
    .catch(error => {
      console.error('Error updating job:', error);
      alert('更新職缺時發生錯誤');
    });
  };

  const handleInputChange = (field, value) => {
    setEditJob({ ...editJob, [field]: value });
  };

  return (
    <div className="room-management">
      <HomeButton />
      <div className="header"><Menu /></div>
      <div className="room-management__header">
        <h1 className="room-management__title">打工換宿管理</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="room-management__add-btn"
        >
          <span>＋</span>
          新增職缺
        </button>
      </div>

      <div className="room-management__list">
        {jobs.map((job) => (
          <div key={job.jobInfo_id} className="room-card">
            <div className="room-card__header">
              <div>
                <div className="room-card__title">
                  <span className="room-card__icon">🏠</span>
                    <h2>{job.positions}</h2>
                </div>
                  <p className="room-card__address">{job.address}</p>
              
              </div>
              <div className="room-card__actions">
                <button
                  onClick={() => editingId === job.jobInfo_id ? handleSave(job.jobInfo_id) : handleEdit(job.jobInfo_id)}
                  className="room-card__action-btn"
                  title={editingId === job.jobInfo_id ? "儲存" : "編輯"}
                >
                  {editingId === job.jobInfo_id ? "💾" : "✎"}
                </button>
                
                <button
                  onClick={() => handleDelete(job.jobInfo_id)}
                  className="room-card__action-btn"
                  title="刪除"
                >
                  ❌
                </button>
              </div>
            </div>

            <div className="room-card__info">
              {/* 封面照片 */}
            <div className="room-card__stat">
              <p className="room-card__label">封面照片</p>
              {editingId === job.jobInfo_id ? (
            <div className="form-field">
              <input
                type="file"
                accept="image/*"
                onChange={handleEditCoverImageUpload}
                className="form-field__input"
              />
              <div className="room-card__image-container">
                {editJob.cover_image && (
                  <>
                    <img src={editJob.cover_image} alt="封面照片" />
                    <button
                      onClick={() => handleEditImageChange('cover_image', null)}
                      className="room-card__image-remove"
                      type="button"
                    >
                      ❌
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="room-card__image-container">
              <img src={job.cover_image} alt="封面照片" />
            </div>
          )}
            </div>

            {/* 工作環境照片 */}
            <div className="room-card__stat">
              <p className="room-card__label">工作環境照片</p>
              {editingId === job.jobInfo_id ? (
                <div className="form-field">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleEditDetailImagesUpload}
                    className="form-field__input"
                    disabled={editJob.detail_images.length >= 5}
                  />
                  <div className="room-card__images-grid">
                    {editJob.detail_images.map((image, index) => (
                      <div key={index} className="room-card__image-container">
                        <img src={image} alt={`工作環境照片 ${index + 1}`} />
                        <button
                          onClick={() => removeEditDetailImage(index)}
                          className="room-card__image-remove"
                          type="button"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="room-card__images-grid">
                  {job.detail_images.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`工作環境照片 ${index + 1}`} 
                    />
                  ))}
                </div>
              )}
            </div>
              <div className="room-card__stat">
                <p className="room-card__label">工作期間</p>
                {editingId === job.jobInfo_id ? (
                  <div className="form-grid">
                    <input
                      type="date"
                      value={editJob.start_date}
                      onChange={(e) => handleInputChange('start_date', e.target.value)}
                      className="form-field__input"
                    />
                    <input
                      type="date"
                      value={editJob.end_date}
                      onChange={(e) => handleInputChange('end_date', e.target.value)}
                      className="form-field__input"
                    />
                  </div>
                ) : (
                  <p className="card__value-content">
                    {new Date(job.start_date).toLocaleDateString("zh-TW")} ~{" "}
                    {new Date(job.end_date).toLocaleDateString("zh-TW")}
                  </p>
                )}
              </div>
              <div className="room-card__stat">
                <p className="room-card__label">房型</p>
                {editingId === job.jobInfo_id ? (
                  <input
                    type="text"
                    value={editJob.room_type}
                    onChange={(e) => handleInputChange('room_type', e.target.value)}
                    className="form-field__input"
                  />
                ) : (
                  <p className="room-card__value">{job.room_type}</p>
                )}
              </div>
              <div className="room-card__stat">
                <p className="room-card__label">工作內容</p>
                {editingId === job.jobInfo_id ? (
                  <textarea
                    value={editJob.job_description}
                    onChange={(e) => handleInputChange('job_description', e.target.value)}
                    className="form-field__input form-field__input--textarea"
                    rows="3"
                  />
                ) : (
                  <p className="room-card__value">{job.job_description}</p>
                )}
              </div>
              <div className="room-card__stat">
                <p className="room-card__label">需求人數</p>
                {editingId === job.jobInfo_id ? (
                  <input
                    type="number"
                    value={editJob.people_needed}
                    onChange={(e) => handleInputChange('people_needed', e.target.value)}
                    className="form-field__input"
                    min="1"
                  />
                ) : (
                  <p className="room-card__value">{job.people_needed} 人</p>
                )}
              </div>
              <div className="room-card__stat">
                <p className="room-card__label">福利</p>
                {editingId === job.jobInfo_id ? (
                  <div className="space-y-2">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <input
                        key={index}
                        type="text"
                        value={editJob.benefits[index] || ""}
                        onChange={(e) => {
                          const newBenefits = [...editJob.benefits];
                          newBenefits[index] = e.target.value;
                          handleInputChange('benefits', newBenefits.filter(benefit => benefit !== ""));
                        }}
                        placeholder={`福利 ${index + 1}`}
                        className="form-field__input"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="room-card__tags">
                    {job.benefits.map((benefit, index) => (
                      <span key={index} className="room-card__tag">
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (<CreateJob onClose={() => setShowAddModal(false)}/>)}
    </div>
  );
};

export default LandlordPage;