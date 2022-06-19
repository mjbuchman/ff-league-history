import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./css/standings.css";
import FilterableTable from "react-filterable-table";
import ReactTooltip from "react-tooltip";
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
import LogoDef from "./logos/Wallerstein.jpg";
import fPlace from "./logos/1st.png";
import sPlace from "./logos/2nd.png";
import tPlace from "./logos/3rd.png";

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
  "Connor DeYoung": LogoCD,
  "Zach Way": LogoDef,
  "Sal DiVita": LogoDef,
  1: fPlace,
  2: sPlace,
  3: tPlace,
};

// function passed into table that renders a trophy if final placement is top 3
const renderTrophy = (props) => {
  if (props.record.placement > 3) {
    return <span>{props.record.placement}</span>;
  } else {
    return (
      <span>
        <img
          src={img[props.record.placement]}
          alt="table-trophy"
          style={{ width: "30px", borderRadius: "100%" }}
        ></img>
      </span>
    );
  }
};

// function passed into table to render team logos
const renderLogo = (props) => {
  return (
    <span>
      <img
        src={img[props.record.owner]}
        alt="table-logo"
        style={{ width: "40px", borderRadius: "100%" }}
      ></img>
    </span>
  );
};

// table fields when displaying regular season standings
let fields = [
  {
    name: "placement",
    displayName: "Place",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "logo",
    displayName: "Owner",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    render: renderLogo,
  },
  {
    name: "owner",
    displayName: "",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "gp",
    displayName: "Games Played",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "win",
    displayName: "Wins",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "loss",
    displayName: "Losses",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "tie",
    displayName: "Ties",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pct",
    displayName: "Win %",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pf",
    displayName: "PF",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pa",
    displayName: "PA",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
];

// table fields when displaying final standings
let fields2 = [
  {
    name: "placement",
    displayName: "Place",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    render: renderTrophy,
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "logo",
    displayName: "Owner",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    render: renderLogo,
  },
  {
    name: "owner",
    displayName: "",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "gp",
    displayName: "Games Played",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "win",
    displayName: "Wins",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "loss",
    displayName: "Losses",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "tie",
    displayName: "Ties",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pct",
    displayName: "Win %",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pf",
    displayName: "PF",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pa",
    displayName: "PA",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
];

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

  // Queries database to find distinct seasons
  getSeasons() {
    fetch("/api/db", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `select distinct Year from Matchups order by Year desc`,
      }),
    })
      .then((response) => response.json())
      .then((rows) => {
        this.setState({ seasons: rows });
      });
  }

  // Queries database for all final standings data
  getFinalStandings() {
    fetch("/api/db", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `select * from Final_Standings`,
      }),
    })
      .then((response) => response.json())
      .then((rows) => {
        this.setState({ finalStandings: rows });
      });
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
    let dateClause = "";
    let exclude = `where Points.owner != "Sal DiVita" AND Points.owner != "Zach Way"`; // INACTIVE LEAGUE MEMBERS

    // add date to query if year is specified
    if (this.state.currDate !== "All-Time") {
      dateClause = ` AND Year = ${this.state.currDate}`;
      exclude = "";
    }

    // add regular season and playoff values to query
    let clause = `Regular_Season = "${this.state.regSeason.val}" AND Playoff = "${this.state.playoff.val}"${dateClause}`;
    if (this.state.regSeason.val && this.state.playoff.val)
      clause = `true${dateClause}`;

    if (!this.state.regSeason.val && !this.state.playoff.val)
      this.setState({ data: [] });
    else {
      fetch("/api/db", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `drop temporary table if exists WinLoss;
                                drop temporary table if exists Points;

                                create temporary table WinLoss
                                    select owner, sum(win) as win, sum(loss) as loss from
                                    (SELECT owner, COUNT(*) AS win, 0 as loss FROM (SELECT home_team AS owner FROM Matchups WHERE home_score > away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score > home_score AND (${clause})) AS innerWins GROUP BY owner
                                    UNION ALL
                                    SELECT owner, 0 as win, COUNT(*) AS loss FROM (SELECT home_team AS owner FROM Matchups WHERE home_score < away_score AND (${clause}) UNION ALL SELECT away_team AS owner FROM Matchups WHERE away_score < home_score AND (${clause})) AS innerLosses GROUP BY owner) as WL group by owner;
                                    
                                    create temporary table Points
                                    Select * from (SELECT owner, SUM(pf) AS pf, SUM(pa) AS pa FROM (SELECT home_team AS owner, SUM(home_score) AS pf, SUM(away_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner UNION ALL SELECT away_team AS Owner, SUM(away_score) AS pf, SUM(home_score) AS pa FROM Matchups WHERE ${clause} GROUP BY Owner) AS innerPoints GROUP BY owner) as OuterPoints;
                                    
                                    select 0 as placement, Points.owner as owner, win+loss AS gp, win, loss, 0 AS tie, win/(win+loss) AS pct, pf, pa from WinLoss inner join Points on (WinLoss.owner = Points.owner) ${exclude} order by pct desc, pf desc;
                            `,
        }),
      })
        .then((response) => response.json())
        .then((rows) => {
          console.log(rows);
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
        });
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
            fields={fields}
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
            fields={fields2}
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
              <a data-tip data-for="info">
                <i className="material-icons">help_outline</i>
              </a>
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
