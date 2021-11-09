import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Auxiliary from "util/Auxiliary";
import { INDUSTRY_ICON_URL, COMPANY_ICON_URL } from 'constants/PictureUrl';

import { numberWithCommas } from 'actions/Function.js';

class JobDescription extends Component {
  componentDidMount() {
    
  }
  
  render() {
    const { _id, jobTitle, company, industry, salaryMax, refererReward } = this.props.jobData;

    return (
      <Auxiliary>
        <div className="jr-profileon">
          <div className="jr-profileon-thumb jr-profileon-thumb-htctrcrop">
            <img 
              src={(company == null) ? 
                  encodeURI(INDUSTRY_ICON_URL + (industry[0] ? industry[0]._id.name : "") + ".png") : 
                  encodeURI(COMPANY_ICON_URL+company+".png")} 
              alt=''
            />
          </div>
          <div className="jr-profileon-content">
            <p className="jr-profileon-title">{jobTitle}</p>
            <span className="jr-fs-sm"></span>
          </div>
        </div>

        <div className="jr-follower text-center">
          <ul className="jr-follower-list">
            <li>
              <span className="jr-follower-title"><b>{salaryMax ? "$" + numberWithCommas(salaryMax) : "Attractive"}</b></span>
              <span>Monthly Salary</span>
            </li>
            <li>
              <span className="jr-follower-title"><b>{"$"+numberWithCommas(10000)}</b></span>
              <span>Candidate Reward</span>
            </li>
            <li>
              <span className="jr-follower-title"><b>${ numberWithCommas(refererReward ? refererReward : 0 ) }</b></span>
              <span>Referral Reward</span>
            </li>
          </ul>
        </div>
        <div className="mb-xl-4 mb-3">
          <Button size="small" variant="contained" className="mb-0" color="primary"
                    onClick={(e) => this.props.history.push("/job/"+_id)}>Go to Job Description</Button>
        </div>
      </Auxiliary>
    )
  }
}

export default withRouter(JobDescription);
