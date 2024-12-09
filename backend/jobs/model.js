const db = require("../db");

function listJobs() {
  const sql = `
    SELECT 
      jobInfo_id,
      address,
      room_type,
      start_date, 
      end_date,
      job_description,
      positions,
      people_needed,
      cover_image,
      detail_images
    FROM JobInfo
    WHERE people_needed > 0
    ORDER BY created_at DESC`;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => { 
      if (err) {
        console.error('查詢錯誤:', err);
        reject(err);
      } else {
        console.log('查詢結果:', result);
        resolve(result);
      }
    });
  });
}


module.exports = { listJobs };

