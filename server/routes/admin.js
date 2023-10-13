var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/deleteMatchups/:year/:start/:end", (req, res) => {
    var query = `DELETE from Matchups where Year = ${req.params.year} AND Week >= ${req.params.start} AND Week <= ${req.params.end}`;
});
  
router.get("/deleteDrafts/:year", (req, res) => {
    var query = `DELETE from Drafts where Year = ${req.params.year}`;
});
  
router.post("/updateMatchups", jsonParser, (req, res) => {
    var query = "INSERT INTO Matchups VALUES";
    query += req.body.matchups.map((week) => {
      return week.map((matchup) => {
        return ` (\"${matchup.year}\", \"${matchup.week}\", \"${matchup.homeTeam}\", \"${matchup.homeScore}\", \"${matchup.awayTeam}\", \"${matchup.awayScore}\", \"${matchup.playoff}\", \"${matchup.twoWeek}\", \"${matchup.regularSeason}\") `;
      });
    });
    query = query.slice(0, -1) + ";";
});
  
router.post("/updateDrafts", jsonParser, (req, res) => {
    var query = "INSERT INTO Drafts VALUES";
    query += req.body.draft.map((pick) => {
      return ` (\"${pick.year}\", \"${pick.round}\", \"${pick.pick}\", \"${pick.name}\", \"${pick.team}\", \"${pick.position}\", \"${pick.owner}\", \"${pick.prk}\", \"${pick.gp}\", \"${pick.fptsg}\", \"${pick.fpts}\") `;
    });
    query = query.slice(0, -1) + ";";
});

module.exports = router;