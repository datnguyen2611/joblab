import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import config from 'react-reveal/globals';
import ItemFirst from "./ItemFirst";
import ItemSecond from "./ItemSecond";
import Button from '@material-ui/core/Button';
import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';
import { Helmet } from 'react-helmet';

config({ ssrFadeout: true });

let blur = 0;
let ticking = false;

class Employer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeAnimation: false,
    }
  }
  componentDidMount() {
    //this.props.changeNavigationStyle({HORIZONTAL_NAVIGATION});
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);
    window.addEventListener('scroll', this.handleScroll, true);

    setTimeout(() => {
      this.setState({ fadeAnimation: true });
    }, 1000)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  nav = React.createRef();

  handleScroll = () => {
    blur = window.scrollY / 100;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (this.nav.current)
          this.nav.current.style.filter = `blur(${blur}px)`;
        ticking = false;
      });

      ticking = true;
    }
  };

  render() {
    const fade = (true == this.state.fadeAnimation) ? true : false;
  
    return (
      <div className="home-wrapper">
          <Helmet>
              <title>Employer | JobsLab</title>
          </Helmet>
          <div className="home-imgcontainer">
          <div className="parallax-employer" ref={this.nav}></div>
            <Fade duration={2000}>
            <div className="home-wordcontainer">
              <h3>Hire Fast. Hire Smart.</h3>
              <h3>Partner with JobsLab.</h3>
              <p>Join a community of hundreds of employers who work with JobsLab today</p>
              <Button variant="contained" color="primary" className="jr-btn jr-btn-slg" onClick={(e) => this.props.history.push("/employer/register")}>
                <font size="+1">Register Now</font>
              </Button>
            </div>
            </Fade>
            <div className="color-overlay"></div>
          </div>
        
        <div className="howitworks">
          <div className="parallax-employer-howitworks"></div>
          <div className="howitworks-background">
            <Fade duration={1500} bottom when={fade}>
            <h3>How It Works</h3>
            <p>Build high performing teams with JobsLab's powerful AI | Identity, qualify and engage with your next hire in a highly automated way</p>
            </Fade>
              <Fade duration={2000} bottom cascade when={fade}>
            <div className="howitworks-sec employer">
              <Fade duration={2000} bottom cascade>
              <div className="howitworks-part responsivelhs employer">
                <div className="handside-sec lhs-style">
                  <i className="la la-stack-exchange"></i>
                  <div className="howitworks-wordcontainer lhs-style">
                    <h3>Maintain Confidentiality</h3>
      							<p>We are fully GDPR compliant and your organization remains completely confidential and is only shared with candidates when they are screened for a role</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec lhs-style">
                  <i className="la la-envelope"></i>
                  <div className="howitworks-wordcontainer lhs-style">
                    <h3>Full Visibility</h3>
      							<p>Our comprehensive dashboard is automatically updated with the latest status for all of your open positions</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec lhs-style">
                  <i className="la la-phone"></i>
                  <div className="howitworks-wordcontainer lhs-style">
                    <h3>Talk to Professionals</h3>
      							<p>Our expert recruitment team is on hand to assist through the entire recruitment process</p>
        					</div>
        				</div>
              </div>
        				</Fade>
              <Fade duration={2000} bottom>
                <div className="howitworks-part image employer-img">
                  <img src={encodeURI(WEB_IMAGE_URL+"employer/macbook-pro-jobslab.png")} alt="" />
                </div>
              </Fade>
                <Fade duration={2000} bottom cascade>
              <div className="howitworks-part responsiverhs employer">
        				<div className="handside-sec rhs-style">
                  <i className="la la-clock-o"></i>
                  <div className="howitworks-wordcontainer rhs-style">
                    <h3>Salary Benchmarking</h3>
      							<p>Access the latest industry salary surveys to benchmark your compensation vs the industry averages</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec rhs-style">
                  <i className="la la-lightbulb-o"></i>
                  <div className="howitworks-wordcontainer rhs-style">
                    <h3>One-stop Solution</h3>
      							<p>We provide you with an AI-based solution to screen and match candidates to allow you to find and hire the right talent for your business</p>
        					</div>
        				</div>
        				
        				<div className="handside-sec rhs-style">
                  <i className="la la-gift"></i>
                  <div className="howitworks-wordcontainer rhs-style">
                    <h3>Build Brand</h3>
      							<p>Partner with JobsLab to build your brand through candidate rewards and referrals</p>
        					</div>
        				</div>
              </div>
        				</Fade>
            </div>
            <div className="howitworks-sec employer">
              <div className="howitworks-part employer-bottom">
                <div className="handside-sec lhs-style">
                  <i className="la la-dollar"></i>
                  <div className="howitworks-wordcontainer lhs-style">
                    <h3>Save Money</h3>
            				<p>Advanced recruitment at a lower cost by combining AI with skilled recruiters to streamline and accelerate the hiring process</p>
              		</div>
            		</div>
              </div>
              <div className="howitworks-part employer-bottom">
                <div className="handside-sec rhs-style">
                  <i className="la la-tasks"></i>
                  <div className="howitworks-wordcontainer rhs-style">
                    <h3>Test Skills</h3>
            				<p>We provide specific skills tests to assess candidate’s technical abilities before interviews* [*Coming soon]</p>
              		</div>
            		</div>
              </div>
            </div>
              </Fade>
          </div>
        </div>
        
          <div className="howitworks">
          <div className="parallax-pricing"></div>
          <div className="howitworks-background dark">
            <h3>Pricing</h3>
            <div className="price-tables row pt-default d-flex justify-content-evenly">
                <div className="col-md-4 px-lg-4 col-11">
                  <ItemFirst
                    styleName="card package bg-white shadow employer"
                    headerStyle="package-header bg-primary lighten-1 text-white"
                    itemStyle="package-items text-grey text-darken-3"
                    footerStyle="btn btn-default bg-primary lighten-1 text-white"
                  />
                </div>
          
                <div className="col-md-4 px-lg-4 col-11">
                  <ItemSecond
                    styleName="card package bg-primary lighten-1 shadow employer"
                    headerStyle="package-header bg-primary text-white"
                    itemStyle="package-items text-white"
                    footerStyle="btn btn-default bg-primary text-white"
                  />
                </div>
            </div>
          </div>
          </div>
          
           <div className="home-imgcontainer company">        
          <div className="parallax-iframe"></div>
            <div className="home-bannercontainer white-style company">
              <Fade duration={2000} bottom>
              
                
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
        
        </div>
    )
  }
}


/*const mapStateToProps = ({settings, auth}) => {

};*/

//export default connect(mapStateToProps, {changeNavigationStyle})(Home);
export default withRouter(Employer);