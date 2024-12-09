const db = require("../db");

function getJobById(jobInfo_id) {
  const sql = `
    SELECT 
      j.*,
      l.name as host_name,
      l.image as host_image,
      l.rating as host_rating
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
        resolve(result[0]); // 返回單一結果
      }
    });
  });
}

module.exports = { getJobById };