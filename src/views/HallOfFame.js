import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/halloffame.css";

class HallOfFame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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
          <header>Hall Of Fame</header>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default HallOfFame;
