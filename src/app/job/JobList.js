import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes';
import JobLeftList from 'components/JobList/JobLeftList';
import JobContent from 'components/JobContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import {isMobile} from 'util/functions';
import { Helmet } from 'react-helmet';

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      activeJob: "",
      mobileShowJobDetails: false,
    }

  }
  
  componentDidMount() {
    this.props.updateHeaderStyle(VERTICAL_NAVIGATION, false);
    setTimeout(() => {
      this.setState({ loader: false });
    }, 100);
  }

  updateActiveJob = (jid, listState, scrollYPosition) => {
    this.setState({
      activeJob : jid
    })
    
    //if(isMobile())
    //   setTimeout(() => { this.triggerJobDetailsMobile(true); }, 500);
    if(isMobile())
    {
      let previousInfo = {"scrollY": scrollYPosition , "state": listState }
      let stringifiedInfo = JSON.stringify(previousInfo)
      window.localStorage.setItem("previousInfo", stringifiedInfo);
      this.props.history.push("/job/"+jid);
    }
  }
  
  triggerJobDetailsMobile(state){
    this.setState({
      mobileShowJobDetails : (state ? true : false)
    })
  }
  
  render() {
    const { loader, mobileShowJobDetails } = this.state;
    const mobileLeft = mobileShowJobDetails ? "d-none d-sm-block " : "";
    const mobileRight =  mobileShowJobDetails ? "" : "d-none d-md-none d-sm-block ";
    const isMobileView = isMobile();
  
    return (
    
      <div className="app-wrapper joblist-wrapper">
        { loader ?
          <div className="loader-view"
               style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
            <CircularProgress/>
            <Helmet>
              <title>Job Search | JobsLab</title>
            </Helmet>
          </div> : 
          
          <div>
            {/*not match = mobile*/}

            {isMobileView
                ? //mobile
                 <div className="row">
                    <div className={`${mobileLeft} col-lg-4 col-md-12 col-sm-3 col-12`}>
                      <JobLeftList updateActiveJob={this.updateActiveJob.bind(this)} activeJob={this.state.activeJob}  />
                    </div>
                    <div className={`${mobileRight} col-12 col-xl-9 col-lg-8 col-md-12 col-sm-9`}>
                      <JobContent activeJob={this.state.activeJob} isSearch={true} isMobileBackbtn={true} isNotInsideList={false} triggerJobDetailsMobile={this.triggerJobDetailsMobile.bind(this)} />
                    </div>
                 </div>
                :  //desktop
                 <div className="row joblist-container">
                    <div className={`no-padding-right col-lg-3 col-md-3 col-sm-3 col-12`}>
                      <JobLeftList updateActiveJob={this.updateActiveJob.bind(this)} activeJob={this.state.activeJob}  />
                    </div>
                    <div className={`d-none d-sm-block no-padding-left col-12 col-xl-9 col-lg-9 col-md-9 col-sm-9`}>
                      <JobContent activeJob={this.state.activeJob} isSearch={true} isNotInsideList={false} />
                    </div>
                 </div>
            }


          </div>
        }
      </div>
    )
  }
}

export default withRouter(JobList);