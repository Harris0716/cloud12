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
      l.image as landlord_image,
      l.rating as landlord_rating
    FROM JobInfo j
    JOIN Landlord l ON j.landlord_id = l.landlord_id
    WHERE j.jobInfo_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(sql, [jobInfo_id], (err, result) => {
      if (err) {
        console.error('查詢錯誤:', err);
        reject(err);
      } else {
        console.log('查詢結果:', result);
        resolve(result[0]);
      }
    });
  });
}

module.exports = { getJobDetail };