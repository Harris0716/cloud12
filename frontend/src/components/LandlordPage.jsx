import React, { useState } from "react";
import "./LandlordPage.css";
import HomeButton from "./HomeButton";
import Menu from "./Menu";

const LandlordPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editJob, setEditJob] = useState({});

  const [jobs, setJobs] = useState([
    {
      id: 1,
      address: "台北市大安區溫州街",
      roomType: "單人套房",
      start_date: "2024-04-01",
      end_date: "2024-09-30",
      jobDescription: "1. 每週工作5天，每天4小時\n2. 協助打掃環境及整理房間\n3. 接待客人入住與退房手續\n4. 提供旅遊諮詢服務",
      positions: "民宿清潔人員",
      peopleNeeded: 2,
      benefits: ["免費住宿","提供早餐","免費網路","洗衣機","公共廚房"],
      coverImage: "https://plus.unsplash.com/premium_photo-1683769250375-1bdf0ec9d80f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      detailImages: ["https://plus.unsplash.com/premium_photo-1733514691616-cecf39b1c970?q=80&w=2133&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1732752798217-3a7417457f93?q=80&w=2046&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1733473571606-399837d6f9a5?q=80&w=2514&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
    },
    {
      id: 2,
      address: "宜蘭縣礁溪鄉溫泉路",
      roomType: "雙人和室",
      start_date: "2024-05-01",
      end_date: "2024-08-31",
      jobDescription: "1. 每週工作5天，每天6小時\n2. 協助溫泉旅館前台接待服務\n3. 處理訂房事宜及回覆客人訊息\n4. 環境清潔維護",
      positions: "溫泉旅館櫃檯人員",
      peopleNeeded: 1,
      benefits: ["免費住宿","三餐供應","免費泡湯","員工折扣","交通補助"],
      coverImage: "https://plus.unsplash.com/premium_photo-1682092523589-a67b28caa96f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGhvdCUyMHNwcmluZ3xlbnwwfHwwfHx8MA%3D%3D",
      detailImages: ["https://images.unsplash.com/photo-1614590370666-22e7beade570?q=80&w=2656&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1469998265221-245c7148df5d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1719755144073-6c0849fb14f2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
    },
  ]);

  const [newJob, setNewJob] = useState({
    address: "",
    roomType: "",
    start_date: "",
    end_date: "",
    jobDescription: "",
    positions: "",
    peopleNeeded: "",
    workHours: "",
    benefits: [""],
    coverImageFile: null,
    detailImageFiles: [],
  });

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewJob({ 
        ...newJob, 
        coverImageFile: file,
        coverImagePreview: url  // 新增預覽 URL
      });
    }
  };

  const handleDetailImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + newJob.detailImageFiles.length <= 5) {
      const newFiles = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)  // 為每個檔案創建預覽 URL
      }));
      setNewJob({
        ...newJob,
        detailImageFiles: [...newJob.detailImageFiles, ...newFiles]
      });
    } else {
      alert('最多只能上傳5張照片');
    }
  };

  const removeCoverImage = () => {
    setNewJob({
      ...newJob,
      coverImageFile: null
    });
  };

  const removeDetailImage = (index) => {
    setNewJob({
      ...newJob,
      detailImageFiles: newJob.detailImageFiles.filter((_, i) => i !== index)
    });
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
      handleEditImageChange('coverImage', url);
    }
  };

  // 處理多張工作環境照片上傳
  const handleEditDetailImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + editJob.detailImages.length <= 5) {
      const urls = files.map(file => URL.createObjectURL(file));
      handleEditImageChange('detailImages', [...editJob.detailImages, ...urls]);
    } else {
      alert('最多只能上傳5張照片');
    }
  };

  // 移除工作環境照片
  const removeEditDetailImage = (index) => {
    const newImages = editJob.detailImages.filter((_, i) => i !== index);
    handleEditImageChange('detailImages', newImages);
  };

  const handleDelete = (jobId) => {
    if (window.confirm('確定要刪除這個職缺嗎？')) {
      setJobs(jobs.filter(j => j.id !== jobId));
    }
  };

  const handleAddJob = () => {
    if (!validateForm()) return;

    const jobToAdd = {
      ...newJob,
      id: Date.now(),
      status: "active",
    };

    setJobs([...jobs, jobToAdd]);
    setShowAddModal(false);
    resetForm();
  };

  const validateForm = () => {
    if (
      !newJob.address ||
      !newJob.roomType ||
      !newJob.start_date ||
      !newJob.end_date ||
      !newJob.jobDescription ||
      !newJob.positions ||
      !newJob.peopleNeeded
    ) {
      alert("請填寫所有必填欄位");
      return false;
    }
    else if (newJob.start_date > newJob.end_date) {
      alert("結束日期不得早於開始日期");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setNewJob({
      address: "",
      roomType: "",
      start_date: "",
      end_date: "",
      jobDescription: "",
      positions: "",
      peopleNeeded: "",
      benefits: ["免費住宿"],
      coverImage: null,
      detailImages: [],
    });
  };

  const handleEdit = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    setEditJob({ ...job });
    setEditingId(jobId);
  };

  const handleSave = (jobId) => {
    setJobs(jobs.map(job =>
      job.id === jobId ? editJob : job
    ));
    setEditingId(null);
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
          <div key={job.id} className="room-card">
            <div className="room-card__header">
              <div>
                <div className="room-card__title">
                  <span className="room-card__icon">🏠</span>
                  {editingId === job.id ? (
                    <input
                      type="text"
                      value={editJob.positions}
                      onChange={(e) => handleInputChange('positions', e.target.value)}
                      className="form-field__input"
                    />
                  ) : (
                    <h2>{job.positions}</h2>
                  )}
                </div>
                {editingId === job.id ? (
                  <input
                    type="text"
                    value={editJob.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="form-field__input mt-2"
                  />
                ) : (
                  <p className="room-card__address">{job.address}</p>
                )}
              </div>
              <div className="room-card__actions">
                <button
                  onClick={() => editingId === job.id ? handleSave(job.id) : handleEdit(job.id)}
                  className="room-card__action-btn"
                  title={editingId === job.id ? "儲存" : "編輯"}
                >
                  {editingId === job.id ? "💾" : "✎"}
                </button>
                {editingId === job.id && (
                  <button
                    onClick={() => setEditingId(null)}
                    className="room-card__action-btn"
                    title="放棄編輯"
                  >
                    ↩
                  </button>
                )}
                <button
                  onClick={() => handleDelete(job.id)}
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
              {editingId === job.id ? (
            <div className="form-field">
              <input
                type="file"
                accept="image/*"
                onChange={handleEditCoverImageUpload}
                className="form-field__input"
              />
              <div className="room-card__image-container">
                {editJob.coverImage && (
                  <>
                    <img src={editJob.coverImage} alt="封面照片" />
                    <button
                      onClick={() => handleEditImageChange('coverImage', null)}
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
              <img src={job.coverImage} alt="封面照片" />
            </div>
          )}
            </div>

            {/* 工作環境照片 */}
            <div className="room-card__stat">
              <p className="room-card__label">工作環境照片</p>
              {editingId === job.id ? (
                <div className="form-field">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleEditDetailImagesUpload}
                    className="form-field__input"
                    disabled={editJob.detailImages.length >= 5}
                  />
                  <div className="room-card__images-grid">
                    {editJob.detailImages.map((image, index) => (
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
                  {job.detailImages.map((image, index) => (
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
                {editingId === job.id ? (
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
                {editingId === job.id ? (
                  <input
                    type="text"
                    value={editJob.roomType}
                    onChange={(e) => handleInputChange('roomType', e.target.value)}
                    className="form-field__input"
                  />
                ) : (
                  <p className="room-card__value">{job.roomType}</p>
                )}
              </div>
              <div className="room-card__stat">
                <p className="room-card__label">工作內容</p>
                {editingId === job.id ? (
                  <textarea
                    value={editJob.jobDescription}
                    onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                    className="form-field__input form-field__input--textarea"
                    rows="3"
                  />
                ) : (
                  <p className="room-card__value">{job.jobDescription}</p>
                )}
              </div>
              <div className="room-card__stat">
                <p className="room-card__label">需求人數</p>
                {editingId === job.id ? (
                  <input
                    type="number"
                    value={editJob.peopleNeeded}
                    onChange={(e) => handleInputChange('peopleNeeded', e.target.value)}
                    className="form-field__input"
                    min="1"
                  />
                ) : (
                  <p className="room-card__value">{job.peopleNeeded} 人</p>
                )}
              </div>
              <div className="room-card__stat">
                <p className="room-card__label">福利</p>
                {editingId === job.id ? (
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

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal__header">
              <h2 className="modal__title">新增職缺</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="modal__close" title="刪除"
              >
                ❌
              </button>
            </div>
            <div className="modal__content">
              <div className="form-field">
                <label className="form-field__label">職位名稱</label>
                <input
                  type="text"
                  value={newJob.positions}
                  onChange={(e) =>
                    setNewJob({ ...newJob, positions: e.target.value })
                  }
                  className="form-field__input"
                />
              </div>
              <div className="form-field">
                <label className="form-field__label">地址</label>
                <input
                  type="text"
                  value={newJob.address}
                  onChange={(e) =>
                    setNewJob({ ...newJob, address: e.target.value })
                  }
                  className="form-field__input"
                />
              </div>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-field__label">開始日期</label>
                  <input
                    type="date"
                    value={newJob.start_date}
                    onChange={(e) =>
                      setNewJob({ ...newJob, start_date: e.target.value })
                    }
                    className="form-field__input"
                  />
                </div>

                <div className="form-field">
                  <label className="form-field__label">結束日期</label>
                  <input
                    type="date"
                    value={newJob.end_date}
                    onChange={(e) =>
                      setNewJob({ ...newJob, end_date: e.target.value })
                    }
                    className="form-field__input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-field__label">工作內容</label>
                <textarea
                  value={newJob.jobDescription}
                  onChange={(e) =>
                    setNewJob({ ...newJob, jobDescription: e.target.value })
                  }
                  className="form-field__input form-field__input--textarea"
                  rows="3"
                />
              </div>

              <div className="form-field">
                <label className="form-field__label">房型</label>
                <input
                  type="text"
                  value={newJob.roomType}
                  onChange={(e) =>
                    setNewJob({ ...newJob, roomType: e.target.value })
                  }
                  className="form-field__input"
                />
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="form-field__label">需求人數</label>
                  <input
                    type="number"
                    value={newJob.peopleNeeded}
                    onChange={(e) =>
                      setNewJob({ ...newJob, peopleNeeded: e.target.value })
                    }
                    className="form-field__input"
                    min="1"
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-field__label">
                  福利項目（最多 5 項）
                </label>
                <div className="space-y-2">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <input
                      key={index}
                      type="text"
                      value={newJob.benefits[index] || ""}
                      onChange={(e) => {
                        const newBenefits = [...newJob.benefits];
                        newBenefits[index] = e.target.value;
                        setNewJob({
                          ...newJob,
                          benefits: newBenefits.filter(
                            (benefit) => benefit !== ""
                          ),
                        });
                      }}
                      placeholder={`福利 ${index + 1}`}
                      className="form-field__input"
                    />
                  ))}
                </div>
              </div>
              <div className="form-field">
              <label className="form-field__label">封面照片 （最多 1 張）</label>
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="image-upload__input"
                />
                {newJob.coverImagePreview && (
                  <div className="image-upload__preview">
                    <img src={newJob.coverImagePreview} alt="封面預覽" />
                    <button
                      onClick={removeCoverImage}
                      className="image-upload__remove"
                      type="button"
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-field">
              <label className="form-field__label">工作環境照片（最多 5 張）</label>
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleDetailImagesUpload}
                  className="image-upload__input"
                  disabled={newJob.detailImageFiles.length >= 5}
                />
                {newJob.detailImageFiles.length > 0 && (
                  <div className="image-upload__preview-grid">
                    {newJob.detailImageFiles.map((file, index) => (
                      <div key={index} className="image-upload__preview">
                        <img src={file.preview} alt={`預覽 ${index + 1}`} />
                        <button
                          onClick={() => removeDetailImage(index)}
                          className="image-upload__remove"
                          type="button"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            </div>
            <div className="modal__footer">
              <button
                onClick={handleAddJob}
                className="modal__btn modal__btn--confirm"
              >
                新增
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandlordPage;