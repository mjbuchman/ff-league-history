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
  import Logo from "./logos/Wallerstein.png";

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1 className="header"><img id="mini" src={Logo} alt="WFFL Logo"></img>Wallerstein Fantasy Football League Database</h1>
                <ul className="navbar">
                    <li><NavLink to="/" replace><i className="material-icons">dashboard</i>Overview</NavLink></li>
                    <li><NavLink to="/h2h" replace><i className="material-icons">face</i>Head to Head</NavLink></li>
                    <li><NavLink to="/standings" replace><i className="material-icons">assessment</i>Standings</NavLink></li>
                    <li><NavLink to="/records" replace><i className="material-icons">bookmark_border</i>Records</NavLink></li>
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