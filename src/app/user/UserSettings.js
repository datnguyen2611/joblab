import React, { Component } from 'react';
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContainerHeader from 'components/ContainerHeader';

import ProfilePictureChange from 'components/settings/ProfilePictureChange';
import NameChange from 'components/settings/NameChange';
import PasswordChange from 'components/settings/PasswordChange';
import PhoneChange from 'components/settings/PhoneChange';

class UserSettings extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loader : true,
      isFormLoading: false,
    }
  }
    
  componentDidMount() {
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    
    setTimeout(() => {
      this.setState({ loader: false });
    }, 500);
  }
  
  render() {
    const { loader } = this.state;
    return (
      <div className="app-wrapper">
      { loader ?
        <div className="loader-view"
             style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
          <CircularProgress />
        </div> : 
        <div style={{'width':'80%','margin': '0 auto'}} className="animated slideInUpTiny animation-duration-3">
          <ContainerHeader title="Settings" />
          <div className="row">
            <div className="col-md-4 col-12">
              <ProfilePictureChange />
            </div>
            <div className="col-md-8 col-12">
              <NameChange /> 
              <PasswordChange />
              <PhoneChange />
            </div>
          </div>
        </div>
      }
      </div>
    )
  }
}

export default UserSettings;
