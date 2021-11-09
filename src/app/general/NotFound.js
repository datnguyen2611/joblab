import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';

class NotFound extends Component {
  componentDidMount() {
    //this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);
  }

  render() {
    return (
      <div className="app-wrapper termsofuse">
        <Helmet>
              <title>404 Not Found | JobsLab</title>
        </Helmet>
        <div className="termsofuse-imgcontainer faq">
          <div className="termsofuse-wordcontainer">
            <h3>404 Not Found</h3>
          </div>
          <div className="color-overlay termsofuse"></div>
          <img src={encodeURI(WEB_IMAGE_URL+"faq/Canva+-+Office+desk+(1).jpg")}/>
        </div>
      </div>
    )
  }
}

export default NotFound;