const db = require("../db");

function getJobById(jobInfo_id) {
  const sql = `
    SELECT 
      j.jobInfo_id,
      j.address,
      j.room_type,
      j.dates,
      j.job_description,
      j.positions,
      j.people_needed,
      j.detail_images,  /* 直接選取 detail_images */
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
          console.log('原始的 detail_images:', job.detail_images); // 檢查原始數據

          // 解析 detail_images
          let parsedImages;
          try {
            parsedImages = typeof job.detail_images === 'string' 
              ? JSON.parse(job.detail_images)
              : job.detail_images;
            console.log('解析後的圖片陣列:', parsedImages);
          } catch (e) {
            console.error('圖片解析錯誤:', e);
            parsedImages = [];
          }

          // 確保它是一個陣列
          const formattedImages = Array.isArray(parsedImages) ? parsedImages : [];
          console.log('格式化後的圖片陣列:', formattedImages);

          const formattedJob = {
            jobInfo_id: job.jobInfo_id,
            title: job.positions,
            location: job.address,
            roomType: job.room_type,
            period: job.dates,
            description: job.job_description,
            peopleNeeded: job.people_needed,
            images: formattedImages, // 使用處理過的圖片陣列
            benefits: Array.isArray(job.benefits) 
              ? job.benefits 
              : JSON.parse(job.benefits || '[]'),
            host: {
              name: job.host_name,
              image: job.host_image,
              rating: job.host_rating
            }
          };

          console.log('最終返回的資料:', formattedJob);
          resolve(formattedJob);
        } catch (parseError) {
          console.error('資料處理錯誤:', parseError);
          reject(parseError);
        }
      }
    });
  });
}

module.exports = { getJobById };