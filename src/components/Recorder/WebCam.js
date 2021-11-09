import React, { Component } from 'react';

class Webcam extends Component {
  constructor(props) {
    super(props);
    this.videoTag = React.createRef();
  }

  componentDidMount() {
      const videoObj = this.videoTag.current;
      videoObj.srcObject = this.props.src;
      //videoObj.play();
      console.log(videoObj);
    }
    
  render() {
    return (
      <video className="recording-video" autoPlay="true" playsInline muted style={{"pointer-events":"none"}} ref={this.videoTag} />
    )
  }
}

export default Webcam;