const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8000;

const pool = mysql.createPool({
    host: "rds-mysql-wallersteinffl.cpvy0zo2vtvt.us-east-1.rds.amazonaws.com",
    user: "masterUsername",
    password: "wallersteinFFLdb",
    database: "WallersteinFFL"
});

app.listen(port, () => {
    console.log(`App server now listening to port ${port}`);
});

app.get('/api/db', (req, res) => {
    pool.query(`select * from Owners`, (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});
