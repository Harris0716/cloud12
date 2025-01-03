import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplicationForm.css";
const api_base_url = import.meta.env.VITE_API_BASE_URL;

function ApplicationForm({ jobInfo_id }) {
    const [dateError, setDateError] = useState("");
    const navigate = useNavigate();
    // 日期驗證處理函數
    const handleDateChange = (e) => {
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;

        if (startDate && endDate) {
        if (new Date(endDate) <= new Date(startDate)) {
            setDateError("結束時間必須晚於開始時間");
            document.getElementById("end-date").value = "";
        } else {
            setDateError("");
        }
        }
    };

    // 處理表單提交
    const handleSubmit = async (e) => {
        e.preventDefault();

        const JwtToken = localStorage.getItem("token");
        if (!JwtToken) {
            alert("請先登入");
            navigate("/login");
        }
        else {
            const formData = {
                startDate: e.target["start-date"].value,
                endDate: e.target["end-date"].value,
                message: e.target.message.value,
                jobId: jobInfo_id,
            };
            try {
                const response = await fetch(`${api_base_url}/api/applications`, {
                    method: "POST",
                    headers: {
                    "Authorization": `Bearer ${JwtToken}`,
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
        
                if (!response.ok) {
                    throw new Error("申請失敗");
                } 
                alert("申請成功");
                e.target.reset();
            } 
            catch (err) {
                alert(err.message);
            }
        }
        

        
    };

    return (
        <div className="application-form">
            <h3>申請職缺</h3>
            <br />
            <form onSubmit={handleSubmit}>

                <label htmlFor="start-date">預計開始日期</label>
                <input
                    type="date"
                    id="start-date"
                    name="start-date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleDateChange}
                    required
                />

                <label htmlFor="end-date">預計結束時間</label>
                <input
                    type="date"
                    id="end-date"
                    name="end-date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleDateChange}
                    required
                />
                {dateError && (
                    <div
                        className="error-message"
                        style={{ color: "red", fontSize: "0.8em", marginTop: "0.2em" }}
                    >
                        {dateError}
                    </div>
                )}

                <label htmlFor="message">自我介紹與申請動機</label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="請簡短描述您的經驗和申請這份工作的原因"
                ></textarea>

                <button type="submit">立即申請</button>
            </form>
        </div>
    );
}

export default ApplicationForm;