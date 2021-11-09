import React from 'react';
import { Link } from 'react-router-dom';
import { numberWithCommas } from 'actions/Function.js';
import { INDUSTRY_ICON_URL, COMPANY_ICON_URL } from 'constants/PictureUrl';


const ReferralItem = ({data}) => {
  const {job, viewCount, refereeList} = data;
  const {_id, jobTitle, company, industry, salaryMax} = job;
  const successCount = refereeList.reduce((counter, {state}) => state==600 ? counter+1 : counter, 0);
  //const iconName = 1 > 0 ? "up" : "down";
  //const statusStyle = 1 > 0 ? " text-success" : "text-danger";
  return (
    <tr
      tabIndex={-1}
      key={_id}
    >
      <td>
        <div className="user-profile py-2 d-flex flex-row align-items-center">
          <div className="jr-featured-thumb mr-2" style={{minWidth: '80px', maxWidth: '80px'}}>
            <img 
              className="rounded-lg" 
              src={(company == null) ? 
                encodeURI(INDUSTRY_ICON_URL+((industry[0]) ? industry[0]._id.name : "")+".png") : 
                encodeURI(COMPANY_ICON_URL+company+".png")} 
              alt="..."
            />
          </div>
          <div className="user-detail ml-2">
            <Link to={"/job/"+_id}><h5 className="user-name">{jobTitle}</h5></Link>
            {/*<span className="text-light-grey jr-fs-sm">{refereeList.length+" referee"}</span><br/>
            <span className="text-light-grey jr-fs-sm">{successCount +" success"}</span>*/}
            <span className="text-light-grey referral-item">{viewCount+" view"+(viewCount>1 ? "s" : "")}</span><br/>
            <span className="text-light-grey referral-item">{refereeList.length+" applied"}</span><br/>
            {/*<span className="text-light-grey referral-item">{successCount +" success"}</span>*/}
          </div>
        </div>
      </td>
      <td>
        <h5 className="mb-0">${numberWithCommas(successCount*Math.round(salaryMax*0.2/1000)*1000)}</h5>
        <span className="text-light-grey jr-fs-sm">Earned</span>
      </td>
      {/*<td className="text-right">
        <div className={`${statusStyle}`}>
          <i className={`zmdi zmdi-trending-${iconName}`}/> 1</div>
        <div className="text-light-grey jr-fs-sm text-capitalize">{iconName}</div>
      </td>*/}
    </tr>
  );
};

export default ReferralItem;
