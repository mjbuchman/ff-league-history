import React, { Component } from "react";
import "./css/standings.css";
import FilterableTable from "react-filterable-table";
import ReactTooltip from "react-tooltip";
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
import LogoDef from "./logos/Wallerstein.jpg";
import fPlace from "./logos/trophy_first.svg";
import sPlace from "./logos/trophy_second.svg";
import tPlace from "./logos/trophy_third.svg";

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
    "Connor DeYoung": LogoCD,
    "Zach Way": LogoDef,
    "Sal DiVita": LogoDef,
    1: fPlace,
    2: sPlace,
    3: tPlace
}

const renderTrophy = (props) => {
    if (props.record.placement > 3) {
        return (
            <span>
                {props.record.placement}
            </span>
        );
    } else {
            return (
                <span>
                    <img src={img[props.record.placement]} alt="table-trophy" style={{width:"30px", borderRadius: "100%"}}></img>
                </span>
            );
    }
};

const renderLogo = (props) => {
    return (
        <span>
            <img src={img[props.record.owner]} alt="table-logo" style={{width:"40px", borderRadius: "100%"}}></img>
        </span>
    );
};

let fields = [
	{ name: 'placement', displayName: "Place", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'logo', displayName: "Owner", thClassName: "standings-th", tdClassName: "standings-td", render: renderLogo},
	{ name: 'owner', displayName: "", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'gp', displayName: "Games Played", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'win', displayName: "Wins", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'loss', displayName: "Losses", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'tie', displayName: "Ties", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'pct', displayName: "Win %", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'pf', displayName: "PF", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'pa', displayName: "PA", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true }
];

let fields2 = [
	{ name: 'placement', displayName: "Place", thClassName: "standings-th", tdClassName: "standings-td", render: renderTrophy, inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'logo', displayName: "Owner", thClassName: "standings-th", tdClassName: "standings-td", render: renderLogo},
	{ name: 'owner', displayName: "", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'gp', displayName: "Games Played", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'win', displayName: "Wins", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'loss', displayName: "Losses", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'tie', displayName: "Ties", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'pct', displayName: "Win %", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'pf', displayName: "PF", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'pa', displayName: "PA", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true }
];

