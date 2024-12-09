// Establish connection to the mysql database
require("dotenv").config();
console.log("Environment Variables:", process.env);

const mysql = require("mysql2");
var connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = connection;

connection.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database!");
    conn.release(); // 釋放連接回 connection pool
  }
});
