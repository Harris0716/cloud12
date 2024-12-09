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
        const response = await fetch(`http://localhost:8000/api/job/${jobInfo_id}`);
        
        if (!response.ok) {
          throw new Error(response.status === 404 ? '工作機會不存在' : '載入失敗');
        }
        
        const data = await response.json();
        console.log('Fetched job data:', data); // 用於調試
        setJob(data);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobInfo_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">載入中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">工作機會不存在</div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 這裡可以加入表單提交的邏輯
    const formData = {
      jobInfo_id: jobInfo_id,
      startDate: e.target['start-date'].value,
      duration: e.target.duration.value,
      message: e.target.message.value
    };
    
    console.log('Form submitted:', formData);
    // TODO: 實作表單提交到後端的邏輯
    alert('申請已送出！');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 圖片區塊 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {job.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`工作環境 ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* 工作基本資訊 */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <span className="mr-2">📍</span>
              <span>{job.location}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
              <div>住宿類型: {job.roomType}</div>
              <div>工作期間: {job.period}</div>
              <div>需求人數: {job.peopleNeeded}人</div>
            </div>
          </div>

          {/* 工作描述 */}
          <div>
            <h3 className="text-xl font-semibold mb-3">工作內容</h3>
            <pre className="whitespace-pre-wrap text-gray-600">{job.description}</pre>
          </div>

          {/* 主管資訊 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
            <img
              src={job.host?.image}
              alt="主管照片"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">負責人: {job.host?.name}</h3>
              <div className="text-yellow-500">
                評分: {job.host?.rating} ★
              </div>
            </div>
          </div>

          {/* 福利列表 */}
          <div>
            <h3 className="text-xl font-semibold mb-3">提供福利</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {job.benefits?.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 申請表單 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">申請職缺</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="start-date" className="block text-gray-700 mb-2">
                  預計開始日期
                </label>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-gray-700 mb-2">
                  預計工作時長
                </label>
                <select
                  id="duration"
                  name="duration"
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">請選擇</option>
                  <option value="1">1個月</option>
                  <option value="2">2個月</option>
                  <option value="3">3個月</option>
                  <option value="6">6個月</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  自我介紹與申請動機
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  placeholder="請簡短描述您的經驗和申請這份工作的原因"
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                立即申請
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;