import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ContainerHeader from 'components/ContainerHeader/index';
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlMessages from 'util/IntlMessages';
import { Helmet } from 'react-helmet';

import CandidateHeader from "components/application/CandidateHeader";
import JobDescription from "components/application/JobDescription";
import ClientList from "components/application/ClientList";
import TimeLine from 'components/application/TimeLine';
import OfferForm from 'components/popup/OfferForm';

import { VERTICAL_NAVIGATION } from 'constants/ActionTypes'
import * as notification from 'actions/Notification';

import {
  CANDIDATE_INTERESTED,
  ADMIN_RECOMMENDED,
  ADMIN_REJECTED,
  CANDIDATE_WITHDRAWN_1,
  CLIENT_REJECTED,
  CANDIDATE_WITHDRAWN_2,
  SELECTED
} from 'constants/ApplicationState';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      
      isWithdrawWarning: false,
      isRejectWarning: false,
      offerModalIsOpen: false,
      
      candidate: null,
      job: null,
      state: 0,
      history: [],
    }
  }

  componentDidMount() {
    if (this.props.match.params.appId != null) {
      var appId = this.props.match.params.appId;
      this.getApp(appId);
    }
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    /*setTimeout(() => {
      this.setState({ loader: false });
    }, 1000);*/
  }
  
  getApp(appId) {
    axios.get('/api/'+this.props.userType+'s/get/application/'+appId)
    .then(res => {
      console.log(res.data)
      if (res.data.isSuccess) {
        var job = res.data.application.job;
        job.refererReward = res.data.refererReward;
        this.setState({
          candidate: res.data.application.candidate,
          job: job,
          refererReward: res.data.refererReward,
          state: res.data.application.state,
          history: res.data.application.history,
          loader: false,
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
  
  withdrawApp = () => {
    var appId = this.props.match.params.appId;
    const data = { appId };
    axios.post('/api/candidates/set/application/withdraw', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have withdrawn this application.");
        this.getApp(appId);
        this.setState({ isWithdrawWarning: false });
      }
      else{
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  rejectApp = () => {
    var appId = this.props.match.params.appId;
    const data = { appId };
    axios.post('/api/clients/set/application/reject', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have rejected the applicant.");
        this.getApp(appId);
        this.setState({ isRejectWarning: false });
      }
      else{
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  openModal = (modalType) => {
    switch (modalType) {
      case 'offer':
        this.setState({ 
          offerModalIsOpen: true,
        });
        break;
    }
  }
  
  closeModal = (name) => {
    this.setState({ [name] : false });
  }
  
  completeOffer = () => {
    var appId = this.props.match.params.appId;
    this.setState({ 
      offerModalIsOpen: false
    });
    this.getApp(appId);
  }
  
  render() {
    const { userType } = this.props;
    const { loader, isWithdrawWarning, isRejectWarning, offerModalIsOpen } = this.state;
    const { candidate, job, state, history, refererReward } = this.state;
    const appId = this.props.match.params.appId;
    
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
          { userType!="candidate" && <CandidateHeader appId={appId} candidateData={candidate} /> }
          { userType == "candidate" && 
            <Helmet>
                <title>
                  {"My Application" + (job && job.jobTitle ? " - " + job.jobTitle : "") + " | Jobslab" }
                </title>
            </Helmet>
          }
          { (userType=="client" || userType=="admin") && 
            <Helmet>
                <title>
                  {
                    (candidate && candidate._id && candidate._id.name ? 
                            candidate._id.name.firstName + " " + candidate._id.name.lastName + "'s Application | Jobslab"
                            : "JobsLab" 
                    )
                  }
                </title>
            </Helmet>
          }
          
          <div className="row">
            <div className="col-12">
              <ContainerHeader title={ job && job.jobTitle /*<IntlMessages id="sidebar.timeLine.defaultwithIcons"/>*/} />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
              { job && <JobDescription jobData={job} /> }
              { job && (userType=="client" || userType=="admin") && <ClientList clientList={job.client} /> }
              {/*<TimerView headerColor="gradient-primary"/>*/}
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
              { userType=='candidate' && 
                <div className="d-flex">
                  <Button size="small" variant="contained" className="ml-auto mb-2" 
                          startIcon={<DeleteIcon />}
                          disabled={state==CANDIDATE_WITHDRAWN_1 || state==CANDIDATE_WITHDRAWN_2}
                          onClick={() => this.setState({ isWithdrawWarning: true })}
                  >Withdraw</Button>
                </div>
              }
              { userType=='client' || userType=='admin' && 
                <div className="d-flex">
                  <div className="ml-auto mr-2">
                    <Button size="small" color="primary" variant="contained" className="ml-auto mb-2" 
                            startIcon={<AssignmentTurnedInIcon />}
                            disabled={state==CANDIDATE_INTERESTED || state==ADMIN_RECOMMENDED || state==ADMIN_REJECTED || state==CANDIDATE_WITHDRAWN_1 || state==CANDIDATE_WITHDRAWN_2 || state==SELECTED}
                            onClick={() => this.openModal('offer')}
                    >Offer</Button>
                  </div>
                  <div>
                    <Button size="small" variant="contained" className="ml-auto mb-2" 
                            startIcon={<DeleteIcon />}
                            disabled={state==CLIENT_REJECTED}
                            onClick={() => this.setState({ isRejectWarning: true })}
                    >Reject</Button>
                  </div>
                </div>
              }
              <TimeLine appId={appId} jobId={job && job._id} history={history} updateApp={() => this.getApp(appId)}/>
            </div>
          </div>
        </div>
      }
        <SweetAlert show={isWithdrawWarning}
                    warning
                    showCancel
                    confirmBtnText={"Yes, Withdraw It!"/*<IntlMessages id="sweetAlerts.yesDeleteIt"/>*/}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                    onConfirm={this.withdrawApp}
                    onCancel={() => this.setState({ isWithdrawWarning: false })}
        >
          <IntlMessages id="sweetAlerts.youWillNotAble"/>
        </SweetAlert>
        <SweetAlert show={isRejectWarning}
                    warning
                    showCancel
                    confirmBtnText="Yes, Reject It!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                    onConfirm={this.rejectApp}
                    onCancel={() => this.setState({ isRejectWarning: false })}
        >
          <IntlMessages id="sweetAlerts.youWillNotAble"/>
        </SweetAlert>
        <OfferForm appId={appId} isOpen={offerModalIsOpen} closeModal={this.closeModal} completeOffer={this.completeOffer} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userType } = state.auth;
  return { userType };
}

export default withRouter(connect(mapStateToProps, null)(Application));


