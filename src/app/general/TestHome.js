import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import { Parallax, Background } from 'react-parallax';
//import { fadeInUp } from 'react-animations';
import Fade from 'react-reveal/Fade';
import config from 'react-reveal/globals';
import PropTypes from "prop-types";

import Button from '@material-ui/core/Button';
import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes'
//import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes'
//import { changeNavigationStyle } from 'actions/index';

//import { ParallaxProvider } from 'react-scroll-parallax';
//import { Parallax } from 'react-scroll-parallax';

config({ ssrFadeout: true });

let blur = 0;
let parallax = 0;

var scrolledY = 0;
var ticking = false;

class TestHome extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      fadeAnimation: false
    }
  }
  componentDidMount() {
    //this.props.changeNavigationStyle({HORIZONTAL_NAVIGATION});
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);
    window.addEventListener('scroll', this.handleScroll, false);

    setTimeout(() => {
      this.setState({ fadeAnimation: true });
    }, 1000)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  nav = React.createRef();
  //ver = this.iOSversion();
  
  /*handleScroll = () => {
    scrolledY = window.scrollY;
    blur = window.scrollY / 100;
    parallax = window.scrollY / 10;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (this.nav.current) {
          this.nav.current.style.filter = `blur(${blur}px)`;
          this.nav.current.style.transform = `translate3d(0%, ${parallax}%, 0px)`;
          //if (this.ver[0] >= 7) {
          //this.nav.current.style.backgroundPosition = `center ${scrolledY}px`;
          //}
        }
        ticking = false;
      });

      ticking = true;
    }
  };*/
  
  
  handleScroll = () => {
    scrolledY = window.scrollY;
    this.requestTick();
  };
  
  requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(this.update);
    }
    ticking = true;
  };
  
  update = () => {
    ticking = false;
    var currentScrollY = scrolledY;
    blur = currentScrollY / 100;
    parallax = currentScrollY / 10;
    if (this.nav.current) {
          this.nav.current.style.filter = `blur(${blur}px)`;
          this.nav.current.style.transform = `translate3d(0%, ${parallax}%, 0px)`;
        }
  };

  render() {
    const fade = (true == this.state.fadeAnimation) ? true : false;
    return (
      <div className="home-wrapper">
          <div className="home-imgcontainer">
          {/*<div className="parallax-home" ref={this.nav}></div>*/}
            <div className="home-wordcontainer">
              <h3>Unlock Your Potential with the World's First Digital Headhunter.</h3>
              <h3>Find Matches within a Minute.</h3>
              <div className="button-sec responsive">
                <Button variant="contained" color="primary" className="jr-btn jr-btn-slg" onClick={(e) => this.props.history.push("/joblist")}>
                  <font size="+1">Find Jobs</font>
                </Button>
                <Button variant="contained" className="jr-btn jr-btn-slg bg-success text-white" onClick={(e) => this.props.history.push("/employer")}>
                  <font size="+1">Find Talent</font>
                </Button>
              </div>
            </div>
            <div className="color-overlay"></div>
            {/*<Parallax y={[-90 ,90]}>*/}
            <video id="home-video" autoPlay muted loop ref={this.nav}>
            <source src="https://hkjobslab.s3-ap-southeast-1.amazonaws.com/home.mp4" type="video/mp4" />
            </video>
            {/*</Parallax>*/}
          </div>
                
        <div className="home-imgcontainer banner">        
          <div className="parallax01"></div>
          <div className="home-bannercontainer white-style">
              <div className="banner-half-sec image">
              </div>
              <div className="banner-half-sec">
                  <h3>Finding A New Job Has Never Been Easier</h3>
                  <p>It takes seconds to create your profile and our AI will start matching jobs for you straight away</p>
                  <div className="button-sec">
                    <Button variant="contained" color="primary" className="jr-btn jr-btn-slg">
                      <font size="+1">Find Jobs</font>
                    </Button>
                  </div>
              </div>
          </div>
        </div>
        
        <div className="home-imgcontainer banner">        
          <div className="parallax02"></div>
            <div className="home-bannercontainer blue-style responsive">
                <div className="banner-half-sec blue-style responsive">
                  <h3>Unlock a Great Job</h3>
                  <p>Reveal leading company names within your industry</p>
                  <div className="button-sec">
                    <Button variant="contained" className="jr-btn jr-btn-slg bg-white text-black">
                      <font size="+1">Find Jobs</font>
                    </Button>
                  </div>
                </div>
                <div className="banner-half-sec image responsiveimage">
                </div>
            </div>
        </div>
        
        <div className="home-imgcontainer banner">        
          <div className="parallax03"></div>
            <div className="home-bannercontainer dark-style">
                <div className="banner-half-sec image">
                </div>
                <div className="banner-half-sec">
                  <h3>Know What You're Worth</h3>
                  <p>Check our real-time salary guides in your industry</p>
                  <div className="button-sec">
                    <Button variant="contained" className="jr-btn jr-btn-slg bg-warning text-white">
                      <font size="+1">Find Jobs</font>
                    </Button>
                  </div>
                </div>
          </div>
        </div>
        
        <div className="home-imgcontainer banner">  
          <div className="home-bannercontainer">
            <div className="double-sec">
              <div className="parallax-double01"></div>
              <div className="double-sec-background white-style responsive">
              <div className="double-sec-container">
                <h3>Unlock Rewards.</h3>
                <p><i>Take A Holiday On Us.</i></p>
              </div>
              </div>
            </div>
            <div className="double-sec">
              <div className="parallax-double02"></div>
              <div className="double-sec-background purple-style">
              <div className="double-sec-container">
                <h3>Refer Peers to Jobs & Receive Cash Rewards</h3>
                <p>Faster Payment System</p>
              </div>
              </div>
            </div>
          </div>
        </div>
        
        
        <div className="howitworks">
          <div className="parallax-howitworks"></div>
          <div className="howitworks-background">
            <h3>How It Works</h3>
            <div className="howitworks-sec">
              <div className="howitworks-part responsivelhs">
                <div className="handside-sec lhs-style">
                  <i className="la la-gift"></i>
                  <div className="howitworks-wordcontainer lhs-style">
                    <h3>Get Rewarded</h3>
      							<p>Get your dream job and also get rewarded with a dream holiday when you get hired</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec lhs-style">
                  <i className="la la-stack-exchange"></i>
                  <div className="howitworks-wordcontainer lhs-style">
                    <h3>Confidentiality Guaranteed</h3>
      							<p>We are fully GDPR compliant and your profile remains completely confidential and only shared with an employer when you apply for a role</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec lhs-style">
                  <i className="la la-envelope"></i>
                  <div className="howitworks-wordcontainer lhs-style">
                    <h3>Full Transparency</h3>
      							<p>Our easy to use dashboard is automatically updated with the latest status of your job application</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec lhs-style">
                  <i className="la la-phone"></i>
                  <div className="howitworks-wordcontainer lhs-style">
                    <h3>Talk to Professionals</h3>
      							<p>Our expert recruitment team is on hand to assist you through the entire interview process</p>
        					</div>
        				</div>
              </div>
                <div className="howitworks-part image">
                  <img src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/home/how-iphone.png" alt="" />
                </div>
              <div className="howitworks-part responsiverhs">
                <div className="handside-sec rhs-style">
                  <i className="la la-hand-pointer-o"></i>
                  <div className="howitworks-wordcontainer rhs-style">
                    <h3>Apply Easily</h3>
      							<p>Create your profile in seconds and instantly get matched with great jobs by our AI</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec rhs-style">
                  <i className="la la-clock-o"></i>
                  <div className="howitworks-wordcontainer rhs-style">
                    <h3>Save Time</h3>
      							<p>Our AI works 24/7 to automatically match you with all relevant jobs so no need to waste time with reading hundreds of JDs and talking to headhunters</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec rhs-style">
                  <i className="la la-lightbulb-o"></i>
                  <div className="howitworks-wordcontainer rhs-style">
                    <h3>Salary Surveys</h3>
      							<p>Want to know if you are underpaid? Check our real-time salary surveys to see how you stack up in your industry</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec rhs-style">
                  <i className="la la-users"></i>
                  <div className="howitworks-wordcontainer rhs-style">
                    <h3>Refer Your Contacts</h3>
      							<p>Have you ever seen a job posting that will be a perfect for a friend? Simply refer them and get rewarded with up to HK$40,000 with they get hired</p>
        					</div>
        				</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

/*const mapStateToProps = ({settings, auth}) => {

};*/

//export default connect(mapStateToProps, {changeNavigationStyle})(Home);
export default withRouter(TestHome);


{/*<div class="row">
          	<div class="col-lg-12 home">
          		<div class="heading">
          			<h2>How It Works</h2>
        				<span>Each month, we partner with hundreds of leading companies to profile great jobs to great candidates. <br />We use Artificial Intelligence to screen jobs for a perfect match. 
          			</span>
          		</div>
    				<div class="how-to-sec">
        			<div class="how-to">
        				<span class="how-icon"><i class="la la-user"></i></span>
        			  <h3>Register an account</h3>
        				<p>It takes 10 seconds to upload your profile. We'll quickly match you with the right jobs within a minute. Our Career Experts are on hand to help customize your job search.</p>
        			</div>
        			<div class="how-to">
      					<span class="how-icon"><i class="la la-file-archive-o"></i></span>
  							<h3>Search jobs and earn referral rewards</h3>
        				<p>You can also browse our job listings to review our expert insights, refer industry peers for cash rewards and explore a match with great companies.</p>
        			</div>
        			<div class="how-to">
        				<span class="how-icon"><i class="la la-list"></i></span>
        				<h3>Get jobs and earn rewards</h3>
  							<p>We go beyond job boards. Our Career Experts guide you through an interview process and help to negotiate great job offers. Once you got a job through our platform, we reward you through our exclusive promotions.</p>
      				</div>
      			</div>
    			</div>
    		</div>*/}