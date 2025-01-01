const db = require("../db");

function get_user_resume(user_id) {
  const params = [user_id];
  const sql = "SELECT * FROM Resume WHERE user_id = ?";
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

function add_user_resume(
  user_id,
  username,
  education,
  residence,
  license,
  introduction
) {
  const params = [
    user_id,
    username,
    education,
    residence,
    license,
    introduction,
  ];
  const sql =
    "INSERT INTO Resume (user_id,name,education,residence,license,introduction) VALUES (?,?,?,?,?,?)";
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

function update_user_resume(
  user_id,
  username,
  education,
  residence,
  license,
  introduction
) {
  const params = [
    username,
    education,
    residence,
    license,
    introduction,
    user_id,
  ];
  const sql =
    "UPDATE Resume SET name = ?, education = ?,residence = ?,license = ?,introduction = ? WHERE user_id = ?";
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

function delete_user_resume(user_id) {}

function getResumeByID(resume_id) {
  const params = [resume_id];
  const sql = "SELECT * FROM Resume WHERE resume_id = ?";
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
  get_user_resume,
  add_user_resume,
  update_user_resume,
  delete_user_resume,
  getResumeByID,
};
