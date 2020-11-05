import React, { Component } from "react";
import "./css/overview.css"
import ReactSpeedometer from "react-d3-speedometer"
import {Line} from 'react-chartjs-2';
 
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
  render() {
    return (
        <div className=".container">
            <div className="row">
                <div className="col-sm-5">
                    <select id="owners">
                        <option value="Michael Buchman">Michael Buchman</option>
                        <option value="Joe Perry">Joe Perry</option>
                        <option value="James Earley">James Earley</option>
                    </select>
                    <div className="team-overview" id="gray-box">
                        <div className="item1">
                            <h3>Owner</h3>
                            <h2>Insert Value</h2>
                        </div>
                            <div className="item2">
                            <h3>Seasons Played</h3>
                            <h2>Insert Value</h2>
                        </div>
                            <div className="item3">
                            <h3>Games Played</h3>
                            <h2>Insert Value</h2>
                        </div>
                            <div className="item4">
                            <h3>Record</h3>
                            <h2>Insert Value</h2>
                        </div>
                            <div className="item5">
                            <h3>Total Points For</h3>
                            <h2>Insert Value</h2>
                        </div>
                            <div className="item6">
                            <h3>Total Points Against</h3>
                            <h2>Insert Value</h2>
                        </div>
                        <div className="item7">
                            <h3>Average Points For</h3>
                            <h2>Insert Value</h2>
                            <p>Subtitle</p>
                        </div>
                        <div className="item8">
                            <h3>Average Points Against</h3>
                            <h2>Insert Value</h2>
                            <p>Subtitle</p>
                        </div>
                        <div className="item9">
                            <h3>Highest Score</h3>
                            <h2>Insert Value</h2>
                            <p>Subtitle</p>
                        </div>
                        <div className="item10">
                            <h3>Lowest Score</h3>
                            <h2>Insert Value</h2>
                            <p>Subtitle</p>
                        </div>
                        <div className="item11">
                            <h3>Biggest Win Margin</h3>
                            <h2>Insert Value</h2>
                            <p>Subtitle</p>
                        </div>
                        <div className="item12">
                            <h3>Smallest Win Margin</h3>
                            <h2>Insert Value</h2>
                            <p>Subtitle</p>
                        </div>
                        <div className="item13">
                            <h3>Biggest Loss Margin</h3>
                            <h2>Insert Value</h2>
                            <p>Subtitle</p>
                        </div>
                        <div className="item14">
                            <h3>Smallest Loss Margin</h3>
                            <h2>Insert Value</h2>
                            <p>Subtitle</p>
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