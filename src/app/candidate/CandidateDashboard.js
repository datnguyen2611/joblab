import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link as ScrollLink, Element } from 'react-scroll';
import CircularProgress from '@material-ui/core/CircularProgress';
import SalarySurvey from 'components/dashboard/Candidate/SalarySurvey';
import Profile from "components/dashboard/Common/Profile";
import ExpertList from "components/dashboard/Common/ExpertList";
import SimpleRadarChart from "components/Chart/SimpleRadarChart";
import ChartCard from "components/dashboard/Common/ChartCard";
import { increamentData } from "./mdata";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import ApplicationCard from 'components/dashboard/Candidate/ApplicationCard';
import RecommendedJobCard from "components/dashboard/Candidate/RecommendedJobCard";
import InterestedJobCard from "components/dashboard/Candidate/InterestedJobCard";
import ReferralCard from 'components/dashboard/Candidate/ReferralCard';
import RewardCard from "components/dashboard/Candidate/RewardCard";
import JobAlertCard from "components/dashboard/Candidate/JobAlertCard";
import { Helmet } from 'react-helmet';
import Gauge from "components/dashboard/Candidate/Competitiveness/Gauge";
import CompetitivenessGauge from "components/dashboard/Candidate/Competitiveness/CompetitivenessGauge";

import { radarChartData } from "./data";

import { VERTICAL_NAVIGATION } from 'constants/ActionTypes'
import { arraySortByDate } from 'actions/Function.js';

import Tour from 'reactour'
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Button from '@material-ui/core/Button';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

class CandidateDashboard extends Component {
  constructor(props) {
    super(props);
    
    this.resetInifScroll();

    this.state = {
      loader: true,
      
      appList: [],
      allRecommendedJobList: [],
      matchedJobList: [],
      recommendedJobList: [],
      interestedJobList: [],
      refList: [],
      
      appCount: 0,
      matchedCount: 0,
      matchedCountWeekly: 0,
      recommendCount: 0,
      recommendCountWeekly: 0,
      interviewCount: 0,
      interviewConfirmCount: 0,
      //unlockCount: 0,
      //unlockPendingCount: 0,
      referralCount: 0,
      refereeCount: 0,
      isTourOpen: true,
      hasMore: new Map(),
      pageNum: new Map(),
      pageSize: 20,
    }
  }

  resetInifScroll = async () => {
    var hasMore = new Map();
    //recomemed job
    hasMore.set("allRecommendedJob",true);
    hasMore.set("matchedRecommendedJob",true);
    hasMore.set("hhRecommendedJob",true);
    //interested job
    hasMore.set("interestedJob", true);
    
    var pageNum = new Map();
    //recomemed job
    pageNum.set("allRecommendedJob",1);
    pageNum.set("matchedRecommendedJob",1);
    pageNum.set("hhRecommendedJob",1);
    //interested job
    pageNum.set("interestedJob", 1);
    
    this.setState({
      hasMore: hasMore,
      pageNum: pageNum,
    })
  }
  
  componentDidMount() {
    this.updateDashboard();
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1000);
    
