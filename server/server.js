const getH2HOverview = require("../server/services/headtohead.js");
const path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
const pg = require('pg');

const app = express();
var jsonParser = bodyParser.json();

// use local host or heroku specified port
const port = process.env.PORT || 5000;
// specify path to the build folder and point express app to it
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

const config = {
    user: process.env.REACT_APP_DB_USERNAME,
    password: process.env.REACT_APP_DB_PASSWORD,
    host: "wallersteinffl-wallersteinffl-2024.l.aivencloud.com",
    port: 27842,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: false,
    },
};

var pool = new pg.Pool(config);
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.connect(error => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

// app connected and listening to outputted port
app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

const queryDB = (res, query) => {
  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      if (rows.rows) {
        res.send(rows.rows);
      } else {
        res.send(rows[rows.length-1].rows)
      }
    }
  });
};

const sendH2HOverview = (res, query, owner1, owner2) => {
  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      overview = getH2HOverview(rows.rows, owner1, owner2);
      res.send(overview); 
    }
  });
};

  // pool.query(query, (err, rows) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(overview);
  //   }
  // });

//----------------------------------
//  SHARED
//----------------------------------
app.get("/owners", (req, res) => {
  var query = "Select * from Owners";
  queryDB(res, query);
});

app.get("/seasons", (req, res) => {
  var query = "Select distinct Year from Matchups order by Year desc";
  queryDB(res, query);
});

app.get("/leagueAvgPF/:year", (req, res) => {
  var query = `Select sum(Home_Score + Away_Score)/(Select count(distinct Home_Team) from Matchups where Year = ${req.params.year}) as points from Matchups where Year = ${req.params.year};`;
  queryDB(res, query);
});

//----------------------------------
//  OVERVIEW
//----------------------------------
app.get("/overview/seasons/:owner", (req, res) => {
  var query = `select count(distinct year) as count from Matchups where home_team = '${req.params.owner}' OR away_team = '${req.params.owner}'`;
  queryDB(res, query);
});

app.get("/overview/gp/:owner", (req, res) => {
  var query = `select count(*) as count from Matchups where home_team = '${req.params.owner}' OR away_team = '${req.params.owner}'`;
  queryDB(res, query);
});

app.get("/overview/games/:owner", (req, res) => {
  var query = `select * from Matchups where home_team = '${req.params.owner}' OR away_team = '${req.params.owner}'`;
  queryDB(res, query);
});

app.get("/overview/tpf/:owner", (req, res) => {
  var query = `select sum(score) as tpf from (Select sum(Home_score) as score from Matchups where Home_Team = '${req.params.owner}' UNION Select sum(Away_score) as score from Matchups where Away_Team = '${req.params.owner}') as points`;
  queryDB(res, query);
});

app.get("/overview/tpa/:owner", (req, res) => {
  var query = `select sum(score) as tpa from (Select sum(Away_score) as score from Matchups where Home_Team = '${req.params.owner}' UNION Select sum(Home_score) as score from Matchups where Away_Team = '${req.params.owner}') as points`;
  queryDB(res, query);
});

app.get("/overview/highScore/:owner", (req, res) => {
  var query = `Select Year, Week, Score from (Select Year, Week, Home_score as Score from Matchups where Home_Team = '${req.params.owner}' AND Regular_Season = 'TRUE' UNION Select Year, Week, Away_Score as Score from Matchups where Away_Team = '${req.params.owner}' AND Regular_Season = 'TRUE') as scores order by Score DESC limit 1`;
  queryDB(res, query);
});

app.get("/overview/lowScore/:owner", (req, res) => {
  var query = `Select Year, Week, Score from (Select Year, Week, Home_score as Score from Matchups where Home_Team = '${req.params.owner}' AND Regular_Season = 'TRUE' UNION Select Year, Week, Away_Score as Score from Matchups where Away_Team = '${req.params.owner}' AND Regular_Season = 'TRUE') as scores order by Score ASC limit 1`;
  queryDB(res, query);
});

app.get("/overview/bwm/:owner", (req, res) => {
  var query = `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = '${req.params.owner}' AND Home_Score > Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = '${req.params.owner}' AND Away_Score > Home_Score) as margins order by Margin desc limit 1`;
  queryDB(res, query);
});

app.get("/overview/swm/:owner", (req, res) => {
  var query = `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = '${req.params.owner}' AND Home_Score > Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = '${req.params.owner}' AND Away_Score > Home_Score) as margins order by Margin asc limit 1`;
  queryDB(res, query);
});

app.get("/overview/blm/:owner", (req, res) => {
  var query = `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = '${req.params.owner}' AND Home_Score < Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = '${req.params.owner}' AND Away_Score < Home_Score) as margins order by Margin asc limit 1`;
  queryDB(res, query);
});

app.get("/overview/slm/:owner", (req, res) => {
  var query = `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = '${req.params.owner}' AND Home_Score < Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = '${req.params.owner}' AND Away_Score < Home_Score) as margins order by Margin desc limit 1`;
  queryDB(res, query);
});

