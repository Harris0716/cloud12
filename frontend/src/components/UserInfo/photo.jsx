import React, { useState } from "react";
import "./Photo.css"; // 可用來定義樣式
import { useEffect } from "react";
import PropTypes from 'prop-types';

const PhotoGrid = ({isEditing}) => {
  const [photos, setPhotos] = useState([]);
  // const [photos, setPhotos] = useState([]); // 儲存上傳的圖片

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => uploadedPhoto(file));
    }
  };
  

  async function uploadedPhoto(file) {
    try {
      console.log(file.name)
      const response = await fetch(`http://localhost:8000/generate-presigned-url?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`);
      const data = await response.json();
      const { url } = data;
      const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
        mode:'cors',
      });
  
      if (uploadRes.ok) {
        setPhotos((prev) => [...prev, url.split("?")[0]]);
      } else {
        console.log("上傳失敗");
      }
    } catch (error) {
      console.error("上傳發生錯誤", error);
    }
  }
    
  
  return (
    <div className="photo-grid">
      {/* 上傳圖片按鈕 */}
      {isEditing ? 
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
      </div>:
      <></>}
      

      {/* 顯示已上傳的圖片 */}
      {/* {photos.map((photo, index) => (
        <div className="photo-item" key={index}>
          <img src={photo} alt={`圖片${index + 1}`} className="photo-preview" />
        </div>
      ))} */}
    </div>
  );
};

PhotoGrid.propTypes = {
  isEditing: PropTypes.bool,
};

export default PhotoGrid;
