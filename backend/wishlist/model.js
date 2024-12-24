const db = require("../db");

function getWihslist(user_id) {
  const params = [user_id];
  // const sql = "SELECT * FROM wishlist WHERE user_id = ?";
  const sql = `
        SELECT 
            w.user_id,
            j.jobinfo_id,
            j.positions,
            j.address,
            j.cover_image
        FROM 
            Wishlist w
        INNER JOIN 
            Jobinfo j
        ON 
            w.jobinfo_id = j.jobinfo_id
        WHERE 
            w.user_id = ?;
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

function addWihslist(user_id, jobinfo_id) {
  const params = [user_id, jobinfo_id];
  const sql = "INSERT INTO wishlist (user_id, jobinfo_id) VALUES (?,?)";
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

function deleteWihslist(user_id, jobinfo_id) {
  const params = [user_id, jobinfo_id];
  const sql = "DELETE FROM wishlist WHERE user_id = ? AND jobinfo_id = ?";
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
}

module.exports = { getWihslist, addWihslist, deleteWihslist };
