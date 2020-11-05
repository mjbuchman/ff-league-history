import React, { Component } from "react";
import "./css/standings.css";
 
class Standings extends Component {
  render() {
    return (
        <div className=".container">
            <div className="row" id="first-row">
                <h0>Standings</h0>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <h4>
                        <input type="checkbox" id="regular-season" name="regular-season" value="reg"></input><label for="regular-season">Regular Season</label>
                        <input type="checkbox" id="playoffs" name="playoffs" value="pf"></input><label for="playoffs">Playoffs</label>
                        <select id="date-range">
                            <option value="All-Time">All-Time</option>
                            <option value="2020 Season">2020 Season</option>
                        </select>
                    </h4>
                    <div id="box">
                        
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
 
export default Standings;