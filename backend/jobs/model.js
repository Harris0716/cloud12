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
        console.error("查詢錯誤:", err);
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
      j.cover_image,
      u.username as host_name,
      u.image as host_image
    FROM JobInfo j
    JOIN User u ON j.landlord_id = u.user_id
    WHERE j.jobInfo_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(sql, [jobInfo_id], (err, result) => {
      if (err) {
        console.error("查詢錯誤:", err);
        reject(err);
      } else {
        if (!result || result.length === 0) {
          resolve(null);
          return;
        }

        try {
          const job = result[0];

          let parsedImages;
          try {
            parsedImages =
              typeof job.detail_images === "string"
                ? JSON.parse(job.detail_images)
                : job.detail_images;
          } catch (e) {
            console.error("圖片解析錯誤:", e);
            parsedImages = [];
          }

          const formattedImages = Array.isArray(parsedImages)
            ? parsedImages
            : [];

          const formattedJob = {
            jobInfo_id: job.jobInfo_id,
            positions: job.positions,
            address: job.address,
            room_type: job.room_type,
            start_date: job.start_date,
            end_date: job.end_date,
            job_description: job.job_description,
            people_needed: job.people_needed,
            cover_image: job.cover_image,
            images: formattedImages,
            benefits: Array.isArray(job.benefits)
              ? job.benefits
              : JSON.parse(job.benefits || "[]"),
            host: {
              name: job.host_name,
              image: job.host_image,
              rating: job.host_rating,
            },
          };

          resolve(formattedJob);
        } catch (parseError) {
          console.error("資料處理錯誤:", parseError);
          reject(parseError);
        }
      }
    });
  });
}

module.exports = { listJobs, getJobById };
