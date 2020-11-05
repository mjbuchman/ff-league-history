import React, { Component } from "react";
 
class HeadToHead extends Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <select id="owners">
                        <option value="Michael Buchman">Michael Buchman</option>
                        <option value="Joe Perry">Joe Perry</option>
                        <option value="James Earley">James Earley</option>
                    </select>
                    <select id="owners">
                        <option value="Michael Buchman">Michael Buchman</option>
                        <option value="Joe Perry">Joe Perry</option>
                        <option value="James Earley">James Earley</option>
                    </select>
                </div>
                <div className="col-sm-4">
                    <h4>Gamelogs</h4>
                    <div id="box">
                        <p>SAMPLE</p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
 
export default HeadToHead;