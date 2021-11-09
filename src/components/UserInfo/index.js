import React from 'react';
import {withRouter} from 'react-router-dom';
//import Avatar from '@material-ui/core/Avatar'
import Avatar from 'react-avatar';
import { connect } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import {userSignOut} from 'actions/Auth';
import IntlMessages from '../../util/IntlMessages';
import { requestInitUser, userSignOut } from 'actions/Auth';  

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  /*componentDidMount() {
    if (this.props.info) {
      this.setState({
        firstName : this.props.info.firstName,
        lastName : this.props.info.lastName,
        pictureUrl: this.props.info.pictureUrl,
        isLoggedin : this.props.info.isLoggedin
      });
    }
  }*/
  
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

   logout = () => {
    userSignOut().then(resp => {
      if (resp.isSuccess) {
        this.props.dispatch(requestInitUser());
        this.props.history.push('/');
      }
    })
  }
  
  render() {
    const { name, pictureUrl } = this.props.userData;
    return (
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar 
          round={ true } 
          size={ 42 }
          style={ {margin: 10, boxShadow: '0px 0px 30px grey', backgroundColor: 'white'} }
          src={ pictureUrl } 
          name={ name.firstName+" "+ name.lastName } 
        />
        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}> {name.firstName + " " + name.lastName} {/*<i
            className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>*/}
          </h4>
        </div>
        <div className="user-logout" style={{'margin-left':'auto','cursor': 'pointer'}} onClick={this.logout}>
          <i className="zmdi zmdi-sign-in zmdi-hc-2x ml-1 mr-3"/>
        </div>
        {/*<Menu className="user-info"
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
              PaperProps={{
                style: {
                  minWidth: 120,
                  paddingTop: 0,
                  paddingBottom: 0
                }
              }}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
            <IntlMessages id="popup.profile"/>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2"/>
            <IntlMessages id="popup.setting"/>
          </MenuItem>
          <MenuItem onClick={() => {
            this.handleRequestClose();
          }}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>

            <IntlMessages id="popup.logout"/>
          </MenuItem>
        </Menu>*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {locale} = state.settings;
  const { userData } = state.auth;
  return {userData, locale}
};
export default withRouter(connect(mapStateToProps)(UserInfo));


