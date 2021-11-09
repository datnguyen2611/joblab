import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import { Parallax, Background } from 'react-parallax';
//import { fadeInUp } from 'react-animations';
import Fade from 'react-reveal/Fade';
import config from 'react-reveal/globals';
import PropTypes from "prop-types";
import { Helmet } from 'react-helmet';
import { detailCards, recentActivity } from "../data";
import IconWithTextCard from "./../IconWithTextCard";
import Drift from "components/Drift";

import Button from '@material-ui/core/Button';
import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes'
import { WEB_IMAGE_URL, WEB_VIDEO_URL } from 'constants/PictureUrl';
//import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes'
//import { changeNavigationStyle } from 'actions/index';

//import { ParallaxProvider } from 'react-scroll-parallax';
//import { Parallax } from 'react-scroll-parallax';
import Content1 from './Content1/Content1'
import Beta from 'components/popup/Beta';

config({ ssrFadeout: true });

let blur = 0;
let parallax = 0;

var scrolledY = 0;
var ticking = false;

var carouselIndex = 1;
var carousel2Index = 1;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeAnimation: false,
      betaModalIsOpen: false,
      carouselValue: 1,
      carouselActive: true,
      carousel2Value: 1,
      carousel2Active: true,
    }
  }
  componentDidMount() {
    //this.props.changeNavigationStyle({HORIZONTAL_NAVIGATION});
    // this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);
    window.addEventListener('scroll', this.handleScroll, false);
    //document.getElementById("home-video").controls = false;
    /*const videoElement = document.getElementById('home-video');
            if (videoElement.playing) {
                // video is already playing so do nothing
            }
            else {
                // video is not playing
                // so play video now
                videoElement.play();
            }*/

    if (document.getElementById('home-video') == true) {
      const videoElement = document.getElementById('home-video');
      var promise = videoElement.play();

      if (promise !== undefined) {
        promise.then(_ => {
          //console.log('   // Autoplay was successful.');
          document.getElementsByClassName('parallax-home')[0].style.opacity = `0`;
        }).catch(error => {
          //console.log('   // Autoplay was prevented.');
          if (window.matchMedia("(max-width: 1200px)").matches) {
            document.getElementsByClassName('parallax-home')[0].style.opacity = `1`;
          }
        });
      }
    }


    setTimeout(() => {
      this.setState({ fadeAnimation: true });
    }, 1000)

    this.carouselLoop();
    this.carousel2Loop();
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

  closeModal = (name) => {
    this.setState({
      //referralModalIsOpen : false
      [name]: false
    })
  }

  carouselClick = (value) => {
    carouselIndex = 0;
    this.setState({ carouselActive: false });
    this.carouselChange(value);
  }

  carousel2Click = (value) => {
    carousel2Index = 0;
    this.setState({ carousel2Active: false });
    this.carousel2Change(value);
  }

  carouselChange = (value) => {
    this.setState({ carouselValue: value });
    setTimeout(() => {
      this.setState({ carouselActive: true });
    }, 300)
  }

  carousel2Change = (value) => {
    this.setState({ carousel2Value: value });
    setTimeout(() => {
      this.setState({ carousel2Active: true });
    }, 300)
  }

  carouselLoop = () => {
    if (carouselIndex <= 0) {

    }
    else if (carouselIndex < 4) {
      this.setState({ carouselActive: false });
      this.carouselChange(carouselIndex);
      carouselIndex++;
      setTimeout(this.carouselLoop, 5000);
    }
    else {
      carouselIndex = 1;
      this.carouselLoop();
    }
  }

  carousel2Loop = () => {
    if (carousel2Index <= 0) {

    }
    else if (carousel2Index < 4) {
      this.setState({ carousel2Active: false });
      this.carousel2Change(carousel2Index);
      carousel2Index++;
      setTimeout(this.carousel2Loop, 5000);
    }
    else {
      carousel2Index = 1;
      this.carousel2Loop();
    }
  }

  render() {
    const fade = (true == this.state.fadeAnimation) ? true : false;

    return (
      <div className="home-wrapper">
          <Helmet>
              <title>JobsLab1</title>
          </Helmet>
          <Content1></Content1>
          {/* <div className="home-intro">
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
               */}
        <div className="home-imgcontainer home-carousel-responsive">        
          <div className="parallax01"></div>
          <div className="home-bannercontainer white-style">
            <Fade duration={2000} bottom when={fade}>
              <div className="banner-half-sec image">
                <Fade duration={300} left distance='10px' when={this.state.carouselActive}>
                {
                this.state.carouselValue === 1 ? <img src={encodeURI(WEB_IMAGE_URL+"home/banner01.png")}/> :
                this.state.carouselValue === 2 ? <img src={encodeURI(WEB_IMAGE_URL+"home/banner01_carousel2.png")}/> :
                <img src={encodeURI(WEB_IMAGE_URL+"home/banner01_carousel3.png")}/>
                }
                </Fade>
              </div>
              <div className="banner-half-sec home-carousel-title">
                  <h3>Get Matched, Get Hired</h3>
                  <h3>Finding A New Job Has Never Been Easier</h3>
                  <a onClick={() => {this.carouselClick(1)}}>
                  <div className={(this.state.carouselValue === 1 ? 'home-carousel-content active' : 'home-carousel-content')}>
                    <div className="col-1 my-auto home-carousel-icon">
                    <i className={(this.state.carouselValue === 1 ? 'fas fa-check-circle active-icon' : 'fas fa-plus-circle inactive-icon')}></i>
                    </div>
                    <div className="col-11 my-2">
                      <span>Create your profile in seconds</span>
                      <p>Register on Jobslab in 20 seconds by uploading your CV on the system</p>
                      <div className={(this.state.carouselValue === 1 ? 'active-text mt-2' : 'inactive-text mt-2')}>
                      <p>Complete your profile with a few simple click and out AI will generate the rest for you</p>
                      </div>
                    </div>
                  </div>
                  </a>
                  <a onClick={() => {this.carouselClick(2)}}>
                  <div className={(this.state.carouselValue === 2 ? 'home-carousel-content active' : 'home-carousel-content')}>
                    <div className="col-1 my-auto home-carousel-icon">
                    <i className={(this.state.carouselValue === 2 ? 'fas fa-check-circle active-icon' : 'fas fa-plus-circle inactive-icon')}></i>
                    </div>
                    <div className="col-11 my-2">
                      <span>Automatically get matched with jobs</span>
                      <p>Once your profile is complete, our AI will recommend jobs for you so there is no need to keep searching for jobs</p>
                      <div className={(this.state.carouselValue === 2 ? 'active-text mt-2' : 'inactive-text mt-2')}>
                      <p>Get notified about jobs that match your profile right away and apply with a simply click</p>
                      </div>
                    </div>
                  </div>
                  </a>
                  <a onClick={() => {this.carouselClick(3)}}>
                  <div className={(this.state.carouselValue === 3 ? 'home-carousel-content active' : 'home-carousel-content')}>
                    <div className="col-1 my-auto home-carousel-icon">
                    <i className={(this.state.carouselValue === 3 ? 'fas fa-check-circle active-icon' : 'fas fa-plus-circle inactive-icon')}></i>
                    </div>
                    <div className="col-11 my-2">
                      <span>Get real-time updates & feedbacks</span>
                      <p>Get immediate updates from employers at every stage of the application process</p>
                      <div className={(this.state.carouselValue === 3 ? 'active-text mt-2' : 'inactive-text mt-2')}>
                      <p>JobsLab keeps you continously informed about your application and the trends in the job market</p>
                      </div>
                    </div>
                  </div>
                  </a>
              </div>
            </Fade>
          </div>
        </div>
        
        <div className="home-imgcontainer banner">        
          <div className="parallax02"></div>
            <div className="home-bannercontainer blue-style responsive">
              <Fade duration={2000} bottom>
                <div className="banner-half-sec blue-style responsive">
                  <h3>Unlock a Great Job</h3>
                  <p>Reveal leading company names within your industry</p>
                  <div className="button-sec">
                    <Button variant="contained" className="jr-btn jr-btn-slg bg-white text-black" onClick={(e) => this.props.history.push("/joblist")}>
                      <font size="+1">Find Jobs</font>
                    </Button>
                  </div>
                </div>
                <div className="banner-half-sec image responsiveimage">
                  <img src={encodeURI(WEB_IMAGE_URL+"home/banner02-mobile.png")} alt="" />
                </div>
              </Fade>
            </div>
        </div>
        
        <div className="home-imgcontainer value-proposition">        
          <div className="parallax01"></div>
          <div className="home-bannercontainer white-style">
            <Fade duration={2000} bottom when={fade}>
            <div class="container">
              <div className="row h-100">
                <div className="col-xl-4 text-content mb-4 res-2nd">
                  <div className="mb-3 h-33">
                    <i class="fas fa-address-card mb-2"></i>
                    <span>Generate a Winning Profile</span>
                    <p>Our system generates your profile in 20 seconds from your existing resume. Customize to suit or keep as is. Either way, you've got a great profile to land your next job.</p>
                  </div>
                  <div className="mb-3 h-33">
                    <i class="fas fa-user-tie mb-2"></i>
                    <span>Your Personal Recruiter</span>
                    <p>Our AI works 24/7 to find the right job for you. Get notified about new jobs that are a good match right away. Receive recommendations from both our AI and our Career Experts.</p>
                  </div>
                  <div className="mb-3 h-33">
                    <i class="fas fa-clock mb-2"></i>
                    <span>Real-Time Updates</span>
                    <p>No more waiting for updates. Get real-time updates from employers at every stage of the application process. Manage the process from your own personal career dashboard.</p>
                  </div>
                </div>
                <div className="col-xl-4 text-content mb-4 res-3rd">
                  <div className="mb-3 h-33">
                    <i class="fas fa-plane-departure mb-2"></i>
                    <span>Get Rewarded</span>
                    <p>Take a Holiday on Us. Enjoy unique and exciting travel experiences via our partnership with Klook. Get rewarded for finding your next job with JobsLab.</p>
                  </div>
                  <div className="mb-3 h-33">
                    <i class="fas fa-user-friends mb-2"></i>
                    <span>Refer a Friend</span>
                    <p>Share a great job and get rewarded for referring your friends and peers. Get rewarded automatically when your referrals land their new job.</p>
                  </div>
                  <div className="mb-3 h-33">
                    <i class="fas fa-chess mb-2"></i>
                    <span>Jump Start Your Career</span>
                    <p>Benefit from exclusive articles, videos, interviews & more from our career experts and leading industry experts. Visit the JobsLab <a target="_blank" href="https://blog.jobslab.io">blog</a> today.</p>
                  </div>
                </div>
                <div className="col-xl-4 res-1st">
                  <div>
                    <img className="mb-4" src={encodeURI(WEB_IMAGE_URL+"home/mockup3.png")} alt="" />
                    <div className="px-4">
                      <h3>Beyond just jobs.</h3>
                      <p>We see beyond the profile to the individual.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Fade>
          </div>
        </div>
        
        <div className="home-imgcontainer home-carousel-responsive">        
          <div className="parallax03"></div>
          <div className="home-bannercontainer blue-style">
            <Fade duration={2000} bottom when={fade}>
              <div className="banner-half-sec image">
                <Fade duration={300} left distance='10px' when={this.state.carousel2Active}>
                {
                this.state.carousel2Value === 1 ?
                <div className="klook-button-sec">
                  <a target="_blank" href="https://www.klook.com/zh-HK/?aid=14770&utm_medium=affiliate-alwayson&utm_source=non-network&utm_campaign=14770&utm_term=&utm_content=">
                    <div className="klook-photo">
                      <img src={encodeURI(WEB_IMAGE_URL+"home/home-klook-white.png")}/>
                    </div>
                    <Button variant="contained" className="jr-btn jr-btn-slg bg-warning text-white">
                      <font size="+1">See Our Latest Promotion</font>
                    </Button>
                  </a>
                </div> :
                this.state.carousel2Value === 2 ? <img src={encodeURI(WEB_IMAGE_URL+"home/insurance-icon-white.png")}/> :
                <img src={encodeURI(WEB_IMAGE_URL+"home/home-fps-white.png")}/>
                }
                </Fade>
              </div>
              <div className="banner-half-sec home-carousel-title white">
                  <h3>Get Rewarded, Get Paid</h3>
                  <h3>It Is Not Only About Finding Jobs</h3>
                  <a onClick={() => {this.carousel2Click(1)}}>
                  <div className={(this.state.carousel2Value === 1 ? 'home-carousel-content active white' : 'home-carousel-content')}>
                    <div className="col-1 my-auto home-carousel-icon">
                    <i className={(this.state.carousel2Value === 1 ? 'fas fa-check-circle active-icon white' : 'fas fa-plus-circle inactive-icon white')}></i>
                    </div>
                    <div className="col-11 my-2">
                      <span>Get Access to Exclusive Rewards</span>
                      <div className={(this.state.carousel2Value === 1 ? 'active-text' : 'inactive-text')}>
                      <p>JobsLab partnered with Klook to offer you free holiday experiences when you successfully get your new job on JobsLab</p>
                      </div>
                    </div>
                  </div>
                  </a>
                  <a onClick={() => {this.carousel2Click(2)}}>
                  <div className={(this.state.carousel2Value === 2 ? 'home-carousel-content active white' : 'home-carousel-content')}>
                    <div className="col-1 my-auto home-carousel-icon">
                    <i className={(this.state.carousel2Value === 2 ? 'fas fa-check-circle active-icon white' : 'fas fa-plus-circle inactive-icon white')}></i>
                    </div>
                    <div className="col-11 my-2">
                      <span>Get Exclusive Discount to Insurance</span>
                      <div className={(this.state.carousel2Value === 2 ? 'active-text' : 'inactive-text')}>
                      <p>JobsLab is partnering with a leading Virtual Insurance Company to offer discounted rates for our members to purchase insurance</p>
                      </div>
                    </div>
                  </div>
                  </a>
                  <a onClick={() => {this.carousel2Click(3)}}>
                  <div className={(this.state.carousel2Value === 3 ? 'home-carousel-content active white' : 'home-carousel-content')}>
                    <div className="col-1 my-auto home-carousel-icon">
                    <i className={(this.state.carousel2Value === 3 ? 'fas fa-check-circle active-icon white' : 'fas fa-plus-circle inactive-icon white')}></i>
                    </div>
                    <div className="col-11 my-2">
                      <span>Refer Peers to Jobs & Receive Cash Rewards</span>
                      <div className={(this.state.carousel2Value === 3 ? 'active-text' : 'inactive-text')}>
                      <p>Receive cash rewards when you refer your peers to jobs on JobsLab and they successfully get hired</p>
                      </div>
                    </div>
                  </div>
                  </a>
              </div>
            </Fade>
          </div>
        </div>
        
  {/*
        <div className="home-imgcontainer banner double-resp">  
          <div className="home-bannercontainer">
            <div className="double-sec">
              <div className="parallax-double01"></div>
              <div className="double-sec-background white-style responsive">
              <Fade duration={2500} cascade>
              <div className="double-sec-container">
                <h3>Get Rewarded</h3>
                <p><i>Take a Holiday on Us</i></p>
                <a href="https://www.klook.com/zh-HK/?aid=14770&utm_medium=affiliate-alwayson&utm_source=non-network&utm_campaign=14770&utm_term=&utm_content=">
                <img className="w-50" src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/home/crossover_klook.png" alt="" />
                </a>
                <div className="button-sec">
                    <Button variant="contained" className="jr-btn jr-btn-slg bg-warning text-white" href="https://www.klook.com/zh-HK/?aid=14770&utm_medium=affiliate-alwayson&utm_source=non-network&utm_campaign=14770&utm_term=&utm_content=" target="_blank">
                      <font size="+1">See Our Latest Promotions</font>
                    </Button>
                  </div>
              </div>
              </Fade>
              </div>
            </div>
            <div className="double-sec">
              <div className="parallax-double02"></div>
              <div className="double-sec-background purple-style">
              <Fade duration={2500} cascade>
              <div className="double-sec-container">
                <h3>Refer Peers to Jobs & Receive Cash Rewards</h3>
                <img src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/home/fps-white.png" alt="" />
                <p>Faster Payment System</p>
              </div>
              </Fade>
              </div>
            </div>
          </div>
        </div>
  */}
        
        <div className="howitworks">
          <div className="parallax-howitworks"></div>
          <div className="howitworks-background">
            <Fade duration={2000} bottom>
            <h3 style={{paddingTop: "50px",paddingBottom:"50px", fontSize:"35px"}}>How It Works</h3>
            </Fade>
            <div className="howitworks-sec" style={{paddingBottom:"50px"}}>
              <div className="howitworks-part responsivelhs">
              <Fade duration={2000} bottom cascade>
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
        				</Fade>
              </div>
              <Fade duration={2000} bottom>
                <div className="howitworks-part image">
                  <img src={encodeURI(WEB_IMAGE_URL+"home/how-iphone.png")} alt="" />
                </div>
              </Fade>
              <div className="howitworks-part responsiverhs">
                <Fade duration={2000} bottom cascade>
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
      							<p>Have you ever seen a job posting that would be perfect for a friend? Simply refer them and get rewarded with up to HK$40,000 with they get hired</p>
        					</div>
        				</div>
        				</Fade>
              </div>
            </div>
          </div>
        </div>
        
        <div className="home-imgcontainer banner youtube">        
          <div className="parallax-iframe"></div>
            <div className="home-bannercontainer dark-style youtube">
              
                <div className="home-youtube">
              <h3>Introducing JobsLab</h3>
              <p>Matching exceptional people with amazing jobs. Watch our brand video.</p>
                  <iframe width="600" height="350" 
                  src="https://www.youtube.com/embed/XLkDYdppMOA">
                  </iframe>
                  
                </div>
          </div>
        </div>
        
        <div className="home-imgcontainer company">        
          <div className="parallax-iframe"></div>
            <div className="home-bannercontainer grey-style company">
              <Fade duration={2000} cascade>
              
                
                <div className="home-company-list row resp2">
                  <div className="company-ipad-resp">
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/AWS_logo.png")}/></div>
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/Google_logo.png")}/></div>
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/KLOOK_LOGO.png")}/></div>
                  </div>
                  
                  <div className="company-ipad-resp">
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/LinkedIn_Logo.png")}/></div>
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/Microsoft_logo.png")}/></div>
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/Zoom-Logo.png")}/></div>
                  </div>
                  
                </div>
                <div><p className="text-uppercase resp1">Career Expert Insights from Top Companies</p></div>
                <div className="home-company-list row resp3">
                  <div className="company-ipad-resp">
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/Citi_Logo.png")}/></div>
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/GS_Logo.png")}/></div>
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/hsbc-logo.png")}/></div>
                  </div>
                  
                  <div className="company-ipad-resp">
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/ICBC_logo.png")}/></div>
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/morgan-stanley-logo.png")}/></div>
                    <div className="home-company"><img src={encodeURI(WEB_IMAGE_URL+"logo/ubs-logo.png")}/></div>
                  </div>
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
