const db = require("../db");

function createJobInfo(jobInfoData) {
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

  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(query, values, (err, results) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
}

module.exports = { createJobInfo };