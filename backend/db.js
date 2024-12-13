require("dotenv").config();
const PORT = process.env.DB_PORT || 3306;
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: PORT,
});

module.exports = connection;
