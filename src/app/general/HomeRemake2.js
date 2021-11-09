import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Fade from "react-reveal/Fade";
import config from "react-reveal/globals";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { detailCards, recentActivity } from "./data";
import IconWithTextCard from "./IconWithTextCard";
import Drift from "components/Drift";
import { Container } from "reactstrap";
// import Button from '@material-ui/core/Button';
import { HORIZONTAL_NAVIGATION } from "constants/ActionTypes";
import { WEB_IMAGE_URL, WEB_VIDEO_URL } from "constants/PictureUrl";
import { Button, Grid } from "@material-ui/core";
import Beta from "components/popup/Beta";
import Slider from "react-slick";
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
    };
  }
  
  componentDidMount() {
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);

    setTimeout(() => {
      this.setState({ fadeAnimation: true });
    }, 1000);

    loop[1] = setInterval(() => {
      this.carouselLoop(1);
    }, 5000);
    loop[2] = setInterval(() => {
      this.carouselLoop(2);
    }, 5000);
  }

  componentWillUnmount() {}

  closeModal = (name) => {
    this.setState({
      [name]: false,
    });
  };
  

  handleClick = (carousel, slide) => {
    this.setState({ ["carouselFade" + carousel]: false });
    setTimeout(() => {
      if (loop[carousel]) clearInterval(loop[carousel]);
      this.setState({ ["activeSlide" + carousel]: slide });
      this.setState({ ["carouselFade" + carousel]: true });
    }, 300);
  };

  carouselLoop = (carousel) => {
    this.setState({ ["carouselFade" + carousel]: false });
    setTimeout(() => {
      if (this.state["activeSlide" + carousel] === 3) {
        this.setState({ ...this.state, ["activeSlide" + carousel]: 1 });
      } else {
        this.setState((prev) => ({
          ["activeSlide" + carousel]: prev["activeSlide" + carousel] + 1,
        }));
      }
      this.setState({ ["carouselFade" + carousel]: true });
    }, 300);
  };

  render() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 9000,
        appendDots: (dots) => (
          <div className="slick-dots">
            <ul style={{ margin: "0px" }}> {dots} </ul>
          </div>
        ),
      };
      const settings1 = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };
    return (
      <div className="home-wrapper">
        <Helmet>
          <title>JobsLab</title>
        </Helmet>
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
            
          </div> */}
        <div className="content-1-wrapper">
          <div className="css-v33p9q">
            <Container>
              <div>
                <div className="css-15kdgig">
                  <div className="css-otopad">
                    <div className="css-4jx5t6">
                      Join Asia's fastest growing hiring platform enabling the
                      future of work
                    </div>
                    <h1 className="ui inverted center aligned header css-7mgo4g">
                      Find jobs &amp; hire talent. Anywhere.
                    </h1>
                  </div>
                </div>
                <div className="css-1i6nzj8">
                  <div className="css-ljcuwr">
                    <div className="content">
                      <Button
                        className="css-11lhduh"
                        onClick={(e) => this.props.history.push("/joblist")}
                      >
                        Find jobs
                      </Button>
                      <Button
                        className="css-1uc6qo7"
                        onClick={(e) => this.props.history.push("/employer")}
                      >
                        Find talent
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="css-5vx9ej">
                <div
                  title
                  role="button"
                  aria-label="animation"
                  tabIndex={0}
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    margin: "0px auto",
                    outline: "none",
                  }}
                />
              </div>
            </Container>
          </div>
        </div>
        <div className="content-2-wrapper">
          <Container>
            <div className="css-124pr08">
              <div className="css-1ucnjt8">
                <div className="css-14k4spz">
                  <Grid container spacing={8} className="align-items-center">
                    <Grid item xs={12} md={6}>
                      <div className="css-1udzyt7">
                        <img
                          src="https://images.snaphunt.com/assets/images/w_600/complete-profile.png"
                          className="ui fluid image"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <h2 className="ui teal medium header css-1s1po1q">
                        Jobseekers
                      </h2>
                      <h2 className="ui huge header css-15bxtoc">
                        Find jobs with reputable companies, anywhere in the
                        world
                      </h2>
                      <p className="css-rmhymj e56oal20">
                        Receive job proposals from the world’s top employers by
                        creating your Snaphunt profile and letting our AI match
                        you with global jobs that are aligned with your
                        experience, goals &amp; preferences.
                      </p>
                      <div className="css-1xaekgw">
                        <Button
                          variant="contained"
                          color="success"
                          className="btn-submit"
                        >
                          Submit your CV
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className="css-1rdlosm">
                <Grid container>
                  <Grid item xs={12} sm={12} lg={8}>
                    <div className="css-14k4spz">
                      <Grid container spacing={6}>
                        <Grid item xs={12}>
                          <div className="ui huge header">
                            Accelerate your job search With Joblabs
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="css-w6dtwh">
                            <img
                              src="https://images.snaphunt.com/assets/vectors/icons/bell-icon.svg"
                              className="ui image"
                            />
                            <div className>
                              <div className="ui large header css-ou39ru">
                                <h3>Stay updated about relevant roles</h3>
                              </div>
                              <p className="css-rmhymj e56oal20">
                                We let you know as soon as a matching job comes
                                up, so you know what roles are out there, and
                                can apply with a simple click.
                              </p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="css-w6dtwh">
                            <img
                              src="https://images.snaphunt.com/assets/vectors/icons/doc.svg"
                              className="ui image"
                            />
                            <div className>
                              <div className="ui large header css-ou39ru">
                                <h3>Receive job invitations from employers</h3>
                              </div>
                              <p className="css-rmhymj e56oal20">
                                Get invitations to apply from the world’s top
                                employers while maintaining the confidentiality
                                of your profile.
                              </p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="css-w6dtwh">
                            <img
                              src="https://images.snaphunt.com/assets/vectors/icons/interview-icon.svg"
                              className="ui image"
                            />
                            <div className>
                              <div className="ui large header css-ou39ru">
                                <h3>Improve your interview chances by 5x</h3>
                              </div>
                              <p className="css-rmhymj e56oal20">
                                Our AI matches you to roles in line with your
                                experience &amp; skills, so you are 5 times more
                                likely to be interviewed when you apply for a
                                matching job on Snaphunt.
                              </p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="css-w6dtwh">
                            <img
                              src="https://images.snaphunt.com/assets/vectors/icons/growth.svg"
                              className="ui image"
                            />
                            <div className>
                              <div className="ui large header css-ou39ru">
                                <h3>
                                  Accelerate your career without boundaries
                                </h3>
                              </div>
                              <p className="css-rmhymj e56oal20">
                                Snaphunt matches you to relevant jobs from
                                around the world, so you find the best jobs, no
                                matter where you are based.
                              </p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="css-w6dtwh">
                            <img
                              src="https://images.snaphunt.com/assets/vectors/icons/track.svg"
                              className="ui image"
                            />
                            <div className>
                              <div className="ui large header css-ou39ru">
                                <h3>Track your applications till hire</h3>
                              </div>
                              <p className="css-rmhymj e56oal20">
                                Receive real time updates on the status of your
                                applications so that you always know where you
                                stand in each process.
                              </p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="css-w6dtwh">
                            <img
                              src="https://images.snaphunt.com/assets/vectors/icons/candidate.svg"
                              className="ui image"
                            />
                            <div className>
                              <div className="ui large header css-ou39ru">
                                <h3>Get job search &amp; career support</h3>
                              </div>
                              <p className="css-rmhymj e56oal20">
                                Make your job search more effective and stay
                                ahead in your career with tools, insights &amp;
                                advice from experts to support each stage of
                                your career lifecycle.
                              </p>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={4}
                    style={{ textAlign: "center", marginTop: 40 }}
                  >
                    <img
                      src="https://images.snaphunt.com/assets/images/snap-mobile.png"
                      className="ui medium centered image"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Container>
        </div>
        {/* <div className="home-carousel">  
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
          </div> */}

        {/* <div className="home-carousel home-carousel--blue">  
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
          </div> */}
        <div className="content-3-wrapper">
            <div className="css-112g1tl">
          <Container>
              <div className="css-8ytc6i">
                <Grid
                  container
                  style={{ alignItems: "flex-end", justifyContent: "center" }}
                >
                  <Grid item xs={12} lg={5} style={{ padding: 40 }}>
                    <div>
                      <img
                        src="https://images.snaphunt.com/assets/vectors/illustrations/dotted-world-map.svg"
                        className="ui large image css-8atqhb"
                      />
                      <div className="css-1xaekgw">
                        <div className>
                          <div className="ui teal medium header css-1s1po1q">
                            Employers
                          </div>
                          <h2 className="ui huge header css-15bxtoc">
                            Build your team without boundaries
                          </h2>
                          <p className="css-1v60gbe e56oal20">
                            Find, assess, engage and hire remote talent with
                            ease using Snaphunt.
                          </p>
                        </div>
                      </div>
                      <div className="css-k008qs">
                        <Button variant="contained" style={{ marginRight: 10 }}>
                          Sign up for free
                        </Button>
                        <Button variant="outlined">Request a demo</Button>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} lg={7} style={{ padding: 40 }}>
                    <div className="css-14k4spz">
                      <Grid container spacing={6}>
                        <Grid item xs={12} md={4} lg={6}>
                          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-direction-xs-column">
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <img
                                src="https://images.snaphunt.com/assets/vectors/icons/job-description.svg"
                                className="ui image css-u9vlnn"
                              />
                            </div>
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <div className="ui small header css-1s1po1q" />
                              <div className>
                                <p className="css-z2wpme e56oal20">
                                  Get instant access to matched talent
                                </p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4} lg={6}>
                          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-direction-xs-column">
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <img
                                src="https://images.snaphunt.com/assets/vectors/icons/work-style.svg"
                                className="ui image css-u9vlnn"
                              />
                            </div>
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <div className="ui small header css-1s1po1q" />
                              <div className>
                                <p className="css-z2wpme e56oal20">
                                  Conduct asynchronous &amp; live video
                                  interviews
                                </p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4} lg={6}>
                          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-direction-xs-column">
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <img
                                src="https://images.snaphunt.com/assets/vectors/icons/video-profile.svg"
                                className="ui image css-u9vlnn"
                              />
                            </div>
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <div className="ui small header css-1s1po1q" />
                              <div className>
                                <p className="css-z2wpme e56oal20">
                                  Benefit from powerful multichannel sourcing
                                </p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4} lg={6}>
                          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-direction-xs-column">
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <img
                                src="https://images.snaphunt.com/assets/vectors/icons/remote-collaboration.svg"
                                className="ui image css-u9vlnn"
                              />
                            </div>
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <div className="ui small header css-1s1po1q" />
                              <div className>
                                <p className="css-z2wpme e56oal20">
                                  Collaborate remotely with your team on hiring
                                </p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4} lg={6}>
                          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-direction-xs-column">
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <img
                                src="https://images.snaphunt.com/assets/vectors/icons/discounts.svg"
                                className="ui image css-u9vlnn"
                              />
                            </div>
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <div className="ui small header css-1s1po1q" />
                              <div className>
                                <p className="css-z2wpme e56oal20">
                                  Insightful applicant profiles to shortlist
                                  effectively
                                </p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4} lg={6}>
                          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-direction-xs-column">
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <img
                                src="https://images.snaphunt.com/assets/vectors/icons/job-search.svg"
                                className="ui image css-u9vlnn"
                              />
                            </div>
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-auto">
                              <div className="ui small header css-1s1po1q" />
                              <div className>
                                <p className="css-z2wpme e56oal20">
                                  Receive automated reference checks
                                </p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </div>
          </Container>
            </div>
        </div>
        <div className="content-4-wrapper">
      <div className="css-1eisnn4">
            <div className="css-1g440lb">
        <Container>
          <div className="css-e6zcug">
            <div className="ui fluid raised card css-1wuptrb" style={{ marginBottom: 40 }}>
              <Slider {...settings}>
                <div style={{ padding: "70px 50px 50px 50px" }}>
                  <div style={{ padding: "70px 50px 50px 50px" }}>
                    <div className="MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center">
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                        <div className="css-1py1l5l">
                          <div className="css-ta7fyc">
                            <div className="ui large center aligned header" style={{fontSize: 18}}>
                              <span className="css-nudg5n" style={{fontSize: 20 , fontWeight: 300}}>
                                1 A Fintech powerhouse leveraged Snaphunt for
                                remote hiring across South East Asia while
                              </span>{" "}
                              reducing time to hire by 30%.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                        <div className="css-1ftvkz8">
                          <div className>
                            <p className="css-rmhymj e56oal20"  style={{fontSize: 16 , fontWeight: 300}}>
                              With limited in-house HR resources, this Fintech
                              used Snaphunt to efficiently generate dozens of
                              job descriptions, source for open roles across a
                              number of channels using while also receiving
                              quality matches from Snaphunt’s talent pool.
                            </p>
                            <p className="css-rmhymj e56oal20" style={{fontSize: 16 , fontWeight: 300}}>
                              Their regional teams could also easily collaborate
                              and share feedback on each candidate at every
                              stage. This helped them stay aligned and make
                              their hires quickly &amp; accurately.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "70px 50px 50px 50px" }}>
                  <div style={{ padding: "70px 50px 50px 50px" }}>
                    <div className="MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center">
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                        <div className="css-1py1l5l">
                          <div className="css-ta7fyc">
                            <div className="ui large center aligned header" style={{fontSize: 18}}>
                              <span className="css-nudg5n" style={{fontSize: 20 , fontWeight: 300}}>
                                1 A Fintech powerhouse leveraged Snaphunt for
                                remote hiring across South East Asia while
                              </span>{" "}
                              reducing time to hire by 30%.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                        <div className="css-1ftvkz8">
                          <div className>
                            <p className="css-rmhymj e56oal20"  style={{fontSize: 16 , fontWeight: 300}}>
                              With limited in-house HR resources, this Fintech
                              used Snaphunt to efficiently generate dozens of
                              job descriptions, source for open roles across a
                              number of channels using while also receiving
                              quality matches from Snaphunt’s talent pool.
                            </p>
                            <p className="css-rmhymj e56oal20" style={{fontSize: 16 , fontWeight: 300}}>
                              Their regional teams could also easily collaborate
                              and share feedback on each candidate at every
                              stage. This helped them stay aligned and make
                              their hires quickly &amp; accurately.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "70px 50px 50px 50px" }}>
                  <div style={{ padding: "70px 50px 50px 50px" }}>
                    <div className="MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center">
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                        <div className="css-1py1l5l">
                          <div className="css-ta7fyc">
                            <div className="ui large center aligned header" style={{fontSize: 18}}>
                              <span className="css-nudg5n" style={{fontSize: 20 , fontWeight: 300}}>
                                1 A Fintech powerhouse leveraged Snaphunt for
                                remote hiring across South East Asia while
                              </span>{" "}
                              reducing time to hire by 30%.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6">
                        <div className="css-1ftvkz8">
                          <div className>
                            <p className="css-rmhymj e56oal20"  style={{fontSize: 16 , fontWeight: 300}}>
                              With limited in-house HR resources, this Fintech
                              used Snaphunt to efficiently generate dozens of
                              job descriptions, source for open roles across a
                              number of channels using while also receiving
                              quality matches from Snaphunt’s talent pool.
                            </p>
                            <p className="css-rmhymj e56oal20" style={{fontSize: 16 , fontWeight: 300}}>
                              Their regional teams could also easily collaborate
                              and share feedback on each candidate at every
                              stage. This helped them stay aligned and make
                              their hires quickly &amp; accurately.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
              </Slider>
            </div>
            <div className="ui fluid raised card css-1h06tb5">
              <div className="content css-jrzc9f">
                <div className="css-1u9juce">
                <Slider {...settings1}>
                 <div className="item">
                    <img src="https://images.snaphunt.com/assets/images/logos/h_50/mazars.jpeg" alt="mazars llp logo" className="css-6kk5wx" />
                 </div>
                 <div className="item">
                  <img src="https://images.snaphunt.com/assets/images/logos/h_50/f8.jpeg" alt="f8 innovation logo" className="css-6kk5wx" />
                  </div>
                  <div className="item">
                  <img src="https://images.snaphunt.com/assets/images/logos/h_50/mazars.jpeg" alt="mazars llp logo" className="css-6kk5wx" />
                  </div>
                  <div className="item">
                  <img src="https://images.snaphunt.com/assets/images/logos/h_50/f8.jpeg" alt="f8 innovation logo" className="css-6kk5wx" />
                  </div>
                  <div className="item">
                  <img src="https://images.snaphunt.com/assets/images/logos/h_50/mazars.jpeg" alt="mazars llp logo" className="css-6kk5wx" />
                  </div>
                  <div className="item">
                  <img src="https://images.snaphunt.com/assets/images/logos/h_50/f8.jpeg" alt="f8 innovation logo" className="css-6kk5wx" />
                  </div>
                  <div className="item">
                  <img src="https://images.snaphunt.com/assets/images/logos/h_50/mazars.jpeg" alt="mazars llp logo" className="css-6kk5wx" />
                  </div>
                  <div className="item">
                  <img src="https://images.snaphunt.com/assets/images/logos/h_50/f8.jpeg" alt="f8 innovation logo" className="css-6kk5wx" />
                  </div>
                  <div className="item">
                  <img src="https://images.snaphunt.com/assets/images/logos/h_50/f8.jpeg" alt="f8 innovation logo" className="css-6kk5wx" />
                  </div>
                  <div className="item">
                  <img src="https://images.snaphunt.com/assets/images/logos/h_50/mazars.jpeg" alt="mazars llp logo" className="css-6kk5wx" />
                  </div>
                </Slider>
                </div>
              </div>
            </div>
            <div className="css-15ijm9t">
              <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-sm-12 MuiGrid-grid-md-4">
                  <div className="ui fluid raised card css-1k020ra">
                    <div className="content">
                      <div>
                        <div className="ProfileImage-container">
                          <div
                            className="ProfileImage ProfileImage-size4"
                            style={{
                              borderWidth: "1px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            <div
                              className="Image Image-loaded"
                              style={{
                                backgroundColor: "rgb(229, 229, 229)",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <img
                                className="Image-actual"
                                alt="No Image"
                                src="https://images.snaphunt.com/assets/images/w_165/20210319-ross-belhomme.jpg"
                              />
                              <div
                                className="Image-actual"
                                style={{
                                  backgroundImage:
                                    'url("https://images.snaphunt.com/assets/images/w_165/20210319-ross-belhomme.jpg")',
                                  backgroundSize: "cover",
                                  backgroundPosition: "center center",
                                }}
                              />
                              <div
                                className="Image-failed"
                                style={{
                                  backgroundSize: "contain",
                                  backgroundPosition: "center center",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="css-1q7njkh">
                        <i
                          aria-hidden="true"
                          className="big icon sh-quote-1 css-boq6t7"
                        />
                        <p className="css-1e7vlpv">
                          With Joblabs, our firm was able to source and
                          ultimately hire a number of talented individuals at a
                          fraction of the cost and time of traditional
                          recruitment agencies. Snaphunt is now one of our key
                          partners, as we look to build a high performing team
                          across Asia.
                        </p>
                        <h4 className="ui header css-1apwt4c">
                          {" "}
                          Ross Belhomme
                          <div className="sub header">
                            Board Member, STEP Digital Assets
                          </div>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-sm-12 MuiGrid-grid-md-4">
                  <div className="ui fluid raised card css-1k020ra">
                    <div className="content">
                      <div>
                        <div className="ProfileImage-container">
                          <div
                            className="ProfileImage ProfileImage-size4"
                            style={{
                              borderWidth: "1px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            <div
                              className="Image Image-loaded"
                              style={{
                                backgroundColor: "rgb(229, 229, 229)",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <img
                                className="Image-actual"
                                alt="No Image"
                                src="https://images.snaphunt.com/assets/images/w_165/20210319-ross-belhomme.jpg"
                              />
                              <div
                                className="Image-actual"
                                style={{
                                  backgroundImage:
                                    'url("https://images.snaphunt.com/assets/images/w_165/20210319-ross-belhomme.jpg")',
                                  backgroundSize: "cover",
                                  backgroundPosition: "center center",
                                }}
                              />
                              <div
                                className="Image-failed"
                                style={{
                                  backgroundSize: "contain",
                                  backgroundPosition: "center center",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="css-1q7njkh">
                        <i
                          aria-hidden="true"
                          className="big icon sh-quote-1 css-boq6t7"
                        />
                        <p className="css-1e7vlpv">
                          With Joblabs, our firm was able to source and
                          ultimately hire a number of talented individuals at a
                          fraction of the cost and time of traditional
                          recruitment agencies. Snaphunt is now one of our key
                          partners, as we look to build a high performing team
                          across Asia.
                        </p>
                        <h4 className="ui header css-1apwt4c">
                          {" "}
                          Ross Belhomme
                          <div className="sub header">
                            Board Member, STEP Digital Assets
                          </div>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-sm-12 MuiGrid-grid-md-4">
                  <div className="ui fluid raised card css-1k020ra">
                    <div className="content">
                      <div>
                        <div className="ProfileImage-container">
                          <div
                            className="ProfileImage ProfileImage-size4"
                            style={{
                              borderWidth: "1px",
                              borderColor: "black",
                              borderStyle: "solid",
                            }}
                          >
                            <div
                              className="Image Image-loaded"
                              style={{
                                backgroundColor: "rgb(229, 229, 229)",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <img
                                className="Image-actual"
                                alt="No Image"
                                src="https://images.snaphunt.com/assets/images/w_165/20210319-ross-belhomme.jpg"
                              />
                              <div
                                className="Image-actual"
                                style={{
                                  backgroundImage:
                                    'url("https://images.snaphunt.com/assets/images/w_165/20210319-ross-belhomme.jpg")',
                                  backgroundSize: "cover",
                                  backgroundPosition: "center center",
                                }}
                              />
                              <div
                                className="Image-failed"
                                style={{
                                  backgroundSize: "contain",
                                  backgroundPosition: "center center",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="css-1q7njkh">
                        <i
                          aria-hidden="true"
                          className="big icon sh-quote-1 css-boq6t7"
                        />
                        <p className="css-1e7vlpv">
                          With Joblabs, our firm was able to source and
                          ultimately hire a number of talented individuals at a
                          fraction of the cost and time of traditional
                          recruitment agencies. Snaphunt is now one of our key
                          partners, as we look to build a high performing team
                          across Asia.
                        </p>
                        <h4 className="ui header css-1apwt4c">
                          {" "}
                          Ross Belhomme
                          <div className="sub header">
                            Board Member, STEP Digital Assets
                          </div>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui fluid raised card css-1jfceaj">
              <div className="content">
                <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-1 MuiGrid-wrap-xs-nowrap MuiGrid-align-items-xs-center">
                  <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3 MuiGrid-grid-md-auto">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.entrepreneur.com/article/328915"
                    >
                      <img
                        src="https://images.snaphunt.com/assets/images/h_70/entrepreneurs.png"
                        className="ui image"
                      />
                    </a>
                  </div>
                  <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3 MuiGrid-grid-md-auto">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.dealstreetasia.com/stories/singapore-digest-rely-raises-pre-series-a-snaphunt-snags-1m-seed-funding-123324"
                    >
                      <img
                        src="https://images.snaphunt.com/assets/images/h_70/dealStreet.png"
                        className="ui image"
                      />
                    </a>
                  </div>
                  <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3 MuiGrid-grid-md-auto">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.techinasia.com/snaphunt-1m-seed-beenext"
                    >
                      <img
                        src="https://images.snaphunt.com/assets/images/h_70/techinasia.png"
                        className="ui image"
                      />
                    </a>
                  </div>
                  <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3 MuiGrid-grid-md-auto">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.peoplemattersglobal.com/article/hr-technology/meet-these-emerging-hr-tech-startups-at-techhr-singapore-20694"
                    >
                      <img
                        src="https://images.snaphunt.com/assets/images/h_70/peopleMatter.png"
                        className="ui image"
                      />
                    </a>
                  </div>
                  <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3 MuiGrid-grid-md-auto">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.digitalnewsasia.com/startups/singapores-snaphunt-lands-us1mil-seed-funding-led-beenext"
                    >
                      <img
                        src="https://images.snaphunt.com/assets/images/h_70/dnaLogo.png"
                        className="ui image"
                      />
                    </a>
                  </div>
                  <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3 MuiGrid-grid-md-auto">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.hrdigitaltoday.com/blog/2019/01/ceo-interview-snaphunt-predictive-hiring-platform-that-finds-and-matches-talent-to-jobs-for-a-skill-and-personality-jobs-and-talent-matched-intelligently"
                    >
                      <img
                        src="https://images.snaphunt.com/assets/images/h_70/hrLogo.png"
                        className="ui image"
                      />
                    </a>
                  </div>
                  <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3 MuiGrid-grid-md-auto">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://e27.co/todays-top-tech-news-february-25-funding-funding-funding-galore-20190225"
                    >
                      <img
                        src="https://images.snaphunt.com/assets/images/h_70/e27Logo.png"
                        className="ui image"
                      />
                    </a>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </Container>
        </div>
      </div>
    </div>

        {/* <div className="home-usage">
          <div className="parallax-bg parallax-bg--macbook"></div>
          <div className="inner-wrapper">
            <div className="home-usage__left">
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-address-card mb-2"></i>
                  <h3 className="home-usage__head">
                    Generate a Winning Profile
                  </h3>
                  <p className="home-usage__desc">
                    Our system generates your profile in 20 seconds from your
                    existing resume. Customize to suit or keep as is. Either
                    way, you've got a great profile to land your next job.
                  </p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-user-tie mb-2"></i>
                  <h3 className="home-usage__head">Your Personal Recruiter</h3>
                  <p className="home-usage__desc">
                    Our AI works 24/7 to find the right job for you. Get
                    notified about new jobs that are a good match right away.
                    Receive recommendations from both our AI and our Career
                    Experts.
                  </p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-clock mb-2"></i>
                  <h3 className="home-usage__head">Real-Time Updates</h3>
                  <p className="home-usage__desc">
                    No more waiting for updates. Get real-time updates from
                    employers at every stage of the application process. Manage
                    the process from your own personal career dashboard.
                  </p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-plane-departure mb-2"></i>
                  <h3 className="home-usage__head">Get Rewarded</h3>
                  <p className="home-usage__desc">
                    Take a Holiday on Us. Enjoy unique and exciting travel
                    experiences via our partnership with Klook. Get rewarded for
                    finding your next job with JobsLab.
                  </p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-user-friends mb-2"></i>
                  <h3 className="home-usage__head">Refer a Friend</h3>
                  <p className="home-usage__desc">
                    Share a great job and get rewarded for referring your
                    friends and peers. Get rewarded automatically when your
                    referrals land their new job.
                  </p>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="home-usage__item">
                  <i className="fas fa-chess mb-2"></i>
                  <h3 className="home-usage__head">Jump Start Your Career</h3>
                  <p className="home-usage__desc">
                    Benefit from exclusive articles, videos, interviews & more
                    from our career experts and leading industry experts. Visit
                    the JobsLab{" "}
                    <a target="_blank" href="https://blog.jobslab.io">
                      blog
                    </a>{" "}
                    today.
                  </p>
                </div>
              </Fade>
            </div>
            <div className="home-usage__right">
              <Fade duration={1500} bottom>
                <img
                  className="home-usage__img"
                  src={encodeURI(WEB_IMAGE_URL + "home/mockup3.png")}
                  alt=""
                />
                <h3 className="home-usage__slogan">Beyond just jobs.</h3>
                <p className="home-usage__desc">
                  We see beyond the profile to the individual.
                </p>
              </Fade>
            </div>
          </div>
        </div>

        <div className="home-carousel home-carousel--blue">
          <div className="parallax-bg parallax-bg--successman"></div>
          <div className="inner-wrapper">
            <Fade duration={1500} bottom>
              <div className="home-carousel__section">
                <Fade
                  duration={300}
                  left
                  distance="10px"
                  when={this.state.carouselFade2}
                >
                  {this.state.activeSlide2 === 1 ? (
                    <div className="klook-button-sec">
                      <a
                        target="_blank"
                        href="https://www.klook.com/zh-HK/?aid=14770&utm_medium=affiliate-alwayson&utm_source=non-network&utm_campaign=14770&utm_term=&utm_content="
                      >
                        <div className="klook-photo">
                          <img
                            src={encodeURI(
                              WEB_IMAGE_URL + "home/home-klook-white.png"
                            )}
                          />
                        </div>
                        <div className="home-carousel__btn">
                          <Button
                            variant="contained"
                            className="jr-btn jr-btn-slg bg-warning text-white"
                          >
                            <font size="+1">See Our Latest Promotion</font>
                          </Button>
                        </div>
                      </a>
                    </div>
                  ) : this.state.activeSlide2 === 2 ? (
                    <img
                      src={encodeURI(
                        WEB_IMAGE_URL + "home/insurance-icon-white.png"
                      )}
                    />
                  ) : (
                    <img
                      src={encodeURI(WEB_IMAGE_URL + "home/home-fps-white.png")}
                    />
                  )}
                </Fade>
              </div>
            </Fade>
            <Fade duration={1500} bottom>
              <div className="home-carousel__section">
                <h3 className="home-carousel__slogan">
                  Get Rewarded, Get Paid
                </h3>
                <h3 className="home-carousel__slogan">
                  It Is Not Only About Finding Jobs
                </h3>

                <button
                  className={`home-carousel__item ${
                    this.state.activeSlide2 === 1 ? "active" : ""
                  }`}
                  onClick={() => this.handleClick(2, 1)}
                >
                  <i
                    className={`home-carousel__icon fas ${
                      this.state.activeSlide2 === 1
                        ? "fa-check-circle"
                        : "fa-plus-circle"
                    }`}
                  ></i>
                  <div className="home-carousel__content">
                    <p className="home-carousel__title">
                      Get Access to Exclusive Rewards
                    </p>
                    <p className="home-carousel__desc d-none">
                      JobsLab partnered with Klook to offer you free holiday
                      experiences when you successfully get your new job on
                      JobsLab
                    </p>
                  </div>
                </button>

                <button
                  className={`home-carousel__item ${
                    this.state.activeSlide2 === 2 ? "active" : ""
                  }`}
                  onClick={() => this.handleClick(2, 2)}
                >
                  <i
                    className={`home-carousel__icon fas ${
                      this.state.activeSlide2 === 2
                        ? "fa-check-circle"
                        : "fa-plus-circle"
                    }`}
                  ></i>
                  <div className="home-carousel__content">
                    <p className="home-carousel__title">
                      Get Exclusive Discount to Insurance
                    </p>
                    <p className="home-carousel__desc d-none">
                      JobsLab is partnering with a leading Virtual Insurance
                      Company to offer discounted rates for our members to
                      purchase insurance
                    </p>
                  </div>
                </button>

                <button
                  className={`home-carousel__item ${
                    this.state.activeSlide2 === 3 ? "active" : ""
                  }`}
                  onClick={() => this.handleClick(2, 3)}
                >
                  <i
                    className={`home-carousel__icon fas ${
                      this.state.activeSlide2 === 3
                        ? "fa-check-circle"
                        : "fa-plus-circle"
                    }`}
                  ></i>
                  <div className="home-carousel__content">
                    <p className="home-carousel__title">
                      Refer Peers to Jobs & Receive Cash Rewards
                    </p>
                    <p className="home-carousel__desc d-none">
                      Receive cash rewards when you refer your peers to jobs on
                      JobsLab and they successfully get hired
                    </p>
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
                    <p className="icon-list__desc">
                      Get your dream job and also get rewarded with a dream
                      holiday when you get hired
                    </p>
                  </div>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="icon-list__item icon-list__item--lhs">
                  <i className="la la-stack-exchange"></i>
                  <div className="icon-list__text">
                    <h3 className="icon-list__title">
                      Confidentiality Guaranteed
                    </h3>
                    <p className="icon-list__desc">
                      We are fully GDPR compliant and your profile remains
                      completely confidential and only shared with an employer
                      when you apply for a role
                    </p>
                  </div>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="icon-list__item icon-list__item--lhs">
                  <i className="la la-envelope"></i>
                  <div className="icon-list__text">
                    <h3 className="icon-list__title">Full Transparency</h3>
                    <p className="icon-list__desc">
                      Our easy to use dashboard is automatically updated with
                      the latest status of your job application
                    </p>
                  </div>
                </div>
                <div className="icon-list__item icon-list__item--lhs">
                  <i className="la la-phone"></i>
                  <div className="icon-list__text">
                    <h3 className="icon-list__title">Talk to Professionals</h3>
                    <p className="icon-list__desc">
                      Our easy to use dashboard is automatically updated with
                      the latest status of your job application
                    </p>
                  </div>
                </div>
              </Fade>
            </div>
            <Fade duration={1500} bottom>
              <div className="icon-list__middle">
                <img
                  src={encodeURI(WEB_IMAGE_URL + "home/how-iphone.png")}
                  alt=""
                />
              </div>
            </Fade>
            <div className="icon-list__side">
              <Fade duration={1500} bottom>
                <div className="icon-list__item icon-list__item--rhs">
                  <i className="la la-hand-pointer-o"></i>
                  <div className="icon-list__text">
                    <h3 className="icon-list__title">Apply Easily</h3>
                    <p className="icon-list__desc">
                      Create your profile in seconds and instantly get matched
                      with great jobs by our AI
                    </p>
                  </div>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="icon-list__item icon-list__item--rhs">
                  <i className="la la-clock-o"></i>
                  <div className="icon-list__text">
                    <h3 className="icon-list__title">Save Time</h3>
                    <p className="icon-list__desc">
                      Our AI works 24/7 to automatically match you with all
                      relevant jobs so no need to waste time with reading
                      hundreds of JDs and talking to headhunters
                    </p>
                  </div>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="icon-list__item icon-list__item--rhs">
                  <i className="la la-lightbulb-o"></i>
                  <div className="icon-list__text">
                    <h3 className="icon-list__title">Salary Surveys</h3>
                    <p className="icon-list__desc">
                      Want to know if you are underpaid? Check our real-time
                      salary surveys to see how you stack up in your industry
                    </p>
                  </div>
                </div>
              </Fade>
              <Fade duration={1500} bottom>
                <div className="icon-list__item icon-list__item--rhs">
                  <i className="la la-users"></i>
                  <div className="icon-list__text">
                    <h3 className="icon-list__title">Refer Your Contacts</h3>
                    <p className="icon-list__desc">
                      Have you ever seen a job posting that would be perfect for
                      a friend? Simply refer them and get rewarded with up to
                      HK$40,000 with they get hired
                    </p>
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
              <p className="home-video__desc">
                Matching exceptional people with amazing jobs. Watch our brand
                video.
              </p>
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
                <div className="company-logo__item">
                  <img src={encodeURI(WEB_IMAGE_URL + "logo/AWS_logo.png")} />
                </div>
                <div className="company-logo__item">
                  <img
                    src={encodeURI(WEB_IMAGE_URL + "logo/Google_logo.png")}
                  />
                </div>
                <div className="company-logo__item">
                  <img src={encodeURI(WEB_IMAGE_URL + "logo/KLOOK_LOGO.png")} />
                </div>
                <div className="company-logo__item">
                  <img
                    src={encodeURI(WEB_IMAGE_URL + "logo/LinkedIn_Logo.png")}
                  />
                </div>
                <div className="company-logo__item">
                  <img
                    src={encodeURI(WEB_IMAGE_URL + "logo/Microsoft_logo.png")}
                  />
                </div>
                <div className="company-logo__item">
                  <img src={encodeURI(WEB_IMAGE_URL + "logo/Zoom-Logo.png")} />
                </div>
                <div className="company-logo__title">
                  <p className="text-uppercase">
                    Career Expert Insights from Top Companies
                  </p>
                </div>
                <div className="company-logo__item">
                  <img src={encodeURI(WEB_IMAGE_URL + "logo/Citi_Logo.png")} />
                </div>
                <div className="company-logo__item">
                  <img src={encodeURI(WEB_IMAGE_URL + "logo/GS_Logo.png")} />
                </div>
                <div className="company-logo__item">
                  <img src={encodeURI(WEB_IMAGE_URL + "logo/hsbc-logo.png")} />
                </div>
                <div className="company-logo__item">
                  <img src={encodeURI(WEB_IMAGE_URL + "logo/ICBC_logo.png")} />
                </div>
                <div className="company-logo__item">
                  <img
                    src={encodeURI(
                      WEB_IMAGE_URL + "logo/morgan-stanley-logo.png"
                    )}
                  />
                </div>
                <div className="company-logo__item">
                  <img src={encodeURI(WEB_IMAGE_URL + "logo/ubs-logo.png")} />
                </div>
              </div>
            </Fade>
          </div>
        </div> */}

        <Drift appId="7wn228ik2p99" />
        <Beta
          isOpen={this.state.betaModalIsOpen}
          closeModal={() => this.closeModal("betaModalIsOpen")}
        />
      </div>
    );
  }
}
export default withRouter(Home);