    //!-----disable Tour-----!//
    this.setState({ isTourOpen: false });
    document.getElementsByClassName('reactour-scroll')[0].style.height = `initial`;
    //!-----disable Tour-----!//
    
  }
  
  updateDashboard = async () => {
    await this.resetInifScroll();
    
    this.getStats();
    this.getApplications();
    this.getMatchedJobs();
    this.getAllRecommendedJobs();
    this.getRecommendedJobs();
    this.getInterestedJobs();
    this.getReferrals();
  }
  
  updateHasMore(param, status){
    var hasMore = this.state.hasMore;
    hasMore.set(param, status ? true : false);
    return hasMore;
  }
  
  updatePageNum(param, page){
    var pageNum = this.state.pageNum;
    pageNum.set(param, page ? page : 1);
    return pageNum;
  }
  
  getStats() {
    axios.get('/api/candidates/get/dashboard/stats')
    .then(res => {
      if (res.data.isSuccess) {
        this.setState({
          matchedCount: res.data.matchedCount,
          matchedCountWeekly: res.data.matchedCountWeekly,
          recommendCount: res.data.recommendCount,
          recommendCountWeekly: res.data.recommendCountWeekly,
          appCount: res.data.appCount,
          appCountWeekly: res.data.appCountWeekly,
          interviewCount: res.data.interviewCount,
          interviewConfirmCount: res.data.interviewConfirmCount,
          referralCount: res.data.referralCount,
          refereeCount: res.data.refereeCount,
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  getApplications() {
  	axios.get('/api/candidates/get/application/list')
    .then(res => {
      if (res.data.isSuccess) {
        console.log(res.data)
        this.setState({
          appList: res.data.app_list,
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  getMatchedJobs() {
    var currentPage = this.state.pageNum.get("matchedRecommendedJob") ? this.state.pageNum.get("matchedRecommendedJob") : 1;
  	axios.post('/api/candidates/get/job/matched', {
        pageNum: currentPage,
        recordPerReq: this.state.pageSize,
  	})
    .then(res => {
      if (res.data.isSuccess) {
        
        var hasMore = this.updateHasMore("matchedRecommendedJob", false);
        var pageNum = this.updatePageNum("matchedRecommendedJob", currentPage + 1);
        
        this.setState({
          matchedJobList: res.data.sim_list,
          hasMore : hasMore,
          pageNum: pageNum
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  getAllRecommendedJobs() {
    var currentPage = this.state.pageNum.get("allRecommendedJob") ? this.state.pageNum.get("allRecommendedJob") : 1
  	axios.post('/api/candidates/get/job/recommended/all', {
        pageNum: currentPage,
        recordPerReq: this.state.pageSize,
  	})
    .then(res => {
      if (res.data.isSuccess) {
        
        var hasMore = this.updateHasMore("allRecommendedJob", res.data.hasMore ? true : false);
        var pageNum = this.updatePageNum("allRecommendedJob", currentPage + 1);
        
        this.setState({
          allRecommendedJobList: res.data.app_list,
          hasMore : hasMore,
          pageNum: pageNum
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  getRecommendedJobs() {
    var currentPage = this.state.pageNum.get("hhRecommendedJob") ? this.state.pageNum.get("hhRecommendedJob") : 1;
  	axios.post('/api/candidates/get/job/recommended', {
        pageNum: currentPage,
        recordPerReq: this.state.pageSize,
  	})
    .then(res => {
      if (res.data.isSuccess) {
        var hasMore = this.updateHasMore("hhRecommendedJob", false);
        var pageNum = this.updatePageNum("hhRecommendedJob", currentPage + 1);
        this.setState({
          recommendedJobList: res.data.app_list,
          hasMore : hasMore,
          pageNum: pageNum
        }, 
        () => {
          //var array = arraySortByDate(this.state.matchedJobList.concat(this.state.recommendedJobList), false)
          //console.log(array)
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  getInterestedJobs() {
    var currentPage = this.state.pageNum.get("interestedJob") ? this.state.pageNum.get("interestedJob") : 1
  	axios.post('/api/candidates/get/job/interested', {
      pageNum: currentPage,
      recordPerReq: this.state.pageSize,
  	})
    .then(res => {
      if (res.data.isSuccess) {
        var hasMore = this.updateHasMore("interestedJob", (res.data.hasMore == true) ? true : false);
        var pageNum = this.updatePageNum("interestedJob", currentPage + 1);
        this.setState({
          interestedJobList : res.data.app_list,
          hasMore: hasMore,
          pageNum: pageNum
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  getReferrals() {
  	axios.get('/api/candidates/get/referral/list')
    .then(res => {
      if (res.data.isSuccess) {
        this.setState({
          refList: res.data.ref_list,
          //referralCount: res.data.ref_list.length,
          referralTotalCount: res.data.referralTotalCount,
          refereeCount: res.data.ref_list.map(ref => {return ref.refereeList.length}).reduce(reducer)
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  closeTour = () => {
    this.setState({ isTourOpen: false });
    document.getElementsByClassName('reactour-scroll')[0].style.height = `initial`;
  };
  disableBody = () => {
    disableBodyScroll(this.targetElement);
    document.getElementsByClassName('app-footer')[0].style.display = `none`;
  }
  enableBody = () => {
    enableBodyScroll(this.targetElement);
    document.getElementsByClassName('app-footer')[0].style.display = `flex`;
  }

  render() {
    const { loader, appList,allRecommendedJobList, matchedJobList, recommendedJobList, interestedJobList, refList } = this.state;
    const { appCount, appCountWeekly, matchedCountWeekly, matchedCount, recommendCount, recommendCountWeekly, interviewCount, interviewConfirmCount, referralCount, refereeCount } = this.state;
    const { isTourOpen } = this.state;
    
    return (
      <div className="app-wrapper reactour-scroll">

      { loader ?
        <div className="loader-view"
             style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
          <CircularProgress/>
          <Helmet>
              <title>JobsLab</title>
          </Helmet>
        </div> : 
        <div className="row">
          <Helmet>
              <title>My Dashboard | JobsLab</title>
          </Helmet>
          {/*
          <Tour
            steps={steps}
            isOpen={isTourOpen}
            rounded={10}
            onRequestClose={this.closeTour}
            onAfterOpen={this.disableBody}
            onBeforeClose={this.enableBody}
            showCloseButton = {false}
            disableInteraction = {true}
            closeWithMask = {false}
            lastStepNextButton = {<Button variant="contained" color="primary" className="jr-btn"><font>Finish!</font></Button>}
          />
          */}
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
            <Profile />
            {/*<SimpleRadarChart data={radarChartData} />*/}
            {/*<CompetitivenessGauge />*/}
            <Gauge />
            <ExpertList />
          </div>
          
          <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
            <div className="row">
              
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 step01">
                <ScrollLink activeClass="active" className="jr-link dashboard-chartcard" to="recommend" spy={true} smooth={true} offset={-80} duration={500}>
                  <ChartCard 
                    chartProperties={{
                      title: 'RECOMMENDATION',
                      prize: matchedCount+recommendCount,
                      icon: 'stats',
                      bgColor: 'indigo',
                      styleName: '',
                      desc: ((matchedCountWeekly ? matchedCountWeekly : 0) + (recommendCountWeekly ? recommendCountWeekly  :0)) + ' recommendation(s) this week',
                      percent: '',
                    }}
                    children={<ResponsiveContainer width="100%" height={75}>
                      <AreaChart data={increamentData}
                                margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <Area dataKey='pv' strokeWidth={0} stackId="2" stroke='#273894' fill="#273894"
                             fillOpacity={1}/>
                     </AreaChart>
                   </ResponsiveContainer>}
                  />
                </ScrollLink>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                <ScrollLink activeClass="active" className="jr-link dashboard-chartcard" to="application" spy={true} smooth={true} offset={-80} duration={500}>
                  <ChartCard
                    chartProperties={{
                      title: 'APPLICATION',
                      prize: appCount,
                      icon: 'stats',
                      bgColor: 'pink accent-2',
                      styleName: '',
                      desc: (appCountWeekly ? appCountWeekly : 0) + ' application(s) this week',
                      percent: '',
                    }}
                    children={<ResponsiveContainer width="100%" height={75}>
                      <AreaChart data={increamentData}
                                 margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <Area dataKey='pv' type='monotone' strokeWidth={0} stackId="2" stroke='#da2361'
                              fill='#da2361'
                              fillOpacity={1}/>
                      </AreaChart>
                    </ResponsiveContainer>}
                  />
                </ScrollLink>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                <ScrollLink activeClass="active" className="jr-link dashboard-chartcard" to="application" spy={true} smooth={true} offset={-80} duration={500}>
                  <ChartCard
                    chartProperties={{
                      title: 'INTERVIEW',
                      prize: interviewCount,
                      icon: 'stats',
                      bgColor: 'info',
                      styleName: '',
                      desc: interviewConfirmCount+" interview confirm(s)",
                      percent: '',
                    }}
                    children={<ResponsiveContainer width="100%" height={75}>
                      <AreaChart data={increamentData}
                                 margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <Area dataKey='pv' strokeWidth={0} stackId="2" stroke='#0c8e9f' fill='#0c8e9f'
                              fillOpacity={1}/>
                      </AreaChart>
                    </ResponsiveContainer>}
                  />
                </ScrollLink>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                <ScrollLink activeClass="active" className="jr-link dashboard-chartcard" to="referral" spy={true} smooth={true} offset={-80} duration={500}>
                  <ChartCard
                    chartProperties={{
                      title: 'REFERRAL',
                      prize: referralCount,
                      icon: 'stats',
                      bgColor: 'success',
                      styleName: '',
                      desc: refereeCount+' referee(s)',
                      percent: '',
                    }}
                    children={<ResponsiveContainer width="100%" height={75}>
                      <AreaChart data={increamentData}
                                 margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <Area dataKey='pv' strokeWidth={0} stackId="2" stroke='#3a983e' fill='#3a983e'
                              fillOpacity={1}/>
                      </AreaChart>
                    </ResponsiveContainer>}
                  />
                </ScrollLink>
              </div>
              
              {/*<div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1 step02">
                <ExpertList />
              </div>*/}
                
              <div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1">
                <div className="row">
                  <div className="col-xl-9 col-lg-12 order-xl-2">
                    <Element name="recommend" className="element step03">
                      <RecommendedJobCard hasMore={this.state.hasMore}  
                                          loadAllMore={this.getAllRecommendedJobs.bind(this)}  
                                          loadMatchedMore={this.getMatchedJobs.bind(this)} 
                                          loadRecommendedMore={this.getRecommendedJobs.bind(this)} 
                                          allRecommendedJobList={allRecommendedJobList}
                                          matchedJobList={matchedJobList} 
                                          recommendedJobList={recommendedJobList}/>
                    </Element>
                  </div>
                  <div className="col-xl-3 col-lg-12 order-xl-2">
                    <JobAlertCard />
                    <RewardCard />
                  </div>
                </div>
              </div>
                
              <div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1">
                <Element name="application" className="element">
                  <ApplicationCard appList={appList}/>
                </Element>
              </div>
              
              
              
              {/*<div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1">
                <div className="row">
                  <div className="col-xl-8 col-lg-12 order-xl-2">
                    <Element name="unlock" className="element">
                      <InterestedJobCard hasMore={this.state.hasMore}
                                         loadInterestedJobMore={this.getInterestedJobs.bind(this)}
                                         interestedJobList={interestedJobList} 
                                         updateDashboard={this.updateDashboard}/>
                    </Element>
                  </div>
                  <div className="col-xl-4 col-lg-12 order-xl-2 step04">
                    <Element name="referral" className="element">
                      <ReferralCard refList={refList}/>
                    </Element>
                  </div>
                </div>
              </div>*/}
              
              <div className="col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1 step02">
                <SalarySurvey />
              </div>
              
            </div>
          </div>
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
  
export default CandidateDashboard;
