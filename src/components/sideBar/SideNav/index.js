import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import SidenavContent from './SidenavContent';
import UserInfo from 'components/UserInfo';
import {COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION, VERTICAL_NAVIGATION} from 'constants/ActionTypes';
import {toggleCollapsedNav, updateWindowWidth} from 'actions/Setting';

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.props.updateWindowWidth(window.innerWidth)
    });
  }
  
  render() {
    var { isLoggedin, userType, navCollapsed, drawerType, width, navigationStyle} = this.props;
      
    let drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-xl-flex' : drawerType.includes(COLLAPSED_DRAWER) ? '' : 'd-flex';
    let type = 'permanent';
    if (drawerType.includes(COLLAPSED_DRAWER) || (drawerType.includes(FIXED_DRAWER) && width < 1200)) {
      type = 'temporary';
    }

    if (navigationStyle === HORIZONTAL_NAVIGATION) {
      drawerStyle = '';
      type = 'temporary';
    }
    return (
      <div className={`app-sidebar d-none ${drawerStyle}`}>
        <Drawer className="app-sidebar-content"
                variant={type}
                open={type.includes('temporary') ? navCollapsed : true}
                onClose={this.onToggleCollapsedNav}
                classes={{
                  paper: 'side-nav',
                }}
        >
          { isLoggedin && <UserInfo /> }
          <SidenavContent isLoggedin={isLoggedin} userType={userType} />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {navCollapsed, drawerType, width, navigationStyle} = state.settings;
  const { isLoggedin, userType } = state.auth;
  return {
    isLoggedin, userType, navCollapsed, drawerType, width, navigationStyle
  };
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav, updateWindowWidth})(SideNav));

