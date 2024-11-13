// Establish connection to the mysql database
const mysql = require("mysql2");
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123A456b",
  database: "test",
});

module.exports = connection;
