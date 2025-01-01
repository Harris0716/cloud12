const db = require("../db");

function add_user_photo(userId,photoUrl) {
    const params = [userId,photoUrl];
    const sql =
      "INSERT INTO Photos (user_id,photoUrl) VALUES (?,?)";
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

function get_user_photo(userId) {
    const params = [userId];
    const sql =
      "SELECT * FROM Photos WHERE user_id = ?";
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

module.exports = {add_user_photo,get_user_photo};