import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Widget from "components/Widget";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { requestInitUser } from 'actions/Auth';  
import * as notification from 'actions/Notification';

class NameChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
    };
  }
  
  componentDidMount() {
    if (this.props.userData)
      this.setState({
        firstName: this.props.userData.name && this.props.userData.name.firstName,
        lastName: this.props.userData.name && this.props.userData.name.lastName,
      })
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  
  editSave = () => {
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    axios.post('/api/users/set/profile/name/update', data)
    .then(res => {
      console.log(res.data);
      if (res.data.isSuccess) {
        notification.success("Your name has been updated successfully.");
        this.props.requestInitUser();
        this.setState({ isEdit: false });
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    const { firstName, lastName } = this.state;
    const { isFirstNameInput, isLastNameInput } = this.state;
    
    return (
      <Widget styleName="jr-card-profile">
        <div className="mb-12">
          <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Change Name</h3>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-md-4">
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              value={firstName}
              onChange={this.textboxChange}
              fullWidth
              error={!firstName}
              helperText={!firstName && "Please input First Name."}
              /*InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}*/
            />
          </div>
          
          <div className="col-md-6 mb-md-4">
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              value={lastName}
              onChange={this.textboxChange}
              fullWidth
              error={!lastName}
              helperText={!lastName && "Please input Last Name."}
              /*InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}*/
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

function mapStateToProps(state) {
  const { userData } = state.auth;
  return { userData };
}

const mapDispatchToProps = {
  requestInitUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(NameChange);
