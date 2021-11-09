import React from 'react';
import {Link} from 'react-router-dom';
//import IconButton from '@material-ui/core/IconButton';
import {Badge} from 'reactstrap';
import moment from "moment";
import { COMPANY_ICON_URL, INDUSTRY_ICON_URL } from 'constants/PictureUrl';

const ApplicationItem = ({data}) => {
  const {_id, job, state, updatedAt, color} = data;
  
  return (
    <div className="css_tr unlock-center-resp">
      <div className="css_td py-2 dashboard-center-resp unlock-margin-resp">
        <img 
          className="rounded-lg applicationitem" 
          style={{maxWidth: '70px'}} 
          src={(job.company == null) ? 
              encodeURI(INDUSTRY_ICON_URL + (job.industry[0] ? job.industry[0]._id.name : "") + ".png") : 
              encodeURI(COMPANY_ICON_URL+job.company+".png")} 
          alt="..."
        />
      </div>
      <div className="css_td unlock-center-resp"><Link to={"/application/"+_id}>{job.jobTitle}</Link></div>
      <div className="css_td unlock-center-resp">{(job.company == null) && <i class="zmdi zmdi-lock"/>} {(job.company == null) ? "Company Locked" : job.company}</div>
      <div className="css_td last-update unlock-margin-resp unlock-center-resp"><i className={`zmdi zmdi-calendar-alt jr-fs-lg mr-2 d-inline-block align-middle`}/>{moment(updatedAt).format("YYYY/MM/DD")}</div>
      <div className="css_td application-button-width-resp"><Link to={"/application/"+_id}><Badge className="d-block" color={color}>{state.candidateStatus}</Badge></Link></div>
    </div>
    /*<tr
      tabIndex={-1}
      key={_id}>

      <td>
        <Link to={"/candidate/application/"+_id}>{job.jobTitle}</Link>
      </td>
      
      <td>
        <p className="text-truncate mb-0">{job.company==null ? "Unlocking..." : job.company}</p>
      </td>

      <td className="text-nowrap">{moment(updatedAt).format("YYYY/MM/DD")}</td>
      <td>
        <Badge className="d-block" color={color}>{state.candidateStatus}</Badge>
      </td>
      <td className="text-right">
        <IconButton className="icon-btn text-light p-1"><i className="zmdi zmdi-more-vert text-grey"/></IconButton>
      </td>
    </tr>*/
  );
};

export default ApplicationItem;
