import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
//import Avatar from '@material-ui/core/Avatar';
import Avatar from 'react-avatar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {Container, Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import {IntlProvider} from 'react-intl';
import axios from "axios";
import io from 'socket.io-client';
import ListItemsNav from './TopNav/ListITemsNav';
import SearchBox from 'components/SearchBox';
import AppNotification from 'components/Header/AppNotification/index';
import {switchLanguage, toggleCollapsedNav} from 'actions/Setting';
import IntlMessages from 'util/IntlMessages';
import CardHeader from './CardHeader/index';
import UserInfoPopup from 'components/UserInfo/UserInfoPopup';
import LoginForm from 'components/popup/LoginForm';
import SignupForm from 'components/popup/SignupForm';
import LinkedinFollow from 'components/LinkedinFollow';

import { isMobile } from 'util/functions';

import {
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
  VERTICAL_NAVIGATION,
  INSIDE_THE_HEADER
} from 'constants/ActionTypes';
import { JOBSLAB_ICON_URL } from 'constants/PictureUrl';

var socket = io('',
{'path': '/ws',
 'reconnection': true,
 'reconnectionDelay': 1000,
 'reconnectionAttempts': Infinity
});

//var noScroll = require('no-scroll');

class Header extends Component {
constructor(props) {
    super(props);
    
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: '',
      userInfoIsOpen: false,
      appNotifIsOpen: false,
      loginModalIsOpen: false,
      signupModalIsOpen: false,
      notificationList: [],
      notificationCount: 0,
      prevNotificationCount: 0,
      isLoggedin: false,
      prevIsLoggedin:false,
      headerWidth: '100%',
      headerColor:'transparent',
      /*isLoggedin: false,
      userType: null,
      firstName: "",
      lastName: "",
      pictureUrl: null,
      notificationCout: 0,*/
    }
  }
  
  listenScrollEvent = e => {
    if (window.scrollY > 1) {
      this.setState({headerColor: 'black'})
    } else {
      this.setState({headerColor: 'transparent'})
    }
  }
  
  componentDidMount() {
    /*this.initData(this.props.initData);*/
    //noScroll.off(); //For Popup Menu
  
    this.updateNotificationCount();
    window.addEventListener('scroll', this.listenScrollEvent)
  
  }
  
  onAppNotificationSelect = () => {
    //if open
    if(!this.state.appNotifIsOpen)
    {
      //this.setState({ notificationCount: 0 });
      if(this.state.notificationCount > 0)
      {
        this.state.notificationCount = 0;
        console.log("this.state.notificationCount:" + this.state.notificationCount);
      }
      var data = {};
      axios.post('/api/users/get/notification', data)
      .then(res => {
        //console.log(res.data)
        if (res.data.isSuccess) {
          this.setState({ notificationList: res.data.notificationList});
        }  
        else {
          console.log("failed to get notificationList");
          alert(res.data.msg);
        }
      });
      axios.post('/api/users/set/notification/ack', data)
      .then(res => {
        if (res.data.isSuccess) {
          //store.dispatch({ type: 'USER' });
        }  
        else {
          alert(res.data.msg);
        }
      })
      .catch(function (err) {
        console.log(err);
        //e.preventDefault();
      });
    }
    
    this.setState({
      appNotifIsOpen: !this.state.appNotifIsOpen
    })
  };
  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    })
  };
  onUserInfoSelect = () => {
    this.setState({
      userInfoIsOpen: !this.state.userInfoIsOpen
    })
  };
  handleRequestClose = () => {
    this.setState({
      userInfoIsOpen: false,
      appNotifIsOpen: false,
      searchBox: false,
    });
  };
  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };
  /*
  updateHeaderWidth = () => {
    var width = document.getElementById('header-bar').parentNode.clientWidth;
    var headerWidth = document.getElementById('header-bar') ? document.getElementById('header-bar').clientWidth : null;
    if(width)
      headerWidth = width;
    if(headerWidth != this.state.headerWidth)
    {
      this.setState({
        headerWidth : (headerWidth == null) ? '100%' : headerWidth
      })
    }
    
    console.log(width);
    console.log('headerWidth:' + headerWidth);
    console.log('body width:' + document.body.clientWidth);
  }
  */
  

  updateSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });

  }
  
  searchByKey = (e) => {
    if(e.key === 'Enter'){
      this.searchJob();
    }
  }
  searchJob = () => {
    //this.props.history.push('/joblist/'+ this.state.searchText + '/' + this.state.location);
    var queryParm = "?";
    //var seperator = "&";
    if(this.state.searchText)
    {
      queryParm += "q=" + this.state.searchText// + seperator;
    }
    else
      queryParm = "";

    //queryParm += "loc=default";
    window.location = '/joblist' + queryParm;
  }
  
  /*selectSearchText(text){
     this.setState({
      searchText: text,
    });
  }*/
  selectSearchText(text, name){
     this.setState({
      [name]: text,
    });
  }
  
  clearText = () => {
   this.setState({
     searchText : "",
   });
 }
  
  openModal = (modalType) => {
    //noScroll.on(); //no-scroll on when Popup Menu Open
    
    if(modalType == 'login')
      this.setState({loginModalIsOpen: true, signupModalIsOpen: false});
    else if(modalType == 'signup')
      this.setState({signupModalIsOpen: true, loginModalIsOpen: false});
  }
  
  openSignupModal = () => {
    this.setState({signupModalIsOpen: true, loginModalIsOpen: false});
  }
 
  closeModal = (name) => {
    this.setState({ [name]: false });
    //noScroll.off(); //no-scroll off when Popup Menu Close
  }
  
  updateNotificationCount() {
   console.log("start updateNotificationCount.");
   socket.on("getNotificationCount", count => {this.setState({ notificationCount: count }); console.log("Received new count" + count);});
   socket.on('disconnect', function() {
    console.log("disconnect socket");
   });
  }
  
  componentDidUpdate(prevProps, prevState) {

    if (prevState.notificationCount !== this.state.notificationCount) {
      this.setState({notificationCount : this.state.notificationCount});
    }
    if (prevState.isLoggedin == true && this.state.isLoggedin == false) {
      this.setState({ 
        userInfoIsOpen: false,
        appNotifIsOpen: false,
      });
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.notificationCount!==prevState.prevNotificationCount){
      return {
        notificationCount : nextProps.notificationCount,
        //for internal update checking
        prevNotificationCount : nextProps.notificationCount
      };
    }
    else if(nextProps.isLoggedin!==prevState.prevIsLoggedin){
      //socket.close();
      //socket = openSocket('',{'path': '/ws'});
      //socket.on("getNotificationCount", count => {this.setState({ notificationCount: count }); console.log("Received new count" + count);});
      return {
        isLoggedin : nextProps.isLoggedin,
        //for internal update checking
        prevIsLoggedin : nextProps.isLoggedin
      };
    }
    else return null;
  }
  
  render() {
    //const isLoggedin = this.props.isLoggedin;
    var {isLoggedin, userData, userType, drawerType, locale, navigationStyle, horizontalNavPosition} = this.props;
    var {name, pictureUrl}  = userData;
  
    if ((userType!= 'admin') && (userType!= 'candidate') && (userType!= 'client'))
      userType = 'candidate';
      
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';
    const isMobileView = isMobile();
    return (
      <IntlProvider locale="en">
      <AppBar id="header-bar" style={{'width':this.state.headerWidth, backgroundColor:(navigationStyle === HORIZONTAL_NAVIGATION)? this.state.headerColor:null}}
        className={`app-main-header ${(navigationStyle === HORIZONTAL_NAVIGATION /*&& horizontalNavPosition === BELOW_THE_HEADER*/) ? 'transparent' : ''}`}>
       <Container>
          <Toolbar className="app-toolbar" disableGutters={false}>
          {/*navigationStyle === HORIZONTAL_NAVIGATION ?
            <div className="d-block d-lg-none pointer mr-3" onClick={this.onToggleCollapsedNav}>
              <span className="jr-menu-icon">
                <span className="menu-icon"/>
              </span>
            </div>
            :
            <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
                        onClick={this.onToggleCollapsedNav}>
              <span className="menu-icon"/>
            </IconButton>*/
            // <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
            //             onClick={this.onToggleCollapsedNav}>
            //   <span className="menu-icon"/>
            // </IconButton>
          }
          
          <Link className="app-logo mr-2" to="/">
            <img src={JOBSLAB_ICON_URL+"jobslab_white.png"} alt="Jobslab" title="Jobslab"/>
          </Link> 
          {/* { ( this.props.enableSearchBar ) &&
            <SearchBox styleName="d-none d-lg-block" placeholder=""
                     onChange={this.updateSearchText.bind(this)}
                     searchByKey={this.searchByKey.bind(this)}
                     selectSearchText={this.selectSearchText.bind(this)}
                     clearText={this.clearText.bind(this)}
                     value={this.state.searchText}
            />
          } */}
            <ListItemsNav/>
          {/* (navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER) &&
          <Menu /> */}
          { !isLoggedin ?
          <div className="auth-bar">
            {/* <a class="auth-bar__resources d-none d-lg-flex" href="https://blog.jobslab.io">
              <span>Resources</span>
              <i class="fas fa-chevron-right"></i>
            </a> */}
            {/* !isMobileView && <LinkedinFollow /> */}
            {/* <div className="d-none d-lg-flex"><LinkedinFollow /></div> */}
            <div className="auth-bar__btn-group">
              <Button className="auth-bar__login jr-btn text-white mr-1 mr-md-2" onClick={() => this.openModal('login')}>
                Login
              </Button> 
              <Button variant="contained" className="auth-bar__CV jr-btn bg-success text-white mr-2" onClick={() => this.openModal('signup')}>
                Submit CV
              </Button>
            </div>
            {/* isMobileView && <LinkedinFollow /> */}
          </div>
          :
          <ul className="header-notifications list-inline ml-auto">
            <li className="list-inline-item app-tour">
              <Button variant="contained" color="primary" className="jr-btn" onClick={(e) => this.props.history.push("/"+userType+"/dashboard")}>
                Go To Dashboard
              </Button>
            </li>
            <li className="list-inline-item app-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.appNotifIsOpen}
                toggle={this.onAppNotificationSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <IconButton className="icon-btn">
                    <i className={(this.state.notificationCount > 0) ? "zmdi zmdi-notifications-none icon-alert animated infinite wobble" : "zmdi zmdi-notifications-none wobble"}/>
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right>
                  <CardHeader styleName="align-items-center"
                              heading={<IntlMessages id="appNotification.title"/>}/>
                  <AppNotification toggle={this.onAppNotificationSelect.bind(this)} notificationList={this.state.notificationList} />
                </DropdownMenu>
                
              </Dropdown>
            </li>

            <li className="list-inline-item user-nav">
              <Dropdown
                className="quick-menu d-none d-lg-block"
                isOpen={this.state.userInfoIsOpen}
                toggle={this.onUserInfoSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <IconButton classes={{ root: { padding: '0px' } }}>
                    <Avatar 
                      round={ true } 
                      size={ 42 }
                      style={ {margin: 2, boxShadow: '0px 0px 30px grey', backgroundColor: 'white'} }
                      src={ pictureUrl } 
                      name={ name.firstName+" "+name.lastName } 
                    />
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right className="mt-4 mr-3">
                  <UserInfoPopup />
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>}
        </Toolbar>

        <SignupForm isOpen={this.state.signupModalIsOpen} closeModal={() => this.closeModal('signupModalIsOpen')} />
        <LoginForm isOpen={this.state.loginModalIsOpen} openSignupModal={this.openSignupModal} closeModal={() => this.closeModal('loginModalIsOpen')} />
         </Container> 
       
      </AppBar>

    </IntlProvider>
    )
  }
}

const mapStateToProps = (state) => {
  const { isLoggedin, userType, userData, notificationCount } = state.auth;
  const { drawerType, locale, navigationStyle, horizontalNavPosition } = state.settings;
  return { isLoggedin, userType, userData, notificationCount, drawerType, locale, navigationStyle, horizontalNavPosition }
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav, switchLanguage})(Header));