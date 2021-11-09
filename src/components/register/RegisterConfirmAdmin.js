import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import * as notification from 'actions/Notification';

class RegisterConfirmAdmin extends React.Component {
  state = {
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
    const data = {
      user: this.props.userData
    }
    axios.post('/api/admins/set/candidate/complete', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("Email has been sent to notice new user.");
        this.props.history.push('/admin/candidatelist');
      }
      else {
        notification.error(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });

  }

  render() {
    const { activeStep, handleBack } = this.props;
    const { userData } = this.props;
    const { isAgreeTC } = this.state;

    return (
      <div className="tab-pane" id="tab2-4">
        <h3 className="title text-primary">Candidate Create Complete</h3>
        <p>
          {userData.name && (userData.name.firstName + " " + userData.name.lastName)}'s candidate profile has been completed. 
          To continue, click Finish button below to send notification email to inform candidate's new user account. 
          Candidate will be asked to reset their password before first login.  
        </p>
        {/*<p>You’re almost there! Simply complete your profile and our AI will instantly start matching you with great jobs!</p>
        <p>By creating an account, you agree to JobsLab’s Terms of Use and that you have read the Data Policy and Cookie Use.</p>*/}
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

export default withRouter(RegisterConfirmAdmin);