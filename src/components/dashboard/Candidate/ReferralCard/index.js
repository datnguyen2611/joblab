import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CustomScrollbars from 'util/CustomScrollbars';
import IntlMessages from 'util/IntlMessages';
import ReferralItem from './ReferralItem';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';

class ReferralCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };
  
  render() {
    const refList = this.props.refList;
    
    return (
      <div className="jr-card referral-index">
        <div className="jr-card-header d-flex align-items-center mb-3">
          <h3 className="card-heading mb-0">
            <i className="zmdi zmdi-smartphone-android zmdi-hc-fw text-primary text-lighten-2 mr-2"/>
            Referral List
            {/*<IntlMessages id="dashboard.marketingCampaign"/>*/}
            <p className="sub-heading">Get paid for your referrals.</p>
          </h3>
          
          <span className="badge badge-primary ml-auto">{refList.length+" Referred Job"+(refList.length>1 ? "s" : "")}</span>
        </div>
        <div className="table-responsive-material markt-table">
          <CustomScrollbars className="scrollbar" style={{height: 280}}>
            <table className="table default-table table-sm remove-table-border table-hover mb-0">
              <tbody>
              {refList.map(ref => {
                return (
                  <ReferralItem key={ref._id} data={ref}/>
                );
              })}
              </tbody>
            </table>
            {
              refList.length <= 0 ?
                  <div className="recordNotFound notfound" style={{height:'235px'}}>
                  <img src={encodeURI(WEB_IMAGE_URL+"candidate/dashboard/porfolio.png")}/>
                    <span>
                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                        &nbsp; Start building your referral portfolio for rewards.
                    </span> 
                  </div>
                : ""
            }
          </CustomScrollbars>
        </div>
      </div>
    );
  }
};

export default ReferralCard;