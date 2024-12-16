const db = require("../db");

function createApplication(
  jobInfo_id,
  applier_id,
  start_date,
  end_date,
  message
) {
  const status = "審核中";
  const params = [
    applier_id,
    start_date,
    end_date,
    message,
    status,
    jobInfo_id,
  ];
  const sql = `
      INSERT INTO Application (applier_id, landlord_id, start_date, end_date, message, status, job_id)
      SELECT ?, landlord_id, ?, ?, ?, ?, jobInfo_id FROM JobInfo WHERE jobInfo_id = ?
    `;
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (err, results) => {
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

function getApplierApplications(applier_id) {
  const params = [applier_id];
  const sql =
    "SELECT a.status, a.job_id, a.end_date, j.cover_image, j.positions, a.application_id FROM Application as a, JobInfo as j WHERE a.applier_id = ? and j.jobInfo_id = a.job_id";
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (err, results) => {
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

function getLandlordApplications(landlord_id) {
  const params = [landlord_id];
  const sql = `
    SELECT a.application_id, a.message, j.cover_image, j.positions, u.username
    FROM Application as a, JobInfo as j, User as u 
    WHERE a.landlord_id = ? and j.jobInfo_id = a.job_id and u.user_id = a.applier_id and a.status = '審核中'`;
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (err, results) => {
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

function getApplicationDetail(application_id) {
  const params = [application_id];
  const sql = `
    SELECT a.*, j.positions, u.username
    FROM Application as a, JobInfo as j, User as u 
    WHERE a.application_id = ? and j.jobInfo_id = a.job_id and u.user_id = a.applier_id`;
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (err, results) => {
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

function updateApplicationStatus(application_id, status) {
  const params = [status, application_id];
  let sql = "UPDATE Application SET status = ? WHERE application_id = ?;";
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (err, results) => {
        if (err) {
          connection.release();
          reject(err);
          return;
        }
        if (status === "同意") {
          const updateJobInfoSql =
            "UPDATE JobInfo SET people_needed = people_needed - 1 WHERE jobInfo_id = (SELECT job_id FROM Application WHERE application_id = ?);";
          connection.query(
            updateJobInfoSql,
            [application_id],
            (err, results) => {
              connection.release();
              if (err) {
                reject(err);
              } else {
                resolve(results);
              }
            }
          );
        } else {
          connection.release();
          resolve(results);
        }
      });
    });
  });
}

function deleteApplication(application_id) {
  const params = [application_id];
  const sql = "DELETE FROM Application WHERE application_id = ?";
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (err, results) => {
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

module.exports = {
  createApplication,
  getApplierApplications,
  getLandlordApplications,
  getApplicationDetail,
  updateApplicationStatus,
  deleteApplication,
};
