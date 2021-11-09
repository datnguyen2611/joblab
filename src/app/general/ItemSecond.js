import React from 'react';
import { Link } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import Fade from 'react-reveal/Fade';

const
  PriceItem = ({styleName, headerStyle, itemStyle, footerStyle}) => {
    return (
      <div className={`${styleName}`}>

        <Fade duration={2000} bottom>
        <div className={`${headerStyle}`}>
          {/*<span className="price employer">18% <i>per hire</i></span>
          <h4 className="letter-spacing-base text-uppercase mb-0">Premium</h4>*/}
          <span className="price employer text-uppercase">Premium</span>
        </div>

        <ul className={`package-items ${itemStyle} employer`}>
          {/*<li>
            <i class="la la-check-circle"></i>
            <span>12% per junior hire</span>
          </li>*/}
          <li>
            <i class="la la-check-circle"></i>
            <span>Dedicated account manager</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>Priority support</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>Download applicant data</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>Enhanced digital marketing</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>Enhanced candidate rewards</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>Enhanced network rewards</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>Enhanced data access</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>24 months interview logs</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>Customized research reports</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>6 days a week support</span>
          </li>
          <li>
            <i class="la la-check-circle"></i>
            <span>5 months guarantee</span>
          </li>
        </ul>

        <div className="package-footer">
          <Link to="/employer/register" className={`jr-link ${footerStyle}`}>Register</Link>
        </div>
        </Fade>
      </div>
    )
  };

export default PriceItem;

