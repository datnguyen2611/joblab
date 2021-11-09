import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axios from "axios";
import Fade from 'react-reveal/Fade';
import { LinkedInLoginButton } from "react-social-login-buttons";

import LoginContent from 'components/auth/LoginContent';
import LoginForm from 'components/popup/LoginForm';

import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { JOBSLAB_ICON_URL, WEB_IMAGE_URL } from 'constants/PictureUrl';

//import { FadeInOut } from 'react-responsive-ui';
import { requestInitUser } from 'actions/Auth';  

var queryString = require('query-string');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      isLoading: false,
      email: '',
      password: '',
      redirectUrl: null, //URL with Redirect param
      redirectToPrevPage: false, //Private Route Redirect
      resetPwdModalIsOpen: false,
    };
  }
  
  componentDidMount() {
    console.log(this.props.location);
    var params = queryString.parse(this.props.location.search);
    if (params.redirect) {
      console.log(params.redirect)
      this.setState({redirectUrl: params.redirect});
    }
    /*if (this.props.match.params.refId) {
      console.log('has referral id');
      console.log(this.props.match.params.refId);
    }*/
  }
  
  textboxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  redirectToPrevPage = () => {
    this.setState({ redirectToPrevPage: true });
  }
  
  /*formSubmit = (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    
    console.log("start to login");
    axios.post('/api/auth/login', data)
    .then(res => {
      console.log(res.data);
      if (res.data.isSuccess) {
        console.log("Before updateUserStatus in LoginForm");
        //this.props.closeModal();
        this.props.dispatch(requestInitUser());
        this.setState({ email: '', password: '' });

        console.log("After updateUserStatus in LoginForm")
        if (this.state.redirectUrl)
          this.props.history.push(this.state.redirectUrl);
        else if (this.props.location.state != null)
          this.setState({ redirectToPrevPage: true });
        else {
          if (res.data.role == 'candidate') {
            this.props.history.push('/candidate/dashboard');
          }
          else if (res.data.role == 'client') {
            this.props.history.push('/client/dashboard');
          }
          else if (res.data.role == 'admin') {
            this.props.history.push('/admin/dashboard');
          }
        }
      }
      else {
        this.setState({ isLoading: false });
        alert(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }*/
  
  openModal = (e) => {
    e.preventDefault();
    this.setState({ resetPwdModalIsOpen: true });
  }
  
  closeModal = (name) => {
    this.setState({ [name] : false });
  }

  render() {
    let { from } = (this.props.location.state!=null) && this.props.location.state;
    if (this.state.redirectToPrevPage) return <Redirect to={from} />;
    
    return (
      <div className="home-wrapper login">
      
          <div className="login-imgcontainer responsive">
          <Fade duration={2000}>
            <div className="login-lhs">
              <div className="login-content fullpage">
                  <div className="login-header fullpage">
                    <h3>User Login</h3>
                  </div>
                  <div className="login-form">
                    <LoginContent isPopup={false} redirectUrl={this.props.redirectUrl} redirectToPrevPage={this.redirectToPrevPage} />
                    <div className="mt-3">
                      <Link title="Reset Password">
                        <a onClick={(e) => this.openModal(e)}> Forgot Password?</a>
                      </Link>
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
                  {/*<div className="login-form">
                    <form onSubmit={this.formSubmit}>
                      <fieldset>
                        <div id="test" className="form-group">
                          <input className="form-control form-control-lg" 
                          type="text" name="email" placeholder="Email" 
                          value={this.state.email} onChange={this.textboxChange} />
                        </div>
                        <div className="form-group login">
                          <input className="form-control form-control-lg" 
                          type="password" name="password" placeholder="********" 
                          value={this.state.password} onChange={this.textboxChange} />
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center">
                          <div>
                            <Link href="/app-module/forgot-password-1" title="Reset Password">
                              <a onClick={(e) => this.openModal(e)}> Forgot Password?</a>
                            </Link>
                          </div>
                        </div>
            
                        <div className="login-btn fullpage">
                          <button className="btn jr-btn-rounded btn-primary btn-rounded fullpage" type="submit" disabled={this.state.isLoading}> {this.state.isLoading && <i className='fa fa-spinner fa-spin' />} Sign In</button>
                        </div>
                      </fieldset>
                    </form>
                    <div className="extra-login">
                			<span className="or">OR</span>
                			<div className="login-social fullpage">
                				<div className="inlineBtn-Container">
                          <a href='/api/auth/linkedin'>
                    	      <LinkedInLoginButton>
                    	        <span>Sign in with Linkedin</span>
                    	      </LinkedInLoginButton>
                    	    </a>
                    	  </div>
                			</div>
                		</div>
                  </div>*/}
                </div>
              </div>
            </Fade>
            <img className="login-bg" src={encodeURI(WEB_IMAGE_URL+"login/login.jpg")} alt="" />
            </div>
        <LoginForm isOpen={this.state.resetPwdModalIsOpen} activeStep={1} closeModal={() => this.closeModal('resetPwdModalIsOpen')} />

      </div>
    )
  }
}

export default withRouter(Login);
