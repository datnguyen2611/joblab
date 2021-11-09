import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContainerHeader from 'components/ContainerHeader';
import CardBox from 'components/CardBox';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import BasicInfo from 'components/register/BasicInfo';
import DetailInfo from 'components/register/DetailInfo';
import ProfilePicture from 'components/register/ProfilePicture';
import RegisterConfirm from 'components/register/RegisterConfirm';

import { requestInitUser } from 'actions/Auth';  

import { VERTICAL_NAVIGATION } from 'constants/ActionTypes'
import { changeNavigationStyle } from 'actions/index';

function getSteps() {
  return ['Basic Information', 'Detailed Information', 'Profile Picture', 'Confirm and Finish'];
}

class CandidateRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      activeStep: 0,
    }
  }

  componentDidMount() {
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1000);
  }
  
  getUserData = () => {
    this.props.requestInitUser(); 
  }
  
  handleNext = () => {
    const {activeStep} = this.state;
    this.setState({ activeStep: activeStep + 1 });
    window.scrollTo(0, 0);
  };

  handleBack = () => {
    const {activeStep} = this.state;
    this.setState({ activeStep: activeStep - 1 });
    window.scrollTo(0, 0);
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };
  
  getStepContent(stepIndex) {
    const { activeStep, redirectUrl } = this.state;
    const { userData, candidateData } = this.props;
    
    switch (stepIndex) {
      case 0:
        return <BasicInfo activeStep={activeStep} handleNext={this.handleNext} handleBack={this.handleBack} candidateData={candidateData} getUserData={this.getUserData} />;
      case 1:
        return <DetailInfo activeStep={activeStep} handleNext={this.handleNext} handleBack={this.handleBack} candidateData={candidateData} getUserData={this.getUserData} />;
      case 2:
        return <ProfilePicture activeStep={activeStep} handleNext={this.handleNext} handleBack={this.handleBack} userData={userData} getUserData={this.getUserData} />;
      case 3:
        return <RegisterConfirm activeStep={activeStep} handleBack={this.handleBack} getUserData={this.getUserData} redirectToPrevPage={this.redirectToPrevPage} />;//this.getConfirmation();
  
      default:
        return 'Uknown stepIndex';
    }
  }
  
  redirectToPrevPage = () => {
    this.setState({ redirectToPrevPage: true });
  }

  render() {
    const steps = getSteps();
    const { loader, activeStep } = this.state;
    
    console.log(this.props.location)
    let { from } = (this.props.location.state!=null) && this.props.location.state;
    if (this.state.redirectToPrevPage) return <Redirect to={from} />;
    
    return (
      <div className="app-wrapper">
      { loader ?
        <div className="loader-view"
             style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
          <CircularProgress />
          <Helmet>
              <title>JobsLab</title>
          </Helmet>
        </div> : 
        <div className="animated slideInUpTiny animation-duration-3">
          <ContainerHeader title={<IntlMessages id="sidebar.components.stepper"/>} /*match={match}*//>
          <Helmet>
              <title>Register | JobsLab</title>
          </Helmet>
          <div className="row mb-md-3">
            <CardBox styleName="col-lg-12" childrenStyle="d-flex justify-content-center"
                     heading={<IntlMessages
                       id="component.stepper.horizontalLinearAlternativeLabel"/>}
                     headerOutside>
              <div className="w-100">
                <Stepper activeStep={activeStep} alternativeLabel className="horizontal-stepper-linear">
                  {steps.map((label, index) => {
                    return (
                      <Step key={label} className={`horizontal-stepper ${index === activeStep ? 'active' : ''}`}>
                        <StepLabel className="stepperlabel">{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <div className="mx-0 mx-md-5">
                  {this.getStepContent(activeStep)}
                </div>
              </div>
            </CardBox>
          </div>
        </div>
        
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userData, candidateData } = state.auth;
  return { userData, candidateData };
}

const mapDispatchToProps = {
  requestInitUser,
  changeNavigationStyle
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CandidateRegister));
