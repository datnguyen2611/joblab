import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import axios from "axios";
import { LinkedInLoginButton } from "react-social-login-buttons";
import { requestInitUser } from 'actions/Auth';
import * as notification from 'actions/Notification';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      
      email: '',
      password: '',
      
      isEmailExist: true,
      isPasswordCorrect: true,
    };
  }
  
  componentDidMount() {
    console.log("Login Form Redirect URL: " + this.props.redirectUrl);
    if (this.props.activeStep) 
      this.setState({ activeStep: this.props.activeStep });
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value }, () => {
      switch (name) {
        case 'email':
          this.setState({ isEmailExist: true });
          break;
        case 'password':
          this.setState({ isPasswordCorrect: true });
          break;
      }
    });
  }

  formSubmit = (e) => {
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
        this.setState({ isLoading: false });
        if (this.props.isPopup)
          this.props.closePopup();
        this.props.requestInitUser();

        console.log("After updateUserStatus in LoginForm")
        console.log(this.props.redirectUrl);
        
        this.setState({ email: '', password: '' });
        if (this.props.redirectUrl) //Popup
          this.props.history.push(this.props.redirectUrl);
        else if (this.props.location.state != null) //Login page
          this.props.redirectToPrevPage();
        else {
          this.props.history.push('/'+res.data.role+'/dashboard');
          //setTimeout(() => {this.props.history.push('/candidate/dashboard');}, 1000);
        }
      }
      else {
        this.setState({ isLoading: false });
        //notification.error(res.data.msg);
        if (res.data.isEmailExist==false) 
          this.setState({ isEmailExist: false });
        else if (res.data.isPasswordCorrect==false)
          this.setState({ isPasswordCorrect: false });
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  render() {
    const { email, password } = this.state;
    const { isEmailExist, isPasswordCorrect } = this.state;
    
    return (
      <div className="login-form">
        <form onSubmit={this.formSubmit}>
          {/*<fieldset>*/}
            <TextField
              type="text"
              name="email"
              placeholder="example@jobslab.io"
              id="email"
              label="Email"
              fullWidth
              onChange={this.textboxChange}
              value={email}
              margin="normal"
              variant="outlined"
              className="mt-1"
              /*InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}*/
              error={!isEmailExist}
              helperText={!isEmailExist && "Invalid Email"}
              /*InputProps={{
                style: {
                  backgroundColor: "white",
                  borderRadius: 4
                }    
              }}*/
            />
            <TextField
              type="password"
              name="password"
              placeholder="********"
              id="password"
              label="Password"
              fullWidth
              onChange={this.textboxChange}
              value={password}
              margin="normal"
              variant="outlined"
              className="mt-1"
              /*InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}*/
              error={!isPasswordCorrect}
              helperText={!isPasswordCorrect && "Invalid Password"}
              /*InputProps={{
                style: {
                  backgroundColor: "white",
                  borderRadius: 4
                }    
              }}*/
            />
            {/*<div id="test" className="form-group">
              <input className="form-control form-control-lg" 
              type="text" name="email" placeholder="Email" 
              value={email} onChange={this.textboxChange} />
            </div>
            <div className="form-group login">
              <input className="form-control form-control-lg" 
              type="password" name="password" placeholder="********" 
              value={password} onChange={this.textboxChange} />
            </div>*/}
            
            <div className="mt-4 mb-2">
              <Button type="submit" variant="contained" color="primary" className="btn btn-primary jr-btn-rounded" fullWidth disabled={this.state.isLoading} onClick={this.formSubmit}>
                {this.state.isLoading && <i className='fa fa-spinner fa-spin' />} Sign In
              </Button>
            </div>
            {/*<div className="login-btn">
              <button className="btn jr-btn-rounded btn-primary btn-rounded w-100" type="submit" disabled={this.state.isLoading}> {this.state.isLoading && <i className='fa fa-spinner fa-spin' />} Sign In</button>}
            </div>*/}
          {/*</fieldset>*/}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  requestInitUser,
}


export default withRouter(connect(null, mapDispatchToProps)(Login));