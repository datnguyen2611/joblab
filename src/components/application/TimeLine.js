import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Tablet, PhonelinkRing, AssignmentLate, AssignmentTurnedIn, AssignmentInd, AssignmentReturn, AssignmentReturned, Schedule, Update, Today, VideoCall, Videocam, ThumbUp, HowToReg} from '@material-ui/icons';
import * as notification from 'actions/Notification';

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
  CLIENT_INTERVIEW_REQUEST,
  INTERVIEW_RESCHEDULE_REQUESTED,
  INTERVIEWING,
  SELECTED,
  CLIENT_REJECTED,
  CANDIDATE_WITHDRAWN_2,
  HIRED
} from 'constants/ApplicationState';

import TimeLineItem from 'components/application/TimeLineItem';
import InterviewScheduleForm from 'components/popup/InterviewScheduleForm';
import InterviewVideoRequestForm from 'components/popup/InterviewVideoRequestForm';


class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interviewVideoModalIsOpen: false,
      interviewModalIsOpen: false,
      isInterviewConfirmed: false, //false: Interview Request, true: Interview Schedule
    };
  }
  
  /*applyJob = () => {
    const jobId = this.props.jobId;
    const data = { jobId };
    axios.post('/api/candidates/set/application/apply', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have applied the job successfully.");
        this.props.updateApp();
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }*/
  
  confirmApply = () => {
    const appId = this.props.appId;
    const data = { appId };
    axios.post('/api/candidates/set/application/confirm', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have confirmed the application successfully.");
        this.props.updateApp();
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  acceptInterview = (interviewId) => {
    const appId = this.props.appId;
    const data = { appId, interviewId };
    axios.post('/api/candidates/set/interview/accept', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have accepted the interview.");
        this.props.updateApp();
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  rescheduleInterview = (interviewId) => {
    const appId = this.props.appId;
    const data = { appId, interviewId };
    axios.post('/api/candidates/set/interview/reschedule', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have requested interview reschedule. Our career expert will contact you shortly.");
        this.props.updateApp();
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  openModal = (modalType) => {
    switch (modalType) {
      case 'interviewVideo':
        this.setState({ 
          interviewVideoModalIsOpen: true,
        });
        break;
      case 'interviewRequest':
        this.setState({ 
          interviewModalIsOpen: true,
          isInterviewConfirmed: false
        });
        break;
      case 'interviewSchedule':
        this.setState({ 
          interviewModalIsOpen: true,
          isInterviewConfirmed: true
        });
        break;
    }
    
  }
  
  closeModal = (name) => {
    this.setState({ [name]: false});
  }
  
  completeSchedule = () => {
    this.setState({ 
      interviewVideoModalIsOpen: false,
      interviewModalIsOpen: false 
    });
    this.props.updateApp();
  }
  
  adminAllow = () => {
    console.log("Start to accept candidate to the application...")
    const appId = this.props.appId;
    const data = { appId };
    axios.post('/api/admins/set/application/allow', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have allowed this application");
        this.props.updateApp();
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  adminBlock = () => {
    const appId = this.props.appId;
    const data = { appId };
    axios.post('/api/admins/set/application/block', data)
    .then(res => {
      if (res.data.isSuccess) {
        this.props.updateApp();
      }
      else {
        alert(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  
  getTimeLineItem(event, index, isPresent) {
    const userType = this.props.userType;
    
    switch (event.state._id) {
      case CANDIDATE_INTERESTED:
        return userType!='client' && 
        <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="purple" 
          timeLine={event} 
          isPresent={isPresent} 
          adminAllow={this.adminAllow} 
          adminBlock={this.adminBlock}
        >
          <AssignmentLate/>
        </TimeLineItem>;
      case ADMIN_ACCEPTED:
        return userType!='client' && 
        <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="blue" 
          timeLine={event} 
          isPresent={isPresent} 
          confirmApply={this.confirmApply}
        >
          <AssignmentTurnedIn/>
        </TimeLineItem>;
      case ADMIN_REJECTED:
        return /*userType!='candidate' &&*/ userType!='client' && 
        <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="red" 
          timeLine={event} 
          isPresent={isPresent} 
          adminAllow={this.adminAllow}
        >
          <AssignmentReturned/>
        </TimeLineItem>;
      case CANDIDATE_APPLIED:
        return userType!='client' && 
        <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="purple" 
          timeLine={event} 
          isPresent={isPresent} 
          adminAllow={this.adminAllow} 
          adminBlock={this.adminBlock}
        >
          <AssignmentLate/>
        </TimeLineItem>;
      case ADMIN_RECOMMENDED:
        return userType!='client' && 
        <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="pink" 
          timeLine={event} 
          isPresent={isPresent} 
          confirmApply={this.confirmApply}
        >
          <PhonelinkRing/>
        </TimeLineItem>;
      case CANDIDATE_WITHDRAWN_1:
        return userType!='client' && 
        <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="grey" 
          timeLine={event}
        >
          <AssignmentReturn/>
        </TimeLineItem>;
      case APPLICATION_CONFIRMED:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="amber" 
          timeLine={event} 
          isPresent={isPresent} 
          requestInterviewVideo={() => this.openModal('interviewVideo')}
          requestInterview={() => this.openModal('interviewRequest')} 
          scheduleInterview={() => this.openModal('interviewSchedule')} 
        >
          <AssignmentInd/>
        </TimeLineItem>;
      case CLIENT_VIDEO_REQUESTED:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="cyan" 
          timeLine={event} 
          isPresent={isPresent} 
        >
          <Videocam/>
        </TimeLineItem>;
      case CANDIDATE_VIDEO_SUBMITTED:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="green" 
          timeLine={event} 
          isPresent={isPresent} 
          requestInterviewVideo={() => this.openModal('interviewVideo')}
          requestInterview={() => this.openModal('interviewRequest')} 
          scheduleInterview={() => this.openModal('interviewSchedule')} 
        >
          <VideoCall/>
        </TimeLineItem>;
      case CANDIDATE_VIDEO_EXPIRED:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="red" 
          timeLine={event} 
          isPresent={isPresent} 
          requestInterviewVideo={() => this.openModal('interviewVideo')}
          requestInterview={() => this.openModal('interviewRequest')} 
          scheduleInterview={() => this.openModal('interviewSchedule')} 
        >
          <Videocam/>
        </TimeLineItem>;
      case CLIENT_INTERVIEW_REQUEST:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="cyan" 
          timeLine={event} 
          isPresent={isPresent} 
          acceptInterview={this.acceptInterview} 
          rescheduleInterview={this.rescheduleInterview} 
          requestInterview={() => this.openModal('interviewRequest')} 
          scheduleInterview={() => this.openModal('interviewSchedule')}
        >
          <Schedule/>
        </TimeLineItem>;
      case INTERVIEW_RESCHEDULE_REQUESTED:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="cyan" 
          timeLine={event} 
          isPresent={isPresent} 
          scheduleInterview={() => this.openModal('interviewSchedule')}
        >
          <Update/>
        </TimeLineItem>;
      case INTERVIEWING:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="green" 
          timeLine={event} 
          isPresent={isPresent} 
          requestInterviewVideo={() => this.openModal('interviewVideo')}
          requestInterview={() => this.openModal('interviewRequest')} 
          scheduleInterview={() => this.openModal('interviewSchedule')}
        >
          <Today/>
        </TimeLineItem>;
      case SELECTED:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="orange" 
          timeLine={event} 
          isPresent={isPresent} 
          acceptOffer={this.acceptOffer} 
          requestNegotiation={this.requestNegotiation}
        >
          <ThumbUp/>
        </TimeLineItem>;
      case CLIENT_REJECTED:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="red" 
          timeLine={event}
        >
          <AssignmentReturned/>
        </TimeLineItem>;
      case CANDIDATE_WITHDRAWN_2:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="grey" 
          timeLine={event}
        >
          <AssignmentReturn/>
        </TimeLineItem>;
      case HIRED:
        return <TimeLineItem 
          styleName={ index%2==0 ? "timeline-inverted" : "" } 
          color="orange" 
          timeLine={event}
        >
          <HowToReg/>
        </TimeLineItem>;
      default:
        return <div></div>;
    }
  }
  
  render() {
    const { appId, history } = this.props;
    const { interviewModalIsOpen, isInterviewConfirmed, interviewVideoModalIsOpen } = this.state;
    return (
      <div className="timeline-section timeline-center clearfix animated slideInUpTiny animation-duration-3">
        { history.map((event, index) => {
          return this.getTimeLineItem(event, index, index==history.length-1);
        })}
        <InterviewScheduleForm appId={appId} isOpen={interviewModalIsOpen} isConfirmed={isInterviewConfirmed} completeSchedule={this.completeSchedule} closeModal={this.closeModal} />
        <InterviewVideoRequestForm appId={appId} isOpen={interviewVideoModalIsOpen} completeSchedule={this.completeSchedule} closeModal={this.closeModal} />
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { userType } = state.auth;
  return { userType };
}

export default connect(mapStateToProps, null)(TimeLine);