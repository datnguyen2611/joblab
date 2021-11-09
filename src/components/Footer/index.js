import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import IntlMessages from "util/IntlMessages";
import { Grid, Button } from "@material-ui/core";
class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        {/* <div className="footer-left">
        <div className="footer-left-list">
          <Link to='/terms-of-use' className="d-inline-block mr-3">TERMS OF USE</Link>
          <Link to='/privacy-policy' className="d-inline-block mr-3">PRIVACY POLICY</Link>
          <Link to='/faq' className="d-inline-block mr-3">FAQ</Link>
          <Link to='/contact' className="d-inline-block mr-3">CONTACT US</Link>
        </div>
        <span className="d-inline-block">Employment Agency License 61446</span>
      </div>
      <div className="footer-right">
        <div className="footer-icon">
          <a href="https://www.facebook.com/jobslab.io" target="_blank" ><i class="fab fa-facebook-f"></i></a>
          <a href="https://www.linkedin.com/company/jobslab" target="_blank" ><i class="fab fa-linkedin-in"></i></a>
          <a href="https://twitter.com/jobslabjobs" target="_blank" ><i class="fab fa-twitter"></i></a>
        </div>
        <span className="d-inline-block">Copyright Jobslab &copy; {moment().format("YYYY")}</span>
      </div> */}

        <div className="footer-wrapper">
          <div className="css-1fn09h8">
            <div className="container">
              <Grid container spacing={4} style={{ justifyContent: "center" }}>
                <Grid item xs={12} md={3}>
                  <div className="css-3i4eun">
                    <img
                      src="https://media.jobslab.io/logo/jobslab_white.png"
                      className="ui small centered image css-1hj6uzr"
                    />
                    <br />© 2021 Joblabs Pte. Ltd.
                  </div>
                </Grid>
                <Grid
                  container
                  item
                  spacing={2}
                  style={{ justifyContent: "space-between" }}
                  xs={12}
                  md={6}
                >
                  <Grid item xs={6} sm={3} md={6} lg={3}>
                    <div role="list" className="ui link relaxed list">
                      <div className="header-item-item">
                        <div className="ui teal small header-item css-893sjf">
                          About Joblabs
                        </div>
                      </div>
                      <Link to="/terms-of-use" className="d-inline-block mr-3 link-footer">
                        TERMS OF USE
                      </Link>
                      <Link
                        to="/privacy-policy"
                        className="d-inline-block mr-3 link-footer"
                      >
                        PRIVACY POLICY
                      </Link>
                      <Link to="/faq" className="d-inline-block mr-3 link-footer">
                        FAQ
                      </Link>
                      <Link to="/contact" className="d-inline-block mr-3 link-footer">
                        CONTACT US
                      </Link>
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={3} md={6} lg={3}>
                    <div role="list" className="ui link relaxed list">
                      <div className="header-item-item">
                        <div className="ui teal small header-item css-893sjf">
                          Popular Jobs
                        </div>
                      </div>
                      <Link to="/terms-of-use" className="d-inline-block mr-3 link-footer">
                        TERMS OF USE
                      </Link>
                      <Link
                        to="/privacy-policy"
                        className="d-inline-block mr-3 link-footer"
                      >
                        PRIVACY POLICY
                      </Link>
                      <Link to="/faq" className="d-inline-block mr-3 link-footer">
                        FAQ
                      </Link>
                      <Link to="/contact" className="d-inline-block mr-3 link-footer">
                        CONTACT US
                      </Link>
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={3} md={6} lg={3}>
                    <div role="list" className="ui link relaxed list">
                      <div className="header-item-item">
                        <div className="ui teal small header-item css-893sjf">
                          Popular Locations
                        </div>
                      </div>
                      <Link to="/terms-of-use" className="d-inline-block mr-3 link-footer">
                        TERMS OF USE
                      </Link>
                      <Link
                        to="/privacy-policy"
                        className="d-inline-block mr-3 link-footer"
                      >
                        PRIVACY POLICY
                      </Link>
                      <Link to="/faq" className="d-inline-block mr-3 link-footer">
                        FAQ
                      </Link>
                      <Link to="/contact" className="d-inline-block mr-3 link-footer">
                        CONTACT US
                      </Link>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm>
                  <div className="ui teal small center aligned header-item css-1bcxy5f">
                    Join the conversation
                  </div>
                  <div className="css-1lgcwbb">
                    <Grid
                      container
                      spacing={1}
                      style={{ justifyContent: "center" }}
                    >
                      <Grid item>
                        <a
                          href="https://www.linkedin.com/company/jobslab"
                          target="_blank"
                          className="ui tiny circular icon button"
                          role="button"
                        >
                          {" "}
                          <i
                            aria-hidden="true"
                            className="sh-logo-fb-simple-1 icon"
                          />
                        </a>
                      </Grid>
                      <Grid item>
                        <a
                          href="https://twitter.com/snaphuntjobs/"
                          rel="noopener noreferrer"
                          target="_blank"
                          className="ui tiny circular icon button"
                          role="button"
                        >
                          <i
                            aria-hidden="true"
                            className="sh-logo-twitter-2 icon"
                          />
                        </a>
                      </Grid>
                      <Grid item>
                        <a
                          href="https://www.instagram.com/snaphuntjobs/"
                          rel="noopener noreferrer"
                          target="_blank"
                          className="ui tiny circular icon button"
                          role="button"
                        >
                          <i
                            aria-hidden="true"
                            className="sh-logo-instagram-2 icon"
                          />
                        </a>
                      </Grid>
                      <Grid item>
                        <a
                          href="https://www.linkedin.com/company/snaphunt/"
                          rel="noopener noreferrer"
                          target="_blank"
                          className="ui tiny circular icon button"
                          role="button"
                        >
                          <i
                            aria-hidden="true"
                            className="sh-logo-linkedin-2 icon"
                          />
                        </a>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        {/*<Button
          href="https://codecanyon.net/cart/configure_before_adding/20978545?license=regular&ref=phpbits&size=source&support=bundle_12month&_ga=2.172338659.1340179557.1515677375-467259501.1481606413"
          target="_blank"
          size="small"
          color="primary"
        ><IntlMessages id="eCommerce.buyNow"/></Button>*/}
      </footer>
    );
  }
}

export default Footer;
