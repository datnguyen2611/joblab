import React, { Component } from 'react';
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
//import Modal from 'react-modal';
//import modalStyle from 'styles/modalStyle';
//Modal.setAppElement(document.getElementById('root'));

class ExpertContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      dial: '',
      number: '',
      firstName: '',
      lastName: '',
      pictureUrl: ''
    };
  }
  
  componentDidUpdate(prevProps) {
    //console.log(this.props)
    if (this.props.expertData !== prevProps.expertData) {
      this.setState({
        email: this.props.expertData.email,
        dial: this.props.expertData.phone.dial,
        number: this.props.expertData.phone.number,
        firstName: this.props.expertData.name.firstName,
        lastName: this.props.expertData.name.lastName,
        pictureUrl: this.props.expertData.pictureUrl
      })
    }
  }

  render() {
    const { isOpen, closeModal } = this.props;
    const { email, dial, number, firstName, lastName, pictureUrl } = this.state;
    
    return (
      /*<Modal
        isOpen={isOpen}
        closeTimeoutMS={200}
        style={modalStyle.adminContactModalStyle}
        onRequestClose={()=>closeModal()}
        contentLabel="Example Modal"
      >
        <div className="admin-contact-popup">
          <div className="contact-block jr-card py-5 px-4">*/
      <Dialog open={isOpen} onClose={closeModal} scroll={'body'} maxWidth="md" aria-labelledby="form-dialog-title">
      <DialogContent id="expert-contact" style={{ width: "400px" }}>
          <div className="contact-block py-2 px-2">
            <span className="close-popup mt-n4" onClick={closeModal}><i className="la la-close"></i></span>
            <div className="mb-3 adminContact-picture">
              <img alt="..." src={pictureUrl} />
            </div>
            <ul className="contact-info vertical">
            {/*
              <li>
                <i className="zmdi zmdi-pin zmdi-hc-fw"/>
                <div className="contact-body">
                  <h4 className="text-uppercase">ADDRESS</h4>
                  <address className="mb-0">
                    44 New Design Street
                    <br/>
                    Melbourne 005
                    <br/>
                    Australia 300
                  </address>
                </div>
              </li>
            */}
              <li>
                <i className="zmdi zmdi-account zmdi-hc-fw"/>
                <div className="contact-body">
                  <h4 className="text-uppercase">Name</h4>
                  <div>
                    <span className="text-primary">{firstName + " " + lastName}</span>
                  </div>
                </div>
              </li>
              <li>
                <i className="zmdi zmdi-phone zmdi-hc-fw"/>
                <div className="contact-body">
                  <h4 className="text-uppercase">Phone</h4>
                  <div className="d-flex">
                    <a className="jr-link text-primary disable-link" href={"tel:"+ (dial + " " + number)}>
                      {dial + " " + number}
                    </a>
                    <a className="jr-link ml-2" href={"https://api.whatsapp.com/send?phone="+dial.replace("+","")+number}>
                      <WhatsappIcon round={true} size={20} />
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <i className="zmdi zmdi-email zmdi-hc-fw"/>
                <div className="contact-body">
                  <h4 className="text-uppercase">E-mail</h4>
                  <div>
                    <a className="text-primary jr-link" href={"mailto:"+email}>{email}</a>
                  </div>
                </div>
              </li>

              {/*<li>
                <div className="icons-wrapper">
                  <a className="jr-link m-1" href={"https://api.whatsapp.com/send?phone="+dial+number}>
                    <WhatsappIcon round={true} size={35} />
                  </a>
                  <span className="icon twitter-icon jr-link m-1">
                    <TwitterIcon round={true} size={35} />
                  </span>
                  <span className="icon linkedin-icon jr-link m-1">
                    <LinkedinIcon round={true} size={35} />
                  </span>
                </div>
              </li>*/}
            </ul>
          </div>
          
            </DialogContent>
            </Dialog>
        /*</div>
        </div>
      </Modal>*/
    );
  }
}

export default ExpertContactForm;
