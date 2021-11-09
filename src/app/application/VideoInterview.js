import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ContainerHeader from 'components/ContainerHeader/index';


import CandidateHeader from "components/application/CandidateHeader";
import JobDescription from "components/application/JobDescription";
import ClientList from "components/application/ClientList";
import InterviewQuestion from 'components/application/InterviewQuestion';
import InterviewVideo from 'components/application/InterviewVideo';

import { VERTICAL_NAVIGATION } from 'constants/ActionTypes'
import * as notification from 'actions/Notification';

import {
  CANDIDATE_WITHDRAWN_1,
  CLIENT_REJECTED,
  CANDIDATE_WITHDRAWN_2,
  SELECTED
} from 'constants/ApplicationState';


class VideoInterview extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      loader: true
    }
  }
  
  componentDidMount() {
    this.getInVideo();
    /*if (this.props.match.params.inVideoId != null) {
      var inVideoId = this.props.match.params.inVideoId;
      this.setState({
        inVideoId: inVideoId
      })
      this.getInVideo(inVideoId);
    }*/
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    /*setTimeout(() => {
      this.setState({ loader: false });
    }, 1000);*/
  }
    
    
  getInVideo = () => {
    if (this.props.history.location.pathname.includes("/applicant")) {
      var token = this.props.match.params.token;
      axios.get('/api/clients/get/encrypted/interview/video/'+token)
      .then(res => {
        console.log(res.data)
        if (res.data.isSuccess) {
          var job = res.data.inVideo.application.job;
          job.refererReward = res.data.refererReward;
          this.setState({
            candidate: res.data.inVideo.application.candidate,
            job: job,
            refererReward: res.data.refererReward,
            videoUrl: res.data.videoUrl,
            deadline: res.data.inVideo.deadline, 
            timeLimit: res.data.inVideo.timeLimit, 
            interviewQuestion: res.data.inVideo.question, 
            isUploaded: res.data.inVideo.isUploaded,
            isProcessed: res.data.inVideo.isProcessed,
            isValid: res.data.isValid,
            resumeToken: res.data.resumeToken==null ? null : res.data.resumeToken, //Annoymous access Resume by Resume Token
            loader: false
          });
        }
        else {
          notification.error(res.data.msg);
          this.props.history.push('/');
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
    else {
      var inVideoId = this.props.match.params.inVideoId;
      this.setState({ inVideoId: inVideoId });
      axios.get('/api/'+this.props.userType+'s/get/interview/video/'+inVideoId)
      .then(res => {
        console.log(res.data)
        if (res.data.isSuccess) {
          var job = res.data.inVideo.application.job;
          job.refererReward = res.data.refererReward;
          this.setState({
            candidate: res.data.inVideo.application.candidate,
            job: job,
            refererReward: res.data.refererReward,
            state: res.data.inVideo.application.state,
            videoUrl: res.data.videoUrl,
            deadline: res.data.inVideo.deadline, 
            timeZone: res.data.inVideo.timeZone,
            timeLimit: res.data.inVideo.timeLimit, 
            interviewQuestion: res.data.inVideo.question, 
            isUploaded: res.data.inVideo.isUploaded,
            isProcessed: res.data.inVideo.isProcessed,
            isValid: res.data.isValid,
            appId: res.data.inVideo.application._id, //Client access Resume by application ID        
            loader: false
          });
        }
        else {
          notification.error(res.data.msg);
          this.props.history.push('/');
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
    
  render() {
      const { userType } = this.props;
      const { loader, candidate, job, inVideoId, videoUrl, deadline, timeZone, timeLimit, interviewQuestion, isUploaded, isProcessed, isValid } = this.state;
      //const appId = this.props.match.params.appId;
      const { appId } = this.state;
      const { resumeToken } = this.state;
    
      return (
          <div className="app-wrapper">
              { loader ?
                  <div className="loader-view"
                       style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
                    <CircularProgress/>
                    <Helmet>
                        <title>JobsLab</title>
                    </Helmet>
                  </div> : 
                  
                  <div>
                    { userType!="candidate" && <CandidateHeader candidateData={candidate} appId={appId} resumeToken={resumeToken} /> }
                    { userType == "candidate" && 
                      <Helmet>
                          <title>
                            {"Interview Video for " + (job && job.jobTitle ? " - " + job.jobTitle : "") + " | Jobslab" }
                          </title>
                      </Helmet>
                    }
                    { (userType=="client" || userType=="admin") && 
                      <Helmet>
                          <title>
                            {
                              (candidate && candidate._id && candidate._id.name ? 
                                      candidate._id.name.firstName + " " + candidate._id.name.lastName + "'s Interview Video | Jobslab"
                                      : "JobsLab" 
                              )
                            }
                          </title>
                      </Helmet>
                    }
                    <div className="row">
                      <div className="col-12">
                        <ContainerHeader title={ "Interview Video for " + (job && job.jobTitle) || '' /*<IntlMessages id="sidebar.timeLine.defaultwithIcons"/>*/} />
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
                        { job && <JobDescription jobData={job} /> }
                        { job && (userType=="client" || userType=="admin") && <ClientList clientList={job.client} /> }
                        {/*<TimerView headerColor="gradient-primary"/>*/}
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
                       {/*question & video*/}
                       <InterviewQuestion 
                       deadline={deadline} 
                       timeZone={timeZone} 
                       timeLimit={timeLimit} 
                       interviewQuestion={interviewQuestion}
                       />
                       
                       <InterviewVideo 
                         getInVideo={this.getInVideo.bind(this)}
                         title={"Interview Video"}
                         videoUrl={videoUrl} 
                         timeLimit={timeLimit}
                         inVideoId={inVideoId} 
                         isUploaded={isUploaded}
                         isProcessed={isProcessed}
                         isValid={isValid}
                       />
                       
                       
                      </div>
                    </div>
                  </div>
              }
          </div>
      )
  }
  
}


function mapStateToProps(state) {
  const { userType } = state.auth;
  return { userType };
}

export default withRouter(connect(mapStateToProps, null)(VideoInterview));

