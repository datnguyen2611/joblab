import React, {Component} from "react";
import axios from "axios";
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
      <div className="jr-entry-sec">
        <WidgetHeader title={<span>Our Career Experts {/*<span className="text-grey">(27 Mutual)</span>*/}</span>}/>
        <ul className="jr-fnd-list">
          {expertList.map((expert, index) =>
            <Tooltip key={index} id="tooltip-fab" title={"Contact: "+expert.phone.dial+" "+expert.phone.number} placement="bottom">
              <li className="mb-2" key={index} style={{cursor: 'pointer'}} onClick={(e)=>{ e.preventDefault();this.openModal(e,expert);}}>
                <div className="jr-user-fnd">
                  <img 
                    alt="..."
                    src={(expert.pictureUrl == null) ? 
                          AVATAR_DEFAULT_URL : 
                          expert.pictureUrl} alt='' />
                  <div className="jr-user-fnd-content">
                    {/*<span className="jr-badge"><Status isType={user.status}/></span>*/}
                    <h6>{expert.name.firstName + " " + expert.name.lastName}</h6>
                  </div>
                </div>
              </li>
            </Tooltip>
          )}
        </ul>
        <UserContactForm expertData={this.state.activeExpert} isOpen={contactModalIsOpen} closeModal={() => this.closeModal('contactModalIsOpen')} />
        {/*<SignupForm isOpen={contactModalIsOpen} closeModal={this.closeModal} />*/}
      </div>
    )
  }
};

export default ExpertList;
