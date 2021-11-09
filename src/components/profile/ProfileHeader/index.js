import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link as ScrollLink } from 'react-scroll';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
//import Avatar from '@material-ui/core/Avatar';
import Avatar from 'react-avatar';
import { store } from 'react-notifications-component';
import { requestInitUser } from 'actions/Auth';  
import { numberWithCommas } from 'actions/Function.js';

import UploadButton from "components/UploadButton";
import ProfilePictureEdit from 'components/popup/ProfilePictureEdit';

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //isEdit: false,
      isProfileEdit: false,
      //isUploadLoading: false,
      isDownloadLoading: false,
      
      //newFirstName: '',
      //newLastName: '',
      newPicturlUrl: '',
      image:'',
      isOpenDragDropImgPop: false,
      isOpenChangeImgPop: false,
      imagescale: 1
    };
  }
  
  componentDidMount() {
    if (this.props.userData)
      this.setState({
        //newFirstName: this.props.userData.name && this.props.userData.name.firstName,
        //newLastName: this.props.userData.name && this.props.userData.name.lastName,
        newPictureUrl: this.props.userData.name.pictureUrl,
      })
  }
  
  /*textboxChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value
    });
  }*/
  
  handleDrop = dropped => {
    this.setState({ newPictureUrl: dropped[0] })
  }
  
  /*editSave = () => {
    const data = {
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName,
    };
    axios.post('/api/users/set/profile/name/update', data)
    .then(res => {
      console.log(res.data);
      if (res.data.isSuccess) {
        this.props.requestInitUser();
        this.setState({ isEdit: false });
        
        store.addNotification({
          title: "Success",
          message: "Your Profile has been updated successfully",
          type: "success",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            //onScreen: true
          }
        });
      }
      else {
        alert(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  editCancel = () => {
    this.setState({
      isEdit: false,
      newFirstName: this.props.userData.name && this.props.userData.name.firstName,
      newLastName: this.props.userData.name && this.props.userData.name.lastName,
    })
  }*/
  
  cvUpload = (e) => {
    console.log("Start to upload CV");
    e.preventDefault();
      
    let cvFile = e.target.files[0]
    console.log(e.target.files);
    this.props.cvUpload(cvFile);
    e.target.value = null;
  }
  
  cvDownload = () => {
    this.setState({ isDownloadLoading: true });
    console.log("Start to download CV");
    //console.log(this.state.candId)
    if(this.props.candidateData) {
      var data = {};
      if (this.props.history.location.pathname.includes("/applicant"))
        data = { token: this.props.match.params.token }
      else 
        data = { candId: this.props.candidateData._id }
      axios({
        url: '/api/candidates/set/resume/download',//'/api/gen/getCV',
        method: 'POST',
        data: data,
        responseType: 'blob', // important
      }).then((response) => {
        this.setState({ isDownloadLoading: false });
        var filename = null;
        var disposition = response.headers['content-disposition'];
        if (disposition && disposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) { 
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        if(filename)
        {
          var url = window.URL.createObjectURL(new Blob([response.data]));
          var link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          //clean element
          document.body.removeChild(link);
      　　window.URL.revokeObjectURL(url);
        }
        else
        {
          this.setState({ isDownloadLoading: false });
          alert("Error! Cannot download CV.");
        }
      }).catch((error) => {
        this.setState({ isDownloadLoading: false });
        alert("Cannot download CV. Please login again.");
      })
    }
    else
    {
      this.setState({ isDownloadLoading: false });
      alert("Error! Cannot download CV.");
    }
    
  }
  
  closeProfilePictEdit =() => {
    this.setState({ isProfileEdit: false });
  }

  
  render() {
    const userRole = this.props.userRole;
    const { name, pictureUrl } = this.props.userData;
    const { salary, experience, career } = this.props.candidateData;
    const { /*isEdit, newFirstName, newLastName,*/ /*isUploadLoading,*/ isDownloadLoading } = this.state;
    const { isUploadLoading } = this.props;

    return (
      <div className="jr-profile-banner blurish-green profile-photo-bg"><div className="color-overlay"></div>
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top">
            <div className="jr-profile-banner-top-left">
              <div className="jr-profile-banner-avatar">
              <div className={`profile ${(userRole=="candidate") ? "propic-hover" : ""}`}>
                <Avatar 
                  round={ true } 
                  size={ 150 }
                  style={ {margin: 2, boxShadow: '0px 0px 30px grey', backgroundColor: 'white', cursor: userRole=="candidate" ? 'pointer' : 'default'} }
                  src={ pictureUrl } 
                  name={ name && name.firstName+" "+name.lastName } 
                  onClick={ () => userRole=="candidate" && this.setState({ isProfileEdit: true }) } 
                />
                <div className="edit-propic profile" onClick={ () => this.setState({ isProfileEdit: true }) }><h3><i className="zmdi zmdi-camera"></i>&nbsp;Upload</h3></div>
              </div>
                {/*<Avatar className="size-90" alt="..." src='https://via.placeholder.com/124x106'/>*/}
              </div>
              <div className="jr-profile-banner-avatar-info">
                <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">
                  { name && name.firstName+" "+name.lastName }
                  {/* !isEdit && name && name.firstName+" "+name.lastName }
                  { isCandidate && !isEdit &&
                    <IconButton className="icon-btn text-light mt-n2 mr-n2" onClick={() => this.setState({ isEdit: true })}>
                      <i className="zmdi zmdi-edit"/>
                    </IconButton>
                  }
                  { isCandidate && isEdit &&
                    <div className="row">
                      <div className="col-6">
                        <TextField
                          id="newFirstName"
                          name="newFirstName"
                          label="First Name"
                          value={newFirstName}
                          onChange={this.textboxChange}
                          fullWidth
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <TextField
                          id="newLAstName"
                          name="newLastName"
                          label="Last Name"
                          value={newLastName}
                          onChange={this.textboxChange}
                          fullWidth
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                          }}
                        />
                      </div>
                      <div className="col-12">
                        <Button variant="contained" className="mt-2 mr-2" color="primary" onClick={this.editSave}>Save</Button>
                        <Button className="mt-2 mr-2 text-white" onClick={this.editCancel}>Cancel</Button>
                      </div>
                    </div>
                  */}
                </h2>
                <p className="mb-0 jr-fs-lg">{career && (career.length>0 && career[0].jobTitle + " at " + career[0].company)} </p>
                {/*<span className="badge badge-info badge-pill d-inline-block mt-2 px-3"><i class="fas fa-unlock pr-1"></i>Public</span>*/}
                <span className="badge badge-secondary badge-pill d-inline-block mt-2 px-3" style={{"background-color":"#e06a92"}}><i class="fas fa-lock pr-1"></i>Private</span>
              </div>
            </div>
            <div className="jr-profile-banner-top-right">
              <ul className="jr-follower-list">
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">${salary ? numberWithCommas(salary) : "-"}</span>
                  <span className="jr-fs-sm">Monthly Salary</span></li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{experience ? experience : "-"}</span>
                  <span className="jr-fs-sm">Years(s) Exp.</span></li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{career && career.length}</span>
                  <span className="jr-fs-sm">Career Count</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="jr-profile-banner-bottom">
            <div className="jr-tab-list">
              <ul className="jr-navbar-nav">
                <li>
                  <ScrollLink activeClass="active" className="jr-link" to="about" spy={true} smooth={true} offset={-80} duration={500}>About</ScrollLink>
                  {/*<span className="jr-link">About</span>*/}
                </li>
                <li>
                  <ScrollLink activeClass="active" className="jr-link" to="career" spy={true} smooth={true} offset={-80} duration={500}>Career</ScrollLink>
                </li>
                <li>
                  <ScrollLink activeClass="active" className="jr-link" to="education" spy={true} smooth={true} offset={-80} duration={500}>Education</ScrollLink>
                </li>
                <li>
                  <ScrollLink activeClass="active" className="jr-link" to="speciality" spy={true} smooth={true} offset={-80} duration={500}>Speciality</ScrollLink>
                </li>
                <li>
                  <ScrollLink activeClass="active" className="jr-link" to="introductionVideo" spy={true} smooth={true} offset={-80} duration={500}>Intro-Video</ScrollLink>
                </li>
                {/*<li>
                  <ScrollLink activeClass="active" className="jr-link" to="contact" spy={true} smooth={true} offset={-80} duration={500}>Contact</ScrollLink>
                </li>*/}
              </ul>
            </div>
            <span className="jr-link jr-profile-setting">
              { (userRole=="candidate" || userRole=="client" || userRole=="admin") &&
                <Button className="jr-btn jr-btn-lg text-white" onClick={this.cvDownload}>
                { isDownloadLoading ?
                  <CircularProgress color="secondary" size={20} className="mr-2" />
                  :
                  <i className="zmdi zmdi-download zmdi-hc-fw"/>
                }
                  <span>Download CV</span>
                </Button>
              }
              { (userRole=="candidate" || userRole=="admin") && <UploadButton name="Upload CV" accept=".doc,.docx,.pdf" isLoading={isUploadLoading} onChange={this.cvUpload} /> }
            </span>
            {/*<span className="jr-link jr-profile-setting">
              <i className="zmdi zmdi-settings mr-2"/>
              <span className="d-inline-flex align-middle ml-1 jr-ml-sm-0" onClick={this.props.editProfile}>Edit Profile</span>
            </span>*/}
          </div>
        </div>
        
        <ProfilePictureEdit isProfileEdit={this.state.isProfileEdit} closeModal={this.closeProfilePictEdit} />
      </div>
    )
  }
}

/*const mapDispatchToProps = {
  requestInitUser,
}

export default connect(null, mapDispatchToProps)(ProfileHeader);*/
export default withRouter(ProfileHeader);

