import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import { numberWithCommas } from 'actions/Function.js';
import { INDUSTRY_ICON_URL, COMPANY_ICON_URL } from 'constants/PictureUrl';


function CandidateListItem({data, tab}) {
  //const { _id , image, name , salary , year , jobTitle , company , industry , location } = data;
  const { candidate, state, updatedAt, jobInfo } = data;
  const { _id , salary , experience , jobTitle , company , industry} = candidate ? candidate : {};
  
  return (
    <div className="media jr-featured-item">
      {/*isFeatured === true ? <span color="orange"><span className="text-uppercase">featured</span></span> : null*/}
      <div className="unlock-margin-resp jr-featured-thumb " style={{maxWidth: '80px'}}>
        <img className="rounded-lg" src={_id ? _id.pictureUrl : ""} alt="..." />
      </div>
      <div className="media-body jr-featured-content unlock-center-resp margin-top-resp">
        <div className="jr-featured-content-left">
          {
            state && state[0] && state[0].toLowerCase().includes("reject") ?
              <span className="jr-tag text-uppercase bg-danger d-inline-block" color="#f44336">{state && state[0]}</span>
            : <span className="jr-tag text-uppercase bg-blue-popup-status d-inline-block" color="#3f51b5">{state && state[0]}</span>
          }
          <Link to={"/application/"+data._id}><h3 className="mb-1">{_id && _id.name ? _id.name.firstName + " " + _id.name.lastName : "No Name Provided"}</h3></Link>
  
          <p className="text-grey mb-1">{jobTitle ? jobTitle : "N/A"} at {company ? company : "N/A"}</p>
  
          <div className="d-flex flex-wrap dashboard-center-resp" style={{"max-width":"550px"}}>
            <p className="mr-3 mb-1"><span className="text-grey">Industry:</span> {industry ? industry.name : "N/A"}</p>
            <p className="mr-3 mb-1"><span className="text-grey">Monthly Salary:</span> {salary}</p>
            <p className="mr-3 mb-1"><span className="text-grey">Year of Experience:</span> {experience}</p>
          </div>
          <p className="mr-3 mb-1"><span className="text-grey">Last Updated:</span> {updatedAt && moment(updatedAt).format("YYYY/MM/DD")}</p>
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
          <div className="unlock-center-resp pt-5">
          <Link to={"/application/"+data._id}><span>Application Detail</span> <i
            className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle`}/></Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CandidateListItem;
