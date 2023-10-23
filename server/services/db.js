const mysql = require("mysql");
const dbConfig = require("../config");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  connectTimeout: 60000,
  multipleStatements: true,
});

module.exports = connection;
