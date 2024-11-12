// Establish connection to the mysql database
const mysql = require("mysql2");
var connection = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "",
});

module.exports = connection;
