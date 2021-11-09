import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import config from 'react-reveal/globals';
import PropTypes from "prop-types";
import { Helmet } from 'react-helmet';
import { detailCards, recentActivity } from "./data";
import IconWithTextCard from "./IconWithTextCard";
import Drift from "components/Drift";

import Button from '@material-ui/core/Button';
import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes'
import { WEB_IMAGE_URL, WEB_VIDEO_URL } from 'constants/PictureUrl';

import Beta from 'components/popup/Beta';

config({ ssrFadeout: true });

var loop = [];

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeAnimation: false,
      betaModalIsOpen: false,
      activeSlide1: 1,
      activeSlide2: 1,
      carouselFade1: true,
      carouselFade2: true,
    }
  }
  componentDidMount() {
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);

    setTimeout(() => {
      this.setState({ fadeAnimation: true });
    }, 1000);
    
    loop[1] = setInterval(() => {this.carouselLoop(1)}, 5000);
    loop[2] = setInterval(() => {this.carouselLoop(2)}, 5000);
  }

  componentWillUnmount() {
  }

  closeModal = (name) => {
    this.setState({
      [name]: false
    });
  }
  
  handleClick = (carousel, slide) => {
    this.setState({ ["carouselFade"+carousel]: false });
    setTimeout(() => {
      if (loop[carousel]) clearInterval(loop[carousel]);
      this.setState({ ["activeSlide"+carousel]: slide });
      this.setState({ ["carouselFade"+carousel]: true });
    }, 300);
  };
  
  carouselLoop = (carousel) => {
    this.setState({ ["carouselFade"+carousel]: false });
    setTimeout(() => {
    if (this.state["activeSlide"+carousel] === 3) {
     this.setState({...this.state,["activeSlide"+carousel]:1});
    } else {
      this.setState((prev)=>({
        ["activeSlide"+carousel]:prev["activeSlide"+carousel]+1
      }));
    }
      this.setState({ ["carouselFade"+carousel]: true });
    }, 300);
  }
  

  render() {
    return (
      <div className="home-wrapper">
          <Helmet>
              <title>JobsLab</title>
          </Helmet>
          <div className="home-intro">
            
            <Fade duration={2000}>
              <div className="home-intro__textbox">
                <div className="container">
                  <h3 className="home-intro__title">Experienced Hires Made Simple.</h3>
                  <div className="button-sec responsive">
                    <Button variant="contained" color="primary" className="jr-btn jr-btn-slg home-blue-btn" onClick={(e) => this.props.history.push("/joblist")}>
                      <font size="+1">Find Jobs</font>
                    </Button>
                    <Button variant="contained" className="jr-btn jr-btn-slg bg-success text-white home-green-btn" onClick={(e) => this.props.history.push("/employer")}>
                      <font size="+1">Find Talent</font>
                    </Button>
                  </div>
                </div>
              </div>
            </Fade>
            
            <div className="home-intro__bg">
              <img className="d-none d-lg-block" src={encodeURI(WEB_IMAGE_URL+"home/homepage-01.png")}/>
            </div>
            
            <div className="home-intro__sponsor">
              <p className="home-intro__text">Powered by:</p>
              <div className="home-intro__logo">
                <img src={encodeURI(WEB_IMAGE_URL+"home/cyberport.png")}/>
              </div>
            </div>
            
          </div>
          
        <div className="home-carousel">  
          <div className="parallax-bg parallax-bg--macbook"></div>
            <div className="inner-wrapper">
              <Fade duration={1500} bottom>
              <div className="home-carousel__section">
                <Fade duration={300} left distance="10px" when={this.state.carouselFade1}>
                {
                this.state.activeSlide1 === 1 ? <img src={encodeURI(WEB_IMAGE_URL+"home/banner01.png")}/> :
                this.state.activeSlide1 === 2 ? <img src={encodeURI(WEB_IMAGE_URL+"home/banner01_carousel2.png")}/> :
                <img src={encodeURI(WEB_IMAGE_URL+"home/banner01_carousel3.png")}/>
                }
                </Fade>
              </div>
              </Fade>
              <Fade duration={1500} bottom>
              <div className="home-carousel__section">
              
                  <h3 className="home-carousel__slogan">Get Matched, Get Hired</h3>
                  <h3 className="home-carousel__slogan">Finding A New Job Has Never Been Easier</h3>
                  
                  <button className={`home-carousel__item ${this.state.activeSlide1 === 1 ? "active" : ""}`} onClick={() => this.handleClick(1,1)}>
                    <i className={`home-carousel__icon fas ${this.state.activeSlide1 === 1 ? "fa-check-circle" : "fa-plus-circle"}`}></i>
                    <div className="home-carousel__content">
                      <p className="home-carousel__title">Create your profile in seconds</p>
                      <p className="home-carousel__desc">Register on Jobslab in 20 seconds by uploading your CV on the system</p>
                      <p className="home-carousel__desc d-none">Complete your profile with a few simple click and out AI will generate the rest for you</p>
                    </div>
                  </button>
                  
                  <button className={`home-carousel__item ${this.state.activeSlide1 === 2 ? "active" : ""}`} onClick={() => this.handleClick(1,2)}>
                    <i className={`home-carousel__icon fas ${this.state.activeSlide1 === 2 ? "fa-check-circle" : "fa-plus-circle"}`}></i>
                    <div className="home-carousel__content">
                      <p className="home-carousel__title">Automatically get matched with jobs</p>
                      <p className="home-carousel__desc">Once your profile is complete, our AI will recommend jobs for you so there is no need to keep searching for jobs</p>
                      <p className="home-carousel__desc d-none">Get notified about jobs that match your profile right away and apply with a simply click</p>
                    </div>
                  </button>
                  
                  <button className={`home-carousel__item ${this.state.activeSlide1 === 3 ? "active" : ""}`} onClick={() => this.handleClick(1,3)}>
                    <i className={`home-carousel__icon fas ${this.state.activeSlide1 === 3 ? "fa-check-circle" : "fa-plus-circle"}`}></i>
                    <div className="home-carousel__content">
                      <p className="home-carousel__title">Get real-time updates & feedbacks</p>
                      <p className="home-carousel__desc">Get immediate updates from employers at every stage of the application process</p>
                      <p className="home-carousel__desc d-none">JobsLab keeps you continously informed about your application and the trends in the job market</p>
                    </div>
                  </button>
                  
              </div>
              </Fade>
            </div>
          </div>
          
        <div className="home-carousel home-carousel--blue">  
          <div className="parallax-bg parallax-bg--team"></div>
            <div className="inner-wrapper">
              <Fade duration={1500} bottom>
              <div className="home-carousel__section home-carousel__section--reversed">
                <h3 className="home-carousel__slogan">Unlock a Great Job</h3>
                <p className="home-carousel__title">Reveal leading company names within your industry</p>
                <div className="home-carousel__btn">
                  <Button variant="contained" className="jr-btn jr-btn-slg bg-white text-black" onClick={(e) => this.props.history.push("/joblist")}>
                    <font size="+1">Find Jobs</font>
                  </Button>
                </div>
              </div>
              </Fade>
              <Fade duration={1500} bottom>
              <div className="home-carousel__section">
                <img src={encodeURI(WEB_IMAGE_URL+"home/banner02-mobile.png")} alt="" />
              </div>
              </Fade>
            </div>
          </div>
          
          <div className="home-usage">
            <div className="parallax-bg parallax-bg--macbook"></div>
            <div className="inner-wrapper">
              <div className="home-usage__left">
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-address-card mb-2"></i>
                  <h3 className="home-usage__head">Generate a Winning Profile</h3>
                  <p className="home-usage__desc">Our system generates your profile in 20 seconds from your existing resume. Customize to suit or keep as is. Either way, you've got a great profile to land your next job.</p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-user-tie mb-2"></i>
                  <h3 className="home-usage__head">Your Personal Recruiter</h3>
                  <p className="home-usage__desc">Our AI works 24/7 to find the right job for you. Get notified about new jobs that are a good match right away. Receive recommendations from both our AI and our Career Experts.</p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-clock mb-2"></i>
                  <h3 className="home-usage__head">Real-Time Updates</h3>
                  <p className="home-usage__desc">No more waiting for updates. Get real-time updates from employers at every stage of the application process. Manage the process from your own personal career dashboard.</p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-plane-departure mb-2"></i>
                  <h3 className="home-usage__head">Get Rewarded</h3>
                  <p className="home-usage__desc">Take a Holiday on Us. Enjoy unique and exciting travel experiences via our partnership with Klook. Get rewarded for finding your next job with JobsLab.</p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-user-friends mb-2"></i>
                  <h3 className="home-usage__head">Refer a Friend</h3>
                  <p className="home-usage__desc">Share a great job and get rewarded for referring your friends and peers. Get rewarded automatically when your referrals land their new job.</p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-chess mb-2"></i>
                  <h3 className="home-usage__head">Jump Start Your Career</h3>
                  <p className="home-usage__desc">Benefit from exclusive articles, videos, interviews & more from our career experts and leading industry experts. Visit the JobsLab <a target="_blank" href="https://blog.jobslab.io">blog</a> today.</p>
                </div>
              </Fade>
              </div>
              <div className="home-usage__right">
              <Fade duration={1500} bottom>
                <img className="home-usage__img" src={encodeURI(WEB_IMAGE_URL+"home/mockup3.png")} alt="" />
                <h3 className="home-usage__slogan">Beyond just jobs.</h3>
                <p className="home-usage__desc">We see beyond the profile to the individual.</p>
              </Fade>
              </div>
            </div>
          </div>
        
        <div className="home-carousel home-carousel--blue">  
          <div className="parallax-bg parallax-bg--successman"></div>
            <div className="inner-wrapper">
              <Fade duration={1500} bottom>
              <div className="home-carousel__section">
                <Fade duration={300} left distance="10px" when={this.state.carouselFade2}>
                {
                this.state.activeSlide2 === 1 ?
                <div className="klook-button-sec">
                  <a target="_blank" href="https://www.klook.com/zh-HK/?aid=14770&utm_medium=affiliate-alwayson&utm_source=non-network&utm_campaign=14770&utm_term=&utm_content=">
                    <div className="klook-photo">
                      <img src={encodeURI(WEB_IMAGE_URL+"home/home-klook-white.png")}/>
                    </div>
                    <div className="home-carousel__btn">
                      <Button variant="contained" className="jr-btn jr-btn-slg bg-warning text-white">
                        <font size="+1">See Our Latest Promotion</font>
                      </Button>
                    </div>
                  </a>
                </div> :
                this.state.activeSlide2 === 2 ? <img src={encodeURI(WEB_IMAGE_URL+"home/insurance-icon-white.png")}/> :
                <img src={encodeURI(WEB_IMAGE_URL+"home/home-fps-white.png")}/>
                }
                </Fade>
              </div>
              </Fade>
              <Fade duration={1500} bottom>
              <div className="home-carousel__section">
              
                  <h3 className="home-carousel__slogan">Get Rewarded, Get Paid</h3>
                  <h3 className="home-carousel__slogan">It Is Not Only About Finding Jobs</h3>
                  
                  <button className={`home-carousel__item ${this.state.activeSlide2 === 1 ? "active" : ""}`} onClick={() => this.handleClick(2,1)}>
                    <i className={`home-carousel__icon fas ${this.state.activeSlide2 === 1 ? "fa-check-circle" : "fa-plus-circle"}`}></i>
                    <div className="home-carousel__content">
                      <p className="home-carousel__title">Get Access to Exclusive Rewards</p>
                      <p className="home-carousel__desc d-none">JobsLab partnered with Klook to offer you free holiday experiences when you successfully get your new job on JobsLab</p>
                    </div>
                  </button>
                  
                  <button className={`home-carousel__item ${this.state.activeSlide2 === 2 ? "active" : ""}`} onClick={() => this.handleClick(2,2)}>
                    <i className={`home-carousel__icon fas ${this.state.activeSlide2 === 2 ? "fa-check-circle" : "fa-plus-circle"}`}></i>
                    <div className="home-carousel__content">
                      <p className="home-carousel__title">Get Exclusive Discount to Insurance</p>
                      <p className="home-carousel__desc d-none">JobsLab is partnering with a leading Virtual Insurance Company to offer discounted rates for our members to purchase insurance</p>
                    </div>
                  </button>
                  
                  <button className={`home-carousel__item ${this.state.activeSlide2 === 3 ? "active" : ""}`} onClick={() => this.handleClick(2,3)}>
                    <i className={`home-carousel__icon fas ${this.state.activeSlide2 === 3 ? "fa-check-circle" : "fa-plus-circle"}`}></i>
                    <div className="home-carousel__content">
                      <p className="home-carousel__title">Refer Peers to Jobs & Receive Cash Rewards</p>
                      <p className="home-carousel__desc d-none">Receive cash rewards when you refer your peers to jobs on JobsLab and they successfully get hired</p>
                    </div>
                  </button>
                  
              </div>
              </Fade>
            </div>
          </div>
        
        <div className="icon-list">
          <div className="parallax-bg parallax-bg--successman"></div>
          <div className="inner-wrapper">
            <div className="icon-list__head">How It Works</div>
            <div className="icon-list__side">
              <Fade duration={1500} bottom>
              <div className="icon-list__item icon-list__item--lhs">
                <i className="la la-gift"></i>
                <div className="icon-list__text">
                  <h3 className="icon-list__title">Get Rewarded</h3>
    							<p className="icon-list__desc">Get your dream job and also get rewarded with a dream holiday when you get hired</p>
      					</div>
              </div>
              </Fade>
              <Fade duration={1500} bottom>
              <div className="icon-list__item icon-list__item--lhs">
                <i className="la la-stack-exchange"></i>
                <div className="icon-list__text">
                  <h3 className="icon-list__title">Confidentiality Guaranteed</h3>
    							<p className="icon-list__desc">We are fully GDPR compliant and your profile remains completely confidential and only shared with an employer when you apply for a role</p>
      					</div>
              </div>
              </Fade>
              <Fade duration={1500} bottom>
              <div className="icon-list__item icon-list__item--lhs">
                <i className="la la-envelope"></i>
                <div className="icon-list__text">
                  <h3 className="icon-list__title">Full Transparency</h3>
    							<p className="icon-list__desc">Our easy to use dashboard is automatically updated with the latest status of your job application</p>
      					</div>
              </div>
              <div className="icon-list__item icon-list__item--lhs">
                <i className="la la-phone"></i>
                <div className="icon-list__text">
                  <h3 className="icon-list__title">Talk to Professionals</h3>
    							<p className="icon-list__desc">Our easy to use dashboard is automatically updated with the latest status of your job application</p>
      					</div>
              </div>
              </Fade>
            </div>
            <Fade duration={1500} bottom>
            <div className="icon-list__middle">
              <img src={encodeURI(WEB_IMAGE_URL+"home/how-iphone.png")} alt="" />
            </div>
            </Fade>
            <div className="icon-list__side">
              <Fade duration={1500} bottom>
              <div className="icon-list__item icon-list__item--rhs">
                <i className="la la-hand-pointer-o"></i>
                <div className="icon-list__text">
                  <h3 className="icon-list__title">Apply Easily</h3>
    							<p className="icon-list__desc">Create your profile in seconds and instantly get matched with great jobs by our AI</p>
      					</div>
              </div>
              </Fade>
              <Fade duration={1500} bottom>
              <div className="icon-list__item icon-list__item--rhs">
                <i className="la la-clock-o"></i>
                <div className="icon-list__text">
                  <h3 className="icon-list__title">Save Time</h3>
    							<p className="icon-list__desc">Our AI works 24/7 to automatically match you with all relevant jobs so no need to waste time with reading hundreds of JDs and talking to headhunters</p>
      					</div>
              </div>
              </Fade>
              <Fade duration={1500} bottom>
              <div className="icon-list__item icon-list__item--rhs">
                <i className="la la-lightbulb-o"></i>
                <div className="icon-list__text">
                  <h3 className="icon-list__title">Salary Surveys</h3>
    							<p className="icon-list__desc">Want to know if you are underpaid? Check our real-time salary surveys to see how you stack up in your industry</p>
      					</div>
              </div>
              </Fade>
              <Fade duration={1500} bottom>
              <div className="icon-list__item icon-list__item--rhs">
                <i className="la la-users"></i>
                <div className="icon-list__text">
                  <h3 className="icon-list__title">Refer Your Contacts</h3>
    							<p className="icon-list__desc">Have you ever seen a job posting that would be perfect for a friend? Simply refer them and get rewarded with up to HK$40,000 with they get hired</p>
      					</div>
              </div>
              </Fade>
            </div>
          </div>
        </div>
        
        <div className="home-video">
          <div className="parallax-bg parallax-bg--desk"></div>
          <div className="inner-wrapper">
            <Fade duration={1500} cascade>
            <h3 className="home-video__title">Introducing JobsLab</h3>
            <p className="home-video__desc">Matching exceptional people with amazing jobs. Watch our brand video.</p>
            <div className="home-video__video">
              <div className="placeholder placeholder--landscape">
                <div className="placeholder__item">
                  <iframe src="https://www.youtube.com/embed/XLkDYdppMOA"></iframe>
                </div>
              </div>
            </div>
            </Fade>
          </div>
        </div>
        
        <div className="company-logo">
          <div className="parallax-bg parallax-bg--desk"></div>
          <div className="inner-wrapper">
            <Fade duration={1500} cascade>
            <div className="company-logo__list">
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/AWS_logo.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/Google_logo.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/KLOOK_LOGO.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/LinkedIn_Logo.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/Microsoft_logo.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/Zoom-Logo.png")}/></div>
              <div className="company-logo__title"><p className="text-uppercase">Career Expert Insights from Top Companies</p></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/Citi_Logo.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/GS_Logo.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/hsbc-logo.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/ICBC_logo.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/morgan-stanley-logo.png")}/></div>
              <div className="company-logo__item"><img src={encodeURI(WEB_IMAGE_URL+"logo/ubs-logo.png")}/></div>
            </div>
            </Fade>
          </div>
        </div>
  

        <Drift appId="7wn228ik2p99" />
        <Beta isOpen={this.state.betaModalIsOpen} closeModal={() => this.closeModal('betaModalIsOpen')}/>
        
      </div>
    )
  }
}
export default withRouter(Home);
