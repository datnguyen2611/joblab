import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';

class Footer extends Component {
  render() {
    return (
       <footer className="app-footer">
       <div className="footer-left">
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
      </div>

        {/*<Button
          href="https://codecanyon.net/cart/configure_before_adding/20978545?license=regular&ref=phpbits&size=source&support=bundle_12month&_ga=2.172338659.1340179557.1515677375-467259501.1481606413"
          target="_blank"
          size="small"
          color="primary"
        ><IntlMessages id="eCommerce.buyNow"/></Button>*/}
      </footer>
    )
  }
}

export default Footer;