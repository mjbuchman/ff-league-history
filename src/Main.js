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
  import "./css/main.css";

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1 className="header">Wallerstein Fantasy Football Database</h1>
                <ul className="navbar">
                    <li><NavLink to="/"><i class="material-icons">dashboard</i>Overview</NavLink></li>
                    <li><NavLink to="/h2h"><i class="material-icons">face</i>Head to Head</NavLink></li>
                    <li><NavLink to="/standings"><i class="material-icons">assessment</i>Standings</NavLink></li>
                    <li><NavLink to="/records"><i class="material-icons">bookmark_border</i>Records</NavLink></li>
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