import React, { Component } from "react";
import "./css/headtohead.css"
import LogoDef from "./logos/Wallerstein.jpg";
import LogoMB from "./logos/Michael Buchman.jpg";
import LogoGD from "./logos/Grant Dakovich.jpg";
import LogoBZ from "./logos/Brenden Zarrinnam.jpg";
import LogoJP from "./logos/Joe Perry.jpg";
import LogoJE from "./logos/James Earley.jpg";
import LogoJS from "./logos/Jon Setzke.jpg";
import LogoRR from "./logos/Ryan Rasmussen.jpg";
import LogoTB from "./logos/Tyler Brown.jpg";
import LogoNE from "./logos/Nick Eufrasio.jpg";
import LogoCD from "./logos/Connor DeYoung.jpg";

const img = {
    "": LogoDef,
    "Michael Buchman": LogoMB,
    "Grant Dakovich": LogoGD,
    "Brenden Zarrinnam": LogoBZ,
    "Joe Perry": LogoJP,
    "James Earley": LogoJE,
    "Jon Setzke": LogoJS,
    "Ryan Rasmussen": LogoRR,
    "Tyler Brown": LogoTB,
    "Nick Eufrasio": LogoNE,
    "Connor DeYoung": LogoCD
}
 
class HeadToHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owners: [],
            matchups: [],
            currOwner1: "",
            currOwner2: "",
            o1Wins: null,
            o2Wins: null,
            o1Points: null,
            o2Points: null,
            o1Avg: null,
            o2Avg: null,
            hssw1: [{year: null, week: null, score: null}],
            hssw2: [{year: null, week: null, score: null}],
            lssw1: [{year: null, week: null, score: null}],
            lssw2: [{year: null, week: null, score: null}],
            hsdw1: [{year: null, week: null, score: null}],
            hsdw2: [{year: null, week: null, score: null}],
            lsdw1: [{year: null, week: null, score: null}],
            lsdw2: [{year: null, week: null, score: null}],
            maxMarg1: {val: null, year: null, week: null},
            maxMarg2: {val: null, year: null, week: null},
            minMarg1: {val: null, year: null, week: null},
            minMarg2: {val: null, year: null, week: null}
        };

        this.handleOwnerChange1 = this.handleOwnerChange1.bind(this);
        this.handleOwnerChange2 = this.handleOwnerChange2.bind(this);
        this.queryDB = this.queryDB.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.hlScore = this.hlScore.bind(this);
        this.highMargin = this.highMargin.bind(this);
        this.lowMargin = this.lowMargin.bind(this);
    }

    componentDidMount() {
        this.queryDB("owners", `select * from Owners`, false)
    }

    queryDB(field, query, singleVal) {
        fetch("/api/db", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                query: query
            })
        })
        .then((response) => response.json())
        .then(rows => {
            if(field === "matchups") this.setState({[field]: rows}, this.updateValues);
            else if(singleVal) {
                if(rows[4].length === 0) this.setState({[field]: [{year: null, week: null, score: null}]});
                else this.setState({[field]: rows[4]});
            }
            else this.setState({[field]: rows});
        })
    }

    updateValues() {
        this.countWins();
        this.countPoints();
        this.hlScore("hssw1", true,"FALSE", this.state.currOwner1, this.state.currOwner2);
        this.hlScore("hssw2", true,"FALSE", this.state.currOwner2, this.state.currOwner1);
        this.hlScore("lssw1", false,"FALSE", this.state.currOwner1, this.state.currOwner2);
        this.hlScore("lssw2", false,"FALSE", this.state.currOwner2, this.state.currOwner1);
        this.hlScore("hsdw1", true,"TRUE", this.state.currOwner1, this.state.currOwner2);
        this.hlScore("hsdw2", true,"TRUE", this.state.currOwner2, this.state.currOwner1);
        this.hlScore("lsdw1", false,"TRUE", this.state.currOwner1, this.state.currOwner2);
        this.hlScore("lsdw2", false,"TRUE", this.state.currOwner2, this.state.currOwner1);
        this.highMargin(this.state.currOwner1, "maxMarg1");
        this.highMargin(this.state.currOwner2, "maxMarg2");
        this.lowMargin(this.state.currOwner1, "minMarg1");
        this.lowMargin(this.state.currOwner2, "minMarg2");
    }
    
    usersSelected() {
        if(this.state.currOwner1 !== "" && this.state.currOwner2 !== "") {
            var query =  `select * from Matchups where (home_team = "${this.state.currOwner1}" OR home_team = "${this.state.currOwner2}") AND (away_team = "${this.state.currOwner1}" OR away_team = "${this.state.currOwner2}") `
            this.queryDB("matchups", query, false)
        }
    }

    countWins() {
        if(this.state.currOwner1 === this.state.currOwner2) {
            this.setState({o1Wins: null, o2Wins: null});
        }

        if(this.state.currOwner1 !== this.state.currOwner2) {
            var winCount = 0;
            this.state.matchups.forEach(matchup => {

                if (matchup.Home_Score > matchup.Away_Score) {
                    if (matchup.Home_Team === this.state.currOwner1) winCount++;
                } else {
                    if (matchup.Away_Team === this.state.currOwner1) winCount++;
                }
            }
            );
            this.setState({o1Wins: winCount, o2Wins: this.state.matchups.length - winCount});
        }
    }

    countPoints() {
        var o1Count = 0;
        var o2Count = 0;
        this.state.matchups.forEach(matchup => {
            if (matchup.Home_Team === this.state.currOwner1) {
                o1Count += matchup.Home_Score;
                o2Count += matchup.Away_Score;
            } else {
                o1Count += matchup.Away_Score;
                o2Count += matchup.Home_Score;
            }
        }
        );
        this.setState({o1Points: o1Count.toFixed(2), o2Points: o2Count.toFixed(2), o1Avg: (o1Count/this.state.matchups.length).toFixed(2), o2Avg: (o2Count/this.state.matchups.length).toFixed(2)});
    }

    hlScore(field, high, double, owner1, owner2) {
        var type = "min";
        if(high) type = "max"
        
        if(this.state.currOwner1 !== "" && this.state.currOwner2 !== "") {
            var query = `drop temporary table if exists h2h;
                            drop temporary table if exists h2h2;
                            create temporary table h2h
                                Select Year, Week, Home_Score as score from (
                                    select * from Matchups where home_team = "${owner1}" AND away_team = "${owner2}" AND Two_Week = "${double}"
                                ) as x
                                UNION
                                Select Year, Week, Away_Score as score from (
                                    select * from Matchups where away_team = "${owner1}" AND home_team = "${owner2}" AND Two_Week = "${double}"
                                ) as y;
                                
                            create temporary table h2h2 select * from h2h;
                            
                            select a.year, a.week, a.score
                            from h2h a
                            inner join
                            (select year, week, ${type}(score) as score from h2h2) b
                            on a.score = b.score;`
            this.queryDB(field, query, true)
        }
    }

    highMargin(owner, field) {
        var max = Number.MIN_VALUE;
        var year, week

        this.state.matchups.forEach(matchup => {
            if (matchup.Home_Score > matchup.Away_Score) {
                if (matchup.Home_Team === owner && matchup.Home_Score-matchup.Away_Score > max) {
                    max = matchup.Home_Score-matchup.Away_Score;
                    year = matchup.Year;
                    week = matchup.Week;
                }
            } else {
                if (matchup.Away_Team === owner && matchup.Away_Score-matchup.Home_Score > max ) {
                    max = matchup.Away_Score-matchup.Home_Score;
                    year = matchup.Year;
                    week = matchup.Week;
                }
            }
        }
        );
        if(max === Number.MIN_VALUE) max = false
        this.setState({[field]: {val: max ? max.toFixed(2) : "N/A", year: max ? year : "", week: max ? week : ""}})
    }
    
    lowMargin(owner, field) {
        var min = Number.MAX_VALUE;
        var year, week;

        this.state.matchups.forEach(matchup => {
            if (matchup.Home_Score > matchup.Away_Score) {
                if (matchup.Home_Team === owner && matchup.Home_Score-matchup.Away_Score < min) {
                    min = matchup.Home_Score-matchup.Away_Score;
                    year = matchup.Year;
                    week = matchup.Week;
                }
            } else {
                if (matchup.Away_Team === owner && matchup.Away_Score-matchup.Home_Score < min ) {
                    min = matchup.Away_Score-matchup.Home_Score;
                    year = matchup.Year;
                    week = matchup.Week;
                }
            }
        }
        );
        if(min === Number.MAX_VALUE) min = false
        this.setState({[field]: {val: min ? min.toFixed(2) : "N/A", year: min ? year : "", week: min ? week : ""}})
    }

    handleOwnerChange1 = val => event => {
        this.setState({ currOwner1: event.target.value }, this.usersSelected);
    }
    
    handleOwnerChange2 = val => event => {
        this.setState({ currOwner2: event.target.value }, this.usersSelected);
    }

    render() {
        return (
            <div className=".container">
                <div className="row" id="first-row">
                    <header>Head To Head</header>
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <div className="row">
                            <div className="col-sm-6">
                                <img id="bar-logo" src={img[this.state.currOwner1]} alt={this.state.currOwner1}></img>
                                <select id="owners-logo" defaultValue={'DEFAULT'} onChange={this.handleOwnerChange1()}>
                                    <option value="DEFAULT" disabled hidden>---</option> 
                                    {this.state.owners.map(function(owner,i) {
                                        return <option value={owner.Owner} key={i}>{owner.Owner}</option>
                                    })}
                                </select>
                                <div className="win-box">
                                    <h5 id="big-bold">{this.state.o1Wins}</h5>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <img id="bar-logo" src={img[this.state.currOwner2]} alt={this.state.currOwner2}></img>
                                <select id="owners-logo" defaultValue={'DEFAULT'}  onChange={this.handleOwnerChange2()}>
                                    <option value="DEFAULT" disabled hidden>---</option> 
                                    {this.state.owners.map(function(owner,i) {
                                        return <option value={owner.Owner} key={i}>{owner.Owner}</option>
                                    })}
                                </select>
                                <div className="win-box">
                                    <h5 id="big-bold">{this.state.o2Wins}</h5>
                                </div>
                            </div>
                        </div>
                        { this.state.currOwner1 !== "" && this.state.currOwner2 !== "" && this.state.currOwner1 !== this.state.currOwner2 ? (
                            <div className="row" style={{margin:"0px"}}>
                                <div className="col-sm-12" id="gray-box">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Total Points</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.o1Points}</h2>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.o2Points}</h2>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row" >
                                        <div className="col-sm-12">
                                            <h3>Average Points</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.o1Avg}</h2>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.o2Avg}</h2>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Highest Score - Single Week</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.hssw1[0].score}</h2>
                                            <p>(Week {this.state.hssw1[0].week}, {this.state.hssw1[0].year})</p>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.hssw2[0].score}</h2>
                                            <p>(Week {this.state.hssw2[0].week}, {this.state.hssw2[0].year})</p>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Lowest Score - Single Week</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.lssw1[0].score}</h2>
                                            <p>(Week {this.state.lssw1[0].week}, {this.state.lssw1[0].year})</p>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.lssw2[0].score}</h2>
                                            <p>(Week {this.state.lssw2[0].week}, {this.state.lssw2[0].year})</p>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Highest Score - Double Week</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.hsdw1[0].score ? this.state.hsdw1[0].score : "N/A"}</h2>
                                            {this.state.hsdw1[0].score && <p>(Week {this.state.hsdw1[0].week}, {this.state.hsdw1[0].year})</p>}
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.hsdw2[0].score ? this.state.hsdw2[0].score : "N/A"}</h2>
                                            {this.state.hsdw2[0].score && <p>(Week {this.state.hsdw2[0].week}, {this.state.hsdw2[0].year})</p>}
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Lowest Score - Double Week</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.lsdw1[0].score ? this.state.lsdw1[0].score : "N/A"}</h2>
                                            {this.state.lsdw1[0].score && <p>(Week {this.state.lsdw1[0].week}, {this.state.lsdw1[0].year})</p>}
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.lsdw2[0].score ? this.state.lsdw2[0].score : "N/A"}</h2>
                                            {this.state.lsdw2[0].score && <p>(Week {this.state.lsdw2[0].week}, {this.state.lsdw2[0].year})</p>}
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Biggest Win Margin</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.maxMarg1.val}</h2>
                                            {this.state.maxMarg1.val !== 'N/A' && <p>(Week {this.state.maxMarg1.week}, {this.state.maxMarg1.year})</p>}
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.maxMarg2.val}</h2>
                                            {this.state.maxMarg2.val !== 'N/A' && <p>(Week {this.state.maxMarg2.week}, {this.state.maxMarg2.year})</p>}
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Smallest Win Margin</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.minMarg1.val}</h2>
                                            {this.state.minMarg1.val !== 'N/A' && <p>(Week {this.state.minMarg1.week}, {this.state.minMarg1.year})</p>}
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">{this.state.minMarg2.val}</h2>
                                            {this.state.minMarg2.val !== 'N/A' && <p>(Week {this.state.minMarg2.week}, {this.state.minMarg2.year})</p>}
                                            <hr></hr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row" style={{margin:"0px"}}>
                                <div className="col-sm-12" id="gray-box">
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="col-sm-5">
                        <h4>Gamelogs</h4>
                        <div id="box">
                            <table id="base-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Game</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.matchups.map(function(matchup,i) {
                                        return (
                                            <tr key={i}>
                                                <td>Season {matchup.Year}, Week {matchup.Week}</td>
                                                <td>{matchup.Home_Team} <b>{matchup.Home_Score}</b>, {matchup.Away_Team} <b>{matchup.Away_Score}</b></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default HeadToHead;