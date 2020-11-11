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
        };

        this.handleOwnerChange1 = this.handleOwnerChange1.bind(this);
        this.handleOwnerChange2 = this.handleOwnerChange2.bind(this);
    }

    componentDidMount() {
        fetch("/api/db", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                query: 'select * from Owners'
            })
        })
        .then((response) => response.json())
        .then(rows => {
            this.setState({owners: rows});
        })
    }

    usersSelected() {
        if(this.state.currOwner1 !== "" && this.state.currOwner2 !== "") {
            fetch("/api/db", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify({
                    query: `select * from Matchups where (home_team = "${this.state.currOwner1}" OR home_team = "${this.state.currOwner2}") AND (away_team = "${this.state.currOwner1}" OR away_team = "${this.state.currOwner2}") `
                })
            })
            .then((response) => response.json())
            .then(rows => {
                this.setState({matchups: rows}, this.countWins);
            })
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
            this.setState({o1Wins: winCount, o2Wins: this.state.matchups.length - winCount}, this.countPoints);
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
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Lowest Score - Single Week</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Highest Score - Double Week</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Lowest Score - Double Week</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Biggest Win Margin</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3>Smallest Win Margin</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
                                            <hr></hr>
                                        </div>
                                        <div className="col-sm-6">
                                            <h2 id="drop-shadow">Insert Value</h2>
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