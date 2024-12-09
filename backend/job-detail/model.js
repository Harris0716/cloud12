const db = require("../db");

function getJobById(jobInfo_id) {
  const sql = `
    SELECT 
      j.jobInfo_id,
      j.address as location,
      j.room_type as roomType,
      j.dates as period,
      j.job_description as description,
      j.positions as title,
      j.people_needed as peopleNeeded,
      j.cover_image,
      j.detail_images as images,
      j.benefits,
      l.name as 'host.name',
      l.image as 'host.image',
      l.rating as 'host.rating'
    FROM JobInfo j
    JOIN Landlord l ON j.landlord_id = l.landlord_id
    WHERE j.jobInfo_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(sql, [jobInfo_id], (err, result) => {
      if (err) {
        console.error('查詢錯誤:', err);
        reject(err);
      } else {
        if (result.length === 0) {
          resolve(null);
          return;
        }

        // 處理 JSON 字串轉換
        try {
          const job = result[0];
          job.images = JSON.parse(job.images || '[]');
          job.benefits = JSON.parse(job.benefits || '[]');
          
          // 整理 host 資訊
          job.host = {
            name: job['host.name'],
            image: job['host.image'],
            rating: job['host.rating']
          };
          
          // 刪除重複的 host 屬性
          delete job['host.name'];
          delete job['host.image'];
          delete job['host.rating'];

          console.log('查詢結果:', job);
          resolve(job);
        } catch (parseError) {
          console.error('JSON 解析錯誤:', parseError);
          reject(parseError);
        }
      }
    });
  });
}

module.exports = { getJobById };