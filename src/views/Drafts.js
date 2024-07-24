import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/drafts.css";
import FilterableTable from "react-filterable-table";
import {
  fullDraftOptions,
  indvidualDraftOptions,
  draftRankOptions,
} from "../shared/Options";
import { yearsPlayed } from "../shared/Dicts.js";

class Drafts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currOwner: "All Owners",
      currDate: yearsPlayed[yearsPlayed.length - 1],
      seasons: [],
      owners: [],
      draftData: [],
      validData: true,
      sortedODV: [{ owner: "", value: "" }],
      indvSuperlatives: {
        bestPlayer: [],
        bestValue: [],
        biggestSteal: [],
        biggestBust: [],
        draftGrade: [],
        draftRank: [],
      },
      ovrSuperlatives: { biggestSteal: [], biggestBust: [] },
    };

    this.getDropdownValues = this.getDropdownValues.bind(this);
    this.updateTableData = this.updateTableData.bind(this);
    this.calculatePlayerValues = this.calculatePlayerValues.bind(this);
    this.getLetterGrade = this.getLetterGrade.bind(this);
    this.setOvrSuperlatives = this.setOvrSuperlatives.bind(this);
    this.calculateOwnerDraftGrades = this.calculateOwnerDraftGrades.bind(this);
    this.setIndvSuperlatives = this.setIndvSuperlatives.bind(this);
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
   * @param route - The backend endpoint to hit
   */
  fetchData(field, route) {
    fetch(route)
      .then((response) => response.json())
      .then((rows) => {
        if (field === "draftData")
          this.setState({ [field]: rows }, this.calculatePlayerValues);
        else this.setState({ [field]: rows });
      });
  }

  // Queries database to find distinct seasons
  getDropdownValues() {
    this.fetchData("seasons", "/drafts");
    this.fetchData("owners", "/owners");
  }

  updateTableData() {
    this.fetchData("draftData", `/drafts/${this.state.currDate}`);
  }

  calculatePlayerValues() {
    if (this.state.draftData == null) return;

    var updatedDraftData = [];
    var sbValue, value;
    if (this.state.currDate !== String(new Date().getFullYear())) {
      this.state.draftData.forEach((draftPick) => {
        sbValue = draftPick.Round - draftPick.PRK;

        if (draftPick.Position === "QB")
          value = draftPick.FPTS * 0.8 + 10 * draftPick.Round;
        else value = draftPick.FPTS + 10 * draftPick.Round;

        draftPick["sbValue"] = sbValue;
        draftPick["value"] = Math.round(value);

        updatedDraftData.push(draftPick);
      });

      updatedDraftData.sort(function (a, b) {
        return b.value - a.value;
      });

      var draftPick,
        length = updatedDraftData.length;
      for (var i = 0; i < length; i++) {
        draftPick = updatedDraftData[i];
        draftPick.vPct = ((length - i) / length) * 100;
        draftPick.Grade = this.getLetterGrade(draftPick.vPct, true);
      }

      updatedDraftData.sort(function (a, b) {
        return a.Pick - b.Pick;
      });
      updatedDraftData.sort(function (a, b) {
        return a.Round - b.Round;
      });

      if (this.state.currOwner !== "All Owners") {
        this.setState({ draftData: updatedDraftData }, async () => {
          await this.setOvrSuperlatives();
          this.setIndvSuperlatives();
        });
      } else {
        this.setState({ draftData: updatedDraftData }, this.setOvrSuperlatives);
      }
    }
  }

  getLetterGrade(percentage, typeFlag) {
    if (typeFlag) {
      if (percentage >= 95) return "A+";
      else if (percentage >= 88) return "A";
      else if (percentage >= 80) return "A-";
      else if (percentage >= 70) return "B+";
      else if (percentage >= 60) return "B";
      else if (percentage >= 50) return "B-";
      else if (percentage >= 40) return "C+";
      else if (percentage >= 30) return "C";
      else if (percentage >= 20) return "C-";
      else if (percentage >= 10) return "D";
      else return "F";
    } else {
      if (percentage >= 97) return "A+";
      else if (percentage >= 93) return "A";
      else if (percentage >= 89) return "A-";
      else if (percentage >= 86) return "B+";
      else if (percentage >= 83) return "B";
      else if (percentage >= 80) return "B-";
      else if (percentage >= 77) return "C+";
      else if (percentage >= 74) return "C";
      else if (percentage >= 70) return "C-";
      else if (percentage >= 67) return "D";
      else return "F";
    }
  }

  async setOvrSuperlatives() {
    var biggestSteal, biggestBust;

    // sort draft picks on their steal/bust value
    var sortedData = [...this.state.draftData];
    sortedData.sort(function (a, b) {
      return b.sbValue - a.sbValue;
    });

    biggestSteal = sortedData[0];
    biggestBust = sortedData[sortedData.length - 1];

    var draftPick,
      nonSkillPlayer,
      skillPlayer,
      ownerDraftValues = {};
    for (var i = 0; i < this.state.draftData.length; i++) {
      draftPick = sortedData[i];

      if (draftPick.Keeper == 'Y') {
        draftPick.Player += ' (K)';
      }

      if (
        i < 10 &&
        draftPick.Position !== "D/ST" &&
        draftPick.Position !== "K"
      ) {
        if (
          !nonSkillPlayer &&
          (draftPick.Position === "QB" || draftPick.Position === "TE")
        )
          nonSkillPlayer = draftPick;
        if (
          !skillPlayer &&
          (draftPick.Position === "RB" || draftPick.Position === "WR")
        )
          nonSkillPlayer = draftPick;
      }

      if (draftPick.sbValue <= -40) {
        if (draftPick.Round < biggestBust.Round) {
          biggestBust = draftPick;
        } else if (draftPick.Round === biggestBust.Round) {
          biggestBust =
            draftPick.Pick < biggestBust.Pick ? draftPick : biggestBust;
        } else {
        }
      }

      if (!ownerDraftValues[draftPick.Owner])
        ownerDraftValues[draftPick.Owner] = 0;

      ownerDraftValues[draftPick.Owner] += draftPick.value;
    }
    var sortedOwnerDraftValues =
      this.calculateOwnerDraftGrades(ownerDraftValues);

    biggestSteal = skillPlayer ? skillPlayer : nonSkillPlayer;
    var dataFlag = this.state.draftData.length !== 0;
    this.setState({
      ovrSuperlatives: {
        biggestSteal: biggestSteal,
        biggestBust: biggestBust,
      },
      sortedODV: sortedOwnerDraftValues,
      validData: dataFlag,
    });
  }

  calculateOwnerDraftGrades(ownerDraftValues) {
    var sortedReturnArr = [];
    for (const [owner, value] of Object.entries(ownerDraftValues)) {
      sortedReturnArr.push({ owner: owner, value: value });
    }

    sortedReturnArr.sort(function (a, b) {
      return b.value - a.value;
    });

    var numOwners = Object.keys(ownerDraftValues).length;
    var maxValue =
      (300 - 15 * (numOwners - 10)) * (this.state.draftData.length / numOwners);
    sortedReturnArr.forEach((Owner) => {
      Owner.Grade = this.getLetterGrade((Owner.value / maxValue) * 100, false);
    });

    return sortedReturnArr;
  }

  setIndvSuperlatives() {
    var indvDraftData = this.state.draftData.filter(
      (draftPick) => draftPick.Owner === this.state.currOwner
    );

    var bestPlayer = indvDraftData[0],
      bestValue = indvDraftData[0],
      biggestSteal = indvDraftData[0],
      biggestBust = indvDraftData[0];
    indvDraftData.forEach((draftPick) => {
      if (draftPick.FPTS > bestPlayer.FPTS) bestPlayer = draftPick;
      if (
        draftPick.value > bestValue.value &&
        draftPick.Round < 15 &&
        draftPick.Position !== "D/ST" &&
        draftPick.Position !== "K"
      )
        bestValue = draftPick;
      if (
        draftPick.sbValue >= biggestSteal.sbValue &&
        draftPick.Round < 15 &&
        draftPick.Position !== "D/ST" &&
        draftPick.Position !== "K"
      )
        biggestSteal = draftPick;
      if (
        draftPick.sbValue < biggestBust.sbValue &&
        draftPick.Round < 7 &&
        draftPick.Position !== "D/ST" &&
        draftPick.Position !== "K"
      )
        biggestBust = draftPick;
    });

    // Search sorted ODV for this owner's draft rank and save the index
    var draftRank, draftGrade;
    for (var i = 0; i < this.state.sortedODV.length; i++) {
      if (this.state.sortedODV[i].owner === this.state.currOwner) {
        draftRank = i + 1;
        draftGrade = this.state.sortedODV[i].Grade;
        break;
      }
    }

    var dataFlag = indvDraftData.length !== 0;
    this.setState({
      indvSuperlatives: {
        bestPlayer: bestPlayer,
        bestValue: bestValue,
        biggestSteal: biggestSteal,
        biggestBust: biggestBust,
        draftGrade: draftGrade,
        draftRank: draftRank,
      },
      draftData: indvDraftData,
      validData: dataFlag,
    });
  }

  // Handler for date dropdown changes which triggers data refresh
  handleDateChange = (val) => (event) => {
    this.setState({ currDate: event.target.value }, this.updateTableData);
  };

  handleOwnerChange = (val) => (event) => {
    this.setState({ currOwner: event.target.value }, this.updateTableData);
  };

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
                    {this.state.owners.map(function (owner, i) {
                      return (
                        <option value={owner.Owner} key={i}>
                          {owner.Owner}
                        </option>
                      );
                    })}
                  </select>
                </Col>
                <Col lg={6}>
                  <select id="date-range" onChange={this.handleDateChange()}>
                    {this.state.seasons.map(function (season, i) {
                      return (
                        <option value={season.Year} key={i}>
                          {season.Year}
                        </option>
                      );
                    })}
                  </select>
                </Col>
              </Row>
            </h4>
            <div id="draft-box">
              <FilterableTable
                namespace="Picks"
                data={this.state.draftData}
                fields={
                  this.state.currOwner === "All Owners"
                    ? fullDraftOptions
                    : indvidualDraftOptions
                }
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
              {this.state.currOwner === "All Owners" ? (
                <div>
                  <Row>
                    <Col lg={3} id="center-align">
                      <div className="stats-box">
                        <h6>Biggest Steal</h6>
                        {this.state.validData ? (
                          <div id="box">
                            <h1 id="small-mar">
                              {this.state.ovrSuperlatives.biggestSteal.Player}
                            </h1>
                            <h5 id="small-mar" style={{ color: "black" }}>
                              {this.state.ovrSuperlatives.biggestSteal.Owner} -
                              RD {this.state.ovrSuperlatives.biggestSteal.Round}
                              , PK{" "}
                              {this.state.ovrSuperlatives.biggestSteal.Pick}
                            </h5>
                            <p id="black">
                              PRK: {this.state.ovrSuperlatives.biggestSteal.PRK}{" "}
                              | {this.state.ovrSuperlatives.biggestSteal.FPTS}{" "}
                              Pts
                            </p>
                          </div>
                        ) : (
                          <div id="box">
                            <h1 id="small-mar">N/A</h1>
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={3} id="center-align">
                      <div className="stats-box">
                        <h6>Biggest Bust</h6>
                        {this.state.validData ? (
                          <div id="box">
                            <h1 id="small-mar">
                              {this.state.ovrSuperlatives.biggestBust.Player}
                            </h1>
                            <h5 id="small-mar" style={{ color: "black" }}>
                              {this.state.ovrSuperlatives.biggestBust.Owner} -
                              RD {this.state.ovrSuperlatives.biggestBust.Round},
                              PK {this.state.ovrSuperlatives.biggestBust.Pick}
                            </h5>
                            <p id="black">
                              PRK: {this.state.ovrSuperlatives.biggestBust.PRK}{" "}
                              | {this.state.ovrSuperlatives.biggestBust.FPTS}{" "}
                              Pts
                            </p>
                          </div>
                        ) : (
                          <div id="box">
                            <h1 id="small-mar">N/A</h1>
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={3} id="center-align">
                      <div className="stats-box">
                        <h6>Best Draft</h6>
                        {this.state.validData ? (
                          <div id="box">
                            <h1 id="small-mar">
                              {this.state.sortedODV[0].owner}
                            </h1>
                            <h5 id="small-mar" style={{ color: "black" }}>
                              Grade: {this.state.sortedODV[0].Grade}
                            </h5>
                            <p id="black">
                              Value-Based Metric Score:{" "}
                              {Math.ceil(this.state.sortedODV[0].value)}
                            </p>
                          </div>
                        ) : (
                          <div id="box">
                            <h1 id="small-mar">N/A</h1>
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={3} id="center-align">
                      <div className="stats-box">
                        <h6>Worst Draft</h6>
                        {this.state.validData ? (
                          <div id="box">
                            <h1 id="small-mar">
                              {
                                this.state.sortedODV[
                                  this.state.sortedODV.length - 1
                                ].owner
                              }
                            </h1>
                            <h5 id="small-mar" style={{ color: "black" }}>
                              Grade:{" "}
                              {
                                this.state.sortedODV[
                                  this.state.sortedODV.length - 1
                                ].Grade
                              }
                            </h5>
                            <p id="black">
                              Value-Based Metric Score:{" "}
                              {Math.ceil(
                                this.state.sortedODV[
                                  this.state.sortedODV.length - 1
                                ].value
                              )}
                            </p>
                          </div>
                        ) : (
                          <div id="box">
                            <h1 id="small-mar">N/A</h1>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>Draft Ranking</h4>
                      <div id="draft-box" style={{ height: "100%" }}>
                        <FilterableTable
                          namespace="Ranks"
                          data={this.state.sortedODV}
                          fields={draftRankOptions}
                          tableClassName="draft-table"
                          trClassName="draft-tr"
                          headerVisible={false}
                          pagersVisible={false}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>
                  <Row>
                    <Col lg={4} id="center-align">
                      <div className="stats-box">
                        <h6>Best Player</h6>
                        <div id="box">
                          <h1 id="small-mar">
                            {this.state.validData
                              ? this.state.indvSuperlatives.bestPlayer.Player
                              : "N/A"}
                          </h1>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} id="center-align">
                      <div className="stats-box">
                        <h6>Best Value</h6>
                        <div id="box">
                          <h1 id="small-mar">
                            {this.state.validData
                              ? this.state.indvSuperlatives.bestValue.Player
                              : "N/A"}
                          </h1>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} id="center-align">
                      <div className="stats-box">
                        <h6>Biggest Steal</h6>
                        <div id="box">
                          <h1 id="small-mar">
                            {this.state.validData
                              ? this.state.indvSuperlatives.biggestSteal.Player
                              : "N/A"}
                          </h1>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} id="center-align">
                      <div className="stats-box">
                        <h6>Biggest Bust</h6>
                        <div id="box">
                          <h1 id="small-mar">
                            {this.state.validData
                              ? this.state.indvSuperlatives.biggestBust.Player
                              : "N/A"}
                          </h1>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} id="center-align">
                      <div className="stats-box">
                        <h6>Draft Grade</h6>
                        <div id="box">
                          <h1 id="small-mar">
                            {this.state.validData
                              ? this.state.indvSuperlatives.draftGrade
                              : "N/A"}
                          </h1>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} id="center-align">
                      <div className="stats-box">
                        <h6>Draft Rank</h6>
                        <div id="box">
                          <h1 id="small-mar">
                            {this.state.validData
                              ? this.state.indvSuperlatives.draftRank
                              : "N/A"}
                          </h1>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Drafts;
