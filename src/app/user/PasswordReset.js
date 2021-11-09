import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import IntlMessages from 'util/IntlMessages';
import { Helmet } from 'react-helmet';
import axios from "axios";
import * as notification from 'actions/Notification';
import LoginForm from 'components/popup/LoginForm';
import { JOBSLAB_ICON_URL } from 'constants/PictureUrl';


class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: '',
      loginModalIsOpen: false,
      loader: true,
    }
    
  }
  
  componentDidMount() {
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    var token = this.props.match.params.token;
    console.log(this.props.match.params.token);

    const data = {
      token: token,
    };  
    
    axios.post('/api/auth/token/verify', data)
    .then(res => {
      if (res.data.isSuccess) {
        setTimeout(() => {
          this.setState({ loader: false });
        }, 1000);
      }
      else {
        this.props.history.push('/');
        notification.error(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
    
  }
  
  textboxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  resetPassword = () => {
    const data = {
      password: this.state.password,
      password2: this.state.password2,
      token: this.props.match.params.token,
    };    
    
    axios.post('/api/auth/password/change', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("Password has been reset. Please log in again.");
        this.setState({
          loginModalIsOpen: true,
        });
      } else {
        notification.error(res.data.msg);
        this.setState({loader: false});
      }
    })
    .catch(function (err) {
      console.log(err);
    });  
  };
  
  openModal = (modalType) => {
    if(modalType == 'login')
      this.setState({loginModalIsOpen: true, signupModalIsOpen: false});
  }
 
  closeModal = (name) => {
    this.setState({ [name]: false });
  }

  render() {
    const { loader } = this.state;
    return (
      <div className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      { loader
        ?
        <div className="loader-view"
             style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
          <CircularProgress/>
          <Helmet>
              <title>JobsLab</title>
          </Helmet>
        </div>
        :
        <div className="login-content">
          <div className="login-header">
            <Link to="/" title="JobsLab">
              <span onClick={this.closePopup}>
                <a className="app-logo">
                <img
                  src={encodeURI(JOBSLAB_ICON_URL+"jobslab_blue.png")}
                  alt="JobsLab" title="JobsLab"/></a>
              </span>
            </Link>
          </div>
    
          <div className="mb-2">
            <h2>Reset Password</h2>
          </div>
    
          <div className="login-form">
            <form method="post" action="/">
              <TextField
                type="password"
                id="required"
                name="password"
                label="New Password"
                value={this.state.password} 
                onChange={this.textboxChange}
                fullWidth
                defaultValue=""
                margin="normal"
                className="mt-0 mb-4"
              />
    
              <TextField
                type="password"
                id="required"
                name="password2"
                label="Confirm New Password"
                value={this.state.password2} 
                onChange={this.textboxChange}
                fullWidth
                defaultValue=""
                margin="normal"
                className="mt-0 mb-4"
              />
    
              <Button variant="contained" color="primary" className="text-white" onClick={this.resetPassword}>
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      }
      <LoginForm isOpen={this.state.loginModalIsOpen} closeModal={() => this.closeModal('loginModalIsOpen')} />
      </div>
    )
  }
}

export default PasswordReset;