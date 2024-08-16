import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/records.css";
import FilterableTable from "react-filterable-table";
import { recordTableOptions1, recordTableOptions2 } from "../shared/Options.js";

class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regSeason: { val: true, id: "clicked" },
      playoffS: { val: false, id: "unclicked" },
      playoffD: { val: false, id: "unclicked" },
      fullSeason: { val: false, id: "unclicked" },
      currDate: "All-Time",
      recordType: "Highest Scores",
      seasons: [],
      records: ["Highest Scores", "Lowest Scores", "Highest Victory Margins", "Lowest Victory Margins", "Most Combined Points", "Least Combined Points", "Highest Scores in a Loss", "Lowest Scores in a Win"],
      highScores: [],
      lowScores: [],
      highMOV: [],
      lowMOV: [],
      highComb: [],
      lowComb: [],
      highSL: [],
      lowSW: [],
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.updateTables = this.updateTables.bind(this);
    this.getSeasons = this.getSeasons.bind(this);
    this.getHighLowScores = this.getHighLowScores.bind(this);
    this.getMOV = this.getMOV.bind(this);
    this.getCombinedPoints = this.getCombinedPoints.bind(this);
    this.getHSL = this.getHSL.bind(this);
    this.getLSW = this.getLSW.bind(this);
    this.returnTable = this.returnTable.bind(this);
  }

  componentDidMount() {
    this.getSeasons();
    this.updateTables();
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
        if (field !== "seasons") {
          rows.forEach(function (row, i) {
            row.placement = i + 1;
          });
        }
        this.setState({ [field]: rows });
      });
  }

  // Finds distinct season values in Matchups
  getSeasons() {
    this.fetchData("seasons", "/seasons");
  }

  /**
   * Handler for button clicks
   * Sets current button's value to clicked and all other button's values to unclicked
   * Only allows one button to be clicked at a time
   */
  handleButtonClick(field) {
    var temp = [];
    switch (field) {
      case "regSeason":
        temp.push("playoffD", "playoffS", "fullSeason");
        break;
      case "playoffS":
        temp.push("playoffD", "regSeason", "fullSeason");
        break;
      case "playoffD":
        temp.push("playoffS", "regSeason", "fullSeason");
        break;
      case "fullSeason":
        temp.push("playoffS", "regSeason", "playoffD");
        break;
      default:
        break;
    }

    if (this.state[field].id === "unclicked") {
      this.setState(
        {
          [field]: { val: true, id: "clicked" },
          [temp[0]]: { val: false, id: "unclicked" },
          [temp[1]]: { val: false, id: "unclicked" },
          [temp[2]]: { val: false, id: "unclicked" },
        },
        this.updateTables
      );
    }
  }

  // Handler for data changes which triggers data refresh
  handleDateChange = (val) => (event) => {
    this.setState({ currDate: event.target.value }, this.updateTables);
  };

  // Handler for data changes which triggers data refresh
  handleTypeChange = (val) => (event) => {
    this.setState({ recordType: event.target.value }, this.updateTables);
  };

  // Builds query for type of matchup specified and passes it on to each tables update method
  updateTables() {
    var whereClause;
    if (this.state.regSeason.val) {
      whereClause = `where Regular_Season = 'TRUE'`;
    } else if (this.state.playoffS.val) {
      whereClause = `where Playoff = 'TRUE' AND Two_Week = 'FALSE'`;
    } else if (this.state.playoffD.val) {
      whereClause = `where Playoff = 'TRUE' AND Two_Week = 'TRUE'`;
    } else {
      whereClause = "where true";
    }

    if (this.state.currDate !== "All-Time")
      whereClause = whereClause.concat(` AND Year = ${this.state.currDate}`);

    switch(this.state.recordType) {
      case "Highest Scores": 
        this.getHighLowScores(whereClause);
        break;
      case "Lowest Scores":
        this.getHighLowScores(whereClause);
        break;
      case "Highest Victory Margins":
        this.getMOV(whereClause);
        break;
      case "Lowest Victory Margins":
        this.getMOV(whereClause);
        break;
      case "Most Combined Points":
        this.getCombinedPoints(whereClause);
        break;
      case "Least Combined Points":
        this.getCombinedPoints(whereClause);
        break;
      case "Highest Scores in a Loss":
        this.getHSL(whereClause);
        break;
      case "Lowest Scores in a Win":
        this.getLSW(whereClause);
        break;
    }
  }

  /**
   * Retrieves highest and lowest scores from database
   * @param whereClause - clause added to query to specify matchup type
   */
  getHighLowScores(whereClause) {
    this.fetchData("highScores", `/records/highScores/${whereClause}`);
    this.fetchData("lowScores", `/records/lowScores/${whereClause}`);

    this.state.highScores.forEach(function (row, i) {
      row.placement = i + 1;
    });
    this.state.lowScores.forEach(function (row, i) {
      row.placement = i + 1;
    });
  }

  /**
   * Retrieves highest and lowest margin of victories from database
   * @param whereClause - clause added to query to specify matchup type
   */
  getMOV(whereClause) {
    this.fetchData("highMOV", `/records/highMOV/${whereClause}`);
    this.fetchData("lowMOV", `/records/lowMOV/${whereClause}`);

    this.state.highMOV.forEach(function (row, i) {
      row.placement = i + 1;
    });
    this.state.lowMOV.forEach(function (row, i) {
      row.placement = i + 1;
    });
  }

  /**
   * Retrieves highest and lowest combined points from database
   * @param whereClause - clause added to query to specify matchup type
   */
  getCombinedPoints(whereClause) {
    this.fetchData("highComb", `/records/highComb/${whereClause}`);
    this.fetchData("lowComb", `/records/lowComb/${whereClause}`);

    this.state.highComb.forEach(function (row, i) {
      row.placement = i + 1;
    });
    this.state.lowComb.forEach(function (row, i) {
      row.placement = i + 1;
    });
  }

  /**
   * Retrieves highest scores in a loss from database
   * @param whereClause - clause added to query to specify matchup type
   */
  getHSL(whereClause) {
    whereClause = whereClause.substring(6);
    this.fetchData("highSL", `/records/highSL/${whereClause}`);

    this.state.highSL.forEach(function (row, i) {
      row.placement = i + 1;
    });
  }

  /**
   * Retrieves lowest scores in a win from database
   * @param whereClause - clause added to query to specify matchup type
   */
  getLSW(whereClause) {
    whereClause = whereClause.substring(6);
    this.fetchData("lowSW", `/records/lowSW/${whereClause}`);

    this.state.lowSW.forEach(function (row, i) {
      row.placement = i + 1;
    });
  }

  returnTable() {
    let data = null;
    let tableType = null;
    switch(this.state.recordType) {
      case "Highest Scores":
        data = this.state.highScores;
        tableType = recordTableOptions1;
        break;
      case "Lowest Scores":
        data = this.state.lowScores;
        tableType = recordTableOptions1;
        break;
      case "Highest Victory Margins":
        data = this.state.highMOV;
        tableType = recordTableOptions2;
        break;
      case "Lowest Victory Margins":
        data = this.state.lowMOV;
        tableType = recordTableOptions2;
        break;
      case "Most Combined Points":
        data = this.state.highComb;
        tableType = recordTableOptions2;
        break;
      case "Least Combined Points":
        data = this.state.lowComb;
        tableType = recordTableOptions2;
        break;
      case "Highest Scores in a Loss":
        data = this.state.highSL;
        tableType = recordTableOptions2;
        break;
      case "Lowest Scores in a Win":
        data = this.state.lowSW;
        tableType = recordTableOptions2;
        break;
    }
    
    return (<FilterableTable
      namespace="People"
      initialSort="rank"
      data={data}
      fields={tableType}
      tableClassName="standings-table-header"
      trClassName="standings-tr"
      headerVisible={false}
      pagersVisible={false}
    />);
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
              <button
                id={this.state.regSeason.id}
                onClick={() => this.handleButtonClick("regSeason")}
              >
                Regular Season
              </button>
              <button
                id={this.state.playoffS.id}
                onClick={() => this.handleButtonClick("playoffS")}
              >
                Playoff - Single Week
              </button>
              <button
                id={this.state.playoffD.id}
                onClick={() => this.handleButtonClick("playoffD")}
              >
                Playoff - Double Week
              </button>
              <button
                id={this.state.fullSeason.id}
                onClick={() => this.handleButtonClick("fullSeason")}
              >
                Full Season
              </button>
              <select id="date-range" onChange={this.handleDateChange()}>
                <option value="All-Time">All-Time</option>
                {this.state.seasons.map(function (season, i) {
                  return (
                    <option value={season.year} key={i}>
                      {season.year}
                    </option>
                  );
                })}
              </select>
              <select id="date-range" onChange={this.handleTypeChange()}>
                {this.state.records.map(function (record, i) {
                  return (
                    <option value={record} key={i}>
                      {record}
                    </option>
                  );
                })}
              </select>
            </h4>
            <div id="box-scrollable">
              <Row>
                <Col xl={12}>
                  {this.returnTable()}
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
