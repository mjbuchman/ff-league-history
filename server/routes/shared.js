var express = require("express");
var router = express.Router();
const db = require("../services/db");

router.get("/owners", (req, res) => {
  db.query(`CALL getOwners()`, (error, data) => {
    if (error) {
      return res.json({ status: "ERROR", error });
    }

    return res.json(data[0]);
  });
});

router.get("/seasons", (req, res) => {
  var query = "Select distinct Year from Matchups order by Year desc";
});

router.get("/leagueAvgPF", (req, res) => {
  var query = `
        drop temporary table if exists totalPts;
        create temporary table totalPts select sum(Home_Score + Away_Score) as points, Year from Matchups group by Year;
            
        Select round(points/(Select count(distinct Home_Team) from Matchups where Year = totalPts.Year), 2) as avg from totalPts;
    `;
});

module.exports = router;
