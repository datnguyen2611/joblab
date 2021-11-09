import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import * as notification from 'actions/Notification';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { LinkedInLoginButton } from "react-social-login-buttons";
import { JOBSLAB_ICON_URL } from 'constants/PictureUrl';

import LoginContent from 'components/auth/LoginContent';


/*import Modal from 'react-modal';
import modalStyle from 'styles/modalStyle';
Modal.setAppElement(document.getElementById('root'));*/

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      isLoading: false,
      
      email: '',
      
      isEmailInput: true,
    };
  }
  
  componentDidMount() {
    console.log("Login Form Redirect URL: " + this.props.redirectUrl);
    if (this.props.activeStep) 
      this.setState({ activeStep: this.props.activeStep });
  }
  
  closePopup = () => {
    const { closeModal } = this.props;
    const { activeStep } = this.state;
    
    closeModal();
    setTimeout(() => {
      this.setState({ activeStep: 0 })
    }, 1000);
  };

  handleNext = () => {
    const {activeStep} = this.state;
    this.setState({ activeStep: activeStep + 1 });
  };
  
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.loginStep();
      case 1:
        return this.forgotPasswordStep();
  
      default:
        return 'Uknown stepIndex';
    }
  }
  
  loginStep() {
    return (
      <div className="login-form">
        <LoginContent isPopup={true} closePopup={this.closePopup} redirectUrl={this.props.redirectUrl} />
        <div className="form-group justify-content-between align-items-center">
          <div className="mt-3">
            <p className="text-center">
              <Link onClick={this.handleNext} title="Reset Password">
                <a> Forgot Password? {/*<IntlMessages id="appModule.forgotPassword"/>*/}</a>
              </Link>
            </p>
          </div>
        </div>
        <div className="form-group justify-content-between align-items-center">
          <div className="mt-1">
            <p className="text-center">New to JobsLab?
              <Link onClick={this.props.openSignupModal} title="Sign Up">
                <a> Join now {/*<IntlMessages id="appModule.forgotPassword"/>*/}</a>
              </Link>
            </p>
          </div>
        </div>
        <div className="extra-login">
    			<span className="or">OR</span>
    			<div className="login-social">
    				<div className="inlineBtn-Container">
              <a href='/api/auth/linkedin'>
        	      <LinkedInLoginButton>
        	        <span>Sign in with Linkedin</span>
        	      </LinkedInLoginButton>
        	    </a>
        	  </div>
    			</div>
    		</div>
      </div>
    );
  }
  
  forgotPasswordStep() {
    const { email, isEmailInput } = this.state;
    
    return (
      <div> 
        <div className="mb-2">
          <h2>Forgot your password?</h2>
        </div>
  
        <div className="login-form">
          <TextField
            name="email" 
            placeholder="Email" 
            value={email} 
            onChange={this.textboxChange}
            type="email"
            //id="required"
            label="Email"
            fullWidth
            defaultValue=""
            margin="normal"
            className="mt-0 mb-4"
            error={!isEmailInput}
            helperText={!isEmailInput && "Please input a valid email."}

          />
  
          <p className="mb-3">
            Don't remember your email? &nbsp;
            <Link to="/contact">
              <span className="small jr-link" onClick={this.closePopup}>
                Contact Support
              </span>
            </Link>
          </p>
  
          <Button variant="contained" color="primary" className="btn btn-primary jr-btn-rounded" onClick={this.resetPassword}>
            Reset Password
          </Button>
        </div>
      </div>
    );
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value }, () => {
      switch (name) {
        case 'email':
          this.setState({ isEmailInput: true });
          break;
      }
    });
  }
  
  resetPassword = () => {
    if (!this.state.email)
      this.setState({ isEmailInput: false });
    else {
      const data = {
        email: this.state.email,
      };    
      axios.post('/api/auth/password/reset', data)
      .then(res => {
        if (res.data.isSuccess) {
          this.closePopup(); 
          notification.success("We have sent you an email for password reset. Please check your mailbox.");
        } else {
          notification.error(res.data.msg);
          this.setState({isLoading: false});
        }
      })
      .catch(function (err) {
        console.log(err);
      });  
    }
  };

  render() {
    const { isOpen } = this.props;
    const { activeStep } = this.state;
    return (
      <Dialog open={isOpen} onClose={this.closePopup} scroll={'body'} aria-labelledby="form-dialog-title">
      {/*<Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyle.loginModalStyle}
        contentLabel="Example Modal"
      >
      
        <div className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">*/}
        <div className="login-content">
          <span className="close-popup" onClick={this.closePopup}><i className="la la-close"></i></span>
          <div className="login-header">
            <Link to="/" title="JobsLab">
              <span onClick={this.closePopup}>
                <a className="app-logo">
                <img
                  src={JOBSLAB_ICON_URL+"jobslab_blue.png"}
                  alt="JobsLab" title="JobsLab"/></a>
              </span>
            </Link>
          </div>
          {this.getStepContent(activeStep)}
        </div> 
      {/*</div>
    </Modal>*/}
    </Dialog>
    );
  }
}


export default withRouter(LoginForm);