var express = require('express');
var router = express.Router();
const queryDB = require("../connection/connection")

router.get("/records/highScores/:condition", (req, res) => {
    var query = `SELECT * FROM (SELECT year, week, home_team as owner, home_score as score FROM Matchups ${req.params.condition} UNION SELECT year, week, away_team as owner, away_score as score FROM Matchups ${req.params.condition}) as scores order by score DESC LIMIT 10`;
    queryDB(res, query);
});
  
router.get("/records/lowScores/:condition", (req, res) => {
    var query = `SELECT * FROM (SELECT year, week, home_team as owner, home_score as score FROM Matchups ${req.params.condition} UNION SELECT year, week, away_team as owner, away_score as score FROM Matchups ${req.params.condition}) as scores order by score ASC LIMIT 10`;
    queryDB(res, query);
});
  
router.get("/records/highMOV/:condition", (req, res) => {
    var query = `SELECT year, week, CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, ABS(home_score-away_score) AS points FROM Matchups ${req.params.condition} ORDER BY (ABS(home_score-away_score)) DESC LIMIT 10`;
    queryDB(res, query);
});
  
router.get("/records/lowMOV/:condition", (req, res) => {
    var query = `SELECT year, week ,CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, ABS(home_score-away_score) AS points FROM Matchups ${req.params.condition} ORDER BY (ABS(home_score-away_score)) ASC LIMIT 10`;
    queryDB(res, query);
});
  
router.get("/records/highComb/:condition", (req, res) => {
    var query = `SELECT year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, home_score+away_score AS points FROM Matchups ${req.params.condition} ORDER BY (home_score+away_score) DESC LIMIT 10`;
    queryDB(res, query);
});
  
router.get("/records/lowComb/:condition", (req, res) => {
    var query = `SELECT year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, home_score+away_score AS points FROM Matchups ${req.params.condition} ORDER BY (home_score+away_score) ASC LIMIT 10`;
    queryDB(res, query);
});
  
router.get("/records/highSL/:condition", (req, res) => {
    var query = `
      select year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, score AS points from \
      (select *, Away_Score as score from Matchups where home_score > away_score AND ${req.params.condition} UNION select *, Home_Score as score from Matchups where home_score < away_score AND ${req.params.condition}) as scores \
      order by Points desc limit 10
      `;
    queryDB(res, query);
});
  
router.get("/records/lowSW/:condition", (req, res) => {
    var query = `
      select year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, score AS points from \
      (select *, Home_Score as score from Matchups where home_score > away_score AND ${req.params.condition} UNION select *, Away_Score as score from Matchups where home_score < away_score AND ${req.params.condition}) as scores \
      order by Points Asc limit 10
    `;
    queryDB(res, query);
});

module.exports = router;