app.get("/overview/playoffs/:owner", (req, res) => {
  var query = `select count(distinct year) as count from Matchups where (home_team = '${req.params.owner}' OR away_team = '${req.params.owner}') AND Playoff = 'TRUE'`;
  queryDB(res, query);
});

app.get("/overview/weekHS/:owner", (req, res) => {
  var query = ` 
     drop table if exists results;
     drop table if exists results2;

     Create table results as
     select year, week, home_team as owner, home_score as score from Matchups where Home_Score > Away_Score UNION select year, week, away_team as owner, away_score as score from Matchups where Home_Score < Away_Score;

     Create table results2 as select * from results;

    select count(*) from (
        select year, week, score, owner from results
    ) a
     inner join
    (
     select year, week, max(score) as score from results2 group by year, week
    ) b
    on a.year = b.year AND a.week = b.week AND a.score = b.score 
    where owner = '${req.params.owner}'
  `;
  queryDB(res, query);
});

app.get("/overview/weekLS/:owner", (req, res) => {
  var query = `
     drop table if exists results;
     drop table if exists results2;

     Create table results as
     select year, week, home_team as owner, home_score as score from Matchups where Home_Score < Away_Score UNION select year, week, away_team as owner, away_score as score from Matchups where Home_Score > Away_Score;

     Create table results2 as select * from results;

    select count(*) from (
        select year, week, score, owner from results
    ) a
     inner join
    (
     select year, week, min(score) as score from results2 group by year, week
    ) b
    on a.year = b.year AND a.week = b.week AND a.score = b.score 
    where owner = '${req.params.owner}'
  `;
  queryDB(res, query);
});

//----------------------------------
//  HEAD TO HEAD
//----------------------------------
app.get("/h2h/matchups/:owner1/:owner2", (req, res) => {
  var query = `select * from Matchups where (home_team = '${req.params.owner1}' OR home_team = '${req.params.owner2}') AND (away_team = '${req.params.owner1}' OR away_team = '${req.params.owner2}')`;
  queryDB(res, query);
});
app.get("/h2h/matchups/:owner1/:owner2/:double/:type", (req, res) => {
  var query = `
    drop table if exists h2h;
    drop table if exists h2h2;
    create table h2h as
        Select Year, Week, Home_Score as score from (
            select * from Matchups where home_team = '${req.params.owner1}' AND away_team = '${req.params.owner2}' AND Two_Week = '${req.params.double}'
        ) as x
        UNION
        Select Year, Week, Away_Score as score from (
            select * from Matchups where away_team = '${req.params.owner1}' AND home_team = '${req.params.owner2}' AND Two_Week = '${req.params.double}'
        ) as y;
        
    create table h2h2 as select * from h2h;
    select year, week, score from h2h2 where score = (select ${req.params.type}(score) from h2h2);
    `;
  queryDB(res, query);
});

app.get("/getH2HOverview/:owner1/:owner2", (req, res) => {
  var query = `select * from Matchups where (home_team = '${req.params.owner1}' OR home_team = '${req.params.owner2}') AND (away_team = '${req.params.owner1}' OR away_team = '${req.params.owner2}')`;
  sendH2HOverview(res, query, req.params.owner1, req.params.owner2);
});
//----------------------------------
//  STANDINGS
//----------------------------------
app.get("/standings/:year/:regSeason/:playoff", (req, res) => {
  let dateClause = "";
  let exclude = `where Points.owner != 'Sal DiVita' AND Points.owner != 'Zach Way'`; // INACTIVE LEAGUE MEMBERS

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
    var clause = `Regular_Season = '${regSeason}' AND Playoff = '${playoff}'${dateClause}`;
  }

  var query = `
    drop table if exists WinLoss;
    drop table if exists Points;

    create table WinLoss as
        select owner, sum(win) as win, sum(loss) as loss from
        (SELECT owner, COUNT(*) AS win, 0 as loss FROM (SELECT home_team AS owner FROM Matchups WHERE home_score > away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score > home_score AND (${clause}) UNION ALL SELECT home_team AS owner FROM Matchups WHERE away_score = home_score AND tiebreak = 'H' AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score = home_score AND tiebreak = 'A' AND (${clause})) AS innerWins GROUP BY owner
        UNION ALL
        SELECT owner, 0 as win, COUNT(*) AS loss FROM (SELECT home_team AS owner FROM Matchups WHERE home_score < away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score < home_score AND (${clause}) UNION ALL SELECT home_team AS owner FROM Matchups WHERE away_score = home_score AND tiebreak = 'A' AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score = home_score AND tiebreak = 'H' AND (${clause})) AS innerLosses GROUP BY owner) as WL group by owner;
        
        create table Points as
        Select * from (SELECT owner, SUM(pf) AS pf, SUM(pa) AS pa FROM (SELECT home_team AS owner, SUM(home_score) AS pf, SUM(away_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner UNION ALL SELECT away_team AS Owner, SUM(away_score) AS pf, SUM(home_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner) AS innerPoints GROUP BY owner) as OuterPoints;
        
        select 0 as placement, Points.owner as owner, win+loss AS gp, win, loss, win/(win+loss) AS pct, pf, pa from WinLoss inner join Points on (WinLoss.owner = Points.owner) ${exclude} order by pct desc, pf desc;
    `;
  queryDB(res, query);
});

