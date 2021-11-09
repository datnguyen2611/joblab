import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//import Avatar from '@material-ui/core/Avatar';
import Avatar from 'react-avatar';
import { numberWithCommas } from 'actions/Function.js';


class CandidateHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDownloadLoading: false,
    };
  }
  
  componentDidMount() {

  }
  
  openResume = () => {
    var userType = this.props.userType;
    switch (userType) {
      case 'admin':
        var { _id } = this.props.candidateData._id;
        window.open("/resume/" + _id, "_blank");
        break;
      case 'client':
        var appId = this.props.appId;
        window.open("/resume/" + appId, "_blank");
        break;
      default: 
        var resumeToken = this.props.resumeToken;
        window.open("/applicant/" + resumeToken, "_blank");
        break;
    }
  }
  
  render() {
    const appId = this.props.appId;
    console.log(this.props.candidateData)
    const { name, pictureUrl } = this.props.candidateData._id;
    const { salary, experience, career } = this.props.candidateData;
    const { userType } = this.props;
    
    return (
      <div className="jr-profile-banner blurish-green">
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top">
            <div className="jr-profile-banner-top-left">
              <div className="jr-profile-banner-avatar">
              <div className="propic-hover profile">
                <Avatar 
                  round={ true } 
                  size={ 150 }
                  style={ {margin: 2, boxShadow: '0px 0px 30px grey', backgroundColor: 'white', cursor: 'default'} }
                  src={ pictureUrl } 
                  name={ name && name.firstName+" "+name.lastName } 
                />
              </div>
              </div>
              <div className="jr-profile-banner-avatar-info">
                <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">
                  { name && name.firstName+" "+name.lastName }
                </h2>
                <p className="mb-2 jr-fs-lg">{career && (career.length>0 && career[0].jobTitle + " at " + career[0].company)} </p>
                <Button variant="contained" color="primary" className="jr-btn" onClick={() => this.openResume()}>
                  View Resume
                </Button>
              </div>
            </div>
            <div className="jr-profile-banner-top-right">
              <ul className="jr-follower-list">
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{salary ? "$" + numberWithCommas(salary) : "-"}</span>
                  <span className="jr-fs-sm">Monthly Salary</span></li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{experience}</span>
                  <span className="jr-fs-sm">Year of Exp.</span></li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{career && career.length}</span>
                  <span className="jr-fs-sm">Career Count</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="jr-profile-banner-bottom">
            <span className="jr-link jr-profile-setting">
              
            </span>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userType } = state.auth;
  return { userType };
}

export default withRouter(connect(mapStateToProps, null)(CandidateHeader));

