import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/franchise.css";

class Franchise extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  componentDidMount() {

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
        this.setState({ [field]: rows });
      });
  }

  render() {
    return (
      <Container fluid>
        <Row id="first-row">
          <header>Franchise Power Index</header>
          <body>
            The Franchise Power Index™ combines historical data across all facets of fantasy football to create a power ranking of franchises across the entire history of the 
            Wallerstein Fantasy Football League. From the draft to the championship, and every week in between, the FPI calculates positive and negative point values, which 
            when these totals are combined, creates the core metric of the FPI. The team with the highest FPI score is dubbed 'King Wallerstein' and can be considered the 
            historically best franchise in the league. Conversely, teams failing to meet an FPI score of the league average divided in half are considered 'Poverty Franchises'
            and find themselves in a woeful spot. The Franchise Power Index serves as a baseline for historical league success and aims to establish a heirarchy to seperate the 
            dynasties from the pretenders.
          </body>
        </Row>
        <Row id='bubble-king'>
          <Col xs={1}>
            <i className="material-icons" id="first">starrate</i>
          </Col>
          <Col xs={9}>
            Michael Buchman
          </Col>
          <Col xs={2}>
            1998
          </Col>
        </Row>
        <Row id='bubble'>
          <Col xs={1}>
            2
          </Col>
          <Col xs={9}>
            Tyler Brown
          </Col>
          <Col xs={2}>
            1609
          </Col>
        </Row>
        <Row id='bubble'>
          <Col xs={1}>
            3
          </Col>
          <Col xs={9}>
            James Earley
          </Col>
          <Col xs={2}>
            1475
          </Col>
        </Row>
        <Row id='bubble'>
          <Col xs={1}>
            4
          </Col>
          <Col xs={9}>
            Ryan Rasmussen
          </Col>
          <Col xs={2}>
            1151
          </Col>
        </Row>
        <Row id='bubble'>
          <Col xs={1}>
            5
          </Col>
          <Col xs={9}>
            Grant Dakovich
          </Col>
          <Col xs={2}>
            1109
          </Col>
        </Row>
        <Row id='bubble'>
          <Col xs={1}>
            6
          </Col>
          <Col xs={9}>
            Connor DeYoung
          </Col>
          <Col xs={2}>
            1005
          </Col>
        </Row>
        <Row id='bubble'>
          <Col xs={1}>
            7
          </Col>
          <Col xs={9}>
            Joe Perry
          </Col>
          <Col xs={2}>
            759
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p id='pLine'>Poverty Line</p><hr></hr>
          </Col>
        </Row>
        <Row id='bubble-poverty'>
          <Col xs={1}>
            8
          </Col>
          <Col xs={9}>
            Jonathan Setzke
          </Col>
          <Col xs={2}>
            403
          </Col>
        </Row>
        <Row id='bubble-poverty'>
          <Col xs={1}>
            9
          </Col>
          <Col xs={9}>
            Brenden Zarrinnam
          </Col>
          <Col xs={2}>
            144
          </Col>
        </Row>
        <Row id='bubble-poverty'>
          <Col xs={1}>
            10
          </Col>
          <Col xs={9}>
            Nick Eufrasio
          </Col>
          <Col xs={2}>
            27
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Franchise;
