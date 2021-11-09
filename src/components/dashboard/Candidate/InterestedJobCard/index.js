import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import * as notification from 'actions/Notification';
import InfiniteScroll from 'react-infinite-scroller';
import InterestedJobItem from './InterestedJobItem';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';


class InterestedJobCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };
  
  confirmApp = (jobId) => {
    const data = { jobId };
    axios.post('/api/candidates/set/application/apply', data)
    .then(res => {
      if (res.data.isSuccess) {
        notification.success("You have applied the job successfully.");
        this.props.updateDashboard();
      }
      else {
        notification.error("The action cannot be performed at the moment. Please try again later.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    const interestedJobList = this.props.interestedJobList;
    
    const loaderComponent = <div className="loader" key={0} style={{padding: "30px 0px"}}>Loading ...</div>;
    
    var interestedJobItems = [];
    interestedJobList.map((app, index) => {
      interestedJobItems.push(
          <InterestedJobItem key={app._id} isUnlocked={app.state.candidateStatus=="Eligible"} data={app.job} confirmApp={() => this.confirmApp(app.job._id)} />
      )
    });
    
    var pendingCount = interestedJobList.filter((app) => {return app.state.candidateStatus=="Pending"}).length;
    
    return (
      <div className="jr-card">
        <div className="jr-card-header d-flex align-items-start">
          <div className="mr-auto">
            <h3 className="card-heading">Reveal Company Requested</h3>
            <p className="sub-heading">Our career experts and AI are reviewing your request to disclose employer identity.</p>
          </div>
          <span className="badge badge-primary ml-auto">{pendingCount+" Pending Unlock"+(pendingCount>1 ? "s" : "")}</span>
          
          {/*<Button className="jr-btn mt-n1 mr-n2" color="primary" onClick={() => this.props.history.push("/joblist")}>
            <i className="zmdi zmdi-plus zmdi-hc-lg"/>
            <span>More Jobs</span>
          </Button>*/}
        </div>
        <CustomScrollbars id="inif-container-interestedJobCard" className="scrollbar" style={{height: 280}}>
            {/*<div className="row">*/}
            {
              interestedJobItems.length <= 0 ?
                  <div className="recordNotFound notfound" style={{height:'220px'}}>
                  <img src={encodeURI(WEB_IMAGE_URL+"candidate/dashboard/notfound.png")}/>
                    <span>
                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                        &nbsp; No Record Found.
                    </span> 
                  </div>
              :
               <InfiniteScroll
                    className="row"
                    pageStart={0}
                    loadMore={this.props.loadInterestedJobMore}
                    hasMore={this.props.hasMore.get("interestedJob") ? true : false }
                    loader={loaderComponent}
                    useWindow={false}
                    getScrollParent={() => document.getElementById('inif-container-interestedJobCard')}
                  >
                    {interestedJobItems}
                </InfiniteScroll>
            }
           
            {/*interestedJobList.map((app, index) => <InterestedJobItem key={app._id} isUnlocked={app.state.candidateStatus=="Eligible"} data={app.job} confirmApp={() => this.confirmApp(app._id)} />)*/}
          {/*</div>*/}
        </CustomScrollbars>
        {/*<Button size="small" color="primary">VIEW ALL PRODUCTS</Button>*/}
      </div>
    );
  }
}

export default withRouter(InterestedJobCard);
