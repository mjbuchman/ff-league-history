import React, { Component } from "react";
import "./css/standings.css";
import FilterableTable from "react-filterable-table";
import ReactTooltip from "react-tooltip";

let fields = [
	{ name: 'placement', displayName: "Place", thClassName: "standings-th", tdClassName: "standings-td" },
	{ name: 'owner', displayName: "Owner", thClassName: "standings-th", tdClassName: "standings-td" },
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
            seasons: []
        };

        this.getSeasons = this.getSeasons.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.updateTableData = this.updateTableData.bind(this);
    }
    
    componentDidMount() {
       this.updateTableData();
       this.getSeasons();
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

    handleDateChange = val => event => {
        this.setState({ currDate: event.target.value }, this.updateTableData);
    }

    handleButtonClick(field) {
        if(this.state[field].id === "clicked") this.setState({ [field]: {val: false, id: "unclicked"}}, this.updateTableData);
        else this.setState({ [field]: {val: true, id: "clicked"}}, this.updateTableData);
    }
    
    updateTableData() {
        let dateClause = ""
        let exclude = `where firstJoin.owner != "Sal DiVita" AND firstJoin.owner != "Zach Way"`
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
                    query: `select 0 as placement, firstJoin.owner, win+loss AS gp, win, loss, 0 AS tie, win/(win+loss) AS pct, pf, pa FROM
                                (SELECT outerPoints.owner, win, pf, pa  FROM
                                (SELECT owner, SUM(pf) AS pf, SUM(pa) AS pa FROM (SELECT home_team AS owner, SUM(home_score) AS pf, SUM(away_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner UNION ALL SELECT away_team AS Owner, SUM(away_score) AS pf, SUM(home_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner) AS innerPoints GROUP BY owner) outerPoints
                                INNER JOIN
                                (SELECT owner, COUNT(*) AS win FROM (SELECT home_team AS owner FROM Matchups WHERE home_score > away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score > home_score AND (${clause})) AS innerWins GROUP BY owner) outerWins
                                on (outerPoints.owner = outerWins.owner)) firstJoin 
                                INNER JOIN
                                (SELECT owner, COUNT(*) AS loss FROM (SELECT home_team AS owner FROM Matchups WHERE home_score < away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score < home_score AND (${clause})) AS innerLosses GROUP BY owner) outerLosses
                                on (firstJoin.owner = outerLosses.owner) ${exclude} ORDER BY pct desc, pf desc
                            `
                })
            })
            .then((response) => response.json())
            .then(rows => {
                rows.forEach(row => row.pct = row.pct.toFixed(3) )
                rows.forEach(function (row,i) { row.placement =  i+1})
                this.setState({data: rows});
            })
        }   
    }

    render() {
        return (
            <div className=".container">
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
                                <p>If 'Playoffs' is selected, 'Place' will display final placements;<br/> otherwise, 'Place' will show regular season placements</p>
                            </ReactTooltip>   
                            <select id="date-range" onChange={this.handleDateChange()}>
                                <option value="All-Time">All-Time</option>
                                {this.state.seasons.map(function(season,i) {
                                    return <option value={season.Year} key={i}>{season.Year}</option>
                                })}
                            </select>
                        </h4>
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
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Standings;