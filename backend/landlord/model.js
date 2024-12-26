const db = require('./db'); // 假設已建立資料庫連線的模組

const createJobInfo = async (jobInfoData) => {
    const query = `
        INSERT INTO JobInfo 
        (landlord_id, address, room_type, start_date, end_date, job_description, positions, people_needed, cover_image, detail_images, benefits) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        jobInfoData.landlord_id,
        jobInfoData.address,
        jobInfoData.room_type,
        jobInfoData.start_date,
        jobInfoData.end_date,
        jobInfoData.job_description,
        jobInfoData.positions,
        jobInfoData.people_needed,
        jobInfoData.cover_image,
        jobInfoData.detail_images,
        jobInfoData.benefits,
    ];

    // 執行資料庫查詢
    const [result] = await db.execute(query, values);
    return result;
};

module.exports = { createJobInfo };