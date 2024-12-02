const db = require("../db");

function listJobs() {
  const sql =
    "SELECT positions, jobInfo_id, address FROM JobInfo where people_needed > 0";

  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, (err, result) => {
        connection.release(); // release the connection back to the pool

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
}

module.exports = { listJobs };
