import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/trophyroom.css";

class TrophyRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid>
        <Row id="row">
          <Col id="vBar" md={2}></Col>
          <Col id="trophy-animation" md={8}>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "119.64%",
                  paddingTop: 0,
                  height: 0,
                }}
              >
                <iframe
                  title="wallersteinTrophy"
                  frameborder="0"
                  width="1003"
                  height="1200"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  src="https://view.genial.ly/62bb69bd2273510010f72f1e"
                  type="text/html"
                  allowscriptaccess="always"
                  allowfullscreen="true"
                  scrolling="yes"
                  allownetworking="all"
                ></iframe>{" "}
              </div>{" "}
            </div>
          </Col>
          <Col id="vBar" md={2}></Col>
        </Row>
      </Container>
    );
  }
}

export default TrophyRoom;
