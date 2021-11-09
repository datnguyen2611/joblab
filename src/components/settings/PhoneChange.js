import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Widget from "components/Widget";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { requestInitUser } from 'actions/Auth';  
import * as notification from 'actions/Notification';

class PhoneChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dial: '',
      number: '',
    };
  }
  
  componentDidMount() {
     if (this.props.userData)
      this.setState({
        dial: this.props.userData.phone && { value: this.props.userData.phone.dial, label: this.props.userData.phone.dial },
        number: this.props.userData.phone && this.props.userData.phone.number,
      });
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  
  autocompleteChange = (e, value, name) => {
    this.setState({ [name]: value });
  }
  
  editSave = () => {
    const data = {
      dial: this.state.dial && this.state.dial.value,
      number: this.state.number,
    };
    axios.post('/api/users/set/profile/phone/update', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("Your phone number has been updated successfully.");
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
    const { dial, number } = this.state;
    const { dialList } = this.props;
    
    return (
      <Widget styleName="jr-card-profile">
        <div className="mb-12">
          <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Change Mobile Number</h3>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-md-4">
            <Autocomplete
              value={dial}
              options={dialList}
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              renderInput={params => (
                <TextField 
                  {...params} 
                  label="Dial" 
                  fullWidth 
                  error={!dial}
                  helperText={!dial && "Please select Dial Code."}
                />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'dial')}
            />
          </div>
          
          <div className="col-md-6 mb-md-4">
            <TextField
              id="number"
              name="number"
              label="Number"
              value={number}
              onChange={this.textboxChange}
              fullWidth
              error={!number}
              helperText={!number && "Please input Phone Number."}
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

const mapStateToProps = (state) => {
  const { userData } = state.auth;
  const { dialList } = state.list;
  return { userData, dialList }
};

const mapDispatchToProps = {
  requestInitUser,
}


export default connect(mapStateToProps, mapDispatchToProps)(PhoneChange);
