function getOwnerOverview(matchups, owner) {
  var overview = {
    tpf: 0,
    tpa: 0,
    wins: 0,
    recordData: {
      rsWins: 0,
      rsLosses: 0,
      pWins: 0,
      pLosses: 0,
    },
    bwm: { Year: 0, Week: 0, Score: 0 },
    swm: { Year: 0, Week: 0, Score: 999 },
    blm: { Year: 0, Week: 0, Score: 0 },
    slm: { Year: 0, Week: 0, Score: 999 },
    highScore: { Year: 0, Week: 0, Score: 0 },
    lowScore: { Year: 0, Week: 0, Score: 999 },
  };
  var seasons = [];
  var playoffSeasons = [];

  matchups.forEach((matchup) => {
    var isHomeTeam = matchup.Home_Team == owner;
    var isWinner =
      (matchup.Winner == "H" && isHomeTeam) ||
      (matchup.Winner == "A" && !isHomeTeam);

    if (!seasons.includes(matchup.Year)) {
      seasons.push(matchup.Year);
    }
    if (matchup.Playoff == "TRUE" && !playoffSeasons.includes(matchup.Year)) {
      playoffSeasons.push(matchup.Year);
    }
    overview.tpf += getMatchupPF(matchup, owner);
    overview.tpa += getMatchupPA(matchup, owner);
    overview.wins += isWinner ? 1 : 0;
    updateMargins(overview, matchup, isWinner);
    updateHighLowScores(overview, matchup, isHomeTeam);
    updateRecordData(overview, matchup, isWinner);
  });
  overview.seasons = seasons.length;
  overview.pApps = playoffSeasons.length;
  overview.gp = matchups.length;
  overview.tpf = overview.tpf.toFixed(2);
  overview.tpa = overview.tpa.toFixed(2);
  overview.apf = (overview.tpf / overview.gp).toFixed(2);
  overview.apa = (overview.tpa / overview.gp).toFixed(2);
  overview.losses = overview.gp - overview.wins;
  return overview;
}

function getMatchupPF(matchup, owner) {
  if (matchup.Home_Team == owner) {
    return matchup.Home_Score;
  } else {
    return matchup.Away_Score;
  }
}

function getMatchupPA(matchup, owner) {
  if (matchup.Home_Team == owner) {
    return matchup.Away_Score;
  } else {
    return matchup.Home_Score;
  }
}

function updateMargins(overview, matchup, isWinner) {
  var margin = Math.abs(matchup.Home_Score - matchup.Away_Score);

  if (isWinner && margin > overview.bwm.Score) {
    overview.bwm.Score = margin.toFixed(2);
    overview.bwm.Year = matchup.Year;
    overview.bwm.Week = matchup.Week;
  }

  if (isWinner && margin < overview.swm.Score) {
    overview.swm.Score = margin.toFixed(2);
    overview.swm.Year = matchup.Year;
    overview.swm.Week = matchup.Week;
  }

  if (!isWinner && margin > overview.blm.Score) {
    overview.blm.Score = margin.toFixed(2);
    overview.blm.Year = matchup.Year;
    overview.blm.Week = matchup.Week;
  }

  if (!isWinner && margin < overview.slm.Score) {
    overview.slm.Score = margin.toFixed(2);
    overview.slm.Year = matchup.Year;
    overview.slm.Week = matchup.Week;
  }
}

function updateHighLowScores(overview, matchup, isHomeTeam) {
  if (matchup.Playoff == "TRUE" || matchup.Two_Week == "TRUE") return;
  var score = isHomeTeam ? matchup.Home_Score : matchup.Away_Score;
  if (score > overview.highScore.Score) {
    overview.highScore.Score = score;
    overview.highScore.Year = matchup.Year;
    overview.highScore.Week = matchup.Week;
  } else if (score < overview.lowScore.Score) {
    overview.lowScore.Score = score;
    overview.lowScore.Year = matchup.Year;
    overview.lowScore.Week = matchup.Week;
  }
}

function updateRecordData(overview, matchup, isWinner) {
  var isRegularSeason = matchup.Regular_Season == "TRUE";
  var isPlayoff = matchup.Playoff == "TRUE";
  if (isWinner && isRegularSeason) {
    overview.recordData.rsWins++;
  } else if (isWinner && isPlayoff) {
    overview.recordData.pWins++;
  } else if (!isWinner && isRegularSeason) {
    overview.recordData.rsLosses++;
  } else if (!isWinner && isPlayoff) {
    overview.recordData.pLosses++;
  }
}

module.exports = {
  getOwnerOverview,
};
