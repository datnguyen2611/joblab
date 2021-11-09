import React, { Component } from 'react';
import axios from 'axios';
import Widget from "components/Widget";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as notification from 'actions/Notification';

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      
      isPasswordCorrect: true,
      isNewPasswordLong: true,
    };
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value }, () => {
      this.inputValidate(name);
    });
  }
  
  inputValidate = (name) => {
    switch (name) {
      case 'newPassword':
        this.setState({ isNewPasswordLong: this.state.newPassword.length>=8 ? true : false });
        break;
    }
  }
  
  editSave = () => {
    const data = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      newPassword2: this.state.newPassword2,
    };
    axios.post('/api/users/set/password/change', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("Your name has been updated successfully.");
        this.setState({
          oldPassword: '',
          newPassword: '',
          newPassword2: '',
        }, () => {
          if (res.data.isPasswordCorrect!=null)
          this.setState({ isPasswordCorrect: true });
        });
      }
      else {
        notification.error(res.data.msg);
        if (res.data.isPasswordCorrect!=null)
          this.setState({ isPasswordCorrect: false });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    const { oldPassword, newPassword, newPassword2 } = this.state;
    const { isPasswordCorrect, isNewPasswordLong } = this.state;
    
    return (
      <Widget styleName="jr-card-profile">
        <div className="mb-12">
          <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Change Password</h3>
        </div>
        
        <div className="row">
          <div className="col-md-12 mb-md-4">
            <TextField
              name="oldPassword"
              label="Old Password"
              type="password"
              fullWidth
              placeholder="******"
              //variant="outlined"
              value={oldPassword}
              onChange={this.textboxChange}
              error={!isPasswordCorrect}
              helperText={!isPasswordCorrect && "The password is not correct."}
            />
          </div>
          
          <div className="col-md-12 mb-md-4">
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              //error={isPasswordMismatch}
              fullWidth
              placeholder="******"
              //variant="outlined"
              value={newPassword}
              onChange={this.textboxChange}
              error={!isNewPasswordLong}
              helperText={!isNewPasswordLong && "Password must be at least 8 characters long."}
            />
          </div>
                        
          <div className="col-md-12 mb-md-4">
            <TextField
              name="newPassword2"
              label="Confirm New Password"
              type="password"
              fullWidth
              placeholder="******"
              //variant="outlined"
              value={newPassword2}
              onChange={this.textboxChange}
              error={!(newPassword==newPassword2)}
              helperText={!(newPassword==newPassword2) && "Password mismatch."}
            />
          </div>
          
          <div className="col-12 mt-2 mb-2 d-flex">
            <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.editSave}>Save</Button>
          </div>

        </div>
      </Widget>
    );
  }
}

export default PasswordChange;
