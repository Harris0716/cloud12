import React from "react";
import { useParams } from "react-router-dom";
import "./jobDetail.css";

function JobDetail() {
  const { jobInfo_id } = useParams();

  // 打工換宿數據
  const jobs = [
    {
      id: "1",
      title: "台北大安區民宿清潔人員",
      location: "台北市大安區溫州街",
      roomType: "單人套房",
      period: "2024-01-01 至 2024-03-31",
      description: `1. 每週工作5天，每天4小時
2. 協助打掃環境及整理房間
3. 接待客人入住與退房手續
4. 提供旅遊諮詢服務`,
      position: "民宿清潔人員",
      peopleNeeded: 2,
      images: [
        "https://fakeimg.pl/800x600/",
        "https://fakeimg.pl/800x600/",
        "https://fakeimg.pl/800x600/"
      ],
      host: {
        name: "王小明",
        image: "https://fakeimg.pl/300/",
        rating: 4.8,
      },
      benefits: [
        "免費住宿",
        "提供早餐",
        "網路",
        "洗衣機",
        "公共廚房"
      ],
    },
    {
      id: "2",
      title: "礁溪溫泉旅館櫃檯人員",
      location: "宜蘭縣礁溪鄉溫泉路",
      roomType: "雙人和室",
      period: "2024-02-01 至 2024-07-31",
      description: `1. 每週工作5天，每天6小時
2. 協助溫泉旅館前台接待服務
3. 處理訂房事宜及回覆客人訊息
4. 環境清潔維護`,
      position: "溫泉旅館櫃檯人員",
      peopleNeeded: 1,
      images: [
        "https://fakeimg.pl/800x600/",
        "https://fakeimg.pl/800x600/"
      ],
      host: {
        name: "陳老闆",
        image: "https://fakeimg.pl/300/",
        rating: 4.9,
      },
      benefits: [
        "免費住宿",
        "三餐供應",
        "免費泡湯",
        "員工折扣",
        "交通補助"
      ],
    },
    {
      id: "3",
      title: "花蓮背包客棧餐飲人員",
      location: "花蓮縣花蓮市中華路",
      roomType: "背包床位",
      period: "2024-01-15 至 2024-06-30",
      description: `1. 每週工作4天，每天5小時
2. 協助早餐製作及餐飲服務
3. 咖啡吧台飲品製作
4. 接待外國旅客（需基本英文溝通）`,
      position: "背包客棧餐飲人員",
      peopleNeeded: 2,
      images: [
        "https://fakeimg.pl/800x600/",
        "https://fakeimg.pl/800x600/",
        "https://fakeimg.pl/800x600/"
      ],
      host: {
        name: "Lisa Chen",
        image: "https://fakeimg.pl/300/",
        rating: 4.7,
      },
      benefits: [
        "免費住宿",
        "員工餐點",
        "咖啡師培訓",
        "英語環境",
        "週末遊程"
      ],
    }
  ];

  const job = jobs.find((job) => job.id === String(jobInfo_id));

  if (!job) {
    return <div>工作機會不存在</div>;
  }

  return (
    <div className="job-detail">
      <div className="job-images">
        {job.images.map((image, index) => (
          <img key={index} src={image} alt={`工作環境 ${index + 1}`} />
        ))}
      </div>
      <div className="job-info-container">
        <div className="job-info">
          <h1 className="job-title">{job.title}</h1>
          <div className="job-location">
            <i className="location-icon">📍</i> {job.location}
          </div>
          <div className="job-basics">
            <div className="room-type">住宿類型: {job.roomType}</div>
            <div className="period">工作期間: {job.period}</div>
            <div className="positions">需求人數: {job.peopleNeeded}人</div>
          </div>
          
          <div className="job-description">
            <h3>工作內容</h3>
            <pre className="description-text">{job.description}</pre>
          </div>

          <div className="host-info">
            <div className="host-avatar">
              <img src={job.host.image} alt="主管照片" />
            </div>
            <div className="host-details">
              <h3>負責人: {job.host.name}</h3>
              <div className="host-rating">評分: {job.host.rating} ★</div>
            </div>
          </div>

          <div className="job-benefits">
            <h3>提供福利</h3>
            <ul>
              {job.benefits.map((benefit, index) => (
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