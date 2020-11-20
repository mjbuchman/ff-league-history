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
  import HamburgerMenu from "react-hamburger-menu";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            position: "-300px"
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.state.open) this.setState({position: "-300px"})
        else this.setState({position: "0px"})
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1 className="header"><img id="mini" src={Logo} alt="WFFL Logo"></img>{window.innerWidth < 768 ? "WFFL Database" : "Wallerstein Fantasy Football League Database"}</h1>
                    {window.innerWidth < 768 ?
                        <HamburgerMenu
                            isOpen={this.state.open}
                            menuClicked={this.handleClick.bind(this)}
                            width={30}
                            height={20}
                            strokeWidth={3}
                            rotate={0}
                            color='white'
                            borderRadius={2}
                            animationDuration={0.5}
                            position='fixed'
                            className={"hamburger"}
                        />
                        : 
                        <ul className="navbar">
                            <li><NavLink to="/" replace><i className="material-icons">dashboard</i>Overview</NavLink></li>
                            <li><NavLink to="/h2h" replace><i className="material-icons">face</i>Head to Head</NavLink></li>
                            <li><NavLink to="/standings" replace><i className="material-icons">assessment</i>Standings</NavLink></li>
                            <li><NavLink to="/records" replace><i className="material-icons">bookmark_border</i>Records</NavLink></li>
                        </ul>
                    }
                    <ul className="hamburger-navbar" style={{top: this.state.position}}>
                        <li><NavLink to="/" replace onClick={this.handleClick}>Overview</NavLink></li>
                        <li><NavLink to="/h2h" replace onClick={this.handleClick}>Head to Head</NavLink></li>
                        <li><NavLink to="/standings" replace onClick={this.handleClick}>Standings</NavLink></li>
                        <li><NavLink to="/records" replace onClick={this.handleClick}>Records</NavLink></li>
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