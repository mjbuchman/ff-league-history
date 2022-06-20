import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/headtohead.css";
import { imgDict } from "../shared/Dicts.js";

class HeadToHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
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
      hssw1: [{ year: null, week: null, score: null }],
      hssw2: [{ year: null, week: null, score: null }],
      lssw1: [{ year: null, week: null, score: null }],
      lssw2: [{ year: null, week: null, score: null }],
      hsdw1: [{ year: null, week: null, score: null }],
      hsdw2: [{ year: null, week: null, score: null }],
      lsdw1: [{ year: null, week: null, score: null }],
      lsdw2: [{ year: null, week: null, score: null }],
      maxMarg1: { val: null, year: null, week: null },
      maxMarg2: { val: null, year: null, week: null },
      minMarg1: { val: null, year: null, week: null },
      minMarg2: { val: null, year: null, week: null },
    };

    this.handleOwnerChange1 = this.handleOwnerChange1.bind(this);
    this.handleOwnerChange2 = this.handleOwnerChange2.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateValues = this.updateValues.bind(this);
    this.hlScore = this.hlScore.bind(this);
    this.highMargin = this.highMargin.bind(this);
    this.lowMargin = this.lowMargin.bind(this);
  }

  componentDidMount() {
    this.fetchData("owners", "/owners", false);
  }

  /**
   * Function to query the database and set the state value of the given field
   * @param field - The field in this.state to be set by query result
   * @param route - The backend endpoint to hit
   * @param singleVal - boolean flag to determine the type of query
   */
  fetchData(field, route, singleVal) {
    fetch(route)
      .then((response) => response.json())
      .then((rows) => {
        if (field === "matchups")
          this.setState({ [field]: rows }, this.updateValues);
        else if (singleVal) {
          // single values return different format and need a different setState implementation
          if (rows[4].length === 0)
            this.setState({
              [field]: [{ year: null, week: null, score: null }],
            });
          else this.setState({ [field]: rows[4] });

          if (field === "lsdw2") this.setState({ refreshing: false }); // last field to update, ends refresh period
        } else this.setState({ [field]: rows });
      });
  }

  // Calls functions that update each given state value
  updateValues() {
    this.countWins();
    this.countPoints();
    this.hlScore(
      "hssw1",
      true,
      "FALSE",
      this.state.currOwner1,
      this.state.currOwner2
    );
    this.hlScore(
      "hssw2",
      true,
      "FALSE",
      this.state.currOwner2,
      this.state.currOwner1
    );
    this.hlScore(
      "lssw1",
      false,
      "FALSE",
      this.state.currOwner1,
      this.state.currOwner2
    );
    this.hlScore(
      "lssw2",
      false,
      "FALSE",
      this.state.currOwner2,
      this.state.currOwner1
    );
    this.hlScore(
      "hsdw1",
      true,
      "TRUE",
      this.state.currOwner1,
      this.state.currOwner2
    );
    this.hlScore(
      "hsdw2",
      true,
      "TRUE",
      this.state.currOwner2,
      this.state.currOwner1
    );
    this.hlScore(
      "lsdw1",
      false,
      "TRUE",
      this.state.currOwner1,
      this.state.currOwner2
    );
    this.hlScore(
      "lsdw2",
      false,
      "TRUE",
      this.state.currOwner2,
      this.state.currOwner1
    );
    this.highMargin(this.state.currOwner1, "maxMarg1");
    this.highMargin(this.state.currOwner2, "maxMarg2");
    this.lowMargin(this.state.currOwner1, "minMarg1");
    this.lowMargin(this.state.currOwner2, "minMarg2");
  }

  // Updates matchup data when two unique users have been selected
  usersSelected() {
    if (this.state.currOwner1 !== "" && this.state.currOwner2 !== "") {
      this.fetchData(
        "matchups",
        `/h2h/matchups/${this.state.currOwner1}/${this.state.currOwner2}`,
        false
      );
    }
  }

  /**
   * Iterates through matchup data and counts wins for each owner
   * Counts owner1 wins and then subtracts that from total entries to get owner2 wins
   */
  countWins() {
    if (this.state.currOwner1 === this.state.currOwner2) {
      this.setState({ o1Wins: null, o2Wins: null });
    }

    if (this.state.currOwner1 !== this.state.currOwner2) {
      var winCount = 0;
      this.state.matchups.forEach((matchup) => {
        if (matchup.Home_Score > matchup.Away_Score) {
          if (matchup.Home_Team === this.state.currOwner1) winCount++;
        } else {
          if (matchup.Away_Team === this.state.currOwner1) winCount++;
        }
      });
      this.setState({
        o1Wins: winCount,
        o2Wins: this.state.matchups.length - winCount,
      });
    }
  }

  // Iterates through matchup data and counts the points scored by each owner
  countPoints() {
    var o1Count = 0;
    var o2Count = 0;
    this.state.matchups.forEach((matchup) => {
      if (matchup.Home_Team === this.state.currOwner1) {
        o1Count += matchup.Home_Score;
        o2Count += matchup.Away_Score;
      } else {
        o1Count += matchup.Away_Score;
        o2Count += matchup.Home_Score;
      }
    });
    this.setState({
      o1Points: o1Count.toFixed(2),
      o2Points: o2Count.toFixed(2),
      o1Avg: (o1Count / this.state.matchups.length).toFixed(2),
      o2Avg: (o2Count / this.state.matchups.length).toFixed(2),
    });
  }

  /**
   * Function to query the database and set the highest or lowest scores by an owner vs. another owner
   * @param field - The field in this.state to be set by query result
   * @param high - boolean flag to determine whether query should find min or max
   * @param double - boolean flag to determine whether query should search only double week matchups
   * @param owner1 - the current Owner who the value will belong to
   * @param owner2 - the current Owner's opponent
   */
  hlScore(field, high, double, owner1, owner2) {
    var type = "min";
    if (high) type = "max";

    if (this.state.currOwner1 !== "" && this.state.currOwner2 !== "") {
      this.fetchData(
        field,
        `/h2h/matchups/${owner1}/${owner2}/${double}/${type}`,
        true
      );
    }
  }

  /**
   * Iterates through matchup data and sets the highest margin of victory for an owner vs another owner
   * @param owner - The owner whos highest MOV is being determined
   * @param field - The field in this.state to be set by query result
   */
  highMargin(owner, field) {
    var max = Number.MIN_VALUE;
    var year, week;

    this.state.matchups.forEach((matchup) => {
      if (matchup.Home_Score > matchup.Away_Score) {
        if (
          matchup.Home_Team === owner &&
          matchup.Home_Score - matchup.Away_Score > max
        ) {
          max = matchup.Home_Score - matchup.Away_Score;
          year = matchup.Year;
          week = matchup.Week;
        }
      } else {
        if (
          matchup.Away_Team === owner &&
          matchup.Away_Score - matchup.Home_Score > max
        ) {
          max = matchup.Away_Score - matchup.Home_Score;
          year = matchup.Year;
          week = matchup.Week;
        }
      }
    });
    if (max === Number.MIN_VALUE) max = false;
    this.setState({
      [field]: {
        val: max ? max.toFixed(2) : "N/A",
        year: max ? year : "",
        week: max ? week : "",
      },
    });
  }

  /**
   * Iterates through matchup data and sets the lowest margin of victory for an owner vs another owner
   * @param owner - The owner whos lowest MOV is being determined
   * @param field - The field in this.state to be set by query result
   */
  lowMargin(owner, field) {
    var min = Number.MAX_VALUE;
    var year, week;

    this.state.matchups.forEach((matchup) => {
      if (matchup.Home_Score > matchup.Away_Score) {
        if (
          matchup.Home_Team === owner &&
          matchup.Home_Score - matchup.Away_Score < min
        ) {
          min = matchup.Home_Score - matchup.Away_Score;
          year = matchup.Year;
          week = matchup.Week;
        }
      } else {
        if (
          matchup.Away_Team === owner &&
          matchup.Away_Score - matchup.Home_Score < min
        ) {
          min = matchup.Away_Score - matchup.Home_Score;
          year = matchup.Year;
          week = matchup.Week;
        }
      }
    });
    if (min === Number.MAX_VALUE) min = false;
    this.setState({
      [field]: {
        val: min ? min.toFixed(2) : "N/A",
        year: min ? year : "",
        week: min ? week : "",
      },
    });
  }

  // Handler for owner1 changes
  handleOwnerChange1 = (val) => (event) => {
    this.setState(
      { currOwner1: event.target.value, refreshing: true },
      this.usersSelected
    );
  };

  // Handler for owner2 changes
  handleOwnerChange2 = (val) => (event) => {
    this.setState(
      { currOwner2: event.target.value, refreshing: true },
      this.usersSelected
    );
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <header>Head To Head</header>
        </Row>
        <Row>
          <Col xl={7}>
            <Row>
              <Col xs={6}>
                <img
                  id="bar-logo"
                  src={imgDict[this.state.currOwner1]}
                  alt={this.state.currOwner1}
                ></img>
                <select
                  id="owners-logo"
                  defaultValue={"DEFAULT"}
                  onChange={this.handleOwnerChange1()}
                >
                  <option value="DEFAULT" disabled hidden>
                    ---
                  </option>
                  {this.state.owners.map(function (owner, i) {
                    return (
                      <option value={owner.Owner} key={i}>
                        {owner.Owner}
                      </option>
                    );
                  })}
                </select>
                <div className="win-box">
                  {!this.state.refreshing && (
                    <h5 id="big-bold">{this.state.o1Wins}</h5>
                  )}
                </div>
              </Col>
              <Col xs={6}>
                <img
                  id="bar-logo"
                  src={imgDict[this.state.currOwner2]}
                  alt={this.state.currOwner2}
                ></img>
                <select
                  id="owners-logo"
                  defaultValue={"DEFAULT"}
                  onChange={this.handleOwnerChange2()}
                >
                  <option value="DEFAULT" disabled hidden>
                    ---
                  </option>
                  {this.state.owners.map(function (owner, i) {
                    return (
                      <option value={owner.Owner} key={i}>
                        {owner.Owner}
                      </option>
                    );
                  })}
                </select>
                <div className="win-box">
                  {!this.state.refreshing && (
                    <h5 id="big-bold">{this.state.o2Wins}</h5>
                  )}
                </div>
              </Col>
            </Row>
            {this.state.currOwner1 !== "" &&
            this.state.currOwner2 !== "" &&
            this.state.currOwner1 !== this.state.currOwner2 &&
            !this.state.refreshing ? (
              <Row style={{ margin: "0px" }}>
                <Col xs={12} id="gray-box">
                  <Row>
                    <Col xs={12}>
                      <h3>Total Points</h3>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.o1Points}</h2>
                      <hr></hr>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.o2Points}</h2>
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h3>Average Points</h3>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.o1Avg}</h2>
                      <hr></hr>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.o2Avg}</h2>
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h3>Highest Score - Single Week</h3>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.hssw1[0].score}</h2>
                      <p>
                        (Week {this.state.hssw1[0].week},{" "}
                        {this.state.hssw1[0].year})
                      </p>
                      <hr></hr>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.hssw2[0].score}</h2>
                      <p>
                        (Week {this.state.hssw2[0].week},{" "}
                        {this.state.hssw2[0].year})
                      </p>
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h3>Lowest Score - Single Week</h3>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.lssw1[0].score}</h2>
                      <p>
                        (Week {this.state.lssw1[0].week},{" "}
                        {this.state.lssw1[0].year})
                      </p>
                      <hr></hr>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.lssw2[0].score}</h2>
                      <p>
                        (Week {this.state.lssw2[0].week},{" "}
                        {this.state.lssw2[0].year})
                      </p>
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h3>Highest Score - Double Week</h3>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">
                        {this.state.hsdw1[0].score
                          ? this.state.hsdw1[0].score
                          : "N/A"}
                      </h2>
                      {this.state.hsdw1[0].score && (
                        <p>
                          (Week {this.state.hsdw1[0].week},{" "}
                          {this.state.hsdw1[0].year})
                        </p>
                      )}
                      <hr></hr>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">
                        {this.state.hsdw2[0].score
                          ? this.state.hsdw2[0].score
                          : "N/A"}
                      </h2>
                      {this.state.hsdw2[0].score && (
                        <p>
                          (Week {this.state.hsdw2[0].week},{" "}
                          {this.state.hsdw2[0].year})
                        </p>
                      )}
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h3>Lowest Score - Double Week</h3>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">
                        {this.state.lsdw1[0].score
                          ? this.state.lsdw1[0].score
                          : "N/A"}
                      </h2>
                      {this.state.lsdw1[0].score && (
                        <p>
                          (Week {this.state.lsdw1[0].week},{" "}
                          {this.state.lsdw1[0].year})
                        </p>
                      )}
                      <hr></hr>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">
                        {this.state.lsdw2[0].score
                          ? this.state.lsdw2[0].score
                          : "N/A"}
                      </h2>
                      {this.state.lsdw2[0].score && (
                        <p>
                          (Week {this.state.lsdw2[0].week},{" "}
                          {this.state.lsdw2[0].year})
                        </p>
                      )}
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h3>Biggest Win Margin</h3>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.maxMarg1.val}</h2>
                      {this.state.maxMarg1.val !== "N/A" && (
                        <p>
                          (Week {this.state.maxMarg1.week},{" "}
                          {this.state.maxMarg1.year})
                        </p>
                      )}
                      <hr></hr>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.maxMarg2.val}</h2>
                      {this.state.maxMarg2.val !== "N/A" && (
                        <p>
                          (Week {this.state.maxMarg2.week},{" "}
                          {this.state.maxMarg2.year})
                        </p>
                      )}
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h3>Smallest Win Margin</h3>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.minMarg1.val}</h2>
                      {this.state.minMarg1.val !== "N/A" && (
                        <p>
                          (Week {this.state.minMarg1.week},{" "}
                          {this.state.minMarg1.year})
                        </p>
                      )}
                      <hr></hr>
                    </Col>
                    <Col xs={6}>
                      <h2 id="drop-shadow">{this.state.minMarg2.val}</h2>
                      {this.state.minMarg2.val !== "N/A" && (
                        <p>
                          (Week {this.state.minMarg2.week},{" "}
                          {this.state.minMarg2.year})
                        </p>
                      )}
                      <hr></hr>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Row style={{ margin: "0px" }}>
                <Col xs={12} id="gray-box"></Col>
              </Row>
            )}
          </Col>
          <Col xl={5}>
            <h4>Gamelogs</h4>
            <div id="box">
              <table id="base-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Game</th>
                  </tr>
                </thead>
                {!this.state.refreshing && (
                  <tbody>
                    {this.state.matchups.map(function (matchup, i) {
                      return (
                        <tr key={i}>
                          <td>
                            Season {matchup.Year}, Week {matchup.Week}
                          </td>
                          <td>
                            {matchup.Home_Team} <b>{matchup.Home_Score}</b>,{" "}
                            {matchup.Away_Team} <b>{matchup.Away_Score}</b>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HeadToHead;
