import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import { numberWithCommas } from 'actions/Function.js';
import { INDUSTRY_ICON_URL, COMPANY_ICON_URL } from 'constants/PictureUrl';


function RecommendedJobItem({data, isAI}) {
  const {_id, jobTitle, company, industry, salaryMax, yearMin, createdAt, isPublic, refererReward} = data;
  return (
    <div className="media jr-featured-item">
      {/*isFeatured === true ? <span color="orange"><span className="text-uppercase">featured</span></span> : null*/}
      <div className="unlock-margin-resp jr-featured-thumb " style={{maxWidth: '80px'}}>
        <img 
          className="rounded-lg" 
          src={(company == null) ? 
            encodeURI(INDUSTRY_ICON_URL+((industry[0]) ? (industry[0]._id.name ? (industry[0]._id.name) 
                                                                               : "" ) 
                                                       : "")+".png") : 
            encodeURI(COMPANY_ICON_URL+company+".png")} 
          alt="..."
        />
        {/*company==null && <span className="jr-tag">Locked</span>*/}
      </div>
      <div className="media-body jr-featured-content unlock-center-resp margin-top-resp">
        <div className="jr-featured-content-left">
          { isAI ? 
            <span className="jr-tag text-uppercase bg-info d-inline-block" color="#06BB8A">Recommended by AI</span>
            :
            <span className="jr-tag text-uppercase bg-danger d-inline-block" color="#06BB8A">Recommended by HeadHunter</span>
          }
          {company==null && <span className="jr-tag text-uppercase bg-warning d-inline-block locked" color="#ff9800" >Locked</span>}
          
          <Link to={"/job/"+_id}><h3 className="mb-1">{jobTitle}</h3></Link>

          <p className="text-grey mb-1">{company!=null && company}</p>

          <div className="d-flex flex-wrap mb-2 dashboard-center-resp">
            <p className="mr-3 mb-1"><span className="text-grey">Industry:</span> {(industry && industry.length > 0) ? industry[0]._id.name : ""}</p>
            <p className="mr-3 mb-1"><span className="text-grey">Monthly Salary:</span> {salaryMax ? "$" + numberWithCommas(salaryMax) : "Attractive"}</p>
            <p className="mr-3 mb-1"><span className="text-grey">Year of Experience:</span> {yearMin}</p>
            {/*<p className="mr-3 mb-1"><span className="text-grey">Reward:</span> ${numberWithCommas(Math.round(salaryMax*0.2/1000)*1000 + 10000)}</p>*/}
            {/*<a className="text-grey text-underline" href="#/"> + {more} more</a>*/}
          </div>
          <div className="d-flex flex-row">
            {/*<p className="text-grey mb-1">
              <i className={`zmdi zmdi-account jr-fs-lg mr-2 d-inline-block align-middle`}/>{name}
            </p>
            <p className="text-grey ml-4 mb-1">
            <p className="text-grey mb-1">
              <i className={`zmdi zmdi-calendar-alt jr-fs-lg mr-2 d-inline-block align-middle`}/>{moment(createdAt).format("YYYY/MM/DD")}
            </p>*/}
          </div>
        </div>
        <div className="jr-featured-content-right">
          <div>
            <h2 className="mt-3 mb-0 jr-font-weight-medium unlock-center-resp">Total Reward: ${numberWithCommas((refererReward ? refererReward : 0 ) + 10000)}</h2>
            <p className="text-grey jr-fs-sm"></p>
            {/*<p className="text-grey jr-fs-sm">Monthly Salary: ${numberWithCommas(salaryMax)}</p>*/}
          </div>
          <div className="unlock-center-resp">
          <Link to={"/job/"+_id}><span>Check in detail</span> <i
            className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle`}/></Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RecommendedJobItem;
