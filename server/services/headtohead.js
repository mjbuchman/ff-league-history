const getH2HOverview = function(matchups, owner1, owner2) {
    var overview = {
        o1Data: {
            wins: 0,
            points: 0,
            pointsSW: 0,
            gamesSW: 0,
            hssw: { year: null, week: null, score: 0 },
            lssw: { year: null, week: null, score: 999 },
            hsdw: { year: null, week: null, score: 0 },
            lsdw: { year: null, week: null, score: 999 },
            maxMOV: { year: null, week: null, val: 0 },
            minMOV: { year: null, week: null, val: 999 }
        },
        o2Data: {
            wins: 0,
            points: 0,
            pointsSW: 0,
            gamesSW: 0,
            hssw: { year: null, week: null, score: 0 },
            lssw: { year: null, week: null, score: 999 },
            hsdw: { year: null, week: null, score: 0 },
            lsdw: { year: null, week: null, score: 999 },
            maxMOV: { year: null, week: null, val: 0 },
            minMOV: { year: null, week: null, val: 999 }
        }
    };

    matchups.forEach(matchup => {
        matchup.home_score = parseFloat(matchup.home_score);
        matchup.away_score = parseFloat(matchup.away_score);
        var isOwner1HomeTeam = matchup.home_team == owner1;
        var isOwner1Winner = (isOwner1HomeTeam && (matchup.home_score > matchup.away_score || matchup.tiebreak == 'H')) ||
            (!isOwner1HomeTeam && (matchup.home_score < matchup.away_score || matchup.tiebreak == 'A'));

        var owner1Points = isOwner1HomeTeam ? matchup.home_score : matchup.away_score;
        var owner2Points = !isOwner1HomeTeam ? matchup.home_score : matchup.away_score;
        var pointDiff = Math.round(Math.abs(owner1Points - owner2Points)*100)/100;

        if (isOwner1Winner) {
            overview.o1Data.wins += 1;
            if (pointDiff > overview.o1Data.maxMOV.val) {
                overview.o1Data.maxMOV.val = pointDiff
                overview.o1Data.maxMOV.week = matchup.week;
                overview.o1Data.maxMOV.year = matchup.year;
            }
            if (pointDiff < overview.o1Data.minMOV.val) {
                overview.o1Data.minMOV.val = pointDiff
                overview.o1Data.minMOV.week = matchup.week;
                overview.o1Data.minMOV.year = matchup.year;
            }
        } else {
            overview.o2Data.wins += 1;
            if (pointDiff > overview.o2Data.maxMOV.val) {
                overview.o2Data.maxMOV.val = pointDiff
                overview.o2Data.maxMOV.week = matchup.week;
                overview.o2Data.maxMOV.year = matchup.year;
            }
            if (pointDiff < overview.o2Data.minMOV.val) {
                overview.o2Data.minMOV.val = pointDiff
                overview.o2Data.minMOV.week = matchup.week;
                overview.o2Data.minMOV.year = matchup.year;
            }
        }
        
        overview.o1Data.points += owner1Points;
        overview.o2Data.points += owner2Points;
        if(matchup.two_week == "FALSE") {
            overview.o1Data.pointsSW += owner1Points;
            overview.o2Data.pointsSW += owner2Points;
            overview.o1Data.gamesSW++;
            overview.o2Data.gamesSW++;
        }

        if (matchup.two_week == "FALSE") {
            if (owner1Points > overview.o1Data.hssw.score) {
                overview.o1Data.hssw.score = owner1Points;
                overview.o1Data.hssw.week = matchup.week;
                overview.o1Data.hssw.year = matchup.year;
            }
            if (owner2Points > overview.o2Data.hssw.score) {
                overview.o2Data.hssw.score = owner2Points;
                overview.o2Data.hssw.week = matchup.week;
                overview.o2Data.hssw.year = matchup.year;
            }
            if (owner1Points < overview.o1Data.lssw.score) {
                overview.o1Data.lssw.score = owner1Points;
                overview.o1Data.lssw.week = matchup.week;
                overview.o1Data.lssw.year = matchup.year;
            }
            if (owner2Points < overview.o2Data.lssw.score) {
                overview.o2Data.lssw.score = owner2Points;
                overview.o2Data.lssw.week = matchup.week;
                overview.o2Data.lssw.year = matchup.year;
            }
        } else {
            if (owner1Points > overview.o1Data.hsdw.score) {
                overview.o1Data.hsdw.score = owner1Points;
                overview.o1Data.hsdw.week = matchup.week;
                overview.o1Data.hsdw.year = matchup.year;
            }
            if (owner2Points > overview.o2Data.hsdw.score) {
                overview.o2Data.hsdw.score = owner2Points;
                overview.o2Data.hsdw.week = matchup.week;
                overview.o2Data.hsdw.year = matchup.year;
            }
            if (owner1Points < overview.o1Data.lsdw.score) {
                overview.o1Data.lsdw.score = owner1Points;
                overview.o1Data.lsdw.week = matchup.week;
                overview.o1Data.lsdw.year = matchup.year;
            }
            if (owner2Points < overview.o2Data.lsdw.score) {
                overview.o2Data.lsdw.score = owner2Points;
                overview.o2Data.lsdw.week = matchup.week;
                overview.o2Data.lsdw.year = matchup.year;
            }
        }
    });
    overview.o1Data.points = overview.o1Data.points.toFixed(2);
    overview.o2Data.points = overview.o2Data.points.toFixed(2);
    overview.o1Data.avgPF = (overview.o1Data.points/matchups.length).toFixed(2);
    overview.o2Data.avgPF = (overview.o2Data.points/matchups.length).toFixed(2);
    overview.o1Data.pointsSW = overview.o1Data.pointsSW.toFixed(2);
    overview.o2Data.pointsSW = overview.o2Data.pointsSW.toFixed(2);
    overview.o1Data.avgPFSW = (overview.o1Data.pointsSW/overview.o1Data.gamesSW).toFixed(2);
    overview.o2Data.avgPFSW = (overview.o2Data.pointsSW/overview.o2Data.gamesSW).toFixed(2);
    return overview;
}

module.exports = getH2HOverview;