app.get("/standings/final", (req, res) => {
  var query = `select * from Final_Standings`;
  queryDB(res, query);
});

//----------------------------------
//  RECORDS
//----------------------------------
app.get("/records/highScores/:condition", (req, res) => {
  var query = `SELECT * FROM (SELECT year, week, home_team as owner, home_score as score FROM Matchups ${req.params.condition} UNION SELECT year, week, away_team as owner, away_score as score FROM Matchups ${req.params.condition}) as scores order by score DESC LIMIT 25`;
  queryDB(res, query);
});

app.get("/records/lowScores/:condition", (req, res) => {
  var query = `SELECT * FROM (SELECT year, week, home_team as owner, home_score as score FROM Matchups ${req.params.condition} UNION SELECT year, week, away_team as owner, away_score as score FROM Matchups ${req.params.condition}) as scores order by score ASC LIMIT 25`;
  queryDB(res, query);
});

app.get("/records/highMOV/:condition", (req, res) => {
  var query = `SELECT year, week, CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, ABS(home_score-away_score) AS points FROM Matchups ${req.params.condition} ORDER BY (ABS(home_score-away_score)) DESC LIMIT 25`;
  queryDB(res, query);
});

app.get("/records/lowMOV/:condition", (req, res) => {
  var query = `SELECT year, week ,CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, ABS(home_score-away_score) AS points FROM Matchups ${req.params.condition} ORDER BY (ABS(home_score-away_score)) ASC LIMIT 25`;
  queryDB(res, query);
});

app.get("/records/highComb/:condition", (req, res) => {
  var query = `SELECT year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, home_score+away_score AS points FROM Matchups ${req.params.condition} ORDER BY (home_score+away_score) DESC LIMIT 25`;
  queryDB(res, query);
});

app.get("/records/lowComb/:condition", (req, res) => {
  var query = `SELECT year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, home_score+away_score AS points FROM Matchups ${req.params.condition} ORDER BY (home_score+away_score) ASC LIMIT 25`;
  queryDB(res, query);
});

app.get("/records/highSL/:condition", (req, res) => {
  var query = `
    select year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, score AS points from \
    (select *, Away_Score as score from Matchups where home_score > away_score AND ${req.params.condition} UNION select *, Home_Score as score from Matchups where home_score < away_score AND ${req.params.condition}) as scores \
    order by Points desc LIMIT 25
    `;
  queryDB(res, query);
});

app.get("/records/lowSW/:condition", (req, res) => {
  var query = `
    select year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, score AS points from \
    (select *, Home_Score as score from Matchups where home_score > away_score AND ${req.params.condition} UNION select *, Away_Score as score from Matchups where home_score < away_score AND ${req.params.condition}) as scores \
    order by Points Asc LIMIT 25
  `;
  queryDB(res, query);
});

//----------------------------------
//  DRAFTS
//----------------------------------
app.get("/drafts", (req, res) => {
  var query = `select distinct Year from Drafts order by Year desc`;
  queryDB(res, query);
});

app.get("/drafts/:year", (req, res) => {
  var query = `select * from Drafts where Year = ${req.params.year}`;
  queryDB(res, query);
});

//----------------------------------
//  ADMIN
//----------------------------------
app.get("/deleteMatchups/:year/:start/:end", (req, res) => {
  var query = `DELETE from Matchups where Year = ${req.params.year} AND Week >= ${req.params.start} AND Week <= ${req.params.end}`;
  queryDB(res, query);
});

app.get("/deleteDrafts/:year", (req, res) => {
  var query = `DELETE from Drafts where Year = ${req.params.year}`;
  queryDB(res, query);
});

app.post("/updateMatchups", jsonParser, (req, res) => {
  var query = "INSERT INTO Matchups VALUES";
  query += req.body.matchups.map((week) => {
    return week.map((matchup) => {
      return ` (\'${matchup.year}\', \'${matchup.week}\', \'${matchup.homeTeam}\', \'${matchup.homeScore}\', \'${matchup.awayTeam}\', \'${matchup.awayScore}\', \'${matchup.playoff}\', \'${matchup.twoWeek}\', \'${matchup.regularSeason}\', \'${matchup.tiebreak}\') `;
    });
  });
  query = query.slice(0, -1) + ";";
  queryDB(res, query);
});

app.post("/updateDrafts", jsonParser, (req, res) => {
  var query = "INSERT INTO Drafts VALUES";
  query += req.body.draft.map((pick) => {
    return ` (\"${pick.year}\", \"${pick.round}\", \"${pick.pick}\", \"${pick.name}\", \"${pick.team}\", \"${pick.position}\", \"${pick.owner}\", \"${pick.prk}\", \"${pick.gp}\", \"${pick.fptsg}\", \"${pick.fpts}\") `;
  });
  query = query.slice(0, -1) + ";";
  query = query.replaceAll("\'", "\'\'")
  query = query.replaceAll("\"", "\'")
  queryDB(res, query);
});
