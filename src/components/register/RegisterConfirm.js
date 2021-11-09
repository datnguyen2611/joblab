import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import * as notification from 'actions/Notification';

class RegisterConfirm extends React.Component {
  state = {
    isAgreeTC: false,
  };
  
  componentDidMount() {
  }

  
  tickboxChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.checked
    }, () => {
      console.log(this.state.isAgreeTC)
    });
  }
  
  formSubmit = () => {
    if (!this.state.isAgreeTC) {
      notification.warning("Please accept Terms and Conditions before completing registration.");
    }
    else {
      const data = {
        isAgreeTC: this.state.isAgreeTC
      }
      axios.post('/api/auth/register/complete', data)
      .then(res => {
        if (res.data.isSuccess) {
          this.props.getUserData();
          notification.success("Your Profile has been updated successfully.");
          //this.props.history.push('/candidate/dashboard');
          if (this.props.location.state != null)
            this.props.redirectToPrevPage();
          else {
            this.props.history.push('/candidate/dashboard');
            //setTimeout(() => {this.props.history.push('/candidate/dashboard');}, 1000);
          }
        }
        else {
          notification.error(res.data.msg);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }

  render() {
    const { activeStep, handleBack } = this.props;
    const { isAgreeTC } = this.state;

    return (
      <div className="tab-pane" id="tab2-4">
        <h3 className="title text-primary">Terms and Conditions</h3>
        <p>You're almost there! Simply agree to JobsLab's Terms of Use and confirm you have read our 
        <a href="/privacy-policy" target="_blank"> Privacy Policy </a>
        and 
        <a href="/terms-of-use" target="_blank"> Terms of Use </a>
        to complete your account registration.</p>
        {/*<p>You’re almost there! Simply complete your profile and our AI will instantly start matching you with great jobs!</p>
        <p>By creating an account, you agree to JobsLab’s Terms of Use and that you have read the Data Policy and Cookie Use.</p>*/}
        <div className="d-flex align-items-center">
          <Checkbox color="primary" name="isAgreeTC" checked={isAgreeTC} onChange={this.tickboxChange} /> <span>I agree with the Terms and Conditions.</span>
        </div>
        <div className="d-flex">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className="ml-auto mr-2"
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={this.formSubmit}>
            Finish
          </Button>
        </div>
      </div>
    );
  }
}



export default withRouter(RegisterConfirm);