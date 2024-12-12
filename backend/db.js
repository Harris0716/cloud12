require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: 'xxx',
  user: 'xxx',
  password: 'x',
  database: 'x',
});


connection.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }

  // 可以開始使用 conn 來進行 SQL 查詢
  conn.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.error("Query failed:", err);
    } else {
      console.log("Query results:", results);
    }

    // 最後記得釋放連接回池中
    conn.release();
  });
});

module.exports = connection;
