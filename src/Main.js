import React, { Component } from "react";
 
class Main extends Component {
  render() {
    return (
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><a href="/">Overview</a></li>
            <li><a href="/h2h">Head to Head</a></li>
            <li><a href="/standings">Standings</a></li>
            <li><a href="/records">Records</a></li>
          </ul>
          <div className="content">
             
          </div>
        </div>
    );
  }
}
 
export default Main;