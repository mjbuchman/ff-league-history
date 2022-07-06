import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/admin.css";
import { yearsPlayed } from "../shared/Dicts";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchups: [],
      draft: [],
      startWeek: 1,
      endWeek: 1,
      startWeekDelete: 1,
      endWeekDelete: 1,
      year: yearsPlayed[yearsPlayed.length - 1],
      yearDelete: yearsPlayed[yearsPlayed.length - 1],
      currWeek: 2,
      currYear: yearsPlayed[yearsPlayed.length - 1],
      refresh: false,
      admin: false,
      loading: false,
    };

    this.getMatchupData = this.getMatchupData.bind(this);
    this.setMatchupTypes = this.setMatchupTypes.bind(this);
    this.postMatchups = this.postMatchups.bind(this);
    this.deleteMatchups = this.deleteMatchups.bind(this);
    this.getDraftData = this.getDraftData.bind(this);
    this.postDrafts = this.postDrafts.bind(this);
    this.deleteDrafts = this.deleteDrafts.bind(this);
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

  componentDidMount() {
    localStorage.setItem("adminToken", process.env.REACT_APP_ADMIN_TOKEN);
    var token = localStorage.getItem("adminToken");
    if (token === process.env.REACT_APP_ADMIN_TOKEN) {
      this.setState({ admin: true });
    }
  }

  /**
   * Function to query the API and set the state value of the given field
   * @param field - The field in this.state to be set by query result
   * @param route - The API endpoint to hit
   */
  fetchAPI(field, route, params) {
    fetch(process.env.REACT_APP_API_URL + route + params)
      .then((response) => response.json())
      .then((rows) => {
        if (field === "matchups")
          this.setState({ [field]: rows }, this.setMatchupTypes);
        else if (field === "draft")
          this.setState({ [field]: rows, loading: false });
        else {
          if (rows.errno) {
            alert(`ERROR ${rows.errno}:\n${rows.sqlMessage}`);
            console.log(rows);
          } else {
            alert(
              `SUCCESS:\nLuck Bot has run for Week ${this.state.currWeek} of ${this.state.currYear}`
            );
          }
          this.setState({ loading: false });
        }
      });
  }

  getMatchupData() {
    this.setState({ loading: true });
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
    this.setState({ matchups: matchupData, loading: false });
  }

  postMatchups() {
    this.setState({ loading: true });
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
        if (rows.errno) {
          alert(`ERROR ${rows.errno}:\n${rows.sqlMessage}`);
          console.log(rows);
        } else {
          alert(
            `SUCCESS:\nMatchups added for Weeks ${this.state.startWeek}-${this.state.endWeek} of ${this.state.year}`
          );
        }
        this.setState({ matchups: [], loading: false });
      });
  }

  deleteMatchups() {
    this.setState({ loading: true });
    fetch(
      `/deleteMatchups/${this.state.year}/${this.state.startWeek}/${this.state.endWeek}`
    )
      .then((response) => response.json())
      .then((rows) => {
        if (rows.errno) {
          alert(`ERROR ${rows.errno}:\n${rows.sqlMessage}`);
          console.log(rows);
        } else {
          alert(
            `SUCCESS:\nMatchups deleted for Weeks ${this.state.startWeek}-${this.state.endWeek} of ${this.state.year}`
          );
        }
        this.setState({ loading: false });
      });
  }

  getDraftData() {
    this.setState({ loading: true });
    this.fetchAPI(
      "draft",
      "/getDraftData?",
      new URLSearchParams({
        year: this.state.year,
      })
    );
  }

  postDrafts() {
    this.setState({ loading: true });
    fetch("/updateDrafts", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        draft: this.state.draft,
      }),
    })
      .then((response) => response.json())
      .then((rows) => {
        if (rows.errno) {
          alert(`ERROR ${rows.errno}:\n${rows.sqlMessage}`);
          console.log(rows);
        } else {
          alert(`SUCCESS:\n${this.state.currYear} Draft added`);
        }
        this.setState({ draft: [], loading: false });
      });
  }

  deleteDrafts() {
    this.setState({ loading: true });
    fetch(`/deleteDrafts/${this.state.year}`)
      .then((response) => response.json())
      .then((rows) => {
        if (rows.errno) {
          alert(`ERROR ${rows.errno}:\n${rows.sqlMessage}`);
          console.log(rows);
        } else {
          alert(`SUCCESS:\n${this.state.year} Draft has been deleted`);
        }
        this.setState({ loading: false });
      });
  }

  runLuckBot() {
    this.setState({ loading: true });
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

    return !this.state.admin ? (
      <Container fluid>
        <Row id="first-row">
          <p style={{ color: "black" }}>
            Sorry, you do not have access to this page
          </p>
        </Row>
      </Container>
    ) : (
      <Container fluid>
        <Row id="first-row">
          <header>Luck Bot</header>
          <Row>
            <Col>
              <select
                className="admin-select"
                id="currWeek"
                onChange={this.handleCurrWeekChange()}
              >
                {luckWeeks}
              </select>
              <select
                className="admin-select"
                id="currYear"
                onChange={this.handleCurrYearChange()}
              >
                {yearOpts}
              </select>
              <button
                className={
                  this.state.loading ? "disabled-button" : "admin-button"
                }
                disabled={this.state.loading}
                onClick={this.runLuckBot}
              >
                Run
              </button>
            </Col>
          </Row>
        </Row>
        <Row>
          <header>Delete Matchups</header>
          <Row>
            <Col>
              <select
                className="admin-select"
                id="startDelete"
                onChange={this.handleStartChangeDelete()}
              >
                {matchupWeeks}
              </select>
              <select
                className="admin-select"
                id="endDelete"
                onChange={this.handleEndChangeDelete()}
              >
                {matchupWeeks}
              </select>
              <select
                className="admin-select"
                id="seasonsDelete"
                onChange={this.handleSeasonChangeDelete()}
              >
                {yearOpts}
              </select>
              <button
                className={
                  this.state.loading ? "disabled-button" : "admin-button"
                }
                disabled={this.state.loading}
                onClick={this.deleteMatchups}
              >
                Delete Data
              </button>
            </Col>
          </Row>
        </Row>
        <Row>
          <header>Add Matchups</header>
          <Row>
            <Col>
              <select
                className="admin-select"
                id="start"
                onChange={this.handleStartChange()}
              >
                {matchupWeeks}
              </select>
              <select
                className="admin-select"
                id="end"
                onChange={this.handleEndChange()}
              >
                {matchupWeeks}
              </select>
              <select
                className="admin-select"
                id="seasons"
                onChange={this.handleSeasonChange()}
              >
                {yearOpts}
              </select>
              <button
                className={
                  this.state.loading ? "disabled-button" : "admin-button"
                }
                disabled={this.state.loading}
                onClick={this.getMatchupData}
              >
                Fetch
              </button>
              <button
                className={
                  this.state.loading ? "disabled-button" : "admin-button"
                }
                disabled={this.state.loading}
                onClick={this.toggleRefresh}
              >
                Refresh
              </button>
              <button
                className={
                  this.state.loading ? "disabled-button" : "admin-button"
                }
                disabled={this.state.loading}
                onClick={this.postMatchups}
              >
                Post Data
              </button>
            </Col>
          </Row>
          {this.state.matchups.map(function (week, i) {
            return (
              <Row key={i}>
                <Col sm={12}>Week {week[0].week}</Col>
                <Col sm={3}>
                  Matchup Type:
                  <Row>
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
                  </Row>
                  <Row>
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
                  </Row>
                  <Row>
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
                  </Row>
                </Col>
                <Col sm={9}>
                  <table id="admin-table">
                    <thead>
                      <tr>
                        <th>Playoff?</th>
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
                            <td>{matchup.playoff}</td>
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
        <Row>
          <header>Delete Drafts</header>
          <Row>
            <Col>
              <select
                className="admin-select"
                id="seasons"
                onChange={this.handleSeasonChange()}
              >
                {yearOpts}
              </select>
              <button
                className={
                  this.state.loading ? "disabled-button" : "admin-button"
                }
                disabled={this.state.loading}
                onClick={this.deleteDrafts}
              >
                Delete Data
              </button>
            </Col>
          </Row>
        </Row>
        <Row>
          <header>Add Drafts</header>
          <Row>
            <Col>
              <select
                className="admin-select"
                id="seasons"
                onChange={this.handleSeasonChange()}
              >
                {yearOpts}
              </select>
              <button
                className={
                  this.state.loading ? "disabled-button" : "admin-button"
                }
                disabled={this.state.loading}
                onClick={this.getDraftData}
              >
                Fetch
              </button>
              <button
                className={
                  this.state.loading ? "disabled-button" : "admin-button"
                }
                disabled={this.state.loading}
                onClick={this.postDrafts}
              >
                Post Data
              </button>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.draft.length > 0 ? (
                <table id="admin-table">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Round</th>
                      <th>Pick</th>
                      <th>Owner</th>
                      <th>Name</th>
                      <th>Team</th>
                      <th>Position</th>
                      <th>PRK</th>
                      <th>GP</th>
                      <th>FPTS/G</th>
                      <th>FPTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.draft.map(function (pick, i) {
                      return (
                        <tr key={i}>
                          <td>{pick.year}</td>
                          <td>{pick.round}</td>
                          <td>{pick.pick}</td>
                          <td>{pick.owner}</td>
                          <td>{pick.name}</td>
                          <td>{pick.team}</td>
                          <td>{pick.position}</td>
                          <td>{pick.prk}</td>
                          <td>{pick.gp}</td>
                          <td>{pick.fptsg}</td>
                          <td>{pick.fpts}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <span></span>
              )}
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default Admin;
