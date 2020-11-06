const mysql = require('mysql');

const con = mysql.createConnection({
    host: "rds-mysql-wallersteinffl.cpvy0zo2vtvt.us-east-1.rds.amazonaws.com",
    user: "masterUsername",
    password: "wallersteinFFLdb"
});

con.connect(function(err) {
    if (err) throw err;
    con.query('USE WallersteinFFL');
    con.query("SELECT Owner, COUNT(*) As Appearances FROM (SELECt home_team as Owner FROM Wallerstein_Matchup_Scores WHERE playoff = \'TRUE\' UNION ALL SELECt away_team as Owner FROM Wallerstein_Matchup_Scores WHERE playoff = \'TRUE\') as X Group by Owner ORDER BY Appearances DESC", function(error, result, fields) {
        console.log(error);
        console.log(result);
    });
    con.end();
});