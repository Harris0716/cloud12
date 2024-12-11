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
        resolve(result);
      }
    });
  });
}

function getJobById(jobInfo_id) {
  const sql = `
    SELECT 
      j.jobInfo_id,
      j.address,
      j.room_type,
      j.start_date, 
      j.end_date,
      j.job_description,
      j.positions,
      j.people_needed,
      j.detail_images,  
      j.benefits,
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
        if (!result || result.length === 0) {
          resolve(null);
          return;
        }

        try {
          const job = result[0];
          
          // 解析 detail_images
          let parsedImages;
          try {
            parsedImages = typeof job.detail_images === 'string' 
              ? JSON.parse(job.detail_images)
              : job.detail_images;
          } catch (e) {
            console.error('圖片解析錯誤:', e);
            parsedImages = [];
          }

          // 確保它是一個陣列
          const formattedImages = Array.isArray(parsedImages) ? parsedImages : [];

          const formattedJob = {
            jobInfo_id: job.jobInfo_id,
            title: job.positions,
            location: job.address,
            roomType: job.room_type,
            start_date: job.start_date,
            end_date: job.end_date,
            description: job.job_description,
            peopleNeeded: job.people_needed,
            images: formattedImages,
            benefits: Array.isArray(job.benefits) 
              ? job.benefits 
              : JSON.parse(job.benefits || '[]'),
            host: {
              name: job.host_name,
              image: job.host_image,
              rating: job.host_rating
            }
          };

          resolve(formattedJob);
        } catch (parseError) {
          console.error('資料處理錯誤:', parseError);
          reject(parseError);
        }
      }
    });
  });
}

module.exports = { listJobs, getJobById };