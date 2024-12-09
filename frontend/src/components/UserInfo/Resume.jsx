import { useState ,useEffect} from "react";
import "./Resume.css";
import {DateTime } from "luxon";
import PhotoGrid from "./photo";

const Resume = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // 切換編輯模式
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };


  // 處理使用者輸入的變更
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === "bio" && value.length > 500) return; // 限制 bio 500 字
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/resume", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo), // 傳送 userInfo
      });
  
      if (!response.ok) {
        throw new Error("更新失敗");
      }
  
      const data = await response.json();
      console.log("更新成功:", data);
      alert("資料更新成功！"); // 提示用戶更新成功
    } catch (error) {
      console.error("儲存資料時發生錯誤:", error);
      alert("儲存失敗，請稍後再試！");
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/resume/1")  // 這裏來 綁定  user 的 id
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const userInfo = data.data[0];
        const localDate = DateTime.fromISO(userInfo.birthdate, { zone: 'utc' }).setZone('Asia/Taipei').toISODate();
        setUserInfo({
          user_id: userInfo.user_id,
          username: userInfo.username,
          birthdate: localDate,
          education: userInfo.education,
          residence: userInfo.residence,
          license: userInfo.license,
          phone: userInfo.phone,
          introduction: userInfo.introduction,
        });
        console.log(userInfo) 
      })
      .catch((error) => {
        console.error("獲取數據失敗:", error);
      });
  }, []);

  return (
    <div className="page-container">
      {/* 使用者基本資訊 */}
    <div className="profile-container">
      <div className="user-info">
        <h2>使用者資訊</h2>
        {Object.entries(userInfo)
          .filter(([key]) => !["user_id","birthdate"].includes(key)) // 過濾掉不顯示的屬性
          .map(([key, value]) => (
            <div className="info-group" key={key}>
              <label>{key === "bio" ? "自我介紹" : key}:</label>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{value}</p>
              )}
            </div>
      ))}
      </div>
      
      {/* 生活圖片上傳區 */}
      </div>
      <div className="photo-upload">
        <h2>生活圖片</h2>
        <PhotoGrid isEditing={isEditing} />
      </div>
      {/* 右下角編輯按鈕 */}
      <button className="edit-button" onClick={() => { toggleEdit(); {isEditing ? handleSave() : ""} }}>
        {isEditing ? "完成" : "編輯"}
      </button>
    </div>
  );
};

export default Resume;
