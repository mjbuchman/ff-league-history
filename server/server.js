const path = require('path');
const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser')

const app = express();
var jsonParser = bodyParser.json()

// use local host or heroku specified port
const port = process.env.PORT || 5000

// specify path to the build folder and point express app to it
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// database credentials
const pool = mysql.createPool({
    host: "rds-mysql-wallersteinffl.cpvy0zo2vtvt.us-east-1.rds.amazonaws.com",
    user: process.env.REACT_APP_DB_USERNAME,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: "WallersteinFFL",
    multipleStatements: true
});

// app connected and listening to outputted port
app.listen(port, () => {
    console.log(`App server now listening to port ${port}`);
});

// post function to send passed in query to database
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