class Standings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regSeason: { val: true, id: "clicked"},
            playoff: { val: true, id: "clicked" },
            timePeriod: "All-Time",
            data: [],
            currDate: "All-Time",
            seasons: [],
            finalStandings:[]
        };

        this.getSeasons = this.getSeasons.bind(this);
        this.getFinalStandings = this.getFinalStandings.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.updateTableData = this.updateTableData.bind(this);
        this.chooseTableType = this.chooseTableType.bind(this);
    }
    
    componentDidMount() {
        this.getFinalStandings();
        this.getSeasons();
        this.updateTableData();
    }

    getSeasons() {
        fetch("/api/db", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                query: `select distinct Year from Matchups order by Year desc`
            })
        })
        .then((response) => response.json())
        .then(rows => {
            this.setState({seasons: rows});
        })
    }

    getFinalStandings() {
        fetch("/api/db", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                query: `select * from Final_Standings`
            })
        })
        .then((response) => response.json())
        .then(rows => {
            this.setState({finalStandings: rows});
        })
    }

    handleDateChange = val => event => {
        this.setState({ currDate: event.target.value }, this.updateTableData);
    }

    handleButtonClick(field) {
        if(this.state[field].id === "clicked") this.setState({ [field]: {val: false, id: "unclicked"}}, this.updateTableData);
        else this.setState({ [field]: {val: true, id: "clicked"}}, this.updateTableData);
    }
    
    updateTableData() {
        let dateClause = ""
        let exclude = `where Points.owner != "Sal DiVita" AND Points.owner != "Zach Way"`
        if (this.state.currDate !== "All-Time") {
            dateClause = ` AND Year = ${this.state.currDate}`
            exclude = ""
        }

        let clause = `Regular_Season = "${this.state.regSeason.val}" AND Playoff = "${this.state.playoff.val}"${dateClause}`
        if (this.state.regSeason.val && this.state.playoff.val) clause = `true${dateClause}`;

        if (!this.state.regSeason.val && !this.state.playoff.val) this.setState({data: []});
        else {
            fetch("/api/db", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify({
                    query: `drop temporary table if exists WinLoss;
                                drop temporary table if exists Points;

                                create temporary table WinLoss
                                    select owner, sum(win) as win, sum(loss) as loss from (
                                    (SELECT owner, COUNT(*) AS win, 0 as loss FROM (SELECT home_team AS owner FROM Matchups WHERE home_score > away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score > home_score AND (${clause})) AS innerWins GROUP BY owner
                                    UNION ALL
                                    SELECT owner, 0 as win, COUNT(*) AS loss FROM (SELECT home_team AS owner FROM Matchups WHERE home_score < away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score < home_score AND (${clause})) AS innerLosses GROUP BY owner)) as WL group by owner;
                                    
                                    create temporary table Points
                                    Select * from (SELECT owner, SUM(pf) AS pf, SUM(pa) AS pa FROM (SELECT home_team AS owner, SUM(home_score) AS pf, SUM(away_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner UNION ALL SELECT away_team AS Owner, SUM(away_score) AS pf, SUM(home_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner) AS innerPoints GROUP BY owner) as OuterPoints;
                                    
                                    select 0 as placement, Points.owner as owner, win+loss AS gp, win, loss, 0 AS tie, win/(win+loss) AS pct, pf, pa from WinLoss inner join Points on (WinLoss.owner = Points.owner) ${exclude} order by pct desc, pf desc;
                            `
                })
            })
            .then((response) => response.json())
            .then(rows => {
                rows[4].forEach(row => row.pct = row.pct.toFixed(3) )
                if (this.state.currDate !== "All-Time" && this.state.currDate !== new Date().getFullYear() && this.state.playoff.val) {
                    rows[4].forEach(row =>
                        this.state.finalStandings.forEach(rowStandings => { 
                            if(rowStandings.Owner === row.owner && rowStandings.Year === this.state.currDate) row.placement = rowStandings.Place;
                        })
                    )
                } else {
                    rows[4].forEach(function (row,i) { row.placement =  i+1})
                }
                this.setState({data: rows[4]});
            })
        }   
    }

    chooseTableType() {
        if(!this.state.playoff.val || this.state.currDate === "All-Time" || this.state.currDate === new Date().getFullYear()) {
            return (
                <div id="box">
                    <FilterableTable
                        namespace="People"
                        initialSort="placement"
                        initialSortDir={true}
                        data={this.state.data}
                        fields={fields}
                        tableClassName="standings-table"
                        trClassName="standings-tr"
                        headerVisible={false}
                        pagersVisible={false}
                    />
                </div>
            )
        } else {
            return (
                <div id="box">
                    <FilterableTable
                        namespace="People"
                        initialSort="placement"
                        initialSortDir={true}
                        data={this.state.data}
                        fields={fields2}
                        tableClassName="standings-table"
                        trClassName="standings-tr"
                        headerVisible={false}
                        pagersVisible={false}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row" id="first-row">
                    <header>Standings</header>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h4>
                            <button id={this.state.regSeason.id} onClick={() => this.handleButtonClick("regSeason")}>Regular Season</button>
                            <button id={this.state.playoff.id} onClick={() => this.handleButtonClick("playoff")}>Playoffs</button>
                            <a data-tip data-for='info'><i className="material-icons">help_outline</i></a>
                            <ReactTooltip id='info'place="right" type="dark" effect="solid" multiline={true}> 
                                <p>When viewing individual seasons:</p>
                                <p>If 'Playoffs' is selected, 'Place' will display final placements;<br/> otherwise, 'Place' will show regular season placements</p>
                            </ReactTooltip>   
                            <select id="date-range" onChange={this.handleDateChange()}>
                                <option value="All-Time">All-Time</option>
                                {this.state.seasons.map(function(season,i) {
                                    return <option value={season.Year} key={i}>{season.Year}</option>
                                })}
                            </select>
                        </h4>
                        {this.chooseTableType()}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Standings;