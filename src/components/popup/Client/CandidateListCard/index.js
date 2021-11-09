import React from "react";
import axios from "axios";
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';

import Widget from "components/Widget/index";
import CustomScrollbars from 'util/CustomScrollbars';
import CandidateListItem from "./CandidateListItem";
import InfiniteScroll from 'react-infinite-scroller';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';

import { arraySortByDate } from 'actions/Function.js';

class CandidateListCard extends React.Component {
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
    const applicantList = this.props.applicantList;
    
    const loaderComponent = <div className="loader" key={0} style={{padding: "30px 0px"}}>Loading ...</div>;
    
    var candidateItems = [];
    applicantList.map((obj, i) => {
      candidateItems.push(
          <CandidateListItem key={obj._id} data={obj} tab={this.state.activeTab}/>
      )
    });
    
    return (
      <Widget>
        <div className="jr-news-action jr-tabs-classic jr-tabs-classic-no-border">
          <CustomScrollbars className="scrollbar" style={{height: 350}}>
            <TabContent style={{'width': '95%'}} className="jr-tabs-content" activeTab={this.state.activeTab}>
              <TabPane id="inif-container-candidateListCard-tab0" tabId="0">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.props.loadAllMore}
                    hasMore={this.props.hasMore ? true : false}
                    loader={loaderComponent}
                    useWindow={false}
                    getScrollParent={() => document.getElementById('inif-container-candidateListCard-tab0')}
                  >
                    {candidateItems}
                </InfiniteScroll>
                {
                  candidateItems.length <= 0 ?
                      <div className="recordNotFound" style={{height:'270px'}}>
                      <img src={encodeURI(WEB_IMAGE_URL+"candidate/dashboard/recommended_job.png")}/>
                        <span>
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            &nbsp; New candidates are found - check back soon.
                        </span> 
                      </div>
                    : ""
                }
              </TabPane>
            </TabContent>
          </CustomScrollbars>
        </div>
      </Widget>
    );
  }
}

export default CandidateListCard;
