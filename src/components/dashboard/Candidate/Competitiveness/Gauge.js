import React, {Component, useLayoutEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {ResponsiveContainer} from 'recharts';
import Widget from "components/Widget";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';
import ProgressBar from 'react-customizable-progressbar'




class Gauge extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      percentage: 0,
    }
  }
  
  updateDimensions = () => {
    var getWidth = document.getElementById('gauge_container').offsetWidth / 4;
    console.log("working --- ", getWidth)
    this.setState({ width: getWidth });
  };
  
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    setTimeout(() => {
      this.setState({ percentage: this.props.profileScore });
    }, 100);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  
  render() {
    const radius = this.state.width;
    const percent = this.state.percentage;
    
    const strokeWidth = radius * 0.2;
    const innerRadius = radius - strokeWidth / 2;
    
    const circumference = innerRadius * 2 * Math.PI;
    const arc = circumference * (360 / 360);
    const dashArray = `${arc} ${circumference}`;
    const transform = `rotate(270, ${radius}, ${radius})`;
    
    const percentNormalized = Math.min(Math.max(percent, 0), 100);
    const offset = arc - (percentNormalized / 100) * arc;
    
    return (
      <div>
        <div className="d-flex">
            <h3 className="card-title mr-auto mb-1 mb-md-3">Profile Completeness</h3>
          </div>
          <ResponsiveContainer id="gauge_container" width="100%" height="auto" className="text-center ml-auto mr-auto my-3">
            {/*<CircularProgressbar value={percent} text={`${percent}%`} 
              styles={buildStyles({
                rotation: 0,
                strokeLinecap: 'round',
                textSize: '13px',
                pathTransition: 'stroke-dashoffset 1.5s ease 0s',
                //pathTransitionDuration: 3.5,
                // pathTransition: 'none',
                pathColor: `#00bcd4`,
                textColor: 'rgb(97 97 97)',
                trailColor: '#00000014',
                backgroundColor: '#000000',
              })}
            />*/}
            <Box className="w-auto" position="relative" display="inline-flex">
            {/*<ProgressBar
                progress={percent}
                radius={100}
                strokeColor="#00bcd4"
                transition="stroke-dashoffset 1.5s"
            />*/}
            <svg width={radius * 2} height={radius * 2}>
              <circle 
                class="gauge_base"
                cx={radius}
                cy={radius}
                fill="transparent"
                r={innerRadius}
                stroke="#00000014"
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                transform={transform}
                strokeLinecap="round"
              />‍
              <circle 
                class="gauge_bar"
                cx={radius}
                cy={radius}
                fill="transparent"
                r={innerRadius}
                stroke="#00bcd4"
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                strokeDashoffset={offset}
                transform={transform}
                strokeLinecap="round"
                style={{
                  transition: "stroke-dashoffset 1.5s",
                }}
              />‍
            </svg>
            <Box
                width={radius * 2}
                height={radius * 2}
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CountUp className="h1" end={percent} delay={0.3} duration={2.5} suffix="%"/>
              </Box>
              {/*<Box
                top={radius * 0.04}
                left={radius * 0.02}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
              >
                <h5 variant="caption" component="div" color="textSecondary">Competitiveness</h5>
              </Box>*/}
            </Box>
          </ResponsiveContainer>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {profileScore } = state.auth;
  return { profileScore }
};

export default withRouter(connect(mapStateToProps)(Gauge));