import React, { useState } from "react";
import "./ApplicationForm.css";

function ApplicationForm() {
    const [dateError, setDateError] = useState("");
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

        const formData = {
        name: e.target["applier-name"].value,
        email: e.target.email.value,
        startDate: e.target["start-date"].value,
        endDate: e.target["end-date"].value,
        message: e.target.message.value,
        jobId: jobInfo_id,
        };

        try {
        const response = await fetch("http://localhost:8000/api/applications", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("申請失敗");
        }

        alert("申請成功！");
        e.target.reset();
        } catch (err) {
        alert(err.message);
        }
    };

    return (
        <div className="application-form">
            <h3>申請職缺</h3>
            <br />
            <form onSubmit={handleSubmit}>
                <label>姓名</label>
                <input type="text" id="applier-name" name="applier-name" required />

                <label>email</label>
                <input type="email" id="email" name="email" required />

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
                    required
                ></textarea>

                <button type="submit">立即申請</button>
            </form>
        </div>
    );
}

export default ApplicationForm;