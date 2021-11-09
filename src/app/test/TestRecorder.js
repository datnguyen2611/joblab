import React, { Component } from 'react';

import Recorder from 'components/Recorder';

class TestRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {  

    };
  }
  
  render() {
    return (
      <div>
        <Recorder />
      </div>
    );
  }
}

export default TestRecorder;