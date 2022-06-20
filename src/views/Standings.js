import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/standings.css";
import FilterableTable from "react-filterable-table";
import ReactTooltip from "react-tooltip";
import {
  standingsTableOptions1,
  standingsTableOptions2,
} from "../shared/Options.js";

class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regSeason: { val: true, id: "clicked" },
      playoff: { val: true, id: "clicked" },
      data: [],
      currDate: "All-Time",
      seasons: [],
      finalStandings: [],
    };

    this.getSeasons = this.getSeasons.bind(this);
    this.getFinalStandings = this.getFinalStandings.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.updateTableData = this.updateTableData.bind(this);
    this.chooseTableType = this.chooseTableType.bind(this);
  }

  componentDidMount() {
    this.getFinalStandings();
    this.getSeasons();
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
        if (field === "standings") {
          rows[4].forEach((row) => (row.pct = row.pct.toFixed(3)));

          // sets place values to final standings, else uses regular season standings
          if (
            this.state.currDate !== "All-Time" &&
            this.state.currDate !== String(new Date().getFullYear()) &&
            this.state.playoff.val
          ) {
            rows[4].forEach((row) =>
              this.state.finalStandings.forEach((rowStandings) => {
                if (
                  rowStandings.Owner === row.owner &&
                  rowStandings.Year === parseInt(this.state.currDate)
                )
                  row.placement = rowStandings.Place;
              })
            );
          } else {
            rows[4].forEach(function (row, i) {
              row.placement = i + 1;
            });
          }
          this.setState({ data: rows[4] });
        } else {
          this.setState({ [field]: rows });
        }
      });
  }

  // Queries database to find distinct seasons
  getSeasons() {
    this.fetchData("seasons", "/seasons");
  }

  // Queries database for all final standings data
  getFinalStandings() {
    this.fetchData("finalStandings", "/standings/final");
  }

  // Handler for date dropdown changes which triggers data refresh
  handleDateChange = (val) => (event) => {
    this.setState({ currDate: event.target.value }, this.updateTableData);
  };

  /**
   * Handler for button clicks which triggers data refresh
   * @param field - The field indicating which button was clicked
   */
  handleButtonClick(field) {
    if (this.state[field].id === "clicked")
      this.setState(
        { [field]: { val: false, id: "unclicked" } },
        this.updateTableData
      );
    else
      this.setState(
        { [field]: { val: true, id: "clicked" } },
        this.updateTableData
      );
  }

  // Sets data and matchup type data from state and then queries database for full table data
  updateTableData() {
    if (!this.state.regSeason.val && !this.state.playoff.val)
      this.setState({ data: [] });
    else {
      this.fetchData(
        "standings",
        `/standings/${this.state.currDate}/${this.state.regSeason.val}/${this.state.playoff.val}`
      );
    }
  }

  // Chooses the table type depending on whether regular season or final standings are to be displayed
  chooseTableType() {
    if (
      !this.state.playoff.val ||
      this.state.currDate === "All-Time" ||
      this.state.currDate === String(new Date().getFullYear())
    ) {
      return (
        <div id="box-scrollable">
          <FilterableTable
            namespace="People"
            initialSort="placement"
            initialSortDir={true}
            data={this.state.data}
            fields={standingsTableOptions1}
            tableClassName="standings-table"
            trClassName="standings-tr"
            headerVisible={false}
            pagersVisible={false}
          />
        </div>
      );
    } else {
      return (
        <div id="box-scrollable">
          <FilterableTable
            namespace="People"
            initialSort="placement"
            initialSortDir={true}
            data={this.state.data}
            fields={standingsTableOptions2}
            tableClassName="standings-table"
            trClassName="standings-tr"
            headerVisible={false}
            pagersVisible={false}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <Container fluid>
        <Row id="first-row">
          <header>Standings</header>
        </Row>
        <Row>
          <Col>
            <h4>
              <button
                id={this.state.regSeason.id}
                onClick={() => this.handleButtonClick("regSeason")}
              >
                Regular Season
              </button>
              <button
                id={this.state.playoff.id}
                onClick={() => this.handleButtonClick("playoff")}
              >
                Playoffs
              </button>
              <span data-tip data-for="info">
                <i className="material-icons">help_outline</i>
              </span>
              <ReactTooltip
                id="info"
                place="right"
                type="dark"
                effect="solid"
                multiline={true}
              >
                <p>When viewing individual seasons:</p>
                <p>
                  If 'Playoffs' is selected, 'Place' will display final
                  placements;
                  <br /> otherwise, 'Place' will show regular season placements
                </p>
              </ReactTooltip>
              <select id="date-range" onChange={this.handleDateChange()}>
                <option value="All-Time">All-Time</option>
                {this.state.seasons.map(function (season, i) {
                  return (
                    <option value={season.Year} key={i}>
                      {season.Year}
                    </option>
                  );
                })}
              </select>
            </h4>
            {this.chooseTableType()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Standings;
