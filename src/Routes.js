import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
//import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import cyanTheme from 'styles/themes/cyanTheme';
import asyncComponent from 'util/asyncComponent';
import ScrollToTop from 'util/ScrollToTop';
import {IntlProvider} from 'react-intl'
import AppLocale from 'lngProvider';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/sideBar/SideNav/index';

import Home from './app/general/Home/Home';
import HomeRemake from './app/general/HomeRemake';
import HomeRemake2 from './app/general/HomeRemake2';
import Employer from './app/general/Employer';
import TermsOfUse from './app/general/TermsOfUse';
import PrivacyPolicy from './app/general/PrivacyPolicy';
import FAQ from './app/general/FAQ';
import ContactUs from './app/general/ContactUs';
import JobList from './app/job/JobList';
import Job from './app/job/Job';
import Resume from './app/resume/Resume';

import TaxCalculator from './app/general/TaxCalculator';
import SalaryConverter from './app/general/ConvertPage';

import CandidateDashboard from './app/candidate/CandidateDashboard';
import CandidateJobAlert from './app/candidate/CandidateJobAlert';
import UserSettings from './app/user/UserSettings';
import Login from './app/user/Login';
import Verification from './app/user/Verification';
import PasswordReset from './app/user/PasswordReset';
//import CandidateApplication from './app/candidate/CandidateApplication';
//import CandidateApplicationList from './app/candidate/CandidateApplicationList';
import CandidateRegister from './app/candidate/CandidateRegister';

import Application from './app/application/Application';
import VideoInterview from './app/application/VideoInterview';

import NotFound from './app/general/NotFound';

import Test from './app/test/Test';
import TestRecorder from './app/test/TestRecorder';
import TestHome from './app/general/TestHome';

import ComingSoon from './app/general/ComingSoon';

import ScrollUpButton from "react-scroll-up-button";

import { changeNavigationStyle } from 'actions/index';

import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
  VERTICAL_NAVIGATION,
} from 'constants/ActionTypes';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShownSearchBar : true,
      headerWidth : '100%',
    }
  }
  
  componentDidMount() {
  }
  
  
  updateHeaderStyle = (style, isShownSearch) => {
    var headerType = (style == VERTICAL_NAVIGATION) ? VERTICAL_NAVIGATION : 
    (style == HORIZONTAL_NAVIGATION  ? HORIZONTAL_NAVIGATION : "");
    if(headerType)
      this.props.changeNavigationStyle(headerType);
      
    if(isShownSearch)
      this.setState({
        isShownSearchBar : true
      })
    else
      this.setState({
        isShownSearchBar : false
      })
  }
  
  render() {
    const {navigationStyle} = this.props;
    const {locale} = this.props;
    //const Home = () => <Redirect to='/' />
    let applyTheme = createMuiTheme(cyanTheme);
    const currentAppLocale = AppLocale[locale.locale];
    console.log(this.props.match);
    return (
      <div>
       <ThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <div className="app-main">
              <div className="app-main-container">
                <Sidebar />
                <div className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
                  <Header enableSearchBar={this.state.isShownSearchBar} />
                </div>
                <main className={`app-main-content-wrapper ${navigationStyle === HORIZONTAL_NAVIGATION ? 'transparent-header' : ''} ${ window.location.pathname === "/joblist" ? 'joblist' : ''}`}>
                  <div className="app-main-content">
                  <ScrollUpButton ToggledStyle={{bottom: 100, right: 40}} />
                    <Switch>
                        <Route exact path='/terms-of-use' render={props => <TermsOfUse updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        <Route exact path='/privacy-policy' render={props => <PrivacyPolicy updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        <Route exact path='/faq' render={props => <FAQ updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        <Route exact path='/contact' render={props => <ContactUs updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        
                        <Route exact path='/login' render={props => <Login updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        <Route exact path='/password/reset/:token' render={props => <PasswordReset {...props} updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        
                        <Route path="/joblist*" render={props => <JobList {...props} updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        <Route exact path='/job/:jobId/:refId?' render={props => <Job {...props} updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        
                        <Route exact path='/employer' render={props => <Employer updateHeaderStyle={this.updateHeaderStyle}  /> } />

                        <Route exact path="/applicant/:token" render={props => <Resume {...props} updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        <Route exact path="/applicant/interview/video/:token" render={props => <VideoInterview {...props} updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        
                        <Route excat path="/tax/calculator" render={props => <TaxCalculator {...props} updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        <Route exact path="/salary/converter" render={props => <SalaryConverter {...props} updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        
                        <PrivateRoute exact path="/resume/:Id" component={Resume} updateHeaderStyle={this.updateHeaderStyle} pageRole={"admin,client"} />
                        <PrivateRoute exact path="/settings" component={UserSettings} updateHeaderStyle={this.updateHeaderStyle} pageRole={"all"} />
                        
                        <PrivateRoute exact path="/application/:appId" component={Application} updateHeaderStyle={this.updateHeaderStyle} pageRole={"all"} />
                        <PrivateRoute exact path="/application/interview/video/:inVideoId" component={VideoInterview} updateHeaderStyle={this.updateHeaderStyle} pageRole={"all"} />
                        
                        <PrivateRoute exact path="/candidate/dashboard" component={CandidateDashboard} updateHeaderStyle={this.updateHeaderStyle} pageRole={"candidate"} />
                        <PrivateRoute exact path="/candidate/jobalert" component={CandidateJobAlert} updateHeaderStyle={this.updateHeaderStyle} pageRole={"candidate"} />
                        
                        <PrivateRoute exact path="/candidate/profile" component={Resume} updateHeaderStyle={this.updateHeaderStyle} pageRole={"candidate"} />
                        <PrivateRoute exact path="/candidate/register" component={CandidateRegister} updateHeaderStyle={this.updateHeaderStyle} isRedirect={"Register"} pageRole={"candidate"} />
                        
                        <PrivateRoute exact path="/verification" component={Verification} isRedirect={"Verification"} updateHeaderStyle={this.updateHeaderStyle} pageRole={"all"} />
                        
                        {/*<Route exact path='/comingsoon' render={props => <ComingSoon updateHeaderStyle={this.updateHeaderStyle}  /> } />*/}
                        {/*<Route exact path='/testhome' render={props => <TestHome updateHeaderStyle={this.updateHeaderStyle}  /> } />*/}
                        {/*<Route exact path='/test' component={Test} />
                        <Route exact path='/testrec' component={TestRecorder} />*/}
                        <Route exact path='/' render={props => <HomeRemake2 updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        <Route path='/test' render={props => <Home /> } />
                        <Route render={props => <HomeRemake updateHeaderStyle={this.updateHeaderStyle}  /> } />
                        {/*<Route path="*"><NotFound updateHeaderStyle={this.updateHeaderStyle} /></Route>*/}
                    </Switch>
                  </div>
                  <Footer/>                
               </main>
              </div>
            </div>
           </IntlProvider>
         </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {locale, navigationStyle} = state.settings;
  return { locale, navigationStyle}
};

export default withRouter(connect(mapStateToProps, { changeNavigationStyle })(Routes));
