import React, { Component } from "react";
import { Route, Routes, NavLink, HashRouter } from "react-router-dom";
import Overview from "./views/Overview";
import HeadToHead from "./views/HeadToHead";
import Standings from "./views/Standings";
import Records from "./views/Records";
import Drafts from "./views/Drafts";
import HallOfFame from "./views/HallOfFame";
import Admin from "./views/Admin";
import "./css/main.css";
import Logo from "./images/logos/Wallerstein.png";
import Pdf from "./docs/WFFL-Rules.pdf";
import HamburgerMenu from "react-hamburger-menu";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      position: "-600px",
      height: 0,
      width: 0,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  // Handles 'resize' event listener and updates state vars for height and width
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  // Handler for the hamburger menu, closes/opens menu dpending on previous button state
  handleClick() {
    if (this.state.open) this.setState({ position: "-600px" });
    else this.setState({ position: "0px" });
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <h1 className="header">
            <img id="mini" src={Logo} alt="WFFL Logo"></img>
            {window.innerWidth < 768
              ? "WFFL Database"
              : "Wallerstein Fantasy Football League Database"}
          </h1>
          {this.state.width < 768 ? (
            <HamburgerMenu
              isOpen={this.state.open}
              menuClicked={this.handleClick.bind(this)}
              width={30}
              height={20}
              strokeWidth={3}
              rotate={0}
              color="white"
              borderRadius={2}
              animationDuration={0.5}
              position="fixed"
              className={"hamburger"}
            />
          ) : (
            <ul className="navbar">
              <li>
                <NavLink to="/" replace>
                  <i className="material-icons">dashboard</i>Overview
                </NavLink>
              </li>
              <li>
                <NavLink to="/h2h" replace>
                  <i className="material-icons">face</i>Head to Head
                </NavLink>
              </li>
              <li>
                <NavLink to="/standings" replace>
                  <i className="material-icons">assessment</i>Standings
                </NavLink>
              </li>
              <li>
                <NavLink to="/records" replace>
                  <i className="material-icons">bookmark_border</i>Records
                </NavLink>
              </li>
              <li>
                <NavLink to="/drafts" replace>
                  <i className="material-icons">web</i>Drafts
                </NavLink>
              </li>
              <li>
                <NavLink to="/halloffame" replace>
                  <i className="material-icons">emoji_events</i>Hall Of Fame
                </NavLink>
              </li>
              <li>
                <a href={Pdf} target="_blank" without rel="noopener noreferrer">
                  <i className="material-icons">menu_book</i>Rulebook
                </a>
              </li>
            </ul>
          )}
          <ul className="hamburger-navbar" style={{ top: this.state.position }}>
            <li>
              <NavLink to="/" replace onClick={this.handleClick}>
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink to="/h2h" replace onClick={this.handleClick}>
                Head to Head
              </NavLink>
            </li>
            <li>
              <NavLink to="/standings" replace onClick={this.handleClick}>
                Standings
              </NavLink>
            </li>
            <li>
              <NavLink to="/records" replace onClick={this.handleClick}>
                Records
              </NavLink>
            </li>
            <li>
              <NavLink to="/drafts" replace onClick={this.handleClick}>
                Drafts
              </NavLink>
            </li>
            <li>
              <NavLink to="/halloffame" replace onClick={this.handleClick}>
                Hall Of Fame
              </NavLink>
            </li>
            <li>
              <a href={Pdf} target="_blank" without rel="noopener noreferrer">
                Rulebook
              </a>
            </li>
          </ul>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Overview />} />
              <Route path="/h2h" element={<HeadToHead />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/records" element={<Records />} />
              <Route path="/drafts" element={<Drafts />} />
              <Route path="/halloffame" element={<HallOfFame />} />
              <Route path="/tools/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
