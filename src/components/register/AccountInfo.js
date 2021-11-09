import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UploadButton from "components/UploadButton";
import SweetAlert from 'react-bootstrap-sweetalert';
import * as notification from 'actions/Notification';

class AccountInfo extends React.Component {
  state = {
    isLoading: false,
    isUploadLoading: false,
    isUploadSuccess: false,
    
    userType: 'candidate',
    
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    dial: { value: "+852", label: "+852" },
    phone_number: '',
    //cvData: {},
    cvFile: null,
    cvToken: null,
    cvFileType: null,
    cvFilePath: null,
    
    isEmailUnused: true,
  };
  
  componentDidMount() {
  }
  
  textboxChange = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value }, () => {
      switch (name) {
        case 'email':
          this.setState({ isEmailUnused: true });
          break;
      }
    });
  }
  
  autocompleteChange = (e, value, name) => {
    this.setState({ [name]: value });
  }
  
  cvUpload = (e) => {
    e.preventDefault();
    this.setState({ isUploadLoading: true });
    
    let cvFile = e.target.files[0]
    const formData = new FormData();
    if (cvFile != null && cvFile.name &&cvFile.name.toLowerCase().match(/(pdf|doc|docx).*/)) 
    {
      formData.append('cvFile', cvFile);
      console.log('start to upload cv');
      axios.post('/api/auth/resume/upload', formData)
      .then(res => {
        if (res.data.isSuccess) {
          this.setState({
            isUploadLoading: false,
            isUploadSuccess: true,
            
            email: res.data.cvDataParsed.email==null ? '' : res.data.cvDataParsed.email,
            firstName: res.data.cvDataParsed.firstName==null ? '' : res.data.cvDataParsed.firstName,
            lastName: res.data.cvDataParsed.lastName==null ? '' : res.data.cvDataParsed.lastName,
            dial: res.data.cvDataParsed.dial==null ? '' : { value: res.data.cvDataParsed.dial, label: res.data.cvDataParsed.dial } ,
            phone_number: res.data.cvDataParsed.phone_number==null ? '' : res.data.cvDataParsed.phone_number,
            cvToken: res.data.cvToken,
            cvFileType: res.data.cvFileType,
            cvFilePath: res.data.cvFilePath,
            cvFile: null,
          });
        }  
        else {
          if(res.data.msg)
            notification.error(res.data.msg);
          else
            notification.error("Upload CV failed. Please try again later.");
          this.setState({ isUploadLoading: false });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
  
  formSubmit = () => {
    this.setState({ isLoading: true });
    const data = {
      userType: this.state.userType,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dial: this.state.dial==null ? null : this.state.dial.label,
      phone_number: this.state.phone_number,
      cvToken: this.state.cvToken==null ? null : this.state.cvToken,
      cvFileType: this.state.cvFileType==null ? null : this.state.cvFileType,
      cvFilePath: this.state.cvFilePath==null ? null : this.state.cvFilePath,
    };
    
    axios.post('/api/admins/set/candidate/create', data)
    .then(res => {
      if (res.data.isSuccess) {
        this.setState({ isLoading: false });
        this.props.getUserData(res.data.userId);
        this.props.handleNext();
      } else {
        notification.error(res.data.msg);
        this.setState({ isLoading: false });
        if (res.data.isEmailUnused==false) 
          this.setState({ isEmailUnused: false });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    const { activeStep, handleBack, handleNext } = this.props;
    const { isLoading, isUploadLoading, isUploadSuccess } = this.state;
    const { firstName, lastName, email, password, password2, dial, phone_number } = this.state;
    const { isEmailUnused } = this.state;
    const { dialList } = this.props;
    
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <UploadButton name="Upload CV" accept=".doc,.docx,.pdf" isLoading={isUploadLoading} onChange={this.cvUpload} />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mt-3">Login Credential</h3>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
            <TextField
              type="text"
              name="email"
              placeholder="exmaple@jobslab.io"
              id="email"
              label="Email"
              fullWidth
              onChange={this.textboxChange}
              value={email}
              margin="normal"
              variant="outlined"
              className="mt-1"
              error={!email || !isEmailUnused}
              helperText={!email ? "Required" : !isEmailUnused && "This email has been used."}
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              placeholder="******"
              value={password}
              onChange={this.textboxChange}
              error={!password || !(password.length>=8)}
              helperText={!password ? "Required" : !(password.length>=8) && "Password must be at least 8 characters long."}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <TextField
              name="password2"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              placeholder="******"
              value={password2}
              onChange={this.textboxChange}
              error={!(password==password2)}
              helperText={!(password==password2) && "Password mismatch."}
            />
          </div>
          
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mt-3">Name</h3>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <TextField
              name="firstName"
              label="First Name"
              value={firstName}
              onChange={this.textboxChange}
              fullWidth
              variant="outlined"
              error={!firstName}
              helperText={!firstName && "Required"}
              /*InputProps={{
                style: {
                  backgroundColor: "white",
                  borderRadius: 4
                }    
              }}*/
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <TextField
              name="lastName"
              label="Last Name"
              value={lastName}
              onChange={this.textboxChange}
              fullWidth
              variant="outlined"
              error={!lastName}
              helperText={!lastName && "Required"}
              /*InputProps={{
                style: {
                  backgroundColor: "white",
                  borderRadius: 4
                }    
              }}*/
            />
          </div>
          
          <div className="m-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="mt-3">Contact</h3>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-6 col-12">
            <Autocomplete
              value={dial}
              options={dialList ? dialList : []}
              getOptionLabel={option => option.label}
              autoHighlight={true}
              blurOnSelect={true}
              disableClearable={true}
              renderInput={params => (
                <TextField 
                  {...params} 
                  label="Dial" 
                  fullWidth 
                  variant="outlined"
                  error={!dial}
                  helperText={!dial && "Required"}
                  /*InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: 4
                    }    
                  }}*/
                />
              )}
              onChange={(e, value) => this.autocompleteChange(e, value, 'dial')}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <TextField
              name="phone_number"
              label="Number"
              value={phone_number}
              onChange={this.textboxChange}
              fullWidth
              variant="outlined"
              //className="bg-white rounded"
              error={!phone_number}
              helperText={!phone_number && "Required"}
            />
          </div>
        </div>
        
        <div className="m-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
        <div className="d-flex">
          <Button
            //disabled={activeStep === 0}
            //onClick={handleBack}
            onClick={() => this.props.history.push("/admin/candidatelist")}
            className="ml-auto mr-2"
          >
            Back
          </Button>
          <Button variant="contained" color="primary" disabled={isLoading} onClick={this.formSubmit}>
             { isLoading && <CircularProgress color="secondary" size={20} className="mr-2" /> } Next
          </Button>
        </div>
        <SweetAlert show={isUploadSuccess} success title={"Congratulations!"/*<IntlMessages id="sweetAlerts.goodJob"/>*/}
                    onConfirm={ () => this.setState({ isUploadSuccess: false }) }>
          Your CV has been uploaded successfully.
          {/*<IntlMessages id="sweetAlerts.btnClicked"/>*/}
        </SweetAlert>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { dialList } = state.list;
  return { dialList };
};

export default withRouter(connect(mapStateToProps, null)(AccountInfo));