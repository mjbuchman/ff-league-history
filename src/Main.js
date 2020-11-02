import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import Overview from "./Overview";
  import HeadToHead from "./HeadToHead";
  import Standings from "./Standings";
  import Records from "./Records";
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1>Simple SPA</h1>
                <ul className="header">
                    <li><NavLink to="/">Overview</NavLink></li>
                    <li><NavLink to="/h2h">Head to Head</NavLink></li>
                    <li><NavLink to="/standings">Standings</NavLink></li>
                    <li><NavLink to="/records">Records</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Overview}/>
                    <Route path="/h2h" component={HeadToHead}/>
                    <Route path="/standings" component={Standings}/>
                    <Route path="/records" component={Records}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;