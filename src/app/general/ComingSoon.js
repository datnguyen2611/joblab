import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import config from 'react-reveal/globals';
import PropTypes from "prop-types";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import Button from '@material-ui/core/Button';
import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { WEB_IMAGE_URL, JOBSLAB_ICON_URL } from 'constants/PictureUrl';

config({ ssrFadeout: true });


class ComingSoon extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      fadeAnimation: false
    }
  }
  componentDidMount() {
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);
    setTimeout(() => {
      this.setState({ fadeAnimation: true });
    }, 1000)
  }

  componentWillUnmount() {
  }

  render() {
    
    return (
      <div className="home-wrapper">
        <div className="home-imgcontainer comingsoon">
          <div className="parallax-home"></div>
          <Fade duration={2000}>
          <div className="home-wordcontainer comingsoon-spacing">
          {/*
            <div>
              <img style={{'min-width':'200px','width':'25vw','text-align':'center'}} src="https://jobslab-media.s3.ap-east-1.amazonaws.com/logo/jobslab_white.png" alt="Jobslab" title="Jobslab"/>
            </div>
            <div style={{'margin-top':'80px','text-align':'center','width':'100%'}} >*/}
            
          <div className="home-wordcontainer comingsoon" style={{'height':'40vh'}}>
          <img style={{'min-width':'200px','width':'20vw','height':'auto'}} src={encodeURI(JOBSLAB_ICON_URL+"jobslab_white.png")} alt="Jobslab" title="Jobslab"/>
          </div>
          <div className="home-wordcontainer comingsoon">
              <div className="lds-dual-ring"></div>
              <span>OUR NEW SITE IS</span>
              <h3>COMING</h3>
              <h3>SOON</h3>
              <p>FOLLOW US FOR UPDATES</p>
              <div class="share-bar comingsoon">
                  {/*<div className="refer-media-div"><span className="pf-title styleRF refer-media">Send Referral Link through Social Media</span></div>*/}
                  <button onClick={(e) => this.openLink(e, 'https://facebook.com/jobslab.io')}><FacebookIcon round={true} size={'7vh'} /></button>
      		 				<button onClick={(e) => this.openLink(e, 'https://www.linkedin.com/company/jobslab','_blank')}><LinkedinIcon round={true} size={'7vh'} /></button>
      		 				<button onClick={(e) => this.openLink(e, 'https://twitter.com/jobslabjobs','_blank')}><TwitterIcon round={true} size={'7vh'} /></button>
          		</div>
          	</div>
           {/* </div>*/}
          </div>
          </Fade>
          <div className="color-overlay comingsoon"></div>
          {/*<video id="home-video" autoPlay muted loop playsInline ref={this.nav}>
          <source  src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/video/home/home.mp4" type="video/mp4" />
          </video>*/}
          <img src={encodeURI(WEB_IMAGE_URL+"comingsoon/ComingSoon.jpg")} alt="" />
        </div>
      </div>
    )
  }
}

export default ComingSoon;
