import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import CircularProgress from '@material-ui/core/CircularProgress';
// Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import UploadButton from "components/UploadButton";
import { requestInitUser } from 'actions/Auth';  
import * as notification from 'actions/Notification';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      isLoading: false,
      isUploadLoading: false,
      isUploadSuccess: false,
      isUploaded: false,
      
      userType: 'candidate',
      
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      dial: { value: "+852", label: "+852" },
      phone_number: '',
      company: '',
      companyText: '',
      //cvData: {},
      cvFile: null,
      cvToken: null,
      cvFileType: null,
      cvFilePath: null,
      
      isEmailUnused: true,
    };
  }
  
  componentDidMount() {
    if (this.props.isClient)
      this.setState({ userType: 'client' });
    
    this.suggestThemeSignUp = {
      container:                'containerProfile',
      containerOpen:            'containerOpenProfile',
      input:                    'inputSignUp',
      inputOpen:                'inputOpenProfile',
      inputFocused:             'inputFocusedProfile',
      suggestionsContainer:     'suggestionsContainerSignUp',
      suggestionsContainerOpen: 'suggestionsContainerOpenProfile',
      suggestionsList:          'suggestionsListProfile',
      suggestion:               'suggestionProfile',
      suggestionFirst:          'suggestionFirstProfile',
      suggestionHighlighted:    'suggestionHighlightedProfile',
      sectionContainer:         'sectionContainerProfile',
      sectionContainerFirst:    'sectionContainerFirstProfile',
      sectionTitle:             'sectionTitleProfile'
    }
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
  
  /*handleSelectChange = (object, name) => {
    this.setState({ [name]: object });
  };*/
  
  cvUpload = (acceptedFiles) => {
  //cvUpload = (e) => {
    //e.preventDefault();
    this.setState({ isUploadLoading: true });
    
    //let cvFile = e.target.files[0]
    //console.log(e.target.files);
    let cvFile = acceptedFiles[0];
    const formData = new FormData();
    if (cvFile != null && cvFile.name &&cvFile.name.toLowerCase().match(/(pdf|doc|docx).*/)) {
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
            //cvDataParsed: res.data.cvDataParsed,
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
  
  formSubmit = (e) => {
    e.preventDefault();
    
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
    
    if (this.props.isClient) {
      var company = (this.state.company && this.state.company.name) ? this.state.company.name : this.state.companyText;
      console.log(company)
      data.company = company;
    }
      
    axios.post('/api/auth/signup', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have registered your account successfully.");
        const data = {
          email: this.state.email,
          password: this.state.password
        }
        axios.post('/api/auth/login', data)
        .then(res => {
          if (res.data.isSuccess) {
            this.setState({ isLoading: false });
            if (this.props.isPopup)
              this.props.closePopup();
            this.props.requestInitUser();
            this.props.history.push('/verification');
          }
          else {
            notification.error("The action cannot be performed at the moment. Please try again later.");
            this.setState({ isLoading: false });
          }
        })
        .catch(function (err) {
          console.log(err);
        });
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
    const { isClient } = this.props;
    const { isUploadLoading, isUploadSuccess, isUploaded } = this.state;
    const { firstName, lastName, email, password, password2, dial, phone_number } = this.state;
    const { isEmailUnused } = this.state;
    const { dialList, companyList } = this.props;
    const { company, companyText } = this.state;
    
    const filterOptions = createFilterOptions({
      matchFrom: 'any',
      stringify: option => ((option.name ? option.name : "")),
    });
    
    return (
      <div className="login-form">
        { (!isUploaded && !isClient) && <div className="upload-CV">
          <p class="font-weight-bold">Upload your CV</p>
          <p class="font-weight-bold">Auto-build your profile in seconds</p>
          <div className="mx-auto w-75 my-3">
            <Dropzone className="dropzone" accept='.doc,.docx,.pdf' onDrop={acceptedFiles => this.cvUpload(acceptedFiles)}> 
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps({style:{'top':'15%','position': 'relative'}, className: 'dropzone-file-btn'})}>
                  <input {...getInputProps()} />
                  { isUploadLoading ?
                    <CircularProgress color="secondary" className="m-auto" />
                    :
                    <p>Drag and drop CV here, or click to select CV.</p>
                  }
                </div>
              )}
            </Dropzone>
          </div>
          {/*<UploadButton name="Upload CV" accept=".doc,.docx,.pdf" isLoading={isUploadLoading} onChange={this.cvUpload} />*/}
    		  <div className="extra-login">
            <span className="or">OR</span>
          </div>
          <div className="mb-4">
            <Button variant="contained" color="primary" className="btn btn-primary jr-btn-rounded" fullWidth disabled={this.state.isUploadLoading} onClick={() => this.setState({ isUploaded: true })}>
              {/*<i className="la la-key"></i>*/}
              Register Account
            </Button>
          </div>
    		</div>
        }
        { (isUploaded || isClient) &&
          <form onSubmit={this.formSubmit}>
            <div className="form-group">
              { isClient && <Autocomplete
                  value={company}
                  options={companyList ? companyList : []}
                  getOptionLabel={option => option.name}
                  filterOptions={filterOptions}
                  freeSolo
                  autoHighlight={true}
                  blurOnSelect={true}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      label="Company" 
                      fullWidth
                      variant="outlined"
                      error={!(company || companyText)}
                      helperText={!(company || companyText) && "Required"}
                      /*InputProps={{
                        style: {
                          backgroundColor: "white",
                          borderRadius: 4
                        }    
                      }}*/
                    />
                    /*<InputBase ref={params.InputProps.ref}
                      inputProps={params.inputProps} placeholder="Company Name" className="form-control form-control-lg employer" />*/
                  )}
                  onChange={(e, value) => this.autocompleteChange(e, value, 'company')}
                  onInputChange={(e, value) => this.autocompleteChange(e, value, 'companyText')}
              /> }
              {/*<input type="text" name="company" placeholder="Company Name" value={this.state.company} onChange={this.textboxChange}
                     className="form-control form-control-lg employer"/>*/}
            </div>
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="form-group half-input">
                  {/*<input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.textboxChange}
                         className="form-control form-control-lg"/>*/}
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
              </div>
              <div className="col-md-6 col-6">
                <div className="form-group half-input">
                  {/*<input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.textboxChange}
                         className="form-control form-control-lg"/>*/}
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
              </div>
            </div>
            <div className="form-group">
              {/*<input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.textboxChange}
                     className="form-control form-control-lg"/>*/}
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
                /*InputProps={{
                  style: {
                    backgroundColor: "white",
                    borderRadius: 4
                  }    
                }}*/
              />
            </div>
            <div className="form-group">
              {/*<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.textboxChange}
                     className="form-control form-control-lg"/>*/}
              <TextField
                name="password"
                label="Password"
                type="password"
                //error={isPasswordMismatch}
                fullWidth
                variant="outlined"
                placeholder="******"
                //variant="outlined"
                value={password}
                onChange={this.textboxChange}
                error={!password || !(password.length>=8)}
                helperText={!password ? "Required" : !(password.length>=8) && "Password must be at least 8 characters long."}
                /*InputProps={{
                  style: {
                    backgroundColor: "white",
                    borderRadius: 4
                  }    
                }}*/
              />
            </div>
            <div className="form-group">
              {/*<input type="password" name="password2" placeholder="Confirm Password" value={this.state.password2} onChange={this.textboxChange}
                     className="form-control form-control-lg"/>*/}
              <TextField
                name="password2"
                label="Confirm Password"
                type="password"
                fullWidth
                variant="outlined"
                placeholder="******"
                //variant="outlined"
                value={password2}
                onChange={this.textboxChange}
                error={!(password==password2)}
                helperText={!(password==password2) && "Password mismatch."}
                /*InputProps={{
                  style: {
                    backgroundColor: "white",
                    borderRadius: 4
                  }    
                }}*/
              />
            </div>
            <div className="row">
              <div className="col-md-5 col-6">
                <div className="form-group">
                  {/*<div className="form-control form-control-lg dial">
                    <Select
    				  			  className="react-select-container"
    			 					  classNamePrefix="react-select"
                      value={this.state.dial}
                      onChange={(obj) => this.handleSelectChange(obj,'dial')}
                      options={dialList}
                      isMulti={false}
                      defaultMenuIsOpen={false}
                    />
                  </div>*/}
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
              </div>
              <div className="col-md-7 col-6">
                <div className="form-group">
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
                  {/*<div className="form-control form-control-lg phone">
                    <input type="text" name="phone_number" placeholder="Phone Number" value={this.state.phone_number} onChange={this.textboxChange}
                     className="form-control form-control-lg"/>
                  </div>*/}               
                </div>
              </div>
            </div>
            <Button type="submit" variant="contained" color="primary" className="my-3 btn btn-primary jr-btn-rounded" fullWidth disabled={this.state.isLoading} onClick={this.formSubmit}>
              {this.state.isLoading && <i className='fa fa-spinner fa-spin'/>} Register
            </Button>
            {/*<div className="mt-4 mb-2">
              <button type="submit" className="btn btn-primary jr-btn-rounded w-100"
              disabled={this.state.isLoading}>{this.state.isLoading && <i className='fa fa-spinner fa-spin'/>}
                Register
              </button>
            </div>*/}
            
          </form>
        }
        { !isClient && 
          <p>
            {/*<IntlMessages id="appModule.hvAccount"/>*/}
            Register as a Client?
            <Link to="/employer/register" className="ml-1" onClick={this.props.closePopup}>
              {/*<IntlMessages id="appModule.signIn"/>*/}
              Sign Up
            </Link>
          </p> 
        }
        <SweetAlert show={isUploadSuccess} success title={"Congratulations!"/*<IntlMessages id="sweetAlerts.goodJob"/>*/}
                    onConfirm={ () => this.setState({ isUploadSuccess: false, isUploaded: true }) }>
          Your CV has been uploaded successfully.
          {/*<IntlMessages id="sweetAlerts.btnClicked"/>*/}
        </SweetAlert>
      </div>
    );
  }
  
}

function mapStateToProps(state) {
  const { dialList, companyList } = state.list;
  return { dialList, companyList };
}

const mapDispatchToProps = {
  requestInitUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm));
