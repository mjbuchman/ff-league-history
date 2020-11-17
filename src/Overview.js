import React, { Component } from "react";
import "./css/overview.css"
import ReactSpeedometer from "react-d3-speedometer"
import {Line} from 'react-chartjs-2';
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

const dict = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
    5: "5th",
    6: "6th",
    7: "7th",
    8: "8th",
    9: "9th",
    10: "10th"
}

const data = {
    labels: ['2017', '2018', '2019', '2020'],
    datasets: [
        {
            label: 'Wins By Year',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [9,4,7,6],
      }
    ]
};

const options = {
    scales: {
        yAxes: [
            {   
                ticks: {
                    min: 0,
                    max: 14,
                },
            },
        ],
    },
}

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owners: [],
            currOwner: "Michael Buchman",
            ownerVals: [],
            seasons: [{count: 0}],
            gp: [{count: 0}],
            games: [],
            recordData: {totalWins: 0, totalLosses: 0, rsWins: 0, rsLosses: 0, pWins:0, pLosses:0},
            tpf: [{tpf: 0}],
            tpa: [{tpa: 0}],
            highScore: [{Year: 0, Week: 0, Score: 0}],
            lowScore: [{Year: 0, Week: 0, Score: 0}],
            bwm: [{Year: 0, Week: 0, Score: 0}],
            swm: [{Year: 0, Week: 0, Score: 0}],
            blm: [{Year: 0, Week: 0, Score: 0}],
            slm: [{Year: 0, Week: 0, Score: 0}],
            pApp: [{count: 0}]
        };

        this.queryDB = this.queryDB.bind(this);
        this.getOwners = this.getOwners.bind(this);
        this.setOwnerVals = this.setOwnerVals.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.getMainTables = this.getMainTables.bind(this);
        this.getRecordDate = this.getRecordData.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
    }

    componentDidMount() {
        this.getOwners();
    }

    queryDB(field, query) {
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
            if (field === "owners") this.setState({[field]: rows}, this.updateValues);
            if (field === "games") this.setState({[field]: rows}, this.getRecordData);
            else this.setState({[field]: rows});
        })
    }

    getOwners() {
        this.queryDB("owners", "select * from Owners")
    }

    setOwnerVals() {
        var currOwner = this.state.currOwner;
        var index = 0;
        this.state.owners.forEach(function (owner, i) { 
            if(currOwner === owner.Owner) index = i;
        });

        this.setState({ownerVals: this.state.owners[index]});
    }

    updateValues() {
        this.setOwnerVals();
        this.getMainTables();
        console.log(this.state)
    }

    getMainTables() {
        this.queryDB("seasons", `select count(distinct year) as count from Matchups where home_team = "${this.state.currOwner}" OR away_team = "${this.state.currOwner}"`)
        this.queryDB("gp", `select count(*) as count from Matchups where home_team = "${this.state.currOwner}" OR away_team = "${this.state.currOwner}"`)
        this.queryDB("games", `select * from Matchups where home_team = "${this.state.currOwner}" OR away_team = "${this.state.currOwner}"`)
        this.queryDB("tpf", `select sum(score) as tpf from (Select sum(Home_score) as score from Matchups where Home_Team = "${this.state.currOwner}" UNION Select sum(Away_score) as score from Matchups where Away_Team = "${this.state.currOwner}") as points`)
        this.queryDB("tpa", `select sum(score) as tpa from (Select sum(Away_score) as score from Matchups where Home_Team = "${this.state.currOwner}" UNION Select sum(Home_score) as score from Matchups where Away_Team = "${this.state.currOwner}") as points`)
        this.queryDB("highScore", `Select Year, Week, Score from (Select Year, Week, Home_score as Score from Matchups where Home_Team = "${this.state.currOwner}" AND Regular_Season = "TRUE" UNION Select Year, Week, Away_Score as Score from Matchups where Away_Team = "${this.state.currOwner}" AND Regular_Season = "TRUE") as scores order by Score DESC limit 1`)
        this.queryDB("lowScore", `Select Year, Week, Score from (Select Year, Week, Home_score as Score from Matchups where Home_Team = "${this.state.currOwner}" AND Regular_Season = "TRUE" UNION Select Year, Week, Away_Score as Score from Matchups where Away_Team = "${this.state.currOwner}" AND Regular_Season = "TRUE") as scores order by Score ASC limit 1`)
        this.queryDB("bwm", `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${this.state.currOwner}" AND Home_Score > Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${this.state.currOwner}" AND Away_Score > Home_Score) as margins order by Margin desc limit 1`)
        this.queryDB("swm", `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${this.state.currOwner}" AND Home_Score > Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${this.state.currOwner}" AND Away_Score > Home_Score) as margins order by Margin asc limit 1`)
        this.queryDB("blm", `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${this.state.currOwner}" AND Home_Score < Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${this.state.currOwner}" AND Away_Score < Home_Score) as margins order by Margin asc limit 1`)
        this.queryDB("slm", `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${this.state.currOwner}" AND Home_Score < Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${this.state.currOwner}" AND Away_Score < Home_Score) as margins order by Margin desc limit 1`)
        this.queryDB("pApp", `select count(distinct year) as count from Matchups where (home_team = "${this.state.currOwner}" OR away_team = "${this.state.currOwner}") AND Playoff = "TRUE"`)
    }

    getRecordData() {
        var totalWins = 0, totalLosses = 0, rsWins = 0, rsLosses = 0, pWins = 0, pLosses = 0
        var currOwner = this.state.currOwner
        this.state.games.forEach(function (game) { 
            if(game.Home_Team === currOwner) {
                if(game.Home_Score > game.Away_Score) {
                    totalWins++;
                    if (game.Regular_Season === "TRUE") rsWins++;
                    if (game.Playoff === "TRUE") pWins++;
                } else {
                    totalLosses++;
                    if (game.Regular_Season === "TRUE") rsLosses++;
                    if (game.Playoff === "TRUE") pLosses++;
                } 
            } else {
                if(game.Away_Score > game.Home_Score) {
                    totalWins++;
                    if (game.Regular_Season === "TRUE") rsWins++;
                    if (game.Playoff === "TRUE") pWins++;
                } else {
                    totalLosses++;
                    if (game.Regular_Season === "TRUE") rsLosses++;
                    if (game.Playoff === "TRUE") pLosses++;
                }
            }
        })

        this.setState({recordData: {
            totalWins: totalWins,
            totalLosses: totalLosses,
            rsWins: rsWins,
            rsLosses: rsLosses,
            pWins: pWins,
            pLosses: pLosses
        }})

    }

    handleOwnerChange = val => event => {
        this.setState({ currOwner: event.target.value }, this.updateValues);
    }

    render() {
        return (
            <div className=".container">
                <div className="row"  id="first-row">
                    <header>Team Overview</header>
                </div>
                <div className="row">
                    <div className="col-sm-5" style={{paddingLeft: "35px"}}>
                        <div className="row">
                            <select id="owners" onChange={this.handleOwnerChange()}>
                                {this.state.owners.map(function(owner,i) {
                                    return <option value={owner.Owner} key={i}>{owner.Owner}</option>
                                })}
                            </select>
                        </div>
                        <div className="row" id="gray-box">
                            <div className="col-sm-12">
                                <img id="overview-logo" src={img[this.state.currOwner]} alt={this.state.currOwner}></img>
                                <h3>Owner</h3>
                                <h2 id="owner">{this.state.currOwner}</h2>
                            </div>
                            <div className="col-sm-4" id="top-padded">
                                <h3>Seasons Played</h3>
                                <h2>{this.state.seasons[0].count}</h2>
                            </div>
                            <div className="col-sm-4" id="top-padded">
                                <h3>Games Played</h3>
                                <h2>{this.state.gp[0].count}</h2>
                            </div>
                            <div className="col-sm-4" id="top-padded">
                                <h3>Record</h3>
                                <h2>{`${this.state.recordData.totalWins}-${this.state.recordData.totalLosses}-0`}</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Total Points For</h3>
                                <h2>{this.state.tpf[0].tpf}</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Total Points Against</h3>
                                <h2>{this.state.tpa[0].tpa}</h2>
                            </div>        
                            <div className="col-sm-6" id="top-padded">
                                <h3>Average Points For</h3>
                                <h2>{(this.state.tpf[0].tpf/this.state.gp[0].count).toFixed(2)}</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Average Points Against</h3>
                                <h2>{(this.state.tpa[0].tpa/this.state.gp[0].count).toFixed(2)}</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Highest Score - Regular Season</h3>
                                <h2>{this.state.highScore[0].Score}</h2>
                                <p>(Week {this.state.highScore[0].Week}, {this.state.highScore[0].Year})</p>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Lowest Score - Regular Season</h3>
                                <h2>{this.state.lowScore[0].Score}</h2>
                                <p>(Week {this.state.lowScore[0].Week}, {this.state.lowScore[0].Year})</p>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Biggest Win Margin</h3>
                                <h2>{this.state.bwm[0].Margin}</h2>
                                <p>(Week {this.state.bwm[0].Week}, {this.state.bwm[0].Year})</p>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Smallest Win Margin</h3>
                                <h2>{this.state.swm[0].Margin}</h2>
                                <p>(Week {this.state.swm[0].Week}, {this.state.swm[0].Year})</p>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Biggest Loss Margin</h3>
                                <h2>{this.state.blm[0].Margin}</h2>
                                <p>(Week {this.state.blm[0].Week}, {this.state.blm[0].Year})</p>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Smallest Loss Margin</h3>
                                <h2>{this.state.slm[0].Margin}</h2>
                                <p>(Week {this.state.slm[0].Week}, {this.state.slm[0].Year})</p>
                            </div> 
                        </div>    
                    </div>
                    <div className="col-sm-7">
                        <h4>Regular Season Performance</h4>
                        <div id="box">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h5>Win Rate</h5>
                                    <ReactSpeedometer
                                        maxValue={1.000}
                                        width={190}
                                        height={140}
                                        needleHeightRatio={0.7}
                                        maxSegmentLabels={4}
                                        segments={1000}
                                        value={(this.state.recordData.rsWins/(this.state.recordData.rsWins + this.state.recordData.rsLosses)).toFixed(3)}
                                        textColor='#777'
                                        />
                                </div>
                                <div className="col-sm-3">
                                    <h5>Win</h5>
                                    <hr></hr>
                                    <h1>{this.state.recordData.rsWins}</h1>
                                </div>
                                <div className="col-sm-3">
                                    <h5>Loss</h5>
                                    <hr></hr>
                                    <h1>{this.state.recordData.rsLosses}</h1>
                                </div>
                                <div className="col-sm-3">
                                    <h5>Tie</h5>
                                    <hr></hr>
                                    <h1>0</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Regular Season Champion</h6>
                                        <div id="box">
                                            <h1 id="small-mar">{this.state.ownerVals.RS_Champion}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Last Place Finishes</h6>
                                        <div id="box">
                                            <h1 id="small-mar">{this.state.ownerVals.Last_Place_RS}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Best Placement</h6>
                                        <div id="box">
                                            <h1 id="small-mar">{dict[this.state.ownerVals.Best_Placement_RS]}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Season High Scorer</h6>
                                        <div id="box">
                                            <h1 id="small-mar">{this.state.ownerVals.Season_HS}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Weekly High Scorer</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Weekly Low Scorer</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <h4>Playoff Performance</h4>
                        <div id="box">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h5>Win Rate</h5>
                                    <ReactSpeedometer
                                        maxValue={1.000}
                                        width={190}
                                        height={140}
                                        needleHeightRatio={0.7}
                                        maxSegmentLabels={4}
                                        segments={1000}
                                        value={(this.state.recordData.pWins/(this.state.recordData.pWins + this.state.recordData.pLosses)).toFixed(3)}
                                        textColor='#777'
                                        />
                                </div>
                                <div className="col-sm-3">
                                    <h5>Win</h5>
                                    <hr></hr>
                                    <h1>{this.state.recordData.pWins}</h1>
                                </div>
                                <div className="col-sm-3">
                                    <h5>Loss</h5>
                                    <hr></hr>
                                    <h1>{this.state.recordData.pLosses}</h1>
                                </div>
                                <div className="col-sm-3">
                                    <h5>Tie</h5>
                                    <hr></hr>
                                    <h1>0</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="stats-box">
                                        <h6>Playoff Appearances</h6>
                                        <div id="box">
                                            <h1 id="small-mar">{this.state.pApp[0].count}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="stats-box">
                                        <h6>Best Placement</h6>
                                        <div id="box">
                                            <h1 id="small-mar">{dict[this.state.ownerVals.Best_Placement_Final]}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="stats-box">
                                        <h6>Championship Appearances</h6>
                                        <div id="box">
                                            <h1 id="small-mar">{this.state.ownerVals.Champ_App}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="stats-box">
                                        <h6>Championships</h6>
                                        <div id="box">
                                            <h1 id="small-mar">{this.state.ownerVals.Championships}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h4>Yearly Performance</h4>
                        <div id="box">
                            <Line data={data} height={100} options={options}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Overview;