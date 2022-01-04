const mysql = require("mysql");

const db_info = {
  host: "54.180.67.190",
  port: "3306",
  user: "snsc",
  password: "pw112",
  database: "test",
  connectionLimit: "10",
};

module.exports = {
  init: function () {
    return mysql.createConnection(db_info);
  },
  connect: function (conn) {
    conn.connect(function (err) {
      if (err) console.error("mysql connection error : " + err);
      else console.log("mysql is connected successfully!");
    });
  },
};
