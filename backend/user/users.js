const db = require("../db");

const bcrypt = require("bcrypt");

function registerUser(username, password, email, user_id) {
  return bcrypt.hash(password, 10).then((hashedPassword) => {
    const params = [username, hashedPassword, email, user_id];
    const sql =
      "INSERT INTO users (username, password, email, user_id) VALUES (?, ?, ?, ?)";

    return new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        connection.query(sql, params, (err, result) => {
          connection.release(); // release the connection back to the pool

          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  });
}

function loginUser(username, password) {
  const sql = "SELECT * FROM users WHERE username = ?";

  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, [username], (err, result) => {
        connection.release(); // release the connection back to the pool

        if (err) {
          reject(err);
        } else if (result.length > 0) {
          const user = result[0];
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              reject(err);
            } else if (isMatch) {
              resolve(user);
            } else {
              reject(new Error("Invalid username or password"));
            }
          });
        } else {
          reject(new Error("Invalid username or password"));
        }
      });
    });
  });
}

module.exports = { registerUser, loginUser };
