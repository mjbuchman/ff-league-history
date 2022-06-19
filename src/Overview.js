import React, { Component } from "react";
import "./css/overview.css";
import { Container, Row, Col } from "react-bootstrap";
import ReactSpeedometer from "react-d3-speedometer";
import { Line } from "react-chartjs-2";
import LogoMB from "./logos/Michael Buchman.jpg";
import LogoGD from "./logos/Grant Dakovich.jpg";
import LogoBZ from "./logos/Brenden Zarrinnam.jpg";
import LogoJP from "./logos/Joe Perry.jpg";
import LogoJE from "./logos/James Earley.jpg";
import LogoJS from "./logos/Jonathan Setzke.jpg";
import LogoRR from "./logos/Ryan Rasmussen.jpg";
import LogoTB from "./logos/Tyler Brown.jpg";
import LogoNE from "./logos/Nick Eufrasio.jpg";
import LogoCD from "./logos/Connor DeYoung.jpg";

// dictionary for image elements
const img = {
    "Michael Buchman": LogoMB,
    "Grant Dakovich": LogoGD,
    "Brenden Zarrinnam": LogoBZ,
    "Joe Perry": LogoJP,
    "James Earley": LogoJE,
    "Jonathan Setzke": LogoJS,
    "Ryan Rasmussen": LogoRR,
    "Tyler Brown": LogoTB,
    "Nick Eufrasio": LogoNE,
    "Connor DeYoung": LogoCD
}

// dictionary for placement values
const dict = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  4: "4th",
  5: "5th",
  6: "6th",
  7: "7th",
  8: "8th",
  9: "9th",
  10: "10th",
};

