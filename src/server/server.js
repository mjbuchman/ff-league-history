const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser')

const app = express();
var jsonParser = bodyParser.json()
const port = 5000
const pool = mysql.createPool({
    host: "rds-mysql-wallersteinffl.cpvy0zo2vtvt.us-east-1.rds.amazonaws.com",
    user: "masterUsername",
    password: "wallersteinFFLdb",
    database: "WallersteinFFL",
    multipleStatements: true
});

app.listen(port, () => {
    console.log(`App server now listening to port ${port}`);
});

app.post('/api/db', jsonParser, (req, res) => {
    var query = req.body.query;
    pool.query(query, (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});
