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
      jobDescription: "負責房間清潔、櫃台接待、簡單維護工作",
      positions: "民宿清潔人員",
      peopleNeeded: 2,
      benefits: ["免費住宿", "供餐", "網路"],
      coverImage: "",
      detailImages: [],
      status: "active",
    },
    {
      id: 2,
      address: "南投縣魚池鄉日月村",
      roomType: "單人房",
      start_date: "2024-05-01",
      end_date: "2024-08-31",
      jobDescription: "園藝維護、房務清潔",
      positions: "園藝人員",
      peopleNeeded: 1,
      benefits: ["免費住宿", "供早晚餐", "交通補助"],
      coverImage: "",
      detailImages: [],
      status: "active",
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
      setNewJob({ ...newJob, coverImageFile: file });
    }
  };

  const handleDetailImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + newJob.detailImageFiles.length <= 5) {
      setNewJob({
        ...newJob,
        detailImageFiles: [...newJob.detailImageFiles, ...files]
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
                  title={editingId === job.id ? "保存" : "編輯"}
                >
                  {editingId === job.id ? "💾" : "✎"}
                </button>
                {editingId === job.id && (
                  <button
                    onClick={() => setEditingId(null)}
                    className="room-card__action-btn"
                    title="取消"
                  >
                    ↩️
                  </button>
                )}
                <button
                  onClick={() => setJobs(jobs.filter(j => j.id !== job.id))}
                  className="room-card__action-btn"
                  title="刪除"
                >
                  ❌
                </button>
              </div>
            </div>

            <div className="room-card__info">
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
                <label className="form-field__label">封面照片</label>
                <div className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    className="image-upload__input"
                  />
                  {newJob.coverImageFile && (
                    <div className="image-upload__file">
                      <span>{newJob.coverImageFile.name}</span>
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
                    <div className="image-upload__filelist">
                      {newJob.detailImageFiles.map((file, index) => (
                        <div key={index} className="image-upload__file">
                          <span>{file.name}</span>
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