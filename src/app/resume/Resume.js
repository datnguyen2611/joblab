import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Element } from 'react-scroll';
import CircularProgress from '@material-ui/core/CircularProgress';
import About from "components/profile/About/index";
import Biography from "components/profile/Biography/index";
import Goal from "components/profile/Goal/index";
import Contact from "components/profile/Contact/index";
import SkillTag from "components/profile/SkillTag/index";
import IntroductionVideo from 'components/profile/IntroductionVideo/index';
import ProfileHeader from "components/profile/ProfileHeader/index";
import Career from 'components/profile/Career/index';
import Education from 'components/profile/Education/index';
import Auxiliary from "util/Auxiliary";
import { Helmet } from 'react-helmet';
import {ResponsiveContainer} from 'recharts';
import Widget from "components/Widget";

import SweetAlert from 'react-bootstrap-sweetalert';
import * as notification from 'actions/Notification';

import { requestInitUser } from 'actions/Auth';  

import { VERTICAL_NAVIGATION } from 'constants/ActionTypes'

//import { RadialChart } from 'recharts';

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      
      userRole: null,
      userId: null,
      token: "token",
      userData: null,
      candidateData: null,
      
      uploadedCV: null,
      isUploadLoading: false,
      isUploadSuccess: false,
      
      isUploadedCareerEdit: [],
      isUploadedEducationEdit: [],
      isUploadedAboutEdit: false,
      isUploadedDescriptionEdit: false,
      isUploadedSpecialityEdit: false,
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    this.getUserData();
    /*setTimeout(() => {
      this.setState({ loader: false });
    }, 1000);*/
  }
  
  componentDidUpdate(prevProps) { //For Upload CV
    if (this.props.userData !== prevProps.userData) 
      this.setState({ userData: this.props.userData });
    if (this.props.candidateData !== prevProps.candidateData) 
      this.setState({ candidateData: this.props.candidateData });
  }
  
  
  getUserData = () => {
    if (this.props.history.location.pathname=="/candidate/profile") {
      this.setState({
        loader: false,
        userRole: 'candidate',
        token: this.props.userData._id,
        userData: this.props.userData,
        candidateData: this.props.candidateData,
      }, () => this.props.requestInitUser());
    }
    else if (this.props.history.location.pathname.includes("/applicant")) {
      var token = this.props.match.params.token;
      axios.get('/api/clients/get/encrypted/resume/'+token)
      .then(res => {
        if (res.data.isSuccess) {
          this.setState({
            //userRole: 'client',
            token: token,
            userData: res.data.userData,
            candidateData: res.data.candidateData,
          })
        }
        else {
          console.log(res.data)
          //this.props.history.push("/")
        }
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(() => { this.setState({loader:false}) });
    }
    else {
      switch (this.props.userType) {
        case 'admin':
          var candId = this.props.match.params.Id;
          axios.get('/api/admins/get/candidate/resume/'+candId)
          .then(res => {
            if (res.data.isSuccess) {
              this.setState({
                userRole: 'admin',
                userData: res.data.userData,
                candidateData: res.data.candidateData,
                token: candId
              });
            }
          })
          .catch(function (err) {
            console.log(err);
          })
          .finally(() => { this.setState({loader:false}) });
          break;
        case 'client':
          var appId = this.props.match.params.Id;
          axios.get('/api/clients/get/candidate/resume/'+appId)
          .then(res => {
            if (res.data.isSuccess) {
              this.setState({
                userRole: 'client',
                userData: res.data.userData,
                candidateData: res.data.candidateData,
              })
            }
            else {
              //this.props.history.push("/")
            }
          })
          .catch(function (err) {
            console.log(err);
          })
          .finally(() => { this.setState({loader:false}) });
          break;
        default:
          this.props.history.push("/");
      }
    }
  }
  
  cvUpload = (cvFile) => {
    this.setState({ isUploadLoading: true });
    
    const formData = new FormData();
    if (cvFile != null && cvFile.name &&cvFile.name.toLowerCase().match(/(pdf|doc|docx).*/)) { 
      formData.append('cvFile', cvFile);
      console.log('start to upload cv');
      axios.post('/api/candidates/set/resume/upload', formData)
      .then(res => {
        if (res.data.isSuccess) {
          console.log(res.data.cvDataParsed)
          this.setState({ 
            isUploadLoading: false,
            isUploadSuccess: true,
            
            uploadedCV: (res.data.cvDataParsed==null) ? null : res.data.cvDataParsed,
            isUploadedCareerEdit: (res.data.cvDataParsed.career==null) ? [] : new Array(res.data.cvDataParsed.career.length).fill(true),
            isUploadedEducationEdit: (res.data.cvDataParsed.education==null) ? [] : new Array(res.data.cvDataParsed.education.length).fill(true),
            isUploadedAboutEdit: true,
            isUploadedDescriptionEdit: true,
            isUploadedSpecialityEdit: true,
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
    } else {
      notification.error("Please upload CV in pdf / doc / docx formats.");
      this.setState({ isUploadLoading: false });
    }
  }
  
  cancelUploadCareer = (index) => {
    let array = [...this.state.isUploadedCareerEdit];
    if (index !== -1) {
      array[index] = false;
      this.setState({isUploadedCareerEdit: array});
    }
    {/*this.setState(prevState => ({ 
      uploadedCareer: prevState.uploadedCareer.filter(obj => obj.tempId !== selectedId) 
    }));*/}
  }
  
  cancelUploadEducation = (index) => {
    let array = [...this.state.isUploadedEducationEdit];
    if (index !== -1) {
      array[index] = false;
      this.setState({isUploadedEducationEdit: array});
    }
  }
  
  cancelUploadAbout = () => {
    this.setState({ isUploadedAboutEdit: false })
  }
  
  cancelUploadDescription = () => {
    this.setState({ isUploadedDescriptionEdit: false })
  }
  
  cancelUploadSpeciality = () => {
    this.setState({ isUploadedSpecialityEdit: false })
  }
  
  render() {
    const { loader, userRole, userData, candidateData, token } = this.state;
    const { uploadedCV, isUploadLoading, isUploadSuccess, isUploadedCareerEdit, isUploadedEducationEdit, isUploadedAboutEdit, isUploadedDescriptionEdit, isUploadedSpecialityEdit } = this.state;
    const myData = [{angle: 1}, {angle: 5}, {angle: 2}];
    
    return (
      <div className="app-wrapper">
      { loader ?
        <div className="loader-view"
             style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
          <CircularProgress/>
          <Helmet>
              <title>JobsLab</title>
          </Helmet>
        </div> : 
          candidateData ?
          <Auxiliary>
            <Helmet>
                <title>
                  {userRole=="candidate" ? "My Profile | Jobslab" : 
                    ( userData && userData.name 
                      ? userData.name.firstName + " " + userData.name.lastName + "'s Profile | Jobslab"
                      : "JobsLab" 
                    )
                  }
                </title>
            </Helmet>
            <ProfileHeader userRole={userRole} userData={userData} candidateData={candidateData} isUploadLoading={isUploadLoading} cvUpload={this.cvUpload}/>
            <div className="jr-profile-content">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-7 col-12">
                  <Element name="about" className="element">
                    <About userRole={userRole} candidateData={candidateData} uploadedCV={uploadedCV} isUploadEdit={isUploadedAboutEdit} cancelUploadEdit={this.cancelUploadAbout} getUserData={this.getUserData} />
                  </Element>
                  <Biography userRole={userRole} candidateData={candidateData} uploadedCV={uploadedCV} isUploadEdit={isUploadedDescriptionEdit} cancelUploadEdit={this.cancelUploadDescription} getUserData={this.getUserData} />
                  <Element name="career" className="element">
                    <Career userRole={userRole} candidateData={candidateData} uploadedCV={uploadedCV} isUploadEdit={isUploadedCareerEdit} cancelUploadEdit={this.cancelUploadCareer} getUserData={this.getUserData} />
                  </Element>
                  <Element name="education" className="element">
                    <Education userRole={userRole} candidateData={candidateData} uploadedCV={uploadedCV} isUploadEdit={isUploadedEducationEdit} cancelUploadEdit={this.cancelUploadEducation} getUserData={this.getUserData} />
                  </Element>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-5 col-12">
                  <Element name="introductionVideo" className="element">
                    <IntroductionVideo
                        userRole={userRole}
                        token={token}
                         //getInVideo={this.getInVideo.bind(this)}
                       />
                  </Element>
                  <Goal userRole={userRole} candidateData={candidateData} getUserData={this.getUserData} />
                  <Element name="speciality" className="element">
                    <SkillTag userRole={userRole} candidateData={candidateData} uploadedCV={uploadedCV} isUploadEdit={isUploadedSpecialityEdit} cancelUploadEdit={this.cancelUploadSpeciality} getUserData={this.getUserData} />
                  </Element>
                  { userRole=='admin' && <Element name="contact" className="element">
                    <Contact userRole={userRole} userData={userData} getUserData={this.getUserData} />
                  </Element>}
                </div>
              </div>
            </div>
            <SweetAlert show={isUploadSuccess} success title={"Congratulations!"/*<IntlMessages id="sweetAlerts.goodJob"/>*/}
                        onConfirm={ () => this.setState({ isUploadSuccess: false }) }>
              Your CV has been uploaded successfully. Please double check the uploaded data and update your profile.
              {/*<IntlMessages id="sweetAlerts.btnClicked"/>*/}
            </SweetAlert>
          </Auxiliary> 
          : <div className="jobNotFound">
              <span>
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
              </span>
              <span>
                Oops! The resume is not found.
              </span> 
          </div>
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userType, userData, candidateData } = state.auth;
  return { userType, userData, candidateData };
}

const mapDispatchToProps = {
  requestInitUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Resume));
