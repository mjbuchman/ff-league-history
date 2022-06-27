import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/admin.css";
import { yearsPlayed } from "../shared/Dicts";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchups: [],
      startWeek: 1,
      endWeek: 1,
      startWeekDelete: 1,
      endWeekDelete: 1,
      year: yearsPlayed[yearsPlayed.length - 1],
      yearDelete: yearsPlayed[yearsPlayed.length - 1],
      currWeek: 2,
      currYear: yearsPlayed[yearsPlayed.length - 1],
      refresh: false,
    };

    this.getMatchupData = this.getMatchupData.bind(this);
    this.setMatchupTypes = this.setMatchupTypes.bind(this);
    this.postData = this.postData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.runLuckBot = this.runLuckBot.bind(this);
    this.handleCurrWeekChange = this.handleCurrWeekChange.bind(this);
    this.handleCurrYearChange = this.handleCurrYearChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSeasonChange = this.handleSeasonChange.bind(this);
    this.handleStartChangeDelete = this.handleStartChangeDelete.bind(this);
    this.handleEndChangeDelete = this.handleEndChangeDelete.bind(this);
    this.handleSeasonChangeDelete = this.handleSeasonChangeDelete.bind(this);
    this.handleWeekTypeChange = this.handleWeekTypeChange.bind(this);
    this.toggleRefresh = this.toggleRefresh.bind(this);
  }

  /**
   * Function to query the API and set the state value of the given field
   * @param field - The field in this.state to be set by query result
   * @param route - The API endpoint to hit
   */
  fetchAPI(field, route, params) {
    fetch("https://wallerstein-data-api.herokuapp.com" + route + params)
      .then((response) => response.json())
      .then((rows) => {
        if (field === "matchups")
          this.setState({ [field]: rows }, this.setMatchupTypes);
        else {
          //check response here
        }
      });
  }

  getMatchupData() {
    this.fetchAPI(
      "matchups",
      "/getMatchupData?",
      new URLSearchParams({
        startWeek: this.state.startWeek,
        endWeek: this.state.endWeek,
        year: this.state.year,
      })
    );
  }

  setMatchupTypes() {
    var matchupData = this.state.matchups;
    matchupData.forEach((week) => {
      week.forEach((matchup) => {
        matchup["regularSeason"] = "TRUE";
        matchup["playoff"] = "FALSE";
        matchup["twoWeek"] = "FALSE";
      });
    });
    this.setState({ matchups: matchupData });
  }

  postData() {
    fetch("/updateMatchups", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matchups: this.state.matchups,
      }),
    })
      .then((response) => response.json())
      .then((rows) => {
        //handle response
      });
  }

  deleteData() {
    fetch(
      `/deleteMatchups/${this.state.year}/${this.state.startWeek}/${this.state.endWeek}`
    )
      .then((response) => response.json())
      .then((rows) => {
        //handle response
      });
  }

  runLuckBot() {
    this.fetchAPI(
      "luckBot",
      "/runLuckBot?",
      new URLSearchParams({
        week: this.state.currWeek,
        year: this.state.currYear,
      })
    );
  }

  handleCurrWeekChange = (val) => (event) => {
    this.setState({ currWeek: event.target.value });
  };

  handleCurrYearChange = (val) => (event) => {
    this.setState({ currYear: event.target.value });
  };

  handleStartChange = (val) => (event) => {
    this.setState({ startWeek: event.target.value });
  };

  handleEndChange = (val) => (event) => {
    this.setState({ endWeek: event.target.value });
  };

  handleSeasonChange = (val) => (event) => {
    this.setState({ year: event.target.value });
  };

  handleStartChangeDelete = (val) => (event) => {
    this.setState({ startWeek: event.target.value });
  };

  handleEndChangeDelete = (val) => (event) => {
    this.setState({ endWeek: event.target.value });
  };

  handleSeasonChangeDelete = (val) => (event) => {
    this.setState({ year: event.target.value });
  };

  handleWeekTypeChange = (week) => {
    week.forEach((matchup) => {
      matchup["regularSeason"] = "TRUE";
      matchup["playoff"] = "FALSE";
      matchup["twoWeek"] = "FALSE";
    });
  };

  toggleRefresh() {
    this.setState((prevState) => ({
      refresh: !prevState.refresh,
    }));
  }

  render() {
    // Set up dropdown options
    const luckWeeks = [];
    const matchupWeeks = [];

    var numWeeks = this.state.year >= 2021 ? 15 : 14;
    for (var i = 1; i <= numWeeks; i++) {
      matchupWeeks.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    numWeeks = this.state.currYear >= 2021 ? 15 : 14;
    for (i = 2; i <= numWeeks; i++) {
      luckWeeks.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    luckWeeks.push(
      <option value={numWeeks + 1} key={numWeeks + 1}>
        EOY
      </option>
    );

    const yearOpts = yearsPlayed.reverse().map(function (year, i) {
      return (
        <option value={year} key={i}>
          {year}
        </option>
      );
    });

    return (
      <Container fluid>
        <Row id="first-row">
          <header>Luck Bot</header>
          <Row>
            <Col>
              <select id="currWeek" onChange={this.handleCurrWeekChange()}>
                {luckWeeks}
              </select>
            </Col>
            <Col>
              <select id="currYear" onChange={this.handleCurrYearChange()}>
                {yearOpts}
              </select>
            </Col>
            <Col>
              <button onClick={this.runLuckBot}>Run</button>
            </Col>
          </Row>
        </Row>
        <Row>
          <header>Delete Matchups</header>
          <Row>
            <Col>
              <select
                id="startDelete"
                onChange={this.handleStartChangeDelete()}
              >
                {matchupWeeks}
              </select>
            </Col>
            <Col>
              <select id="endDelete" onChange={this.handleEndChangeDelete()}>
                {matchupWeeks}
              </select>
            </Col>
            <Col>
              <select
                id="seasonsDelete"
                onChange={this.handleSeasonChangeDelete()}
              >
                {yearOpts}
              </select>
            </Col>

            <Col>
              <button onClick={this.deleteData}>Delete Data</button>
            </Col>
          </Row>
        </Row>
        <Row>
          <header>Add Matchups</header>
          <Row>
            <Col>
              <select id="start" onChange={this.handleStartChange()}>
                {matchupWeeks}
              </select>
            </Col>
            <Col>
              <select id="end" onChange={this.handleEndChange()}>
                {matchupWeeks}
              </select>
            </Col>
            <Col>
              <select id="seasons" onChange={this.handleSeasonChange()}>
                {yearOpts}
              </select>
            </Col>
            <Col>
              <button onClick={this.getMatchupData}>Fetch</button>
            </Col>
            <Col>
              <button onClick={this.toggleRefresh}>Refresh</button>
            </Col>
            <Col>
              <button onClick={this.postData}>Post Data</button>
            </Col>
          </Row>
          {this.state.matchups.map(function (week, i) {
            return (
              <Row key={i}>
                <Col sm={12}>Week {week[0].week}</Col>
                <Col sm={3}>
                  Matchup Type:
                  <label>
                    <input
                      type="radio"
                      name={week[0].week}
                      value="RS"
                      defaultChecked
                      onChange={() => {
                        week.forEach((matchup) => {
                          matchup["regularSeason"] = "TRUE";
                          matchup["playoff"] = "FALSE";
                          matchup["twoWeek"] = "FALSE";
                        });
                      }}
                    />
                    Regular Season
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={week[0].week}
                      value="PS"
                      onChange={() => {
                        week.forEach((matchup) => {
                          matchup["regularSeason"] = "FALSE";
                          matchup["playoff"] = "FALSE";
                          matchup["twoWeek"] = "FALSE";
                        });
                      }}
                    />
                    Playoffs - Single
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={week[0].week}
                      value="PD"
                      onChange={() => {
                        week.forEach((matchup) => {
                          matchup["regularSeason"] = "FALSE";
                          matchup["playoff"] = "FALSE";
                          matchup["twoWeek"] = "TRUE";
                        });
                      }}
                    />
                    Playoffs - Double
                  </label>
                </Col>
                <Col sm={9}>
                  <table>
                    <thead>
                      <tr>
                        <th>Home</th>
                        <th>Score</th>
                        <th>Away</th>
                        <th>Score</th>
                        <th>Playoff</th>
                        <th>Two Week</th>
                        <th>Regular Season</th>
                      </tr>
                    </thead>
                    <tbody>
                      {week.map(function (matchup, i) {
                        return (
                          <tr key={i}>
                            <td>
                              <input
                                type="checkbox"
                                onChange={() => {
                                  matchup.playoff === "FALSE"
                                    ? (matchup.playoff = "TRUE")
                                    : (matchup.playoff = "FALSE");
                                }}
                                disabled={matchup.regularSeason === "TRUE"}
                              />
                            </td>
                            <td>{matchup.homeTeam}</td>
                            <td>{matchup.homeScore}</td>
                            <td>{matchup.awayTeam}</td>
                            <td>{matchup.awayScore}</td>
                            <td>{matchup.twoWeek}</td>
                            <td>{matchup.regularSeason}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Col>
              </Row>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Admin;
