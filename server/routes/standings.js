var express = require('express');
var router = express.Router();
const queryDB = require("../connection/connection")

router.get("/standings/:year/:regSeason/:playoff", (req, res) => {
    let dateClause = "";
    let exclude = `where Points.owner != "Sal DiVita" AND Points.owner != "Zach Way"`; // INACTIVE LEAGUE MEMBERS
  
    // add date to query if year is specified
    if (req.params.year !== "All-Time") {
      dateClause = ` AND Year = ${req.params.year}`;
      exclude = "";
    }
  
    // add regular season and playoff values to query
    if (req.params.regSeason === "true" && req.params.playoff === "true") {
      var clause = `true${dateClause}`;
    } else {
      var regSeason = req.params.regSeason.toUpperCase();
      var playoff = req.params.playoff.toUpperCase();
      var clause = `Regular_Season = "${regSeason}" AND Playoff = "${playoff}"${dateClause}`;
    }
  
    var query = `
      drop temporary table if exists WinLoss;
      drop temporary table if exists Points;
  
      create temporary table WinLoss
          select owner, sum(win) as win, sum(loss) as loss from
          (SELECT owner, COUNT(*) AS win, 0 as loss FROM (SELECT home_team AS owner FROM Matchups WHERE home_score > away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score > home_score AND (${clause})) AS innerWins GROUP BY owner
          UNION ALL
          SELECT owner, 0 as win, COUNT(*) AS loss FROM (SELECT home_team AS owner FROM Matchups WHERE home_score < away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score < home_score AND (${clause})) AS innerLosses GROUP BY owner) as WL group by owner;
          
          create temporary table Points
          Select * from (SELECT owner, SUM(pf) AS pf, SUM(pa) AS pa FROM (SELECT home_team AS owner, SUM(home_score) AS pf, SUM(away_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner UNION ALL SELECT away_team AS Owner, SUM(away_score) AS pf, SUM(home_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner) AS innerPoints GROUP BY owner) as OuterPoints;
          
          select 0 as placement, Points.owner as owner, win+loss AS gp, win, loss, 0 AS tie, win/(win+loss) AS pct, pf, pa from WinLoss inner join Points on (WinLoss.owner = Points.owner) ${exclude} order by pct desc, pf desc;
      `;
    queryDB(res, query);
});
  
router.get("/standings/final", (req, res) => {
    var query = `select * from Final_Standings`;
    queryDB(res, query);
});

module.exports = router;