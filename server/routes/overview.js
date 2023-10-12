var express = require('express');
var router = express.Router();
const queryDB = require("../connection/connection")

router.get("/overview/seasons/:owner", (req, res) => {
    var query = `select count(distinct year) as count from Matchups where home_team = "${req.params.owner}" OR away_team = "${req.params.owner}"`;
    queryDB(res, query);
  });
  
router.get("/overview/gp/:owner", (req, res) => {
    var query = `select count(*) as count from Matchups where home_team = "${req.params.owner}" OR away_team = "${req.params.owner}"`;
    queryDB(res, query);
});

router.get("/overview/games/:owner", (req, res) => {
    var query = `select * from Matchups where home_team = "${req.params.owner}" OR away_team = "${req.params.owner}"`;
    queryDB(res, query);
});

router.get("/overview/tpf/:owner", (req, res) => {
    var query = `select sum(score) as tpf from (Select sum(Home_score) as score from Matchups where Home_Team = "${req.params.owner}" UNION Select sum(Away_score) as score from Matchups where Away_Team = "${req.params.owner}") as points`;
    queryDB(res, query);
});

router.get("/overview/tpa/:owner", (req, res) => {
    var query = `select sum(score) as tpa from (Select sum(Away_score) as score from Matchups where Home_Team = "${req.params.owner}" UNION Select sum(Home_score) as score from Matchups where Away_Team = "${req.params.owner}") as points`;
    queryDB(res, query);
});

router.get("/overview/highScore/:owner", (req, res) => {
    var query = `Select Year, Week, Score from (Select Year, Week, Home_score as Score from Matchups where Home_Team = "${req.params.owner}" AND Regular_Season = "TRUE" UNION Select Year, Week, Away_Score as Score from Matchups where Away_Team = "${req.params.owner}" AND Regular_Season = "TRUE") as scores order by Score DESC limit 1`;
    queryDB(res, query);
});

router.get("/overview/lowScore/:owner", (req, res) => {
    var query = `Select Year, Week, Score from (Select Year, Week, Home_score as Score from Matchups where Home_Team = "${req.params.owner}" AND Regular_Season = "TRUE" UNION Select Year, Week, Away_Score as Score from Matchups where Away_Team = "${req.params.owner}" AND Regular_Season = "TRUE") as scores order by Score ASC limit 1`;
    queryDB(res, query);
});

router.get("/overview/bwm/:owner", (req, res) => {
    var query = `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${req.params.owner}" AND Home_Score > Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${req.params.owner}" AND Away_Score > Home_Score) as margins order by Margin desc limit 1`;
    queryDB(res, query);
});

router.get("/overview/swm/:owner", (req, res) => {
    var query = `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${req.params.owner}" AND Home_Score > Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${req.params.owner}" AND Away_Score > Home_Score) as margins order by Margin asc limit 1`;
    queryDB(res, query);
});

router.get("/overview/blm/:owner", (req, res) => {
    var query = `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${req.params.owner}" AND Home_Score < Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${req.params.owner}" AND Away_Score < Home_Score) as margins order by Margin asc limit 1`;
    queryDB(res, query);
});

router.get("/overview/slm/:owner", (req, res) => {
    var query = `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${req.params.owner}" AND Home_Score < Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${req.params.owner}" AND Away_Score < Home_Score) as margins order by Margin desc limit 1`;
    queryDB(res, query);
});

router.get("/overview/playoffs/:owner", (req, res) => {
    var query = `select count(distinct year) as count from Matchups where (home_team = "${req.params.owner}" OR away_team = "${req.params.owner}") AND Playoff = "TRUE"`;
    queryDB(res, query);
});

router.get("/overview/weekHS/:owner", (req, res) => {
    var query = ` 
        drop temporary table if exists results;
        drop temporary table if exists results2;
        
        Create temporary table results
        select year, week, home_team as owner, home_score as score from Matchups where Home_Score > Away_Score UNION select year, week, away_team as owner, away_score as score from Matchups where Home_Score < Away_Score;
        
        Create temporary table results2 select * from results;
        
        select count(*) as count from 
        (select a.year, a.week, a.score, a.owner
        from results a
        inner join
        (select year, week, max(score) as score from results2 group by year, week) b
        on a.year = b.year AND a.week = b.week AND a.score = b.score) as res where owner = "${req.params.owner}"
    `;
    queryDB(res, query);
});

router.get("/overview/weekLS/:owner", (req, res) => {
    var query = `
        drop temporary table if exists results;
        drop temporary table if exists results2;
        
        Create temporary table results
        select year, week, home_team as owner, home_score as score from Matchups where Home_Score < Away_Score UNION select year, week, away_team as owner, away_score as score from Matchups where Home_Score > Away_Score;
        
        Create temporary table results2 select * from results;
        
        select count(*) as count from 
        (select a.year, a.week, a.score, a.owner
        from results a
        inner join
        (select year, week, min(score) as score from results2 group by year, week) b
        on a.year = b.year AND a.week = b.week AND a.score = b.score) as res where owner = "${req.params.owner}"
    `;
    queryDB(res, query);
});

module.exports = router;