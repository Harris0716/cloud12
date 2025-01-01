import React, { useState,useEffect } from "react";
import "./Photo.css"; // 可用來定義樣式
import PropTypes from 'prop-types';

const PhotoGrid = ({isEditing}) => {

  const [photo, setPhoto] = useState([])
  const [savedPhoto,setSavedPhoto] = useState([])
  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => uploadedPhoto(file));
    }
  };
  
  async function uploadedPhoto(file) {
    const userId = localStorage.getItem("userid")

    try {
      console.log(file.name);
      // 創建 FormData 物件來包含要上傳的檔案
      const formData = new FormData();
      formData.append('file', file); // 將檔案加入 FormData，'file' 是後端接收檔案的欄位名稱
      // 使用 Fetch API 送出 POST 請求，上傳檔案
      const response = await fetch(`http://localhost:8000/upload?userId=${encodeURIComponent(userId)}`, {
        method: 'POST',
        body: formData, // 設定 body 為 FormData 物件
      });
      
      // 處理伺服器回應
      if (response.ok) {
        const data = await response.json(); // 如果伺服器回傳 JSON 格式的回應
        const imageUrl = data.imageUrl;
        setPhoto((prev) => [...prev, imageUrl]);
      } else {
        console.error('檔案上傳失敗:', response.status);
      }
    } catch (error) {
      console.error('上傳發生錯誤', error);
    }
  }

  async function getPhoto() {
    const userId = localStorage.getItem("userid")

    try {
      const response = await fetch(`http://localhost:8000/getphoto?userId=${encodeURIComponent(userId)}`, {
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

  
  return (
    <div className="photo-grid">
      {/* 上傳圖片按鈕 */}
      {isEditing ? 
      <>
        <div className="photo-item">
          <>
              <label htmlFor="photo-upload" className="upload-label">
                  + 上傳圖片
              </label>
              <input
                  id="photo-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhotoUpload}
              />
          </>
        </div>
              {/* 顯示已上傳的圖片 */}
              {photo.map((photo, index) => (
                <div className="photo-item" key={index}>
                  <img src={photo} alt={`圖片${index + 1}`} className="photo-preview" />
                </div>
              ))}
      </>:
      
      <>
          {savedPhoto.map((photo, index) => (
            <div className="photo-item" key={index}>
              <img src={photo} alt={`圖片${index + 1}`} className="photo-preview" />
            </div>
          ))}
      </>}
      


    </div>
  );
};

PhotoGrid.propTypes = {
  isEditing: PropTypes.bool,
};

export default PhotoGrid;
