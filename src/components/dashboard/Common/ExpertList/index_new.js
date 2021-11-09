import React, {Component} from "react";
import axios from "axios";
import Aux from "util/Auxiliary.js"
import Tooltip from '@material-ui/core/Tooltip';
import WidgetHeader from "components/WidgetHeader/index";
import { AVATAR_DEFAULT_URL } from 'constants/PictureUrl';

import UserContactForm from 'components/popup/UserContactForm';

function Status(props) {
  const isType = props.isType;
  if (isType === 'online') {
    return <span className="badge-status-dot bg-success"/>;
  } else if (isType === 'away') {
    return <span className="badge-status-dot bg-warning"/>;
  } else {
    return <span className="badge-status-dot bg-red"/>;
  }
}

class ExpertList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expertList: [],
      contactModalIsOpen: false,
      activeAdmin : null
    }
  }

  componentDidMount() {
    axios.get("/api/users/get/expert/list")
    .then(res => {
      if (res.data.isSuccess) {
        this.setState({
          expertList: res.data.expertList,
        })
      }
    })
  }
  
  openModal = (e, expert) => {
    console.log(e);
    console.log(expert);
    this.setState({
      contactModalIsOpen: true,
      activeExpert: expert
    });
  }
  
  closeModal = (name) => {
    this.setState({
      [name]: false,
    });
  }
  
  
  render() {
    const {expertList, contactModalIsOpen} = this.state;
    return (
      <Aux>
      <h2 className="jr-entry-title d-flex flex-row">Our Career Experts 
        {/*<span className="text-primary jr-font-weight-medium jr-fs-md pointer ml-auto d-none d-sm-block">Go to agents list <i
          className="zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle"/></span>*/}</h2>

      <ul className="jr-agents-list">
        {expertList.map((expert, index) =>
          <Tooltip key={index} id="tooltip-fab" title={"Contact: "+expert.phone.dial+" "+expert.phone.number} placement="bottom">
            <li key={index} style={{cursor: 'pointer'}} onClick={(e)=>{ e.preventDefault();this.openModal(e,expert);}}>
              <div className="jr-profileon">
                <div className="jr-profileon-thumb">
                  <img 
                    alt="..." 
                    src={(expert.pictureUrl == null) ? 
                          AVATAR_DEFAULT_URL : 
                          expert.pictureUrl}
                  />
                </div>
                <div className="jr-profileon-content">
                  <h5 className="mb-0 text-truncate">{expert.name.firstName + " " + expert.name.lastName}</h5>
                  {/*<p className="mb-0 jr-fs-sm text-truncate"><i className={`zmdi zmdi-star text-orange`}/> {user.rating}
                    <span>|</span> {user.deals}
                  </p>*/}
                </div>
              </div>
            </li>
          </Tooltip>
        )}
      </ul>
      <UserContactForm expertData={this.state.activeExpert} isOpen={contactModalIsOpen} closeModal={() => this.closeModal('contactModalIsOpen')} />
      {/*<span className="text-primary jr-font-weight-medium jr-fs-md pointer mb-3 d-block d-sm-none">Go to agents list <i
        className="icon icon-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle"/></span>*/}
    </Aux>
    )
  }
};

export default ExpertList;
