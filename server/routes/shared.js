var express = require('express');
var router = express.Router();
const queryDB = require("../connection/connection")

router.get("/owners", (req, res) => {
    var query = "Select * from Owners";
    queryDB(res, query);
  });
  
router.get("/seasons", (req, res) => {
    var query = "Select distinct Year from Matchups order by Year desc";
    queryDB(res, query);
});

router.get("/leagueAvgPF", (req, res) => {
    var query = `
        drop temporary table if exists totalPts;
        create temporary table totalPts select sum(Home_Score + Away_Score) as points, Year from Matchups group by Year;
            
        Select round(points/(Select count(distinct Home_Team) from Matchups where Year = totalPts.Year), 2) as avg from totalPts;
    `;
    queryDB(res, query);
});

module.exports = router;