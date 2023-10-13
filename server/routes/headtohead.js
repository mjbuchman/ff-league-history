var express = require('express');
var router = express.Router();

router.get("/h2h/matchups/:owner1/:owner2", (req, res) => {
    var query = `select * from Matchups where (home_team = "${req.params.owner1}" OR home_team = "${req.params.owner2}") AND (away_team = "${req.params.owner1}" OR away_team = "${req.params.owner2}")`;
});

router.get("/h2h/matchups/:owner1/:owner2/:double/:type", (req, res) => {
    var query = `
      drop temporary table if exists h2h;
      drop temporary table if exists h2h2;
      create temporary table h2h
          Select Year, Week, Home_Score as score from (
              select * from Matchups where home_team = "${req.params.owner1}" AND away_team = "${req.params.owner2}" AND Two_Week = "${req.params.double}"
          ) as x
          UNION
          Select Year, Week, Away_Score as score from (
              select * from Matchups where away_team = "${req.params.owner1}" AND home_team = "${req.params.owner2}" AND Two_Week = "${req.params.double}"
          ) as y;
          
      create temporary table h2h2 select * from h2h;
      
      select a.year, a.week, a.score
      from h2h a
      inner join
      (select year, week, ${req.params.type}(score) as score from h2h2) b
      on a.score = b.score;
      `;
});

module.exports = router;