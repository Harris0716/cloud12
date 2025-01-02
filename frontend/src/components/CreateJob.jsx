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


    function submit(e) {
        e.preventDefault();
        
        // Get JWT token from localStorage
        const token = localStorage.getItem('token');

        
        // Create FormData object to handle file uploads
        const formData = new FormData();
        
        // Add text fields
        formData.append('positions', e.target.positions.value);
        formData.append('address', e.target.address.value);
        formData.append('room_type', e.target.room_type.value); 
        formData.append('start_date', e.target.start_date.value);
        formData.append('end_date', e.target.end_date.value);
        formData.append('job_description', e.target.job_description.value);
        formData.append('people_needed', e.target.people_needed.value);
        
        // Add benefits array
        const benefits = [];
        for (let i = 0; i < 5; i++) {
            const benefit = e.target[`benefit${i}`].value;
            if (benefit) benefits.push(benefit);
        }
        formData.append('benefits', JSON.stringify(benefits));
    
        // Add cover image
        if (coverImage.length > 0) {
            formData.append('cover_image', coverImage[0]);
        }
    
        // Add work/detail images
        workImages.forEach(image => {
            formData.append('detail_images', image);
        });

    
        // Make API request
        fetch('http://54.238.10.84:8000/api/jobinfo', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "新增 JobInfo 成功") {
                alert('工作機會已成功新增');
                onClose();
            } else {
                throw new Error(data.message || '新增失敗');
            }
        })
        .catch(error => {
            console.error('Error creating job:', error);
            alert('新增工作機會時發生錯誤');
        });
    }

    return (
        <div className="modal-overlay">
        <div className="modal">
            <form onSubmit={submit}>
                <div className="modal__header">
                <h2 className="modal__title">新增職缺</h2>
                <button onClick={onClose} className="modal__close" title="關閉">❌</button>
                </div>

                <div className="modal__content">
                <div className="form-field">
                    <label className="form-field__label">職位名稱</label>
                    <input type="text"className="form-field__input" name="positions"/>
                </div>

                <div className="form-field">
                    <label className="form-field__label">地址</label>
                    <input type="text" className="form-field__input" name="address"/>
                </div>

                <div className="form-grid">
                    <div className="form-field">
                    <label className="form-field__label">開始日期</label>
                    <input type="date" className="form-field__input" name="start_date"/>
                    </div>

                    <div className="form-field">
                    <label className="form-field__label">結束日期</label>
                    <input type="date" className="form-field__input" name="end_date"/>
                    </div>
                </div>

                <div className="form-field">
                    <label className="form-field__label">工作內容</label>
                    <textarea className="form-field__input form-field__input--textarea" rows="3" name="job_description"/>
                </div>

                <div className="form-field">
                    <label className="form-field__label">房型</label>
                    <input type="text" className="form-field__input" name="room_type"/>
                </div>

                <div className="form-grid">
                    <div className="form-field">
                    <label className="form-field__label">需求人數</label>
                    <input type="number"  className="form-field__input" min="1" name="people_needed"/>
                    </div>
                </div>

                <div className="form-field">
                    <label className="form-field__label">
                    福利項目（最多 5 項）
                    </label>
                    <div className="space-y-2">
                    {[0, 1, 2, 3, 4].map((index) => (
                        <input key={index} type="text" placeholder={`福利 ${index + 1}`} className="form-field__input" name={`benefit${index}`}/>
                    ))}
                    </div>
                </div>

                <div className="form-field">
                    <label className="form-field__label">封面照片 （最多 1 張）</label>
                    <div className="image-upload">
                    <input type="file" accept="image/*" onChange={handleCoverImageChange} className="image-upload__input" name="cover_image"/>
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
                    <input type="file" accept="image/*" multiple onChange={handleWorkImagesChange} className="image-upload__input" name="detail_images"/>
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
                    <button className="modal__btn modal__btn--confirm">新增</button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default CreateJob;