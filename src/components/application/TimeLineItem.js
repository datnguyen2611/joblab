import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandDetailBox from '../common/ExpandDetailBox';
import { numberWithCommas } from 'actions/Function.js';
import {
  CANDIDATE_INTERESTED,
  ADMIN_ACCEPTED,
  CANDIDATE_APPLIED,
  ADMIN_RECOMMENDED,
  ADMIN_REJECTED,
  CANDIDATE_WITHDRAWN_1,
  APPLICATION_CONFIRMED,
  CLIENT_VIDEO_REQUESTED,
  CANDIDATE_VIDEO_SUBMITTED,
  CANDIDATE_VIDEO_EXPIRED,
  CANDIDATE_INTERVIEW_SUBMITTED,
  CLIENT_INTERVIEW_REQUEST,
  INTERVIEW_RESCHEDULE_REQUESTED,
  INTERVIEWING,
  SELECTED,
  CLIENT_REJECTED,
  CANDIDATE_WITHDRAWN_2,
  HIRED
} from 'constants/ApplicationState';

class TimeLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openInterviewActionMenu: false,
      anchorEl: null,
    };
  }
  
  getStatus(state, color) {
    const userType = this.props.userType;
    
    switch (userType) {
      case 'candidate':
        return <h4 className={`timeline-tile text-${color}`}>{state && state.candidateStatus}</h4>
      case 'client':
        return <h4 className={`timeline-tile text-${color}`}>{state && state.clientStatus}</h4>
      case 'admin':
        return <h4 className={`timeline-tile text-${color}`}>{state && state.adminStatus}</h4>
      default:
        return <div></div>
    }  
  }
  
  getDescription(state, interview, interviewVideo, offer) {
    const userType = this.props.userType;
    
    switch (state._id) {
      case CANDIDATE_INTERESTED:
        return <div>
          <p>{userType=='candidate' ? "You" : "Candidate"} made a request to apply this job...</p>
          { this.props.isPresent && userType=='admin' && 
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.props.adminAllow}>Accept</Button> 
          }
          { this.props.isPresent && userType=='admin' && 
            <Button className="mt-2 mr-2" onClick={this.props.adminBlock}>Block</Button> 
          }
        </div>
      case ADMIN_ACCEPTED:
        return <div>
          <p>{userType=='candidate' ? "You have been considered as eligible candidate and the company is revealed. Do you want to proceed with the application?" : "Candidate has been considered as eligible candidate to this job."}</p>
          { this.props.isPresent && (userType=='candidate' || userType=='admin') && 
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.props.confirmApply}>Confirm Apply</Button> 
          }
        </div>;
      case ADMIN_REJECTED:
        return <div>
          <p>{userType=='candidate' ? "You have been considered as ineligible candidate." : "Candidate is regarded as Ineligible to the job."}</p>
          { this.props.isPresent && userType=='admin' && 
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.props.adminAllow}>Re-Accept</Button> 
          }
        </div>;
      case CANDIDATE_APPLIED:
        return <div>
          <p>The application is in progress.</p>
          { this.props.isPresent && userType=='admin' && 
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.props.adminAllow}>Accept</Button> 
          }
          { this.props.isPresent && userType=='admin' && 
            <Button className="mt-2 mr-2" onClick={this.props.adminBlock}>Block</Button> 
          }
        </div>
      case ADMIN_RECOMMENDED:
        return <div>
          <p>{userType=='candidate' ? "Our Career Expert" : "You"} recommended this job for {userType=='candidate' ? "you." : "the candidate."}</p>
          { this.props.isPresent && (userType=='candidate' || userType=='admin') && 
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.props.confirmApply}>Confirm Apply</Button> 
          }
        </div>;
      case CANDIDATE_WITHDRAWN_1:
        return <div>
          <p>{userType=='candidate' ? "You have" : "Candidate has"} withdrawn this application.</p>
        </div>;
      case APPLICATION_CONFIRMED:
        return <div>
          <p>{userType=='candidate' ? "You have" : "Candidate has"} applied this job successfully!</p>
          { this.props.isPresent && (userType=='client' || userType=='admin') && 
            <div>
              <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={(e) => this.setState({ openInterviewActionMenu: true, anchorEl: e.currentTarget })}>Action</Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.openInterviewActionMenu}
                onClose={() => this.setState({ openInterviewActionMenu: false })}
              >
                <MenuItem onClick={this.props.requestInterviewVideo}>Video Request</MenuItem>
                <MenuItem onClick={this.props.requestInterview}>Interview Request</MenuItem>
                { userType=='admin' && <MenuItem onClick={this.props.scheduleInterview}>Interview Schedule</MenuItem> }
              </Menu>
              {/*<Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.props.requestInterviewVideo}>Video Request</Button> 
              <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.props.requestInterview}>Interview Request</Button>*/} 
            </div>
          }
          {/* this.props.isPresent && userType=='admin' && 
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.props.scheduleInterview}>Interview Schedule</Button> 
          */}
        </div>;
      case CLIENT_VIDEO_REQUESTED:
        return <div>
          <p>{userType=='client' ? "You" : "Client"} requested interview video with detail below:</p>
          <p><b>Deadline:</b> {moment(interviewVideo && interviewVideo.deadline ? interviewVideo.deadline : "").tz(interviewVideo.timeZone).format("YYYY/MM/DD h:mm a z")}</p>
          <p><b>Time Limit:</b> {interviewVideo && interviewVideo.timeLimit != null ? interviewVideo.timeLimit + " minutes" : "N/A"} </p>
          
          { this.props.isPresent &&  
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={(e) => window.open("/application/interview/video/"+interviewVideo._id, "_blank")}>Detail</Button> 
          }
        </div>;
      case CANDIDATE_VIDEO_SUBMITTED:
        return <div>
          <p>{userType=='candidate' ? "You have" : "Candidate has"} submitted interview video.</p>
          { this.props.isPresent &&  
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={(e) => window.open("/application/interview/video/"+interviewVideo._id, "_blank")}>Detail</Button> 
          }
          { this.props.isPresent && (userType=='client' || userType=='admin') && 
            <div>
              <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={(e) => this.setState({ openInterviewActionMenu: true, anchorEl: e.currentTarget })}>Action</Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.openInterviewActionMenu}
                onClose={() => this.setState({ openInterviewActionMenu: false })}
              >
                <MenuItem onClick={this.props.requestInterviewVideo}>Video Request</MenuItem>
                <MenuItem onClick={this.props.requestInterview}>Interview Request</MenuItem>
                { userType=='admin' && <MenuItem onClick={this.props.scheduleInterview}>Interview Schedule</MenuItem> }
              </Menu>
            </div>
          }
        </div>;
      case CANDIDATE_VIDEO_EXPIRED:
        return <div>
          <p>{userType=='candidate' ? "You cannot submit interview video now because it has expired." : "Interview video request has expired."}</p>
          { this.props.isPresent && (userType=='client' || userType=='admin') && 
            <div>
              <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={(e) => this.setState({ openInterviewActionMenu: true, anchorEl: e.currentTarget })}>Action</Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.openInterviewActionMenu}
                onClose={() => this.setState({ openInterviewActionMenu: false })}
              >
                <MenuItem onClick={this.props.requestInterviewVideo}>Video Request</MenuItem>
                <MenuItem onClick={this.props.requestInterview}>Interview Request</MenuItem>
                 { userType=='admin' && <MenuItem onClick={this.props.scheduleInterview}>Interview Schedule</MenuItem> }
              </Menu>
            </div>
          }
        </div>;
      case CLIENT_INTERVIEW_REQUEST:
        return <div>
          <p>{userType=='client' ? "You" : "Client"} requested interview with detail below:</p>
          <p><b>Date:</b> {moment(interview && interview.dateTime ? interview.dateTime : "").tz(interview.timeZone).format("YYYY/MM/DD")}</p>
          <p><b>Time:</b> {moment(interview && interview.dateTime ? interview.dateTime : "").tz(interview.timeZone).format("h:mm a z")}</p>
          <p><b>Duration:</b> {interview.duration.hours + " hours " + interview.duration.minutes + " minutes"}</p>
          <p><b>Venue:</b> {interview && interview.venue ? interview.venue : ""}</p>
          <p style={{"min-height": "20px"}}>
            <ExpandDetailBox hideDescription={"Hide Extra Detail"} showDescription={"Show Extra Detail"} description={interview.detail} />
          </p>
          { this.props.isPresent && userType=='candidate' && 
            <div>
              <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={() => this.props.acceptInterview(interview._id)}>Accept</Button> 
              <Button className="mt-2 mr-2" onClick={() => this.props.rescheduleInterview(interview._id)}>Reschedule Request</Button> 
            </div>
          }
          { this.props.isPresent && (userType=='client' || userType=='admin') && 
            <div>
              <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={(e) => this.setState({ openInterviewActionMenu: true, anchorEl: e.currentTarget })}>Action</Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.openInterviewActionMenu}
                onClose={() => this.setState({ openInterviewActionMenu: false })}
              >
                <MenuItem onClick={this.props.requestInterview}>Interview Request</MenuItem>
                 { userType=='admin' && <MenuItem onClick={this.props.scheduleInterview}>Interview Schedule</MenuItem> }
              </Menu>
            </div>
          }
        </div>;
      case INTERVIEW_RESCHEDULE_REQUESTED:
        return <div>
          <p>{userType=='candidate' ? "You" : "Candidate"} requested for interview rescheduling. {userType=='candidate' && "Our Career Expert will contact you shortly."}</p>
          { this.props.isPresent && userType=='admin' && 
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.props.scheduleInterview}>Interview Schedule</Button> 
          }
        </div>
      case INTERVIEWING:
        return <div>
          <p>Interview is scheduled with detail below:</p>
          <p><b>Date:</b> {moment(interview && interview.dateTime ? interview.dateTime : "").tz(interview.timeZone).format("YYYY/MM/DD ")}</p>
          <p><b>Time:</b> {moment(interview && interview.dateTime ? interview.dateTime : "").tz(interview.timeZone).format("h:mm a z")}</p>
          <p><b>Duration:</b> {interview.duration.hours + " hours " + interview.duration.minutes + " minutes"}</p>
          <p><b>Venue:</b> {interview && interview.venue ? interview.venue : ""}</p>
          <p style={{"min-height": "20px"}}>
            <ExpandDetailBox hideDescription={"Hide Extra Detail"} showDescription={"Show Extra Detail"} description={interview.detail} />
          </p>
          { this.props.isPresent && (userType=='client' || userType=='admin') && 
            <div>
              <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={(e) => this.setState({ openInterviewActionMenu: true, anchorEl: e.currentTarget })}>Action</Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.openInterviewActionMenu}
                onClose={() => this.setState({ openInterviewActionMenu: false })}
              >
                <MenuItem onClick={this.props.requestInterviewVideo}>Video Request</MenuItem>
                <MenuItem onClick={this.props.requestInterview}>Interview Request</MenuItem>
                 { userType=='admin' && <MenuItem onClick={this.props.scheduleInterview}>Interview Schedule</MenuItem> }
              </Menu>
            </div>
          }
        </div>;
      case CANDIDATE_WITHDRAWN_2:
        return <div>
          <p>{userType=='candidate' ? "You have" : "Candidate has"} withdrawn this application.</p>
        </div>;
      case CLIENT_REJECTED:
        return <div>
          <p>{userType=='client' ? "You have" : "Company has"} rejected this application.</p>
        </div>;
      case HIRED:
        return <div>
          <p>Offer is confirmed with detail below:</p>
          <p><b>Monthly Salary (HK):</b> {offer && offer.salary ? "$"+numberWithCommas(offer.salary) : ""}</p>
          <p><b>Annual Bonus (HK):</b> {offer && offer.bonus ? "$"+numberWithCommas(offer.bonus) : ""}</p>
          <p><b>Notice Period (in Month):</b> {offer && offer.noticePeriod ? offer.noticePeriod : ""}</p>
          <p><b>Probation Period (in Month):</b> {offer && offer.probation ? offer.probation : ""}</p>
          <p style={{"min-height": "20px"}}>
            <ExpandDetailBox hideDescription={"Hide Extra Detail"} showDescription={"Show Extra Detail"} description={offer.detail} />
          </p>
        </div>;
      default:
        return <p>N/A</p>;
    }
  }
  
  
  
  render() {
    const {styleName, color, timeLine, children } = this.props;
    const {state, interview, interviewVideo, offer, timestamp} = timeLine;
    return (
      <div className={`timeline-item timeline-time-item ${styleName}`}>
        <div className="timeline-time">{moment(timestamp).format("MMM D, YYYY")}</div>
        <div className={`timeline-badge bg-${color}`}>{children}</div>
        <div className="timeline-panel">
          { this.getStatus(state, color) }
          { this.getDescription(state, interview, interviewVideo, offer) }
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { userType } = state.auth;
  return { userType };
}

export default connect(mapStateToProps, null)(TimeLineItem);