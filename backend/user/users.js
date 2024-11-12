const db = require("../db");

function registerUser(username, password, email, user_id) {
  const params = [username, password, email, user_id];
  const sql =
    "INSERT INTO users (username, password, email, user_id) VALUES (?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function loginUser(username, password) {
  const params = [username, password];
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length > 0) {
        resolve(result[0]);
      } else {
        reject(new Error("Invalid username or password"));
      }
    });
  });
}

module.exports = { registerUser, loginUser };
