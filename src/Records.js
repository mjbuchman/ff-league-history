import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import "./css/records.css"
import FilterableTable from "react-filterable-table";
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

// dictionary for image elements
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
}

// function passed to tables to render logos
const renderLogo = (props) => {
    return (
        <span>
            <img src={img[props.record.owner]} alt="search-bar-logo" style={{width:"30px", borderRadius: "100%"}}></img>
        </span>
    );
};

// table fields if logos should be rendered
let fields1 = [
	{ name: 'placement', displayName: "Place", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'logo', displayName: "Owner", thClassName: "standings-th-header", tdClassName: "standings-td", render: renderLogo},
	{ name: 'owner', displayName: "", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'year', displayName: "Year", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'week', displayName: "Week", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'score', displayName: "Score", thClassName: "standings-th-header", tdClassName: "standings-td"}
];

// table fields if logos should not be rendered
let fields2 = [
	{ name: 'placement', displayName: "Place", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'matchup', displayName: "Matchup", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'year', displayName: "Year", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'week', displayName: "Week", thClassName: "standings-th-header", tdClassName: "standings-td"},
	{ name: 'points', displayName: "Points", thClassName: "standings-th-header", tdClassName: "standings-td"}
];

class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regSeason: { val: true, id: "clicked"},
            playoffS: { val: false, id: "unclicked" },
            playoffD: { val: false, id: "unclicked" },
            fullSeason: { val: false, id: "unclicked" },
            currDate: "All-Time",
            seasons: [],
            highScores: [],
            lowScores: [],
            highMOV: [],
            lowMOV: [],
            highComb: [],
            lowComb: [],
            highSL: [],
            lowSW: []
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.updateTables = this.updateTables.bind(this);
        this.getSeasons = this.getSeasons.bind(this);
        this.getHighLowScores = this.getHighLowScores.bind(this);
        this.getMOV = this.getMOV.bind(this);
        this.getCombinedPoints = this.getCombinedPoints.bind(this);
        this.getHSL = this.getHSL.bind(this);
        this.getLSW = this.getLSW.bind(this);
    }
    
    componentDidMount() {
        this.getSeasons();
        this.updateTables();
    }

     /** 
     * Function to query the database and set the state value of the given field
     * @param field - The field in this.state to be set by query result
     * @param query - The query to be sent to the backend
     */
    queryDB (field, query) {
        fetch("/api/db", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
        })
        .then((response) => response.json())
        .then(rows => {
            if(field !== "seasons") {
                rows.forEach(function (row,i) { row.placement =  i+1})
            }
            this.setState({[field]: rows});
        })
    }

    // Finds distinct season values in Matchups
    getSeasons() {
        this.queryDB("seasons", `select distinct Year from Matchups order by Year desc`);
    }

     /** 
     * Handler for button clicks
     * Sets current button's value to clicked and all other button's values to unclicked
     * Only allows one button to be clicked at a time
     */
    handleButtonClick(field) {
        var temp = [];
        switch(field) {
            case "regSeason":
                temp.push("playoffD", "playoffS", "fullSeason")
                break;
            case "playoffS":
                temp.push("playoffD", "regSeason", "fullSeason")
                break;
            case "playoffD":
                temp.push("playoffS", "regSeason", "fullSeason")
                break;
            case "fullSeason":
                temp.push("playoffS", "regSeason", "playoffD")
                break;
            default:
                break;
        }

        if(this.state[field].id === "unclicked") {
            this.setState({ 
                [field]: {val: true, id: "clicked"}, [temp[0]]: {val: false, id: "unclicked"}, [temp[1]]: {val: false, id: "unclicked"}, [temp[2]]: {val: false, id: "unclicked"}},
                this.updateTables
            );
        }
    }

    // Handler for data changes which triggers data refresh
    handleDateChange = val => event => {
        this.setState({ currDate: event.target.value }, this.updateTables);
    }

    // Builds query for type of matchup specified and passes it on to each tables update method
    updateTables()  {
        var whereClause;
        if(this.state.regSeason.val) {
            whereClause = "where Regular_Season = \"TRUE\"";
        } else if(this.state.playoffS.val) {
            whereClause = "where Playoff = \"TRUE\" AND Two_Week = \"FALSE\"";
        } else if(this.state.playoffD.val) {
            whereClause = "where Playoff = \"TRUE\" AND Two_Week = \"TRUE\"";
        } else {
            whereClause = "where true";
        }

        if(this.state.currDate !== "All-Time") whereClause = whereClause.concat(` AND Year = ${this.state.currDate}`)

        this.getHighLowScores(whereClause);
        this.getMOV(whereClause);
        this.getCombinedPoints(whereClause);
        this.getHSL(whereClause);
        this.getLSW(whereClause);
    }
    
    /** 
     * Retrieves highest and lowest scores from database
     * @param whereClause - clause added to query to specify matchup type
     */
    getHighLowScores(whereClause) {
        this.queryDB("highScores", `SELECT * FROM (SELECT year, week, home_team as owner, home_score as score FROM Matchups ${whereClause} UNION SELECT year, week, away_team as owner, away_score as score FROM Matchups ${whereClause}) as scores order by score DESC LIMIT 10`)
        this.queryDB("lowScores", `SELECT * FROM (SELECT year, week, home_team as owner, home_score as score FROM Matchups ${whereClause} UNION SELECT year, week, away_team as owner, away_score as score FROM Matchups ${whereClause}) as scores order by score ASC LIMIT 10`)
    
        this.state.highScores.forEach(function (row,i) { row.placement =  i+1})
        this.state.lowScores.forEach(function (row,i) { row.placement =  i+1})
    }

    /** 
     * Retrieves highest and lowest margin of victories from database
     * @param whereClause - clause added to query to specify matchup type
     */
    getMOV(whereClause) {
        this.queryDB("highMOV", `SELECT year, week, CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, ABS(home_score-away_score) AS points FROM Matchups ${whereClause} ORDER BY (ABS(home_score-away_score)) DESC LIMIT 10`)
        this.queryDB("lowMOV", `SELECT year, week ,CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, ABS(home_score-away_score) AS points FROM Matchups ${whereClause} ORDER BY (ABS(home_score-away_score)) ASC LIMIT 10`)
    
        this.state.highMOV.forEach(function (row,i) { row.placement =  i+1})
        this.state.lowMOV.forEach(function (row,i) { row.placement =  i+1})
    }
    
    /** 
     * Retrieves highest and lowest combined points from database
     * @param whereClause - clause added to query to specify matchup type
     */
    getCombinedPoints(whereClause) {
        this.queryDB("highComb", `SELECT year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, home_score+away_score AS points FROM Matchups ${whereClause} ORDER BY (home_score+away_score) DESC LIMIT 10`);
        this.queryDB("lowComb", `SELECT year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, home_score+away_score AS points FROM Matchups ${whereClause} ORDER BY (home_score+away_score) ASC LIMIT 10`);

        this.state.highComb.forEach(function (row,i) { row.placement =  i+1})
        this.state.lowComb.forEach(function (row,i) { row.placement =  i+1})
    }

    /** 
     * Retrieves highest scores in a loss from database
     * @param whereClause - clause added to query to specify matchup type
     */
    getHSL(whereClause) {
        whereClause = whereClause.substring(6);
        this.queryDB("highSL", 
        `select year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, score AS points from \
        (select *, Away_Score as score from Matchups where home_score > away_score AND ${whereClause} UNION select *, Home_Score as score from Matchups where home_score < away_score AND ${whereClause}) as scores \
        order by Points desc limit 10 \
        `);
        
        this.state.highSL.forEach(function (row,i) { row.placement =  i+1})
    }

    /** 
     * Retrieves lowest scores in a win from database
     * @param whereClause - clause added to query to specify matchup type
     */
    getLSW(whereClause) {
        whereClause = whereClause.substring(6);
        this.queryDB("lowSW", 
        `select year, week , CONCAT(home_team, ' - ', home_score, ' vs ', away_team, ' - ', away_score) as matchup, score AS points from \
            (select *, Home_Score as score from Matchups where home_score > away_score AND ${whereClause} UNION select *, Away_Score as score from Matchups where home_score < away_score AND ${whereClause}) as scores \
            order by Points Asc limit 10 \
        `);

        this.state.lowSW.forEach(function (row,i) { row.placement =  i+1})
    }

    render() {
        return (
            <Container fluid>
                <Row id="first-row">
                    <header>Records</header>
                </Row>
                <Row>
                    <Col xl={12}>
                        <h4>
                            <button id={this.state.regSeason.id} onClick={() => this.handleButtonClick("regSeason")}>Regular Season</button>
                            <button id={this.state.playoffS.id} onClick={() => this.handleButtonClick("playoffS")}>Playoff - Single Week</button>
                            <button id={this.state.playoffD.id} onClick={() => this.handleButtonClick("playoffD")}>Playoff - Double Week</button>
                            <button id={this.state.fullSeason.id} onClick={() => this.handleButtonClick("fullSeason")}>Full Season</button>
                            <select id="date-range" onChange={this.handleDateChange()}>
                                <option value="All-Time">All-Time</option>
                                {this.state.seasons.map(function(season,i) {
                                    return <option value={season.Year} key={i}>{season.Year}</option>
                                })}
                            </select>
                        </h4>
                        <div id="box-scrollable">
                            <Row>
                                <Col xl={6}>
                                    <div className="table-title">
                                        <h3 id="table-head">Highest Scores</h3>
                                    </div>
                                    <FilterableTable
                                        namespace="People"
                                        initialSort="rank"
                                        data={this.state.highScores}
                                        fields={fields1}
                                        tableClassName="standings-table-header"
                                        trClassName="standings-tr"
                                        headerVisible={false}
                                        pagersVisible={false}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <div className="table-title">
                                        <h3 id="table-head">Lowest Scores</h3>
                                    </div>
                                    <FilterableTable
                                        namespace="People"
                                        initialSort="rank"
                                        data={this.state.lowScores}
                                        fields={fields1}
                                        tableClassName="standings-table-header"
                                        trClassName="standings-tr"
                                        headerVisible={false}
                                        pagersVisible={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6}>
                                    <div className="table-title">
                                        <h3 id="table-head">Highest Victory Margins</h3>
                                    </div>
                                    <FilterableTable
                                        namespace="People"
                                        initialSort="rank"
                                        data={this.state.highMOV}
                                        fields={fields2}
                                        tableClassName="standings-table-header"
                                        trClassName="standings-tr"
                                        headerVisible={false}
                                        pagersVisible={false}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <div className="table-title">
                                        <h3 id="table-head">Lowest Victory Margins</h3>
                                    </div>
                                    <FilterableTable
                                        namespace="People"
                                        initialSort="rank"
                                        data={this.state.lowMOV}
                                        fields={fields2}
                                        tableClassName="standings-table-header"
                                        trClassName="standings-tr"
                                        headerVisible={false}
                                        pagersVisible={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6}>
                                    <div className="table-title">
                                        <h3 id="table-head">Most Combined Points</h3>
                                    </div>
                                    <FilterableTable
                                        namespace="People"
                                        initialSort="rank"
                                        data={this.state.highComb}
                                        fields={fields2}
                                        tableClassName="standings-table-header"
                                        trClassName="standings-tr"
                                        headerVisible={false}
                                        pagersVisible={false}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <div className="table-title">
                                        <h3 id="table-head">Least Combined Points</h3>
                                    </div>
                                    <FilterableTable
                                        namespace="People"
                                        initialSort="rank"
                                        data={this.state.lowComb}
                                        fields={fields2}
                                        tableClassName="standings-table-header"
                                        trClassName="standings-tr"
                                        headerVisible={false}
                                        pagersVisible={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6}>
                                    <div className="table-title">
                                        <h3 id="table-head">Highest Scores in a Loss</h3>
                                    </div>
                                    <FilterableTable
                                        namespace="People"
                                        initialSort="rank"
                                        data={this.state.highSL}
                                        fields={fields2}
                                        tableClassName="standings-table-header"
                                        trClassName="standings-tr"
                                        headerVisible={false}
                                        pagersVisible={false}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <div className="table-title">
                                        <h3 id="table-head">Lowest Scores in a Win</h3>
                                    </div>
                                    <FilterableTable
                                        namespace="People"
                                        initialSort="rank"
                                        data={this.state.lowSW}
                                        fields={fields2}
                                        tableClassName="standings-table-header"
                                        trClassName="standings-tr"
                                        headerVisible={false}
                                        pagersVisible={false}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default Records;

