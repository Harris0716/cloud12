require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// test DB connection
connection.promise().query('SELECT 1')
  .then(() => {
    console.log('資料庫連線成功！');
  })
  .catch(err => {
    console.error('資料庫連線失敗:', err);
    process.exit(1);
  });


module.exports = connection;
