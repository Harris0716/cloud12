import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'WORKTRAVELER',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const getJobById = async (jobId) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        j.*,
        l.name as host_name,
        l.image as host_image,
        l.rating as host_rating
      FROM JobInfo j
      JOIN Landlord l ON j.landlord_id = l.landlord_id
      WHERE j.jobInfo_id = ?
    `, [jobId]);
    
    if (rows.length === 0) {
      return null;
    }

    // 將 JSON 字串轉換為 JavaScript 物件
    const job = rows[0];
    job.detail_images = JSON.parse(job.detail_images);
    job.benefits = JSON.parse(job.benefits);

    return job;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};