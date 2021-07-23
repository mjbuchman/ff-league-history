import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import "./css/drafts.css";
import FilterableTable from "react-filterable-table";


let fullDraft = [
	{ name: 'Round', displayName: "Round", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Pick', displayName: "Pick", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Player', displayName: "Player", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Team', displayName: "Team", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Position', displayName: "Position", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Owner', displayName: "Owner", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'PRK', displayName: "PRK", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Games', displayName: "GP", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'FPTSG', displayName: "FPTS/G", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'FPTS', displayName: "FPTS", thClassName: "standings-th", tdClassName: "standings-td"},
];

let indvidualDraft = [
	{ name: 'Round', displayName: "Round", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Pick', displayName: "Pick", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Player', displayName: "Player", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Team', displayName: "Team", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Position', displayName: "Position", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'PRK', displayName: "PRK", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'Games', displayName: "GP", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'FPTSG', displayName: "FPTS/G", thClassName: "standings-th", tdClassName: "standings-td"},
	{ name: 'FPTS', displayName: "FPTS", thClassName: "standings-th", tdClassName: "standings-td"}
];

class Drafts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currOwner: "All Owners",
            //currDate: String(new Date().getFullYear()),
            currDate: "2020",
            seasons: [],
            owners: [],
            draftData: [],
            indvSuperlatives: {},
            ovrSuperlatives: {biggestSteal: [], biggestBust: [], bestDraft: "", worstDraft: ""}
        };

        this.getDropdownValues = this.getDropdownValues.bind(this);
        this.updateTableData = this.updateTableData.bind(this);
        this.calculatePlayerValues = this.calculatePlayerValues.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    
    componentDidMount() {
        this.getDropdownValues();
        this.updateTableData();
    }

    /** 
     * Function to query the database and set the state value of the given field
     * @param field - The field in this.state to be set by query result
     * @param query - The query to be sent to the backend
     */
    queryDB(field, query) {
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
            if(field === "draftData") this.setState({[field]: rows}, this.calculatePlayerValues);
            else this.setState({[field]: rows});
        })
    }


     // Queries database to find distinct seasons
    getDropdownValues() {
        this.queryDB("seasons", `select distinct Year from Matchups order by Year desc`);
        this.queryDB("owners", `select * from Owners`);
    }

    updateTableData() {
        var ownerClause = ""
        if(this.state.currOwner !== "All Owners") ownerClause = ` AND Owner = "${this.state.currOwner}"`;

        this.queryDB("draftData", `select * from Drafts where Year = ${this.state.currDate}${ownerClause}`)
    }

    calculatePlayerValues() {
        if(this.state.draftData == null) return;

        var updatedDraftData = [];
        var sbValue, value;
        if(this.state.currDate !== String(new Date().getFullYear())) {
            this.state.draftData.forEach(draftPick => {
                sbValue = draftPick.Round-draftPick.PRK;
                
                if(draftPick.Position === "QB") value = (draftPick.FPTS*.8) + (10*draftPick.Round);
                else value = draftPick.FPTS + (10*draftPick.Round);

                draftPick["sbValue"] = sbValue;
                draftPick["value"] = value;

                updatedDraftData.push(draftPick);
            });

            this.setState({draftData: updatedDraftData}, this.setOvrSuperlatives);
        }

    }

    setOvrSuperlatives() {
        var biggestSteal, biggestBust;      

        // sort draft picks on their steal/bust value
        var sortedData = [...this.state.draftData];
        sortedData.sort(function(a,b) {
            return b.sbValue - a.sbValue;
        });

        biggestSteal = sortedData[0];
        biggestBust = sortedData[sortedData.length - 1];

        var draftPick, nonSkillPlayer, skillPlayer, ownerDraftValues = {};
        for (var i = 0; i < this.state.draftData.length; i++) {
            draftPick = sortedData[i]
            if (i < 10 && draftPick.Position !== "D/ST" && draftPick.Position !== "K") {
                if(!nonSkillPlayer && (draftPick.Position === "QB" || draftPick.Position === "TE")) nonSkillPlayer = draftPick;
                if(!skillPlayer && (draftPick.Position === "RB" || draftPick.Position === "WR")) nonSkillPlayer = draftPick;
            } 
            
            if (draftPick.sbValue <=  -30) {
                if (draftPick.Round < biggestBust.Round) {
                    biggestBust = draftPick;
                } else if (draftPick.Round === biggestBust.Round) {
                    biggestBust = draftPick.Pick < biggestBust.Pick ? draftPick : biggestBust;
                } else {}
            }

            if(!ownerDraftValues[draftPick.Owner]) ownerDraftValues[draftPick.Owner] = 0;

            ownerDraftValues[draftPick.Owner] += draftPick.value;
        }
        var sortedOwnerDraftValues = this.ownerValuePairToSortedArray(ownerDraftValues);
        console.log(sortedOwnerDraftValues)
        
        biggestSteal = skillPlayer ? skillPlayer : nonSkillPlayer;
        this.setState({
            ovrSuperlatives: {
                biggestSteal: biggestSteal, 
                biggestBust: biggestBust, bestDraft: 
                sortedOwnerDraftValues[0].owner, 
                worstDraft: sortedOwnerDraftValues[sortedOwnerDraftValues.length - 1].owner
            }
        });
    }

    ownerValuePairToSortedArray(ownerDraftValues) {
        var sortedReturnArr = [];
        for (const [owner, value] of Object.entries(ownerDraftValues)) {
           sortedReturnArr.push({owner: owner, value: value});
        }
        
        sortedReturnArr.sort(function(a,b) {
            return b.value - a.value;
        });

        return sortedReturnArr;
    }

    // Handler for date dropdown changes which triggers data refresh
    handleDateChange = val => event => {
        this.setState({ currDate: event.target.value }, this.updateTableData);
    }

    handleOwnerChange = val => event => {
        this.setState({ currOwner: event.target.value }, this.updateTableData);
    }

    render() {
        return (
            <Container fluid>
                <Row id="first-row">
                    <header>Drafts</header>
                </Row>
                <Row>
                    <Col>
                        <h4>
                            <Row>
                                <Col lg={6}>
                                    <select id="date-range" onChange={this.handleOwnerChange()}>
                                        <option value="All Owners">All Owners</option>
                                        {this.state.owners.map(function(owner,i) {
                                            return <option value={owner.Owner} key={i}>{owner.Owner}</option>
                                        })}
                                    </select>
                                </Col>
                                <Col lg={6}>
                                    <select id="date-range" onChange={this.handleDateChange()}>
                                        {this.state.seasons.map(function(season,i) {
                                            return <option value={season.Year} key={i}>{season.Year}</option>
                                        })}
                                    </select>
                                </Col>
                            </Row>
                        </h4>
                        <div id="draft-box">
                            <FilterableTable
                                namespace="Picks"
                                data={this.state.draftData}
                                fields={this.state.currOwner === "All Owners" ? fullDraft : indvidualDraft}
                                tableClassName="draft-table"
                                trClassName="draft-tr"
                                headerVisible={false}
                                pagersVisible={false}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Draft Overview</h4>
                        <div id="box">
                            {this.state.currOwner === "All Owners" ?
                                <Row>
                                    <Col lg={3} id="center-align">
                                        <div className="stats-box">
                                            <h6>Biggest Steal</h6>
                                            <div id="box">
                                                <h1 id="small-mar">{this.state.ovrSuperlatives.biggestSteal.Player}</h1>
                                                <h5 id="small-mar" style={{color: "black"}}>{this.state.ovrSuperlatives.biggestSteal.Owner} - 
                                                RD {this.state.ovrSuperlatives.biggestSteal.Round}, PK {this.state.ovrSuperlatives.biggestSteal.Pick}</h5>
                                                <p id="black">PRK: {this.state.ovrSuperlatives.biggestSteal.PRK} | {this.state.ovrSuperlatives.biggestSteal.FPTS} Pts</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={3} id="center-align">
                                        <div className="stats-box">
                                            <h6>Biggest Bust</h6>
                                            <div id="box">
                                                <h1 id="small-mar">{this.state.ovrSuperlatives.biggestBust.Player}</h1>
                                                <h5 id="small-mar" style={{color: "black"}}>{this.state.ovrSuperlatives.biggestBust.Owner} - 
                                                RD {this.state.ovrSuperlatives.biggestBust.Round}, PK {this.state.ovrSuperlatives.biggestBust.Pick}</h5>
                                                <p id="black">PRK: {this.state.ovrSuperlatives.biggestBust.PRK} | {this.state.ovrSuperlatives.biggestBust.FPTS} Pts</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={3} id="center-align">
                                        <div className="stats-box">
                                            <h6>Best Draft</h6>
                                            <div id="box">
                                                <h1 id="small-mar">{this.state.ovrSuperlatives.bestDraft}</h1>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={3} id="center-align">
                                        <div className="stats-box">
                                            <h6>Worst Draft</h6>
                                            <div id="box">
                                                <h1 id="small-mar">{this.state.ovrSuperlatives.worstDraft}</h1>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            :
                            <div>
                                    <Row>
                                        <Col lg={4} id="center-align">
                                            <div className="stats-box">
                                                <h6>Best Player</h6>
                                                <div id="box">
                                                    <h1 id="small-mar">N/A</h1>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} id="center-align">
                                            <div className="stats-box">
                                                <h6>Best Value</h6>
                                                <div id="box">
                                                    <h1 id="small-mar">N/A</h1>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} id="center-align">
                                            <div className="stats-box">
                                                <h6>Biggest Steal</h6>
                                                <div id="box">
                                                    <h1 id="small-mar">N/A</h1>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={4} id="center-align">
                                            <div className="stats-box">
                                                <h6>Biggest Bust</h6>
                                                <div id="box">
                                                    <h1 id="small-mar">N/A</h1>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} id="center-align">
                                            <div className="stats-box">
                                                <h6>Draft Grade</h6>
                                                <div id="box">
                                                    <h1 id="small-mar">N/A</h1>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} id="center-align">
                                            <div className="stats-box">
                                                <h6>Draft Rank</h6>
                                                <div id="box">
                                                    <h1 id="small-mar">N/A</h1>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default Drafts;