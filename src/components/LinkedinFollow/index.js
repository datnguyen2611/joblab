import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class LinkedinFollow extends Component {
  constructor(props) {
    super(props);
  }
  

   render() {
    return (
      <div className='linkedin-follow-btn'>
        <iframe 
            id="linkedinFollowBtn"
            src="https://www.linkedin.com/pages-extensions/FollowCompany?id=31128411&amp;"
            className="IN-widget IN-widget--iframe" 
            scrolling="no" 
            allowtransparency="true" 
            frameborder="0" 
            border="0" 
            width="1" 
            height="1" 
          >
        </iframe>
     </div>
    )
  }
}

export default withRouter(LinkedinFollow);

