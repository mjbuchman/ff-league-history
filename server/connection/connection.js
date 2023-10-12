const mysql = require("mysql");

const pool = mysql.createPool({
    host: "us-cdbr-east-04.cleardb.com",
    user: process.env.REACT_APP_DB_USERNAME,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: "heroku_b07eee809c333e6",
    multipleStatements: true,
  });

const queryDB = (res, query) => {
    pool.query(query, (err, rows) => {
        if (err) {
        res.send(err);
        } else {
        res.send(rows);
        }
    });
};

module.exports = queryDB;