import React from "react";
import {withRouter} from "react-router-dom";
import Widget from "components/Widget/index";
import Button from '@material-ui/core/Button';

const JobAlertCard = (props) => {
  return (
    <Widget styleName={`bg-light-blue darken-4 text-white`}>
      <div className="d-flex flex-row justify-content-center mb-3">
        <i className={`zmdi zmdi-notifications-active zmdi-hc-4x`}/>
      </div>
      <div className="text-center">
        <h3 className="jr-font-weight-medium mb-3">Job Alert</h3>
        <p className="mb-3">Setup job alert and receive the latest job information!</p>
        <Button size="large" className="bg-warning text-white mt-3 text-capitalize" onClick={() => props.history.push("/candidate/jobalert")}>Go to Jobs Alert</Button>
      </div>
    </Widget>
  );
};

export default withRouter(JobAlertCard);
