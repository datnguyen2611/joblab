import React from 'react';
import { connect } from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom';
import { userSignOut, updateUserStatus, updateUser } from 'actions/Auth';
import IntlMessages from 'util/IntlMessages';
import axios from 'axios';
import Avatar from 'react-avatar';
import { requestInitUser } from 'actions/Auth';  

class UserInfoPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      isLoading: false,
      email: '',
      password: '',
    };
  }
  
  logout = () => {
    userSignOut().then(resp => {
      if (resp.isSuccess) {
        this.props.dispatch(requestInitUser());
        this.props.history.push('/');
      }
    })
  }
  
  render() {
    const { userType, userData } = this.props;
    const { name, pictureUrl } = userData;
    return (
      <div>
        <div className="user-profile">
          <Avatar 
            round={ true } 
            size={ 42 }
            style={ {margin: 2, boxShadow: '0px 0px 30px grey', backgroundColor: 'white'} }
            src={ pictureUrl } 
            name={ name.firstName+" "+name.lastName } 
          />
          <div className="user-detail ml-2">
            <h4 className="user-name mb-0">{name.firstName + " " + name.lastName}</h4>
            {/*<small>Administrator</small>*/}
          </div>
        </div>
        <div className="nav-decoration-none">
          <NavLink to={"/"+userType+"/dashboard"}>
            <span className="jr-link dropdown-item text-muted">
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw mr-1"/>
              Dashboard
            </span>
          </NavLink>
          { userType=="candidate" && 
          <NavLink to="/candidate/profile">
            <span className="jr-link dropdown-item text-muted">
              <i className="zmdi zmdi-face zmdi-hc-fw mr-1"/>
              <IntlMessages id="popup.profile"/>
            </span>
          </NavLink>
          }
          <NavLink to="/settings">
            <span className="jr-link dropdown-item text-muted">
              <i className="zmdi zmdi-settings zmdi-hc-fw mr-1"/>
              <IntlMessages id="popup.setting"/>
            </span>
          </NavLink>
          <span className="jr-link dropdown-item text-muted" onClick={this.logout}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-1"/>
            <IntlMessages id="popup.logout"/>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userType, userData } = state.auth;
  return { userType, userData }
};


export default withRouter(connect(mapStateToProps)(UserInfoPopup));


