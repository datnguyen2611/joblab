import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { numberWithCommas } from 'actions/Function.js';
import { INDUSTRY_ICON_URL, COMPANY_ICON_URL } from 'constants/PictureUrl';


const InterestedJobItem = ({data, isUnlocked, confirmApp}) => {
  const {_id, jobTitle, company, industry, salaryMax, yearMin, createdAt, isPublic, refererReward} = data;
  //const styleName = "col-xl-6 col-lg-6 col-sm-6 col-12 mb-4";
  const styleName = "col-xl-12 col-lg-12 col-sm-12 col-12 mb-4";

  return (
    <div className={`${styleName}`}>
      <div className="row no-gutters">
        <div className="col-sm-5 col-2 unlock-margin-resp" style={{minWidth: '80px', maxWidth: '80px'}}>
          <img 
            className="img-fluid rounded" 
            src={(company == null) ? 
              encodeURI(INDUSTRY_ICON_URL+((industry[0]) ? industry[0]._id.name : "")+".png") : 
              encodeURI(COMPANY_ICON_URL+company+".png")} 
            alt={jobTitle}
          />
        </div>
        <div className="col-sm-10 col-10 pl-sm-3 pl-2 pt-sm-1 unlock-margin-resp">
          <Link to={"/job/"+_id}><b><h4 className="mb-1 unlock-center-resp"> {jobTitle} {company==null && <span className="jr-tag text-uppercase bg-warning d-inline-block locked locked-job-web" color="#ff9800" >Locked</span>}</h4>
          {company==null && <span className="jr-tag text-uppercase bg-warning d-inline-block locked locked-job-resp application-button-width-resp unlock-center-resp unlock-margin-resp" color="#ff9800" >Locked</span>}
          </b></Link>
          {/*<p className="text-light mb-1"> {company!=null ? company : " "}</p>*/}
          <div className="d-flex align-items-end">
            <h5 className="text-muted mr-auto">Monthly Salary</h5>
            <h5>{salaryMax ? "$" + numberWithCommas(salaryMax) : "Attractive"}</h5>
            <div className="unlockjob-button web">
            <div className="unlockbutton-padding"><Button variant="contained" size="small" className="mb-0" color="primary" disabled={!isUnlocked} onClick={confirmApp}>Apply</Button></div>
            </div>
          </div>
          <div className="d-flex align-items-end">
            <h5 className="text-muted mr-auto">Rewards</h5>
            <h5>${numberWithCommas(refererReward ? refererReward : 0 )}</h5>
            <div className="unlockjob-button web"></div>
          </div>
          
          <div className="unlockbutton-padding responsive"><Button variant="contained" size="small" className="mb-0" color="primary" disabled={!isUnlocked} onClick={confirmApp}>Apply</Button></div>
          
        </div>
      </div>
    </div>
  )
};

export default InterestedJobItem;

