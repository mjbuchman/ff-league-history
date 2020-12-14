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
            currDate: String(new Date().getFullYear()),
            seasons: [],
            owners: [],
            draftData: []
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
        if(this.state.currOwner !== "All Owners") ownerClause = ` AND Owner = \"${this.state.currOwner}\"`;

        this.queryDB("draftData", `select * from Drafts where Year = ${this.state.currDate}${ownerClause}`)
    }

    calculatePlayerValues() {
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
            
            this.setState({draftData: updatedDraftData});
        }

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
            </Container>
        );
    }
}
 
export default Drafts;