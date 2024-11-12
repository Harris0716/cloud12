// Establish connection to the mysql database
const mysql = require("mysql");
class Database {
  constructor() {
    this.host = "";
    this.user = "";
    this.password = "";
    this.database = "";
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: 3306,
    });
  }
  connect() {
    this.connection.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }

  query(sql) {
    this.connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  }

  close() {
    this.connection.end();
  }
}
module.exports = Database;
