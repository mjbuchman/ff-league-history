const path = require('path');
const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser')

const app = express();
var jsonParser = bodyParser.json()
const port = process.env.PORT || 5000

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

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
