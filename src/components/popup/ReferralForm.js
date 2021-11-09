import React, { Component } from 'react';
import Widget from "components/Widget";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as notification from 'actions/Notification';
import CountUp from 'react-countup';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import Dialog from '@material-ui/core/Dialog';
/*import Modal from 'react-modal';
import modalStyle from 'styles/modalStyle';
Modal.setAppElement(document.getElementById('root'));*/

class ReferralForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //email: '',
    };
  }

  copyUrl = () => {
    notification.success("URL has been copied to clipboard. Please paste the URL to share with your friends!");
  }
  
  /*sendRefUrl = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      url: "https://"+window.location.hostname+"/job/"+this.state.activeJob+"/"+this.props.refId,//this.props.url,
      jobId: this.state.activeJob,
    };
    
    axios.post('/api/candidates/set/referral/send', data)
    .then(res => {
      if (res.data.isSuccess) {
        alert('The Referral Link has beed sent to email address: ' + this.state.email);
      }
      else {
        alert(res.data.msg);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  textboxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }*/

  render() {
    const { isOpen, closeModal, refUrl, refCount } = this.props;
    const refMsg = "Hi, I found this job and thought of you. If you get it, we both receive rewards through JobsLab. Good luck! ";
    
    return (
      <Dialog open={isOpen} onClose={closeModal} scroll={'body'} maxWidth="sm" aria-labelledby="form-dialog-title">
      {/*<Modal
        isOpen={isOpen}
        closeTimeoutMS={200}
        style={modalStyle.jobContentModalStyle}
        onRequestClose={()=>closeModal('referralModalIsOpen')}
        className="jobListModal"
        overlayClassName="jobListModal-Overlay" 
        contentLabel="Example Modal"
      >
        <Widget styleName="jr-card-profile">*/}
          <div className="mb-3">
            <span className="close-popup referral" onClick={closeModal}><i className="la la-close"></i></span>
          </div>
          <div className="referral-double">
            
            <div className="referral-leftsec">
                <div className="col-lg-12">
          	      {/*<div className="dashboard-photoframe referral">
        				    <div className="color-overlay referral"></div>
        				    <img style={{"width":"100%","height":"100%"}} src={process.env.PUBLIC_URL + "/refer-frd-min.jpg"} alt="" />
        				  </div>*/}
        				  <div className="dashboard-wordbox referral">
        				    <h3>Invite Friends</h3>
        				    {/*<i class="fas fa-user-friends"></i>*/}
        				    <span>Receive Thousands of Dollars in Cash Rewards</span>
        				  </div>
          	    </div>
                <div class="share-bar">
                  {/*<div className="refer-media-div"><span className="pf-title styleRF refer-media">Send Referral Link through Social Media</span></div>*/}
                  <WhatsappShareButton url={refUrl} title={refMsg} separator=" "><WhatsappIcon round={true} size={35} /></WhatsappShareButton>
                  <EmailShareButton url={refUrl} subject="" body={refMsg} separator=" "><EmailIcon round={true} size={35} /></EmailShareButton>
                  <FacebookShareButton url={refUrl} quote={refMsg}><FacebookIcon round={true} size={35} /></FacebookShareButton>
      		 				<LinkedinShareButton url={refUrl}><LinkedinIcon round={true} size={35} /></LinkedinShareButton>
           				<TwitterShareButton url={refUrl} title={refMsg}><TwitterIcon round={true} size={40} /></TwitterShareButton>
          				{/*<TelegramShareButton url={refUrl}><TelegramIcon round={true} size={40} /></TelegramShareButton>*/}
          	 			{/*<a href="#" title="" class="share-fb"><i class="fab fa-facebook-f"></i></a>
          				<a href="#" title="" class="share-twitter"><i class="fab fa-twitter"></i></a>
          		 		<a href="#" title="" class="share-fb"><i class="fab fa-linkedin-in"></i></a>*/}
          		 	</div>
          		 	<div className="row referral-link-sec">
        	        <div className="row col-lg-12">
        	          <span className="pf-title styleRF refer-copy">Copy Referral Link</span>
        	        </div>
        	        <div className="col-lg-12">
                    <div className="form-group referral">
                      <input className="form-control form-control-lg refer-link" value={refUrl} size="100" readOnly/>
                      <CopyToClipboard text={refUrl} onCopy={() => this.copyUrl()}> 
                        <button className="refer-btn"><i class="fas fa-link"></i></button>
                      </CopyToClipboard>
                    </div>
                  </div>
            		</div>
          		</div>
            <div>
                    
          		  {/*<div className="referral-count-sec">
            	    <div className="referral-count">
                    <CountUp end={refCount} delay={0.3} duration={2.5} />

                    <p>Referrals</p>
                  </div>
                </div>
          	    <div className="row referral-link-sec">
          	        <div className="row col-lg-12">
          	          <span className="pf-title styleRF refer-copy">Copy Referral Link</span>
          	        </div>
          	        <div className="col-lg-12">
                      <div className="form-group referral">
                        <input className="form-control form-control-lg refer-link" value={refUrl} size="100" readOnly/>
                        <CopyToClipboard text={refUrl} onCopy={() => this.copyUrl()}> 
                          <button className="refer-btn"><i class="fas fa-link"></i></button>
                        </CopyToClipboard>
                      </div>
                    </div>
          	    </div>*/}
          	    
                {/*<div className="extra-login">
          			  <span>OR</span>
            		</div>
            		<div className="row col-lg-12">
            		    <span className="pf-title styleRF">Send Referral Link to friends</span>
            		</div>
            		<div className="row">
                    <div className="col-lg-10">
                      <div className="pf-field">
                        <input type="text" name="email" placeholder="Please enter email address..." value={this.state.email} onChange={this.textboxChange} />
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <button className="referral-btn style2" onClick={this.sendRefUrl}>Send</button>
                    </div>
                </div>*/}
            
            </div>
            
            
          </div>
        {/*</Widget>
      </Modal>*/}
      </Dialog>
    );
  }
}

export default ReferralForm;
