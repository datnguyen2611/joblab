import React from "react";
import {withRouter} from "react-router-dom";
import Widget from "components/Widget/index";
import Button from '@material-ui/core/Button';

const RewardCard = (props) => {
  return (
    <Widget styleName={`bg-grey darken-4 text-white`}>
      <div className="d-flex flex-row justify-content-center mb-3">
        <i className={`zmdi zmdi-view-web zmdi-hc-4x`}/>
      </div>
      <div className="text-center">
        <h3 className="jr-font-weight-medium mb-3">Refer and Get Rewards</h3>
        <p className="mb-3">Refer jobs to your friends and
          earn a referral bonus.</p>
        <Button size="large" className="bg-warning text-white mt-3 text-capitalize" onClick={() => props.history.push("/joblist")}>Go to Jobs List</Button>
      </div>
    </Widget>
  );
};

export default withRouter(RewardCard);
