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
      INSERT INTO Application (applier_id, landlord_id, start_date, end_date, message, status)
      SELECT ?, landlord_id, ?, ?, ?, ? FROM JobInfo WHERE jobInfo_id = ?
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
  const sql = "SELECT * FROM Application WHERE applier_id = ?";
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
  const sql = "UPDATE Application SET status = ? WHERE application_id = ?";
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
  updateApplicationStatus,
};
