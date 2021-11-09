import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import Auxiliary from "util/Auxiliary";
import { AVATAR_DEFAULT_URL } from 'constants/PictureUrl';

import { numberWithCommas } from 'actions/Function.js';

class Profile extends Component {
  componentDidMount() {
    
  }
  
  render() {
    const { name, pictureUrl } = this.props.userData;
    const { career, salary, experience } = this.props.candidateData;
    {/*const {user, userInfo} = this.props;
    const {id, name, image, address} = user;
    const {followers, following, frinds} = userInfo;*/}
    return (
      <Auxiliary>
        <div className="jr-profileon">
          <div className="jr-profileon-thumb jr-profileon-thumb-htctrcrop dashboard-cutting">
            <img 
            src={(pictureUrl == null) ? 
                  AVATAR_DEFAULT_URL : 
                  pictureUrl} alt='' />
          </div>
          <div className="jr-profileon-content">
            <p className="jr-profileon-title">{name.firstName} {name.lastName}</p>
            <span className="jr-fs-sm">{career.length>0 && career[0].jobTitle+" at "+career[0].company}</span>
          </div>
        </div>

        <div className="jr-follower text-center">
          <ul className="jr-follower-list">
            <li>
              <span className="jr-follower-title"><b>{"$"+numberWithCommas(salary)}</b></span>
              <span>Monthly Salary</span>
            </li>
            <li>
              <span className="jr-follower-title"><b>{experience ? experience : "-"}</b></span>
              <span>Year of Experience</span>
            </li>
            <li>
              <span className="jr-follower-title"><b>{career.length}</b></span>
              <span>Career Count</span>
            </li>
          </ul>
        </div>
        <div className="mb-xl-4 mb-3">
          <Button size="small" variant="contained" className="mb-0" color="primary"
                    onClick={(e) => this.props.history.push("/candidate/profile")}>Go to Profile</Button>
        </div>
      </Auxiliary>
    )
  }
}

const mapStateToProps = (state) => {
  const { userData, candidateData } = state.auth;
  return { userData, candidateData }
};

export default withRouter(connect(mapStateToProps)(Profile));
