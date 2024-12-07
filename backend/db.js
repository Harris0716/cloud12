require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// test
connection.getConnection((err, conn) => {
  if (err) {
    console.error('資料庫連線錯誤:', err);
  } else {
    console.log('資料庫連線成功！');
    conn.release();
  }
});

module.exports = connection;