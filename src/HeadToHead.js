import React, { Component } from "react";
import "./css/headtohead.css"
 
class HeadToHead extends Component {
  render() {
    return (
        <div className=".container">
            <div className="row">
                <div className="col-sm-7">
                    <div className="row">
                        <div className="col-sm-6">
                            <select id="owners">
                                <option value="Michael Buchman">Michael Buchman</option>
                                <option value="Joe Perry">Joe Perry</option>
                                <option value="James Earley">James Earley</option>
                            </select>
                            <div className="win-box">
                                <h7>VAL</h7>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <select id="owners">
                                <option value="Michael Buchman">Michael Buchman</option>
                                <option value="Joe Perry">Joe Perry</option>
                                <option value="James Earley">James Earley</option>
                            </select>
                            <div className="win-box">
                                <h7>VAL</h7>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="h2h-field">
                                <div className="h2h-item1">
                                    <h3>Total Points</h3>
                                </div>
                                <div className="h2h-item2">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                                <div className="h2h-item3">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                            </div>
                            <div className="h2h-field">
                                <div className="h2h-item1">
                                    <h3>Average Points</h3>
                                </div>
                                <div className="h2h-item2">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                                <div className="h2h-item3">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                            </div>
                            <div className="h2h-field">
                                <div className="h2h-item1">
                                    <h3>Highest Score</h3>
                                </div>
                                <div className="h2h-item2">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                                <div className="h2h-item3">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                            </div>
                            <div className="h2h-field">
                                <div className="h2h-item1">
                                    <h3>Lowest Score</h3>
                                </div>
                                <div className="h2h-item2">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                                <div className="h2h-item3">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                            </div>
                            <div className="h2h-field">
                                <div className="h2h-item1">
                                    <h3>Biggest Win Margin</h3>
                                </div>
                                <div className="h2h-item2">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                                <div className="h2h-item3">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                            </div>
                            <div className="h2h-field">
                                <div className="h2h-item1">
                                    <h3>Smallest Win Margin</h3>
                                </div>
                                <div className="h2h-item2">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                                <div className="h2h-item3">
                                    <h2 id="drop-shadow">Insert Value</h2>
                                    <hr></hr>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5">
                    <h4>Gamelogs</h4>
                    <div id="box">
                        <p id="black">SAMPLE</p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
 
export default HeadToHead;