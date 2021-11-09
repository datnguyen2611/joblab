import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import PersonalInfo from './PersonalInfo';
import BasicInfo from './BasicInfo';
import DetailInfo from './DetailInfo';
import ProfilePicture from './ProfilePicture';
import RegisterConfirm from './RegisterConfirm';

import { VERTICAL_NAVIGATION } from 'constants/ActionTypes'

function getSteps() {
  return ['Basic Information', 'Detailed Information', 'Profile Picture', 'Confirm and Finish'];
}

class RegistrationStepper extends React.Component {
  state = {
    activeStep: 0,
    //isAgreeTC: false,
  };
  
  componentDidMount() {
  }

  handleNext = () => {
    const {activeStep} = this.state;
    this.setState({ activeStep: activeStep + 1 });
  };

  handleBack = () => {
    const {activeStep} = this.state;
    this.setState({ activeStep: activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };
  
  getStepContent(stepIndex) {
    const { activeStep } = this.state;
    
    switch (stepIndex) {
      case 0:
        return <BasicInfo activeStep={activeStep} handleNext={this.handleNext} handleBack={this.handleBack} />;
      case 1:
        return <DetailInfo activeStep={activeStep} handleNext={this.handleNext} handleBack={this.handleBack} />;
      case 2:
        return <ProfilePicture activeStep={activeStep} handleNext={this.handleNext} handleBack={this.handleBack} />;
      case 3:
        return <RegisterConfirm activeStep={activeStep} handleBack={this.handleBack} />;//this.getConfirmation();
  
      default:
        return 'Uknown stepIndex';
    }
  }

  render() {
    const steps = getSteps();
    const {activeStep} = this.state;

    return (
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
    );
  }
}

export default RegistrationStepper;