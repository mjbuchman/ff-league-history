import React, { Component } from "react";
import "./css/overview.css"
import ReactSpeedometer from "react-d3-speedometer"
import {Line} from 'react-chartjs-2';
import LogoMB from "./logos/Michael Buchman.jpg";
import LogoGD from "./logos/Grant Dakovich.jpg";
import LogoBZ from "./logos/Brenden Zarrinnam.jpg";
import LogoJP from "./logos/Joe Perry.jpg";
import LogoJE from "./logos/James Earley.jpg";
import LogoJS from "./logos/Jon Setzke.jpg";
import LogoRR from "./logos/Ryan Rasmussen.jpg";
import LogoTB from "./logos/Tyler Brown.jpg";
import LogoNE from "./logos/Nick Eufrasio.jpg";
import LogoCD from "./logos/Connor DeYoung.jpg";


const img = {
    "Michael Buchman": LogoMB,
    "Grant Dakovich": LogoGD,
    "Brenden Zarrinnam": LogoBZ,
    "Joe Perry": LogoJP,
    "James Earley": LogoJE,
    "Jon Setzke": LogoJS,
    "Ryan Rasmussen": LogoRR,
    "Tyler Brown": LogoTB,
    "Nick Eufrasio": LogoNE,
    "Connor DeYoung": LogoCD
}

const data = {
    labels: ['2017', '2018', '2019', '2020'],
    datasets: [
        {
            label: 'Wins By Year',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [9,4,7,6],
      }
    ]
};

const options = {
    scales: {
        yAxes: [
            {   
                ticks: {
                    min: 0,
                    max: 14,
                },
            },
        ],
    },
}

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owners: [],
            currOwner: "Michael Buchman"
        };

        this.handleOwnerChange = this.handleOwnerChange.bind(this);
    }

    componentDidMount() {
        fetch("/api/db", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                query: 'select * from Owners'
            })
        })
        .then((response) => response.json())
        .then(rows => {
            this.setState({owners: rows});
            console.log(rows)
        })
    }

    handleOwnerChange = val => event => {
        console.log(event.target.value);
        this.setState({ currOwner: event.target.value });
    }

    render() {
        return (
            <div className=".container">
                <div className="row"  id="first-row">
                    <h0>Team Overview</h0>
                </div>
                <div className="row">
                    <div className="col-sm-5" style={{paddingLeft: "35px"}}>
                        <div className="row">
                            <select id="owners" onChange={this.handleOwnerChange()}>
                                {this.state.owners.map((owner) => (
                                    <option value={owner.Owner}>{owner.Owner}</option>
                                ))}
                            </select>
                        </div>
                        <div className="row" id="gray-box">
                            <div className="col-sm-12">
                                <img src={img[this.state.currOwner]}></img>
                                <h3>Owner</h3>
                                <h2 id="owner">{this.state.currOwner}</h2>
                            </div>
                            <div className="col-sm-4" id="top-padded">
                                <h3>Seasons Played</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-4" id="top-padded">
                                <h3>Games Played</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-4" id="top-padded">
                                <h3>Record</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Total Points For</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Total Points Against</h3>
                                <h2>Insert Value</h2>
                            </div>        
                            <div className="col-sm-6" id="top-padded">
                                <h3>Average Points For</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Average Points Against</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Highest Score</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Lowest Score</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Biggest Win Margin</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Smallest Win Margin</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Biggest Loss Margin</h3>
                                <h2>Insert Value</h2>
                            </div>
                            <div className="col-sm-6" id="top-padded">
                                <h3>Smallest Loss Margin</h3>
                                <h2>Insert Value</h2>
                            </div> 
                        </div>    
                    </div>
                    <div className="col-sm-7">
                        <h4>Regular Season Performance</h4>
                        <div id="box">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h5>Win Rate</h5>
                                    <ReactSpeedometer
                                        maxValue={1.000}
                                        width={190}
                                        height={140}
                                        needleHeightRatio={0.7}
                                        maxSegmentLabels={4}
                                        segments={1000}
                                        value={.333}
                                        textColor='#777'
                                        />
                                </div>
                                <div className="col-sm-3">
                                    <h5>Win</h5>
                                    <hr></hr>
                                    <h1>VAL</h1>
                                </div>
                                <div className="col-sm-3">
                                    <h5>Loss</h5>
                                    <hr></hr>
                                    <h1>VAL</h1>
                                </div>
                                <div className="col-sm-3">
                                    <h5>Tie</h5>
                                    <hr></hr>
                                    <h1>VAL</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Regular Season Champion</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                            <p id="black">Subtitle</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Last Place Finishes</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                            <p id="black">Subtitle</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Best Placement</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                            <p id="black">Subtitle</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Season High Scorer</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                            <p id="black">Subtitle</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Weekly High Scorer</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                            <p id="black">Subtitle</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Weekly Low Scorer</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                            <p id="black">Subtitle</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <h4>Playoff Performance</h4>
                        <div id="box">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h5>Win Rate</h5>
                                    <ReactSpeedometer
                                        maxValue={1.000}
                                        width={190}
                                        height={140}
                                        needleHeightRatio={0.7}
                                        maxSegmentLabels={4}
                                        segments={1000}
                                        value={.333}
                                        textColor='#777'
                                        />
                                </div>
                                <div className="col-sm-3">
                                    <h5>Win</h5>
                                    <hr></hr>
                                    <h1>VAL</h1>
                                </div>
                                <div className="col-sm-3">
                                    <h5>Loss</h5>
                                    <hr></hr>
                                    <h1>VAL</h1>
                                </div>
                                <div className="col-sm-3">
                                    <h5>Tie</h5>
                                    <hr></hr>
                                    <h1>VAL</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Playoff Appearances</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                            <p id="black">Subtitle</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Championship Appearances</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                            <p id="black">Subtitle</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="stats-box">
                                        <h6>Championships</h6>
                                        <div id="box">
                                            <h1 id="small-mar">VAL</h1>
                                            <p id="black">Subtitle</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h4>Yearly Performance</h4>
                        <div id="box">
                            <Line data={data} height={80} options={options}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Overview;