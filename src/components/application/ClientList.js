import React, {Component} from "react";
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip';
import WidgetHeader from "components/WidgetHeader/index";

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

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientList: [],
      contactModalIsOpen: false,
      activeAdmin : null
    }
  }
  
  openModal = (e, client) => {
    console.log(e);
    console.log(client);
    this.setState({
      contactModalIsOpen: true,
      activeExpert: client
    });
  }
  
  closeModal = (name) => {
    this.setState({
      [name]: false,
    });
  }
  
  
  render() {
    const {expertList, contactModalIsOpen} = this.state;
    const { clientList } = this.props;
    return (
      <div className="jr-entry-sec">
        <WidgetHeader title={<span>Client List {/*<span className="text-grey">(27 Mutual)</span>*/}</span>}/>
        <ul className="jr-fnd-list">
          {clientList.map((client, index) =>
            <Tooltip key={index} id="tooltip-fab" title={"Contact: "+client._id.phone.dial+" "+client._id.phone.number} placement="bottom">
              <li className="mb-2" key={index} style={{cursor: 'pointer'}} onClick={(e)=>{ e.preventDefault();this.openModal(e, client._id);}}>
                <div className="jr-user-fnd">
                  <img alt="..." src={client._id.pictureUrl} />
                  <div className="jr-user-fnd-content">
                    {/*<span className="jr-badge"><Status isType={user.status}/></span>*/}
                    <h6>{client._id.name.firstName + " " + client._id.name.lastName}</h6>
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

export default ClientList;