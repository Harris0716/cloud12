import React, {useState} from "react";
import "./LandlordPage.css";

const CreateJob = ({onClose}) => {

    const [workImages, setWorkImages] = useState([]);
    const [coverImage, setCoverImage] = useState([]);

    const handleWorkImagesChange = (e) => {
        const newFiles = Array.from(e.target.files);
        
        // Check if total files would exceed 5
        if (workImages.length + newFiles.length > 5) {
            alert('最多只能上傳5張照片');
            return;
        }
    
        // Combine existing and new files
        setWorkImages(prevImages => [...prevImages, ...newFiles]);
    };

    function removeDetailImage(index) {
        setWorkImages(prevImages => prevImages.filter((image, i) => i !== index));
    }

    const handleCoverImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        
        if (newFiles.length > 1) {
            alert('最多只能上傳1張照片');
            return;
        }
    
        setCoverImage(newFiles);
    }

    function removeCoverImage() {
        setCoverImage([]);
    }


    function submit() {
        alert("新增職缺");
        onClose();
    }

    return (
        <div className="modal-overlay">
        <div className="modal">
            <div className="modal__header">
            <h2 className="modal__title">新增職缺</h2>
            <button onClick={onClose} className="modal__close" title="關閉">❌</button>
            </div>

            <div className="modal__content">
            <div className="form-field">
                <label className="form-field__label">職位名稱</label>
                <input type="text"className="form-field__input"/>
            </div>

            <div className="form-field">
                <label className="form-field__label">地址</label>
                <input type="text" className="form-field__input"/>
            </div>

            <div className="form-grid">
                <div className="form-field">
                <label className="form-field__label">開始日期</label>
                <input type="date" className="form-field__input"/>
                </div>

                <div className="form-field">
                <label className="form-field__label">結束日期</label>
                <input type="date" className="form-field__input"/>
                </div>
            </div>

            <div className="form-field">
                <label className="form-field__label">工作內容</label>
                <textarea className="form-field__input form-field__input--textarea"rows="3"/>
            </div>

            <div className="form-field">
                <label className="form-field__label">房型</label>
                <input type="text" className="form-field__input"/>
            </div>

            <div className="form-grid">
                <div className="form-field">
                <label className="form-field__label">需求人數</label>
                <input type="number"  className="form-field__input" min="1"/>
                </div>
            </div>

            <div className="form-field">
                <label className="form-field__label">
                福利項目（最多 5 項）
                </label>
                <div className="space-y-2">
                {[0, 1, 2, 3, 4].map((index) => (
                    <input key={index} type="text" placeholder={`福利 ${index + 1}`} className="form-field__input"/>
                ))}
                </div>
            </div>

            <div className="form-field">
                <label className="form-field__label">封面照片 （最多 1 張）</label>
                <div className="image-upload">
                <input type="file" accept="image/*" onChange={handleCoverImageChange} className="image-upload__input"/>
                {/* Preview selected images */}
                <div className="image-preview">
                    {coverImage.map((image, index) => (
                    <div key={index} className="image-preview__item">
                        <button onClick={() => removeCoverImage(index)} type="button">
                          ❌
                        </button>
                        <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                        
                    </div>
                    ))}
                </div>
                </div>
            </div>

            <div className="form-field">
                <label className="form-field__label">工作環境照片（最多 5 張）</label>
                <div className="image-upload">
                <input type="file" accept="image/*" multiple onChange={handleWorkImagesChange} className="image-upload__input"/>
                </div>
                {/* Preview selected images */}
                <div className="image-preview">
                    {workImages.map((image, index) => (
                    <div key={index} className="image-preview__item">
                        <button onClick={() => removeDetailImage(index)} type="button">
                          ❌
                        </button>
                        <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                        
                    </div>
                    ))}
                </div>
            </div>
            </div>

            <div className="modal__footer">
            <button onClick={submit} className="modal__btn modal__btn--confirm">新增</button>
            </div>
        </div>
        </div>
    );
}

export default CreateJob;