import React, { Component } from "react";
import "./css/records.css"
import FilterableTable from "react-filterable-table";

let data1 = [
	{ rank: 1, owner: "Michael Buchman", year: 2019, week: 7, score: 120.49},
	{ rank: 2, owner: "Joe Perry", year: 2019, week: 7, score: 120.49},
	{ rank: 3, owner: "James Earley", year: 2019, week: 7, score: 120.49}
];

let fields1 = [
	{ name: 'rank', displayName: "Rank", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'owner', displayName: "Owner", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'year', displayName: "Year", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'week', displayName: "Week", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'score', displayName: "Score", thClassName: "standings-th-header", tdClassName: "standings-td"}
];

let data2 = [
	{ rank: 1, matchup: "Michael Buchman - 140.65 vs. Joe Perry - 102.33", year: 2019, week: 7, points: 120.49},
	{ rank: 2, matchup: "Michael Buchman - 140.65 vs. Joe Perry - 102.33", year: 2019, week: 7, points: 120.49},
	{ rank: 3, matchup: "Michael Buchman - 140.65 vs. Joe Perry - 102.33", year: 2019, week: 7, points: 120.49}
];

let fields2 = [
	{ name: 'rank', displayName: "Rank", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'matchup', displayName: "Matchup", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'year', displayName: "Year", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'week', displayName: "Week", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'points', displayName: "Points", thClassName: "standings-th-header", tdClassName: "standings-td"}
];

class Records extends Component {
  render() {
    return (
        <div className=".container">
            <div className="row" id="first-row">
                <header>Records</header>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <h4>
                        <button>Regular Season</button>
                        <button>Playoff - Single Week</button>
                        <button>Playoff - Double Week</button>
                        <select id="date-range">
                            <option value="All-Time">All-Time</option>
                            <option value="2020 Season">2020 Season</option>
                        </select>
                    </h4>
                    <div id="box">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="table-title">
                                    <h3 id="table-head">Highest Scores</h3>
                                </div>
                                <FilterableTable
                                    namespace="People"
                                    initialSort="rank"
                                    data={data1}
                                    fields={fields1}
                                    tableClassName="standings-table-header"
                                    trClassName="standings-tr"
                                    headerVisible={false}
                                    pagersVisible={false}
                                />
                            </div>
                            <div className="col-sm-6">
                                <div className="table-title">
                                    <h3 id="table-head">Lowest Scores</h3>
                                </div>
                                <FilterableTable
                                    namespace="People"
                                    initialSort="rank"
                                    data={data1}
                                    fields={fields1}
                                    tableClassName="standings-table-header"
                                    trClassName="standings-tr"
                                    headerVisible={false}
                                    pagersVisible={false}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="table-title">
                                    <h3 id="table-head">Highest Victory Margins</h3>
                                </div>
                                <FilterableTable
                                    namespace="People"
                                    initialSort="rank"
                                    data={data2}
                                    fields={fields2}
                                    tableClassName="standings-table-header"
                                    trClassName="standings-tr"
                                    headerVisible={false}
                                    pagersVisible={false}
                                />
                            </div>
                            <div className="col-sm-6">
                                <div className="table-title">
                                    <h3 id="table-head">Lowest Victory Margins</h3>
                                </div>
                                <FilterableTable
                                    namespace="People"
                                    initialSort="rank"
                                    data={data2}
                                    fields={fields2}
                                    tableClassName="standings-table-header"
                                    trClassName="standings-tr"
                                    headerVisible={false}
                                    pagersVisible={false}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="table-title">
                                    <h3 id="table-head">Most Combined Points</h3>
                                </div>
                                <FilterableTable
                                    namespace="People"
                                    initialSort="rank"
                                    data={data2}
                                    fields={fields2}
                                    tableClassName="standings-table-header"
                                    trClassName="standings-tr"
                                    headerVisible={false}
                                    pagersVisible={false}
                                />
                            </div>
                            <div className="col-sm-6">
                                <div className="table-title">
                                    <h3 id="table-head">Fewest Combined Points</h3>
                                </div>
                                <FilterableTable
                                    namespace="People"
                                    initialSort="rank"
                                    data={data2}
                                    fields={fields2}
                                    tableClassName="standings-table-header"
                                    trClassName="standings-tr"
                                    headerVisible={false}
                                    pagersVisible={false}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="table-title">
                                    <h3 id="table-head">Highest Scores in a Loss</h3>
                                </div>
                                <FilterableTable
                                    namespace="People"
                                    initialSort="rank"
                                    data={data2}
                                    fields={fields2}
                                    tableClassName="standings-table-header"
                                    trClassName="standings-tr"
                                    headerVisible={false}
                                    pagersVisible={false}
                                />
                            </div>
                            <div className="col-sm-6">
                                <div className="table-title">
                                    <h3 id="table-head">Lowest Scores in a Win</h3>
                                </div>
                                <FilterableTable
                                    namespace="People"
                                    initialSort="rank"
                                    data={data2}
                                    fields={fields2}
                                    tableClassName="standings-table-header"
                                    trClassName="standings-tr"
                                    headerVisible={false}
                                    pagersVisible={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
 
export default Records;

