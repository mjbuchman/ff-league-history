import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/power.css";
import FilterableTable from "react-filterable-table";
import { powerRankingTableFields } from "../shared/Options.js";
import { yearsCompleted } from "../shared/Dicts.js";

export default function PowerRankings() {
  let [chosenYear, setChosenYear] = useState(2021);
  let [testData, setTestData] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let [seasons, setSeasons] = useState(yearsCompleted);

  return (
    <Container fluid>
      <header>Current Power Rankings</header>
      <Row>
        <Col xl={12}>
          <FilterableTable
            namespace="People"
            initialSort="rank"
            data={testData}
            fields={powerRankingTableFields}
            tableClassName="power-table"
            trClassName="power-tr"
            headerVisible={false}
            pagersVisible={false}
          />
        </Col>
      </Row>
      <br></br>
      <header>Historic Power Rankings</header>
      <Row className="powerYearSelect">
        <Col xl={3}>
          <select
            id="date-range"
            onChange={(e) => setChosenYear(e.target.value)}
            value={chosenYear}
            className="powerYearItem"
          >
            <option value="All-Time">All-Time</option>
            {seasons.map(function (season, i) {
              return (
                <option value={season} key={i}>
                  {season}
                </option>
              );
            })}
          </select>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <FilterableTable
            namespace="People"
            initialSort="rank"
            data={testData}
            fields={powerRankingTableFields}
            tableClassName="power-table"
            trClassName="power-tr"
            headerVisible={false}
            pagersVisible={false}
          />
        </Col>
      </Row>
    </Container>
  );
}

// <FilterableTable
//   namespace="People"
//   initialSort="placement"
//   initialSortDir={true}
//   data={this.state.data}
//   fields={standingsTableOptions1}
//   tableClassName="standings-table"
//   trClassName="standings-tr"
//   headerVisible={false}
//   pagersVisible={false}
// />;
