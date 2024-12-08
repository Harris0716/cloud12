const db = require("../../db");

function getJobDetail(jobInfo_id) {
  const sql = `
    SELECT 
      j.jobInfo_id,
      j.address,
      j.room_type,
      j.dates,
      j.job_description,
      j.positions,
      j.people_needed,
      j.cover_image,
      j.detail_images,
      j.benefits,
      l.name as landlord_name,
      l.email as landlord_email,
      l.phone as landlord_phone,
      l.image as landlord_image,
      l.rating as landlord_rating
    FROM JobInfo j
    JOIN Landlord l ON j.landlord_id = l.landlord_id
    WHERE j.jobInfo_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(sql, [jobInfo_id], (err, results) => {
      if (err) {
        console.error('資料庫查詢錯誤:', err);
        reject(err);
        return;
      }
      
      if (!results || results.length === 0) {
        resolve(null);
        return;
      }

      const result = results[0];
      resolve(result);
    });
  });
}

module.exports = { getJobDetail };