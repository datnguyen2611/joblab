import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import config from 'react-reveal/globals';
import Button from '@material-ui/core/Button';
import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import * as notification from 'actions/Notification';
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';
config({ ssrFadeout: true });


class Verification extends Component {
  
  componentDidMount() {
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
  }
  
  switchContent(userType) {
    switch (userType) {
      case 'candidate':
        console.log("Verification: is Candidate");
        return (
          <div className="home-wordcontainer">
            <h3>Thank you for registering!</h3>
            <h3>An email verification has been sent.</h3>
            <p>Please verify your email address according to instructions.</p>
            <p>If you do not see the verification email, please be sure to check your junk folder.</p>
            <div className="button-sec responsive">
              <Button variant="contained" color="primary" className="jr-btn jr-btn-slg" onClick={this.resendToken}>
                <font size="+1">Resend Token</font>
              </Button>
            </div>
          </div>
        )
      case 'client':
        console.log("Verification: is Client");
        return (
          <div className="home-wordcontainer">
            <h3>Thank you for uploading your request.</h3>
						<h3>One of our experienced consultants will contact you shortly.</h3>
          </div>
        )
    }
  }
  
  resendToken = () => {
    axios.post('/api/auth/token/regen')
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("The verification email has been sent to your email address. Please check and verify your account.");
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
        this.setState({ isUploadLoading: false });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    const { userType } = this.props;
    
    return (
      <div className="home-wrapper">
        <div className="home-imgcontainer verification">
          <Fade duration={2000}>
            { this.switchContent(userType) }
          </Fade>
            <div className="color-overlay"></div>
            <img className="verification-img" src={encodeURI(WEB_IMAGE_URL+"verification/verification-min.jpg")} alt="" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userType } = state.auth;
  return { userType };
}

export default connect(mapStateToProps, null)(Verification);