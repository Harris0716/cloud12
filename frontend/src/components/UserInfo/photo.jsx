import React, { useState } from "react";
import "./Photo.css"; // 可用來定義樣式
import { useEffect } from "react";

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

  useEffect(()=>{
    console.log(isEditing)
  },[isEditing])

  return (
    <div className="photo-grid">
      {/* 上傳圖片按鈕 */}
      <div className="photo-item">
        {isEditing ? (
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
        ):(<></>)}
      </div>

      {/* 顯示已上傳的圖片 */}
      {photos.map((photo, index) => (
        <div className="photo-item" key={index}>
          <img src={photo} alt={`圖片${index + 1}`} className="photo-preview" />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
