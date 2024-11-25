// Establish connection to the mysql database
require("dotenv").config();
const mysql = require("mysql2");
var connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = connection;
