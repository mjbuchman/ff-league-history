import React, { Component } from "react";
import "./css/standings.css";
import FilterableTable from "react-filterable-table";
 
let data = [
	{ rank: 1, owner: "Michael Buchman", win: 27, loss: 10, tie: 0, pct: .639, pf: 2000, pa: 1800,},
	{ rank: 2, owner: "Joe Perry", win: 21, loss: 16, tie: 0, pct: .577, pf: 2400, pa: 2600,},
	{ rank: 3, owner: "James Earley", win: 18, loss: 19, tie: 0, pct: .466, pf: 1800, pa: 2700,}
];

let fields = [
	{ name: 'rank', displayName: "Rank", thClassName: "standings-th", tdClassName: "standings-td" },
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
            regSeason: true,
            playoff: false,
            timePeriod: "All-Time",
            data: []
        };
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
                //query: `SELECT owner, SUM(pf)as pf, SUM(pa) as pa FROM (SELECt home_team as owner, SUM(home_score) as pf, SUM(away_score) as pa FROM Matchups GROUp BY Owner UNION ALL SELECt away_team as Owner, SUM(away_score) as pf, SUM(home_score) as pa FROM Matchups GROUP BY Owner)as x GROUP BY Owner Order BY pf DESC`
                query: `select firstJoin.owner, win+loss as gp, win, loss, 0 as tie, win/(win+loss) as pct, pf, pa from

                (select outerPoints.owner, win, pf, pa  from
                (SELECT owner, SUM(pf)as pf, SUM(pa) as pa FROM (SELECT home_team as owner, SUM(home_score) as pf, SUM(away_score) as pa FROM Matchups GROUp BY Owner UNION ALL SELECt away_team as Owner, SUM(away_score) as pf, SUM(home_score) as pa FROM Matchups GROUP BY Owner) as innerPoints group by owner) outerPoints
                inner join
                (SELECT owner, COUNT(*) as win FROM (Select home_team as owner from Matchups WHERE home_score > away_score UNION ALL Select away_team as owner from Matchups WHERE away_score > home_score) as innerWins GROUP By owner) outerWins
                on (outerPoints.owner = outerWins.owner)) firstJoin 
                
                inner join
                
                (SELECT owner, COUNT(*) as loss FROM (Select home_team as owner from Matchups WHERE home_score < away_score UNION ALL Select away_team as owner from Matchups WHERE away_score < home_score) as innerLosses GROUP By owner) outerLosses
                
                on (firstJoin.owner = outerLosses.owner) where firstJoin.owner != "Sal DiVita" AND firstJoin.owner != "Zach Way" order by win desc
                
                `
            })
        })
        .then((response) => response.json())
        .then(rows => {
            console.log(rows)
            this.setState({data: rows});
        })
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
                            <input type="checkbox" id="regular-season" name="regular-season" value="reg"></input><label htmlFor="regular-season">Regular Season</label>
                            <input type="checkbox" id="playoffs" name="playoffs" value="pf"></input><label htmlFor="playoffs">Playoffs</label>
                            <select id="date-range">
                                <option value="All-Time">All-Time</option>
                                <option value="2020 Season">2020 Season</option>
                            </select>
                        </h4>
                        <div id="box">
                            <FilterableTable
                                namespace="People"
                                initialSort="pct"
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