// options for graph, establishes a multi-axis graph containing wins and points
const options = {
  scales: {
    yAxes: [
      {
        type: "linear",
        id: "y-axis-1",
        display: true,
        position: "left",
        ticks: {
          min: 0,
          max: 16,
        },
      },
      {
        type: "linear",
        id: "y-axis-2",
        display: true,
        position: "right",
        ticks: {
          min: 1200,
          max: 2800,
        },
      },
    ],
  },
  maintainAspectRatio: false,
};

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      owners: [],
      currOwner: "Michael Buchman",
      ownerVals: [],
      seasons: [{ count: 0 }],
      gp: [{ count: 0 }],
      games: [],
      recordData: {
        totalWins: 1,
        totalLosses: 1,
        rsWins: 1,
        rsLosses: 1,
        pWins: 1,
        pLosses: 1,
      },
      tpf: [{ tpf: 0 }],
      tpa: [{ tpa: 0 }],
      highScore: [{ Year: 0, Week: 0, Score: 0 }],
      lowScore: [{ Year: 0, Week: 0, Score: 0 }],
      bwm: [{ Year: 0, Week: 0, Score: 0 }],
      swm: [{ Year: 0, Week: 0, Score: 0 }],
      blm: [{ Year: 0, Week: 0, Score: 0 }],
      slm: [{ Year: 0, Week: 0, Score: 0 }],
      pApp: [{ count: 0 }],
      weekHS: [{}, {}, {}, {}, [{ count: 0 }]],
      weekLS: [{}, {}, {}, {}, [{ count: 0 }]],
      graphData: { labels: ["2017", "2018", "2019", "2020"] },
    };

    this.queryDB = this.queryDB.bind(this);
    this.getOwners = this.getOwners.bind(this);
    this.setOwnerVals = this.setOwnerVals.bind(this);
    this.updateValues = this.updateValues.bind(this);
    this.getMainTables = this.getMainTables.bind(this);
    this.getGraphData = this.getGraphData.bind(this);
    this.getRecordDate = this.getRecordData.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
  }

  componentDidMount() {
    this.getOwners();
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
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((response) => response.json())
      .then((rows) => {
        if (field === "owners")
          this.setState({ [field]: rows }, this.updateValues);
        // set on refresh, triggers the initial data update
        else if (field === "games")
          this.setState({ [field]: rows }, this.getRecordData);
        else if (field === "weekLS")
          this.setState(
            { [field]: rows },
            this.setState({ refreshing: false })
          );
        // last field to be updated -> ends 'refresh' period
        else this.setState({ [field]: rows });
      });
  }

  // Gets owner data from Owners table to populate dropdown menu
  getOwners() {
    this.queryDB("owners", "select * from Owners");
  }

  /**
   * Searches for current owner in the previously retrieved Owner table
   * Takes all columns in the appropriate owner entry and stores into this.state's ownerVals
   */
  setOwnerVals() {
    var currOwner = this.state.currOwner;
    var index = 0;
    this.state.owners.forEach(function (owner, i) {
      if (currOwner === owner.Owner) index = i;
    });

    this.setState({ ownerVals: this.state.owners[index] });
  }

  // Triggers update of all data fields for current Owner
  updateValues() {
    this.setOwnerVals();
    this.getMainTables();
    this.getWeeklyData();
  }

  // Queries database for all relevant data in main overview, regular season performance and playoff performance, then stores them in appropriate state fields
  getMainTables() {
    this.queryDB(
      "seasons",
      `select count(distinct year) as count from Matchups where home_team = "${this.state.currOwner}" OR away_team = "${this.state.currOwner}"`
    );
    this.queryDB(
      "gp",
      `select count(*) as count from Matchups where home_team = "${this.state.currOwner}" OR away_team = "${this.state.currOwner}"`
    );
    this.queryDB(
      "games",
      `select * from Matchups where home_team = "${this.state.currOwner}" OR away_team = "${this.state.currOwner}"`
    );
    this.queryDB(
      "tpf",
      `select sum(score) as tpf from (Select sum(Home_score) as score from Matchups where Home_Team = "${this.state.currOwner}" UNION Select sum(Away_score) as score from Matchups where Away_Team = "${this.state.currOwner}") as points`
    );
    this.queryDB(
      "tpa",
      `select sum(score) as tpa from (Select sum(Away_score) as score from Matchups where Home_Team = "${this.state.currOwner}" UNION Select sum(Home_score) as score from Matchups where Away_Team = "${this.state.currOwner}") as points`
    );
    this.queryDB(
      "highScore",
      `Select Year, Week, Score from (Select Year, Week, Home_score as Score from Matchups where Home_Team = "${this.state.currOwner}" AND Regular_Season = "TRUE" UNION Select Year, Week, Away_Score as Score from Matchups where Away_Team = "${this.state.currOwner}" AND Regular_Season = "TRUE") as scores order by Score DESC limit 1`
    );
    this.queryDB(
      "lowScore",
      `Select Year, Week, Score from (Select Year, Week, Home_score as Score from Matchups where Home_Team = "${this.state.currOwner}" AND Regular_Season = "TRUE" UNION Select Year, Week, Away_Score as Score from Matchups where Away_Team = "${this.state.currOwner}" AND Regular_Season = "TRUE") as scores order by Score ASC limit 1`
    );
    this.queryDB(
      "bwm",
      `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${this.state.currOwner}" AND Home_Score > Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${this.state.currOwner}" AND Away_Score > Home_Score) as margins order by Margin desc limit 1`
    );
    this.queryDB(
      "swm",
      `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${this.state.currOwner}" AND Home_Score > Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${this.state.currOwner}" AND Away_Score > Home_Score) as margins order by Margin asc limit 1`
    );
    this.queryDB(
      "blm",
      `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${this.state.currOwner}" AND Home_Score < Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${this.state.currOwner}" AND Away_Score < Home_Score) as margins order by Margin asc limit 1`
    );
    this.queryDB(
      "slm",
      `select * from (Select Year, Week, Home_Score-Away_Score as Margin from Matchups where Home_Team = "${this.state.currOwner}" AND Home_Score < Away_Score UNION Select Year, Week, Away_Score-Home_Score as Margin from Matchups where Away_Team = "${this.state.currOwner}" AND Away_Score < Home_Score) as margins order by Margin desc limit 1`
    );
    this.queryDB(
      "pApp",
      `select count(distinct year) as count from Matchups where (home_team = "${this.state.currOwner}" OR away_team = "${this.state.currOwner}") AND Playoff = "TRUE"`
    );
  }

  /**
   * Calculates number of wins and total points from the current Owners matchup data
   * Segments these numbers by distinct years and pushes them into a wins and point array accordingly
   */
  getGraphData() {
    var currOwner = this.state.currOwner;
    var index = 0;
    var wins = [];
    var points = [];
    this.state.games.forEach(function (game, i) {
      // After 14 games a new season begins
      if (i % 14 === 0) {
        // Dont start a new season/array entry if it's the first Matchup
        if (i !== 0) {
          points[index] = points[index].toFixed(2);
          index++;
        }
        wins.push(0);
        points.push(0);
      }

      // Find wins and points scored accross all Matchup entries
      if (game.Home_Team === currOwner) {
        points[index] += game.Home_Score;
        if (game.Home_Score > game.Away_Score) wins[index]++;
      } else {
        points[index] += game.Away_Score;
        if (game.Home_Score < game.Away_Score) wins[index]++;
      }
    });

    this.setState({
      graphData: {
        labels: ["2017", "2018", "2019", "2020"],
        datasets: [
          {
            label: "Wins",
            data: wins,
            fill: false,
            lineTension: 0,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132)",
            yAxisID: "y-axis-1",
          },
          {
            label: "Points For",
            data: points,
            fill: false,
            lineTension: 0,
            backgroundColor: "rgb(54, 162, 235)",
            borderColor: "rgba(54, 162, 235)",
            yAxisID: "y-axis-2",
          },
        ],
      },
    });
  }

  // Calculates wins and losses from the current Owners matchup data
  getRecordData() {
    var totalWins = 0,
      totalLosses = 0,
      rsWins = 0,
      rsLosses = 0,
      pWins = 0,
      pLosses = 0;
    var currOwner = this.state.currOwner;
    this.state.games.forEach(function (game) {
      // determine what type of matchup this is and place result into the appropriate bucket
      if (game.Home_Team === currOwner) {
        if (game.Home_Score > game.Away_Score) {
          totalWins++;
          if (game.Regular_Season === "TRUE") rsWins++;
          if (game.Playoff === "TRUE") pWins++;
        } else {
          totalLosses++;
          if (game.Regular_Season === "TRUE") rsLosses++;
          if (game.Playoff === "TRUE") pLosses++;
        }
      } else {
        if (game.Away_Score > game.Home_Score) {
          totalWins++;
          if (game.Regular_Season === "TRUE") rsWins++;
          if (game.Playoff === "TRUE") pWins++;
        } else {
          totalLosses++;
          if (game.Regular_Season === "TRUE") rsLosses++;
          if (game.Playoff === "TRUE") pLosses++;
        }
      }
    });

    this.setState(
      {
        recordData: {
          totalWins: totalWins,
          totalLosses: totalLosses,
          rsWins: rsWins,
          rsLosses: rsLosses,
          pWins: pWins,
          pLosses: pLosses,
        },
      },
      this.getGraphData
    );
  }

  // Query the database to find the number of weeks the current Owner high scored and low scored
  getWeeklyData() {
    this.queryDB(
      "weekHS",
      ` drop temporary table if exists results;
        drop temporary table if exists results2;
        
        Create temporary table results
        select year, week, home_team as owner, home_score as score from Matchups where Home_Score > Away_Score UNION select year, week, away_team as owner, away_score as score from Matchups where Home_Score < Away_Score;
        
        Create temporary table results2 select * from results;
        
        select count(*) as count from 
        (select a.year, a.week, a.score, a.owner
        from results a
        inner join
        (select year, week, max(score) as score from results2 group by year, week) b
        on a.year = b.year AND a.week = b.week AND a.score = b.score) as res where owner = "${this.state.currOwner}"
        `
    );

    this.queryDB(
      "weekLS",
      `drop temporary table if exists results;
        drop temporary table if exists results2;
        
        Create temporary table results
        select year, week, home_team as owner, home_score as score from Matchups where Home_Score < Away_Score UNION select year, week, away_team as owner, away_score as score from Matchups where Home_Score > Away_Score;
        
        Create temporary table results2 select * from results;
        
        select count(*) as count from 
        (select a.year, a.week, a.score, a.owner
        from results a
        inner join
        (select year, week, min(score) as score from results2 group by year, week) b
        on a.year = b.year AND a.week = b.week AND a.score = b.score) as res where owner = "${this.state.currOwner}"
        `
    );
  }

  // Handler for a current owner change which also triggers data refresh
  handleOwnerChange = (val) => (event) => {
    this.setState(
      { currOwner: event.target.value, refreshing: true },
      this.updateValues
    );
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <header>Team Overview</header>
        </Row>
        <Row>
          <Col sm={12} xl={5}>
            <Row>
              <Col>
                <select id="owners" onChange={this.handleOwnerChange()}>
                  {this.state.owners.map(function (owner, i) {
                    return (
                      <option value={owner.Owner} key={i}>
                        {owner.Owner}
                      </option>
                    );
                  })}
                </select>
              </Col>
            </Row>
            <Row id="gray-box">
              {!this.state.refreshing && (
                <Col>
                  <Row>
                    <Col>
                      <img
                        id="overview-logo"
                        src={img[this.state.currOwner]}
                        alt={this.state.currOwner}
                      ></img>
                      <h3>Owner</h3>
                      <h2 id="owner">{this.state.currOwner}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} id="top-padded">
                      <h3>Seasons Played</h3>
                      <h2>{this.state.seasons[0].count}</h2>
                    </Col>
                    <Col md={4} id="top-padded">
                      <h3>Games Played</h3>
                      <h2>{this.state.gp[0].count}</h2>
                    </Col>
                    <Col md={4} id="top-padded">
                      <h3>Record</h3>
                      <h2>{`${this.state.recordData.totalWins}-${this.state.recordData.totalLosses}-0`}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} id="top-padded">
                      <h3>Total Points For</h3>
                      <h2>{this.state.tpf[0].tpf}</h2>
                    </Col>
                    <Col md={6} id="top-padded">
                      <h3>Total Points Against</h3>
                      <h2>{this.state.tpa[0].tpa}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} id="top-padded">
                      <h3>Average Points For</h3>
                      <h2>
                        {(
                          this.state.tpf[0].tpf / this.state.gp[0].count
                        ).toFixed(2)}
                      </h2>
                    </Col>
                    <Col md={6} id="top-padded">
                      <h3>Average Points Against</h3>
                      <h2>
                        {(
                          this.state.tpa[0].tpa / this.state.gp[0].count
                        ).toFixed(2)}
                      </h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} id="top-padded">
                      <h3>Highest Score - Regular Season</h3>
                      <h2>{this.state.highScore[0].Score}</h2>
                      <p>
                        (Week {this.state.highScore[0].Week},{" "}
                        {this.state.highScore[0].Year})
                      </p>
                    </Col>
                    <Col md={6} id="top-padded">
                      <h3>Lowest Score - Regular Season</h3>
                      <h2>{this.state.lowScore[0].Score}</h2>
                      <p>
                        (Week {this.state.lowScore[0].Week},{" "}
                        {this.state.lowScore[0].Year})
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} id="top-padded">
                      <h3>Biggest Win Margin</h3>
                      <h2>{this.state.bwm[0].Margin}</h2>
                      <p>
                        (Week {this.state.bwm[0].Week}, {this.state.bwm[0].Year}
                        )
                      </p>
                    </Col>
                    <Col md={6} id="top-padded">
                      <h3>Smallest Win Margin</h3>
                      <h2>{this.state.swm[0].Margin}</h2>
                      <p>
                        (Week {this.state.swm[0].Week}, {this.state.swm[0].Year}
                        )
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} id="top-padded">
                      <h3>Biggest Loss Margin</h3>
                      <h2>{this.state.blm[0].Margin}</h2>
                      <p>
                        (Week {this.state.blm[0].Week}, {this.state.blm[0].Year}
                        )
                      </p>
                    </Col>
                    <Col md={6} id="top-padded">
                      <h3>Smallest Loss Margin</h3>
                      <h2>{this.state.slm[0].Margin}</h2>
                      <p>
                        (Week {this.state.slm[0].Week}, {this.state.slm[0].Year}
                        )
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          </Col>
          <Col sm={12} xl={7}>
            <h4>Regular Season Performance</h4>
            {!this.state.refreshing && (
              <div id="box">
                <Row>
                  <Col lg={3} id="center-align">
                    <h5>Win Rate</h5>
                    <ReactSpeedometer
                      maxValue={1.0}
                      width={190}
                      height={140}
                      needleHeightRatio={0.7}
                      maxSegmentLabels={4}
                      segments={1000}
                      value={parseFloat(
                        (
                          this.state.recordData.rsWins /
                          (this.state.recordData.rsWins +
                            this.state.recordData.rsLosses)
                        ).toFixed(3)
                      )}
                      textColor="#777"
                    />
                  </Col>
                  <Col sm={4} lg={3} id="center-align">
                    <h5>Win</h5>
                    <hr></hr>
                    <h1>{this.state.recordData.rsWins}</h1>
                  </Col>
                  <Col sm={4} lg={3} id="center-align">
                    <h5>Loss</h5>
                    <hr></hr>
                    <h1>{this.state.recordData.rsLosses}</h1>
                  </Col>
                  <Col sm={4} lg={3} id="center-align">
                    <h5>Tie</h5>
                    <hr></hr>
                    <h1>0</h1>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} id="center-align">
                    <div className="stats-box">
                      <h6>Regular Season Champion</h6>
                      <div id="box">
                        <h1 id="small-mar">
                          {this.state.ownerVals.RS_Champion}
                        </h1>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} id="center-align">
                    <div className="stats-box">
                      <h6>Last Place Finishes</h6>
                      <div id="box">
                        <h1 id="small-mar">
                          {this.state.ownerVals.Last_Place_RS}
                        </h1>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} id="center-align">
                    <div className="stats-box">
                      <h6>Best Placement</h6>
                      <div id="box">
                        <h1 id="small-mar">
                          {dict[this.state.ownerVals.Best_Placement_RS]}
                        </h1>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} id="center-align">
                    <div className="stats-box">
                      <h6>Season High Scorer</h6>
                      <div id="box">
                        <h1 id="small-mar">{this.state.ownerVals.Season_HS}</h1>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} id="center-align">
                    <div className="stats-box">
                      <h6>Weekly High Scorer</h6>
                      <div id="box">
                        <h1 id="small-mar">{this.state.weekHS[4][0].count}</h1>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} id="center-align">
                    <div className="stats-box">
                      <h6>Weekly Low Scorer</h6>
                      <div id="box">
                        <h1 id="small-mar">{this.state.weekLS[4][0].count}</h1>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
            <h4>Playoff Performance</h4>
            {!this.state.refreshing && (
              <div id="box">
                <Row>
                  <Col lg={3} id="center-align">
                    <h5>Win Rate</h5>
                    <ReactSpeedometer
                      maxValue={1.0}
                      width={190}
                      height={140}
                      needleHeightRatio={0.7}
                      maxSegmentLabels={4}
                      segments={1000}
                      value={parseFloat(
                        (
                          this.state.recordData.pWins /
                          (this.state.recordData.pWins +
                            this.state.recordData.pLosses)
                        ).toFixed(3)
                      )}
                      textColor="#777"
                    />
                  </Col>
                  <Col sm={4} lg={3} id="center-align">
                    <h5>Win</h5>
                    <hr></hr>
                    <h1>{this.state.recordData.pWins}</h1>
                  </Col>
                  <Col sm={4} lg={3} id="center-align">
                    <h5>Loss</h5>
                    <hr></hr>
                    <h1>{this.state.recordData.pLosses}</h1>
                  </Col>
                  <Col sm={4} lg={3} id="center-align">
                    <h5>Tie</h5>
                    <hr></hr>
                    <h1>0</h1>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} id="center-align">
                    <div className="stats-box">
                      <h6>Playoff Appearances</h6>
                      <div id="box">
                        <h1 id="small-mar">{this.state.pApp[0].count}</h1>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} id="center-align">
                    <div className="stats-box">
                      <h6>Best Placement</h6>
                      <div id="box">
                        <h1 id="small-mar">
                          {dict[this.state.ownerVals.Best_Placement_Final]}
                        </h1>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} id="center-align">
                    <div className="stats-box">
                      <h6>Championship Appearances</h6>
                      <div id="box">
                        <h1 id="small-mar">{this.state.ownerVals.Champ_App}</h1>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} id="center-align">
                    <div className="stats-box">
                      <h6>Championships</h6>
                      <div id="box">
                        <h1 id="small-mar">
                          {this.state.ownerVals.Championships}
                        </h1>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
        {/* <Row>
                    <Col>
                        <h4>Yearly Performance</h4>
                        {!this.state.refreshing && <div id="box">
                            <Line data={this.state.graphData} height={500} options={options}/>
                        </div>}
                    </Col>
                </Row> */}
      </Container>
    );
  }
}

export default Overview;
