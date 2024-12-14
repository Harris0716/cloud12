import React, { useState } from "react";
import "./Photo.css"; // 可用來定義樣式
import { useEffect } from "react";
import PropTypes from 'prop-types';

const PhotoGrid = ({isEditing}) => {
  const [photos, setPhotos] = useState([]); // 儲存上傳的圖片

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const uploadedPhotos = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPhotos((prev) => [...prev, ...uploadedPhotos]);
    }
  };

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
      {photos.map((photo, index) => (
        <div className="photo-item" key={index}>
          <img src={photo} alt={`圖片${index + 1}`} className="photo-preview" />
        </div>
      ))}
    </div>
  );
};

PhotoGrid.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default PhotoGrid;
