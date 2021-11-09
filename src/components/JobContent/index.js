import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Widget from "components/Widget";
import Button from '@material-ui/core/Button';
import axios from "axios";
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';

import ReportBox from 'components/ReportBox/index';
import ChartCard from 'components/ChartCard/ChartCard';
import {Bar, BarChart, ResponsiveContainer} from 'recharts';
import {Progress} from "reactstrap";
import SkillTag from "components/JobList/SkillTag/index";

import LoginForm from 'components/popup/LoginForm';
import SignupForm from 'components/popup/SignupForm';
import ReferralForm from 'components/popup/ReferralForm';
import ReferCandidateForm from 'components/popup/ReferCandidateForm';
import * as notification from 'actions/Notification';
import { numberWithCommas } from 'util/functions.js';
import { Helmet } from 'react-helmet';
import { isMobile } from 'util/functions';
import Tour from 'reactour'
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { WEB_IMAGE_URL, INDUSTRY_ICON_URL, COMPANY_ICON_URL } from 'constants/PictureUrl';

const chartData = [
  {name: '6.00', uv: 500, pv: 1100, amt: 20},
  {name: '7.00', uv: 600, pv: 1600, amt: 21},
  {name: '8.00', uv: 500, pv: 1900, amt: 29},
  {name: '9.00', uv: 600, pv: 2100, amt: 20},
  {name: '10.00', uv: 700, pv: 2500, amt: 28},
  {name: '11.00', uv: 800, pv: 2200, amt: 32},
  {name: '12.00', uv: 700, pv: 2000, amt: 21},
  {name: '13.00', uv: 800, pv: 1900, amt: 25},
  {name: '14.00', uv: 850, pv: 1700, amt: 29},
  {name: '15.00', uv: 1000, pv: 2100, amt: 33},
];


class JobContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      noJobFound: false,
      activeJob: this.props.activeJob,
      
      //userType: null,
      postDate: null,
      jobTitle: '',
      company: null,
      category: [],
      location: '',
      city: '',
      summary: '',
      responsibility: [],
     	requirement: [],
      salary: '',
      experience: '',
      industry: '',
      //subIndustry: '',
      majorSpeciality: [],
      minorSpeciality: [],
      majorLanguage: [],
      minorLanguage: [],
      
      expertName: '',
      expertEmail: '',
      expertPhone: '',
      expertPictureUrl: '',
      expertInsight: '',
      
      viewCount: 0,
      applyCount: 0,
      interviewCount: 0,
      referralCount: 0,
      
      isExclusive: false,
      isInterested: false,
      isEligible: false,
      isApplied: false,
      isSaved: false,
      isFeatured: false,
      
      loginModalIsOpen: false,
      signupModalIsOpen: false,
      
      //Candidate Referral 
      refUrl:'',
      referralModalIsOpen: false,
      referCandidateOpen: false,
      
      //Admin Recommend Jobs
      showRecommendPopup: false,
      isTourOpen: false
    }
  }
  
  componentDidMount() {
    //from JD
    //if(this.props.activeJob)
    //console.log(this.props.history);
    this.selectJob();
  }
  
  componentDidUpdate(prevProps, prevState) {
    //From JobList
    if (prevState.activeJob !== this.state.activeJob || prevProps.isLoggedin !== this.props.isLoggedin) {
      this.setState({
        activeJob : this.state.activeJob
      });
      this.selectJob();
    }
  }
  
  noJobFound = () => {
    this.setState({
      loading : false,
      noJobFound : true
    })
  }
  
  selectJob = () => {
    var jobId = this.state.activeJob;
    var refId;
    if(this.props.match)
      refId = (this.props.match.params.refId) ? this.props.match.params.refId : '';
    
    if (jobId) {
      axios.get('/api/jobs/get/job/'+jobId+'/'+refId)
      .then(res => {
        console.log(res.data);
        if (res.data.isSuccess) {
          this.setState({
            postDate : (res.data.postDate==null) ? null : res.data.postDate,
            jobTitle : (res.data.job.jobTitle==null) ? '' : res.data.job.jobTitle,
            company: (res.data.job.company==null) ? null : res.data.job.company,
            category: (res.data.job.category==null) ? [] : res.data.job.category,
            location: (res.data.job.location==null) ? '': res.data.job.location,
            city: (res.data.job.address && res.data.job.address.city) ? res.data.job.address.city : null,
            industry: (res.data.job.industry==null) ? '' : res.data.job.industry,
            //subIndustry: (res.data.job.subIndustry==null) ? '' : res.data.job.subIndustry,
            experience: (res.data.job.yearMin==null) ? '' : res.data.job.yearMin,
            salary: (res.data.job.salaryMax==null) ? '' : res.data.job.salaryMax,
            refererReward: (res.data.refererReward==null) ? '' : res.data.refererReward,
            majorSpeciality: (res.data.job.speciality==null) ? [] : res.data.job.speciality.major,
            minorSpeciality: (res.data.job.speciality==null) ? [] : res.data.job.speciality.minor,
            majorLanguage: (res.data.job.languageProf==null) ? [] : res.data.job.languageProf.major,
            minorLanguage: (res.data.job.languageProf==null) ? [] : res.data.job.languageProf.minor,
            summary: (res.data.job.summary==null) ? '' : res.data.job.summary,
            responsibility: (res.data.job.responsibility==null) ? [] : res.data.job.responsibility,
            requirement: (res.data.job.requirement==null) ? [] : res.data.job.requirement,
            
            expertName: (res.data.job.expertInsight==null) ? '' : res.data.job.expertInsight.admin._id.name.firstName + ' ' + res.data.job.expertInsight.admin._id.name.lastName,
            expertEmail: (res.data.job.expertInsight==null) ? '' : res.data.job.expertInsight.admin._id.email,
            expertPhone: (res.data.job.expertInsight==null) ? '' : res.data.job.expertInsight.admin._id.phone.dial + ' ' + res.data.job.expertInsight.admin._id.phone.number,
            expertPictureUrl: (res.data.job.expertInsight==null) ? '' : res.data.job.expertInsight.admin._id.pictureUrl,
            expertInsight: (res.data.job.expertInsight==null) ? '' : res.data.job.expertInsight.content,
            
            isExclusive: (res.data.job.isExclusive==null) ? false : res.data.job.isExclusive,
            isInterested: (res.data.isInterested==null) ? false : res.data.isInterested,
            isEligible: (res.data.isEligible==null) ? false : res.data.isEligible,
            isApplied: (res.data.isApplied==null) ? false : res.data.isApplied,
            isFeatured: (res.data.job.isFeatured==null) ? false : res.data.job.isFeatured,
            
            viewCount: (res.data.job.viewCount==null) ? 0 : res.data.job.viewCount,
            applyCount: (res.data.applyCount==null) ? 0 : res.data.applyCount,
            interviewCount: (res.data.interviewCount==null) ? 0 : res.data.interviewCount,
            referralCount: (res.data.referralCount==null) ? 0 : res.data.referralCount,
          });

          this.setState({
            loading:false
          })
           var rightSide = this.refs.jobContentContainer;
           if(this.props.isMobileBackbtn)
              setTimeout(function() {rightSide.scrollTo(0, 0);},450);
           else
              rightSide.scrollTo(0, 0);
        }
        else {
          //alert("This job does not exist anymore.");
          this.noJobFound();
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
    else if(jobId == null)
    {
       this.noJobFound();
    }
  }
  

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.activeJob!==prevState.activeJob){
      return {activeJob : nextProps.activeJob};
    }
    else return null;
  }
  
  interestJob = () => {
    if (!this.props.isLoggedin) {
      notification.warning("Please login to perform the action.");
      this.setState({loginModalIsOpen: true}); //Pass redirectUrl to LoginForm
      //this.props.history.push({ pathname: '/login', search: "?redirect=/job/"+this.state.activeJob, /*state: { from: this.props.location }*/ });
    }
    else if (!this.props.userData.isVerified) {
      notification.warning("Please verify your account before performing this action.");
    }
    else if (!this.props.candidateData.isCompleted) {
      notification.warning("Please complete your registration before performing this action.");
      //this.props.history.push('/candidate/register');
      this.props.history.push({ pathname: '/candidate/register', state: { from: "/job/"+this.state.activeJob } });
    }
    else {
      var refId;
      if(this.props.match)
        refId = (this.props.match.params.refId) ? this.props.match.params.refId : null;
      const data = {
        jobId: this.state.activeJob,
        refId: refId
      };
      axios.post('/api/candidates/set/job/interest', data)
      .then(res => {
        //console.log(res.data);
        if (res.data.isSuccess) {
         notification.success("The company name will be revealed once you are considered as an eligible candidate.");
         this.setState({isInterested: true});
        }
        else {
         notification.error("The action cannot be performed at the moment. Please try again later.");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
  
  applyJob = () => {
    if (!this.props.isLoggedin) {
      notification.warning("Please login to perform the action.");
      this.setState({ loginModalIsOpen: true }); //Pass redirectUrl to LoginForm
      //this.props.history.push({ pathname: '/login', search: "?redirect=/job/"+this.state.activeJob, /*state: { from: this.props.location }*/ });
    }
    else if (!this.props.userData.isVerified) {
      notification.warning("Please verify your account before performing this action.");
    }
    else if (!this.props.candidateData.isCompleted) {
      notification.warning("Please complete your registration before performing this action.");
      //this.props.history.push('/candidate/register');
      this.props.history.push({ pathname: '/candidate/register', state: { from: "/job/"+this.state.activeJob } });
    }
    else {
      var refId;
      if(this.props.match)
        refId = (this.props.match.params.refId) ? this.props.match.params.refId : null;
      const data = {
        jobId: this.state.activeJob,
        refId: refId
      };
      axios.post('/api/candidates/set/application/apply', data)
      .then(res => {
        if (res.data.isSuccess) {
          notification.success("You have applied the job successfully.");
          this.setState({isApplied: true});
        }
        else {
          notification.error("The action cannot be performed at the moment. Please try again later.");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
  
  confirmApply = () => {
    if (!this.props.isLoggedin) {
      notification.warning("Please login to perform the action.");
      this.setState({ loginModalIsOpen: true }); //Pass redirectUrl to LoginForm
      //this.props.history.push({ pathname: '/login', search: "?redirect=/job/"+this.state.activeJob, /*state: { from: this.props.location }*/ });
    }
    else if (!this.props.userData.isVerified) {
      notification.warning("Please verify your account before performing this action.");
    }
    else if (!this.props.candidateData.isCompleted) {
      notification.warning("Please complete your registration before performing this action.");
      //this.props.history.push('/candidate/register');
      this.props.history.push({ pathname: '/candidate/register', state: { from: "/job/"+this.state.activeJob } });
    }
    else {
      const data = {
        jobId: this.state.activeJob,
      };
      axios.post('/api/candidates/set/application/confirm', data)
      .then(res => {
        if (res.data.isSuccess) {
          notification.success("You have confirmed the application successfully.");
          this.setState({isApplied: true});
        }
        else {
          notification.error("The action cannot be performed at the moment. Please try again later.");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
  
  openReferralForm = () => {
    console.log('get referral URL');
    if (!this.props.isLoggedin) {
      notification.warning("Please login to perform the action.");
      this.setState({loginModalIsOpen: true});
      //this.props.history.push({ pathname: '/login', search: "?redirect=/job/"+this.state.activeJob, /*state: { from: this.props.location }*/ });
    }
    else if (!this.props.userData.isVerified) {
      notification.warning("Please verify your account before performing this action.");
    }
    else if (!this.props.candidateData.isCompleted) {
      notification.warning("Please complete your registration before performing this action.");
      this.props.history.push('/candidate/register');
    }
    else {
      const data = {
        jobId: this.state.activeJob,
      };
      axios.post('/api/candidates/set/referral/url', data)
      .then(res => {
        console.log(res.data);
        if (res.data.isSuccess) {
          console.log(res.data)
          this.setState({
            refUrl    : "https://"+window.location.hostname+"/job/"+this.state.activeJob+"/"+res.data.refId,
            referralModalIsOpen: true
          });
        }
        else {
          notification.error("The action cannot be performed at the moment. Please try again later.");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
  
  openSignupModal = () => {
    this.setState({signupModalIsOpen: true, loginModalIsOpen: false});
  }
  
  closeModal = (name) => {
    this.setState({ [name] : false });
  }
  
  openReferCandidate = (e) => {
    e.preventDefault(); 
    this.setState({
      referCandidateOpen: true
    });
  }
  
  closeTour = () => {
    this.setState({ isTourOpen: false });
  };
  disableBody = target => disableBodyScroll(target);
  enableBody = target => enableBodyScroll(target);
  
  getJobPostingSchema = () => {
        const { postDate, jobTitle, company, location, city, industry, salary, summary} = this.state;
        let data = {
          "@context" : "https://schema.org/",
          "@type" : "JobPosting",
          "title" : jobTitle,
          "description" : "<p>" + summary + "</p>",
          "datePosted" : moment(postDate, 'Do MMMM YYYY').format('YYYY-MM-DD'),
          "validThrough" : moment(postDate, 'Do MMMM YYYY').add(3, 'M').format('YYYY-MM-DD'),
          "employmentType" : "FULL_TIME",
          "hiringOrganization" : {
            "@type" : "Organization",
            "name" : (company == null) ? "Company Hided" : company,
            "sameAs" : "https://www.jobslab.io",
            "logo" : (company == null) ? encodeURI(INDUSTRY_ICON_URL + (industry[0] ? industry[0]._id.name : "") + ".png") : encodeURI(COMPANY_ICON_URL+company+".png")
          },
          "jobLocation": {
          "@type": "Place",
            "address": {
            "@type": "PostalAddress",
            "addressCountry": location.name
            }
          }
        }

      // salary
      if(salary != null) {
          data['baseSalary'] = {
            "@type": "MonetaryAmount",
            "currency": "HKD",
            "value": {
              "@type": "QuantitativeValue",
              "value": salary,
              "unitText": "MONTH"
            }
          }
      }
      return JSON.stringify(data);
  };
  
   render() {
    const {isTourOpen} = this.state;
    const { loading, noJobFound, isInterested, isEligible, isApplied, referralModalIsOpen } = this.state;
    const { postDate, activeJob, jobTitle, company, location, city, industry, salary, refererReward, experience, majorSpeciality, minorSpeciality, majorLanguage, minorLanguage, summary, responsibility, requirement } = this.state;
    const {isSearch, isNotInsideList} = this.props;
    const isMobileView = isMobile();
    var referRatio = Math.ceil((this.state.referralCount > 0 ?this.state.referralCount:0 )/(this.state.viewCount>0 ? this.state.viewCount:1) * 100);
    referRatio = referRatio > 0 ? referRatio : 1;
    var interviewRatio = Math.ceil((this.state.interviewCount > 0 ?this.state.interviewCount:0 )/(this.state.viewCount>0 ? this.state.viewCount:1) * 100);
    interviewRatio = interviewRatio > 0 ? interviewRatio : 1;
    return (
      <div ref="jobContentContainer" className={isMobileView ? "" : (isNotInsideList==true ? "jobContent-container" : "jobContent-container-insideList") }>
        <Helmet>
              <title>JobsLab</title>
        </Helmet>
      <Tour
          steps={steps}
          isOpen={isTourOpen}
          rounded={10}
          onRequestClose={this.closeTour}
          onAfterOpen={this.disableBody}
          onBeforeClose={this.enableBody}
          showCloseButton = {false}
        />
      { loading ?
          <div className="loader-view"
               style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
            <CircularProgress/>
          </div> : 
        noJobFound ?
          <div className="jobNotFound">
            {/*<span>
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </span>*/}
            <img src={encodeURI(WEB_IMAGE_URL+"notfound/notfound.png")}/>
            <span>
              {
                isSearch ?
                'Oops! No job matches found. Please try another search criteria.'
                : 'Oops! No job found. The job may be closed temporarly.'
              }
            </span> 
          </div> :
      <div>
        {this.props.isMobileBackbtn ? <Button variant="contained" className="jr-btn bg-white job-back-btn" onClick={() => this.props.triggerJobDetailsMobile(false)}>
                                            <i class="fas fa-arrow-left"></i> Search Jobs
                                        </Button>
                                      : ""}
        <Helmet>
              <title>{jobTitle + (company?" - " + company:"") } | JobsLab</title>
              <script className='structured-data-list' type="application/ld+json">{this.getJobPostingSchema()}</script>
              <meta name="description" content="Reveal leading company names within your industry and unlock a great job" />
        </Helmet>
        <div className="jr-profile-banner joblist-banner" 
        style={{/*'background-color': '#095680'*/
        'background-image':'linear-gradient(rgb(17 0 111 / 45%), rgb(66 88 90 / 56%)), url(https://media.jobslab.io/web/picture/jobContent/job-bg2.png)',
        'background-size':'cover'}}>
        
            <div className="color-overlay"></div>
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top">
            <div className="jr-profile-banner-top-left jobContent-title-container col-12 col-lg-8 col-sm-12"> {/* joblist-limit-width */}
              <div className={`jr-profile-banner-avatar ${this.state.isExclusive ? "exclusive-content" : ""}`} style={{'background':'white'}}>
                <img 
                  className="jobContent-img-size" alt="..." 
                  src={(company == null) ? 
                  encodeURI(INDUSTRY_ICON_URL + (industry[0] ? industry[0]._id.name : "") + ".png") : 
                  encodeURI(COMPANY_ICON_URL+company+".png")} 
                />
                {/*<img className="jobContent-img-size" alt="..." src={(company == null) ? process.env.PUBLIC_URL+"/industry/"+((industry[0]) ? industry[0]._id.name : "")+".png" : encodeURI("https://hkjobslab.s3-ap-southeast-1.amazonaws.com/company/"+company+".png")} />*/}
              </div>
              <div className="jr-profile-banner-avatar-info col-11 col-lg-7 col-sm-8"> {/* joblist-limit-width */}
               <div className="jobContent-title-bar">
                    <h2 className="mb-2 jr-mb-sm-3 mt-sm-2 jr-fs-xxl jr-font-weight-light" style={{'font-weight': 'bold','line-height': '1.2'}}>{jobTitle}</h2>
                    <p className="mb-0 jr-fs-lg">{company}</p>
                    <span><i className="la la-map-marker"></i>{city ? city+", "+location.name : location.name }</span>
                    {postDate != null ? <p>Posted on {postDate}</p> : ""}
               </div>

                <div className="job-reward">
                    <span className="jr-tag d-inline-block mr-1">Candidate Reward: ${numberWithCommas(5000)}</span>
                    <span className="jr-tag d-inline-block">Referer Reward: ${ numberWithCommas(refererReward ? refererReward : 0 ) }</span>
                </div>
              </div>
            </div>
            <div className="jr-profile-banner-top-right job-btn-group col-lg-4 col-sm-5 col-10">
              <ul className="jr-follower-list job-btn-group-ul" style={{'float': 'right'}}>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium" style={{'margin-bottom':'10px'}}>
                      {
                       (this.props.userType=='admin') ? 
                          (<Button variant="contained" color="primary" className="jr-btn joblist-btn-size" onClick={ (e) => this.openReferCandidate(e) }>
                              <font size="+2"><i className="zmdi zmdi-accounts mr-1"/></font>
                              <font size="+1">Refer Candidates</font>
                           </Button>
                          )
                          :""
                      }
                      
                      {(this.props.userType=='candidate' || this.props.userType=="") &&
                        (
                           (company==null) ? 
                              <Button variant="contained" color="primary" className="jr-btn btn-primary joblist-btn-size step01" disabled={(isInterested ? true : false)} onClick={this.interestJob}>
                                <font size="+1"><i className="zmdi zmdi-lock-open mr-1"/></font>
                                {/*<font style={{fontSize: '16px'}}>&nbsp;Reveal Company</font>*/}
                                <font style={{fontSize: '16px'}}>&nbsp;Apply Now</font>
                              </Button>
                              : ( isEligible ?
                              <Button variant="contained" color="primary" className="jr-btn joblist-btn-size" disabled={(isApplied ? true : false)} onClick={this.confirmApply}>
                                <font size="+1"><i className="zmdi zmdi-file-plus mr-1"/></font>
                                <font style={{fontSize: '16px'}}>&nbsp;Confirm Apply</font>
                              </Button>
                              : 
                              <Button variant="contained" color="primary" className="jr-btn joblist-btn-size" disabled={(isApplied ? true : false)} onClick={this.applyJob}>
                                <font size="+1"><i className="zmdi zmdi-file-plus mr-1"/></font>
                                <font style={{fontSize: '16px'}}>&nbsp;Apply Now</font>
                              </Button>
                            )
                        )
                      }
                  </span>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">
                    {
                       (this.props.userType=='admin') ? 
                          (<Button variant="contained" color="primary" className="jr-btn joblist-btn-size" onClick={() => this.props.history.push('/postjob/'+activeJob)}>
                              <font size="+2"><i className="zmdi zmdi-edit mr-1"/></font>
                              <font size="+1">Edit Job</font>
                           </Button>
                          )
                          :""
                      }
                      { ((this.props.userType!='admin') && (this.props.userType!='client')) && (this.props.userType=='candidate' || this.props.userType=='') &&
                        <Button variant="contained" color="primary" className="jr-btn joblist-btn-size step02" onClick={ (e) => this.openReferralForm(e)}>
                           <font size="+1"><i className="zmdi zmdi-accounts mr-1"/></font>
                           <font style={{fontSize: '16px'}}>&nbsp;Refer Now</font>
                        </Button>
                      }
                      {/*
                      <div style={{'display':'inline-block'}}>
                            Refer
                          </div>
                      <font size="+2"><b>$8,000 </b></font>
                             Referral Reward
                      
                      
                      */}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="jr-profile-banner-bottom">
          {/*
            <div className="jr-tab-list">
              <ul className="jr-navbar-nav">
                <li>
                  <span className="jr-link">Timeline</span>
                </li>
                <li>
                  <span className="jr-link">About</span>
                </li>
                <li>
                  <span className="jr-link">Photos</span>
                </li>
                <li>
                  <span className="jr-link">Friends <span className="jr-fs-xs">287</span></span>
                </li>
                <li>
                  <span className="jr-link">More</span>
                </li>
              </ul>
            </div>
            
            <span className="jr-link jr-profile-setting">
              <i className="zmdi zmdi-settings mr-2"/>
              <span className="d-inline-flex align-middle ml-1 jr-ml-sm-0">Setting</span>
            </span>
            */}
          </div>
        </div>
      </div>
      
      <div className="jr-profile-content joblist-padding">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-7 col-12">
              <div> {/* className="jobContent-padding-left"*/}
                <Widget styleName="jr-card-profile">
                  <div className="mb-3">
                    <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Career Experts Insight</h3>
                  </div>
                  <div className="expert-insight">
       			 			    <blockquote><p><i>“</i><span>
       			 			     {this.state.expertInsight}
       			 			    <i>”</i></span></p>
                      <strong>{this.state.expertName} A Career Expert with JobsLab</strong>
                      <img src={this.state.expertPictureUrl} alt="" />
                      </blockquote>
    			 				</div>
            
                </Widget>
                
                <Widget styleName="jr-card-profile">
                  <div className="mb-3">
                    <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Job Description</h3>
                  </div>
                  <div>
                  {summary}
                  </div>
                </Widget>
                
                <Widget styleName="jr-card-profile">
                  <div className="mb-3">
                    <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Responsibilities</h3>
                  </div>
                  <ul style={{'padding-left': '20px'}}>
                      {responsibility.map(x => { return (x) ? <li>{x}</li> : "" })}
             			</ul>
                </Widget>
                
                <Widget styleName="jr-card-profile">
                  <div className="mb-3">
                    <h3 className="card-title mb-2 mb-md-3 font-weight-bold">Requirements</h3>
                  </div>
                   <ul style={{'padding-left': '20px'}}>
               			 		{requirement.map(x =>  { return (x) ? <li>{x}</li> : "" })}
               			</ul>
                </Widget>
                
                <SkillTag skills={majorSpeciality.concat(minorSpeciality)} 
                          languages={majorLanguage.concat(minorLanguage)} />
                
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-4 col-md-5 col-12">
              <div> {/* className="jobContent-padding-right"*/}
                <Widget title="Job Overview" styleName="jr-card-profile-sm jobContent-card">
                      <div key={1} className="media align-items-center flex-nowrap jr-pro-contact-list">
                            <div className="mr-3">
                              <i className={`la la-briefcase jr-fs-xxl text-grey`}/>
                            </div>
                            <div className="media-body">
                              <span className="mb-0 text-grey jr-fs-sm">Industry</span>
                              {
                                industry.map( obj => {
                                  return(obj) ? <p className="mb-0">{obj._id.name}</p> : ""
                                })
                              }
                            </div>
                      </div>
                      <div key={2} className="media align-items-center flex-nowrap jr-pro-contact-list">
                            <div className="mr-3">
                              <i className={`zmdi zmdi-money-box jr-fs-xxl text-grey`}/>
                            </div>
                            <div className="media-body">
                              <span className="mb-0 text-grey jr-fs-sm">Monthly Salary (HKD)</span>
                              <p className="mb-0">{salary ? "$" + numberWithCommas(salary) : "Attractive"}</p>
                            </div>
                      </div>
                      <div key={3} className="media align-items-center flex-nowrap jr-pro-contact-list">
                            <div className="mr-3">
                              <i className={`zmdi zmdi-time jr-fs-xxl text-grey`}/>
                            </div>
                            <div className="media-body">
                              <span className="mb-0 text-grey jr-fs-sm">Experience</span>
                              <p className="mb-0">{experience} years</p>
                            </div>
                      </div>
                 </Widget>
                 
                 <Widget title="Contact Career Expert" styleName="jr-card-profile-sm jobContent-card">
                     <div key={1} className="media align-items-center flex-nowrap jr-pro-contact-list">
                            <div className="mr-3">
                              <i className={`zmdi zmdi-account jr-fs-xxl text-grey`}/>
                            </div>
                            <div className="media-body">
                              <span className="mb-0 text-grey jr-fs-sm">Name</span>
                              <p className="mb-0">{this.state.expertName}</p>
                            </div>
                      </div>
                      <div key={2} className="media align-items-center flex-nowrap jr-pro-contact-list">
                            <div className="mr-3">
                              <i className={`zmdi zmdi-email jr-fs-xxl text-grey`}/>
                            </div>
                            <div className="media-body">
                              <span className="mb-0 text-grey jr-fs-sm">Email</span>
                              <p className="mb-0">{this.state.expertEmail}</p>
                            </div>
                      </div>
                      <div key={3} className="media align-items-center flex-nowrap jr-pro-contact-list">
                            <div className="mr-3">
                              <i className={`zmdi zmdi-phone jr-fs-xxl text-grey`}/>
                            </div>
                            <div className="media-body">
                              <span className="mb-0 text-grey jr-fs-sm">Phone</span>
                              <p className="mb-0">{this.state.expertPhone}</p>
                            </div>
                      </div>
                 </Widget>
           
                  <ChartCard styleName="text-white shadow bg-orange step03">
                    <div className="chart-title">
                      <h2 className="mb-1">{ this.state.viewCount }</h2>
                      <p>Candidates viewed this job</p>
                    </div>
                    <div className="p-3">
                      <div className="d-flex flex-row p-0">
                        <p className="text-white m-0">Candidates referred this job to friends</p>
                        <p className="text-white ml-auto m-0">{referRatio} %</p>
                      </div>
                      <Progress className="shadow-lg mb-2 my-1 match-progress-bar" color="green" value={ referRatio } />
                      <div className="d-flex flex-row">
                        <p className="text-white m-0">Candidates currently interviewing</p>
                        <p className="text-white ml-auto m-0">{ interviewRatio } %</p>
                      </div>
                      <Progress className="shadow-lg my-1 match-progress-bar" color="green" value= { interviewRatio } />
                    </div>
                  </ChartCard>
                  
                  <ReportBox
                    styleName="bg-primary text-white p-3 shadow step04"
                    price={ this.state.applyCount }
                    icon="accounts-alt"
                    detail="Candidates Applied"
                    subHeadingColor="text-white"
                  >
                    <ResponsiveContainer width="100%" height={100}>
                      <BarChart data={chartData} maxBarSize={4}
                                margin={{left: 0, right: 0, top: 10, bottom: 10}}>
                        <Bar dataKey='amt' fill='white'/>
                      </BarChart>
                    </ResponsiveContainer>
                  </ReportBox>
                  
                  <Link to={"/candidate/profile"}>
                    <Widget styleName="jr-card-profile p-3 bg-info">
                      <div className="row ">
                        <div className="col-6 pr-0">
                          <span className="mb-1 text-white">Record Your Elevator Pitch to Enhance the Chance of Getting an Interview</span>
                        </div>
                        <div className="col-6 p-0 m-auto">
                            <img className="w-100" src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/jobContent/video-record.png"/>
                        </div>
                      </div>
                    </Widget>
                  </Link>
                  
                </div>
            </div>
          </div>
      </div>
      
      <LoginForm isOpen={this.state.loginModalIsOpen} redirectUrl={"/job/"+this.state.activeJob} openSignupModal={this.openSignupModal} closeModal={() => this.closeModal('loginModalIsOpen')} />
      <SignupForm isOpen={this.state.signupModalIsOpen} closeModal={() => this.closeModal('signupModalIsOpen')} />
      
      {(this.props.userType=='admin') && 
        <ReferCandidateForm jobId={this.state.activeJob} isOpen={this.state.referCandidateOpen} closeModal={() => this.closeModal('referCandidateOpen')} />
      }
      <ReferralForm refUrl={this.state.refUrl} refCount={this.state.referralCount} isOpen={this.state.referralModalIsOpen} closeModal={() => this.closeModal('referralModalIsOpen')} />
    </div>
    }
     </div>
    )
  }
}

const steps = [
  {
    selector: '.step01',
    content: 'Click this button to reveal the company name',
  },
  {
    selector: '.step02',
    content: 'Click this button to refer to your friends',
  },
  {
    selector: '.step03',
    content: 'This is step3',
  },
  {
    selector: '.step04',
    content: 'This is the last step',
  },];
  
const mapStateToProps = (state) => {
  const { isLoggedin, userType, userData, candidateData } = state.auth;
  return { isLoggedin, userType, userData, candidateData }
};

export default withRouter(connect(mapStateToProps,null)(JobContent));

//export default withRouter(JobContent);