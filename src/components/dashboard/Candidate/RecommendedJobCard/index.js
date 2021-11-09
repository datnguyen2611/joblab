import React from "react";
import axios from "axios";
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';

import Widget from "components/Widget/index";
import CustomScrollbars from 'util/CustomScrollbars';
import RecommendedJobItem from "./RecommendedJobItem";
import InfiniteScroll from 'react-infinite-scroller';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';

import { arraySortByDate } from 'actions/Function.js';

class RecommendedJobCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '0'
    }
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const allRecommendedJobList = this.props.allRecommendedJobList;
    const matchedJobList = this.props.matchedJobList;
    const recommendedJobList = this.props.recommendedJobList;
    
    const loaderComponent = <div className="loader" key={0} style={{padding: "30px 0px"}}>Loading ...</div>;
    
    var allRecommendedItems = [];
    allRecommendedJobList.map((obj, i) => {
      allRecommendedItems.push(
          <RecommendedJobItem key={obj._id} data={obj} isAI={obj.score ? true : false} />
      )
    });
    
    var matchedRecommendedItems = [];
    matchedJobList.map((sim, i) => {
      matchedRecommendedItems.push(
          <RecommendedJobItem key={sim._id} data={sim.job} isAI={true} />
      )
    });
    
    var recommendedItems = [];
    recommendedJobList.map((app, i) => {
      recommendedItems.push(
          <RecommendedJobItem key={app._id} data={app.job} isAI={false} />
      )
    });
    
    
    return (
      <Widget>
        <div className="d-flex flex-row justify-content-between mb-2">
          <h4 className="mr-2">Recommended Jobs</h4>

          {/*<span className="ml-2 pointer"><i className="zmdi zmdi-search text-primary jr-fs-xl"/></span>*/}
        </div>
        <div className="jr-news-action jr-tabs-classic jr-tabs-classic-no-border">
          <div className="jr-tabs-up jr-tabs-up-no-border">
            <Nav className="jr-tabs-pills-ctr" pills>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '0'})}
                  onClick={() => {
                    this.toggle('0');
                  }}
                >
                  All
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '1'})}
                  onClick={() => {
                    this.toggle('1');
                  }}
                >
                  By AI
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '2'})}
                  onClick={() => {
                    this.toggle('2');
                  }}
                >
                 By HeadHunter
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <CustomScrollbars className="scrollbar" style={{height: 510}}>
          {/*<TabContent className="jr-tabs-content recommeded-jd-scroll" activeTab={this.state.activeTab}>*/}
            <TabContent className="jr-tabs-content" activeTab={this.state.activeTab}>
              <TabPane id="inif-container-recommendedJobCard-tab0" tabId="0">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.props.loadAllMore}
                    hasMore={this.props.hasMore.get("allRecommendedJob") ? true : false}
                    loader={loaderComponent}
                    useWindow={false}
                    getScrollParent={() => document.getElementById('inif-container-recommendedJobCard-tab0')}
                  >
                    {allRecommendedItems}
                </InfiniteScroll>
                {
                  allRecommendedItems.length <= 0 ?
                      <div className="recordNotFound" style={{height:'270px'}}>
                      <img src={encodeURI(WEB_IMAGE_URL+"candidate/dashboard/recommended_job.png")}/>
                        <span>
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            &nbsp; New jobs are added daily - check back soon.
                        </span> 
                      </div>
                    : ""
                }
                {/* arraySortByDate(matchedJobList.concat(recommendedJobList),false).map((obj) =>//allProperties.map((data, index) =>
                    <RecommendedJobItem key={obj._id} data={obj.job} isAI={obj.score ? true : false} />
                  )
                */}
              </TabPane>
              
              <TabPane id="inif-container-recommendedJobCard-tab1" tabId="1">
                {
                  matchedRecommendedItems.length <= 0 ?
                      <div className="recordNotFound" style={{height:'270px'}}>
                      <img src={encodeURI(WEB_IMAGE_URL+"candidate/dashboard/recommended_job.png")}/>
                        <span>
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            &nbsp; New jobs are added daily - check back soon.
                        </span> 
                      </div>
                    : 
                      <InfiniteScroll
                          pageStart={0}
                          loadMore={this.props.loadMatchedMore}
                          hasMore={this.props.hasMore.get("matchedRecommendedJob") ? true : false }
                          loader={loaderComponent}
                          useWindow={false}
                          getScrollParent={() => document.getElementById('inif-container-recommendedJobCard-tab1')}
                        >
                          {matchedRecommendedItems}
                      </InfiniteScroll>
                }
                {/*matchedJobList.map((sim) =>//allProperties.map((data, index) =>
                  <RecommendedJobItem key={sim._id} data={sim.job} isAI={true} />
                )*/}
              </TabPane>
  
              {<TabPane id="inif-container-recommendedJobCard-tab2" tabId="2">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.props.loadRecommendedMore}
                    hasMore={this.props.hasMore.get("hhRecommendedJob") ? true : false}
                    loader={loaderComponent}
                    useWindow={false}
                    getScrollParent={() => document.getElementById('inif-container-recommendedJobCard-tab2')}
                  >
                    {recommendedItems}
                </InfiniteScroll>
                {
                  recommendedItems.length <= 0 ?
                      <div className="recordNotFound" style={{height:'270px'}}>
                      <img src={encodeURI(WEB_IMAGE_URL+"candidate/dashboard/recommended_job.png")}/>
                        <span>
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            &nbsp; New jobs are added daily - check back soon.
                        </span> 
                      </div>
                    : ""
                }
                {/*recommendedJobList.map((app) =>//allProperties.map((data, index) =>
                  <RecommendedJobItem key={app._id} data={app.job} isAI={false} />
                )*/}
              </TabPane>}
            </TabContent>
          </CustomScrollbars>
        </div>
      </Widget>
    );
  }
}

export default RecommendedJobCard;
