import React, { Component } from "react";
import "./css/standings.css";
import FilterableTable from "react-filterable-table";
 
let data = [
	{ rank: 1, owner: "Michael Buchman", win: 27, loss: 10, tie: 0, pct: .639, pf: 2000, pa: 1800,},
	{ rank: 2, owner: "Joe Perry", win: 21, loss: 16, tie: 0, pct: .577, pf: 2400, pa: 2600,},
	{ rank: 3, owner: "James Earley", win: 18, loss: 19, tie: 0, pct: .466, pf: 1800, pa: 2700,}
];

let fields = [
	{ name: 'rank', displayName: "Rank", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, sortable: true },
	{ name: 'owner', displayName: "Owner", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'win', displayName: "Wins", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'loss', displayName: "Losses", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'tie', displayName: "Ties", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'pct', displayName: "Win %", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'pf', displayName: "PF", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'pa', displayName: "PA", thClassName: "standings-th", tdClassName: "standings-td", inputFilterable: true, exactFilterable: true, sortable: true }
];

class Standings extends Component {
  render() {
    return (
        <div className=".container">
            <div className="row" id="first-row">
                <h0>Standings</h0>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <h4>
                        <input type="checkbox" id="regular-season" name="regular-season" value="reg"></input><label for="regular-season">Regular Season</label>
                        <input type="checkbox" id="playoffs" name="playoffs" value="pf"></input><label for="playoffs">Playoffs</label>
                        <select id="date-range">
                            <option value="All-Time">All-Time</option>
                            <option value="2020 Season">2020 Season</option>
                        </select>
                    </h4>
                    <div id="box">
                        <FilterableTable
                            namespace="People"
                            initialSort="rank"
                            data={data}
                            fields={fields}
                            tableClassName="standings-table"
                            trClassName="standings-tr"
                            headerVisible={false}
		                />
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
 
export default Standings;