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
});

module.exports = connection;
