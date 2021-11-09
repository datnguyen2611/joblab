import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { captureUserMedia,stopCaptureUserMedia } from './MediaUtil';
import Webcam from './WebCam';
import RecordRTC from 'recordrtc';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlMessages from 'util/IntlMessages';
import * as notification from 'actions/Notification';
import {isIOS,isChrome} from "react-device-detect";
import ScaleLoader from "react-spinners/ScaleLoader";
import CountdownTimer from "components/CountdownTimer/index.js";

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);
                        
class Recorder extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      recordVideo: null,
      src: null,
      stream: null,
      isUploadSuccess: false,
      uploadVideo: false,
      uploadingVideo: false,
      recording: false,
      timeIsUp: false
    };
    
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.markUploadFailed = this.markUploadFailed.bind(this);
    this.getUploadLocation = this.getUploadLocation.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
    this.processRequest = this.processRequest.bind(this);
    this.stopRecordFromTimer = this.stopRecordFromTimer.bind(this);
  }
  
  componentDidMount() {
    
  }
 
 
  startRecord() {
    
    if(isIOS & isChrome) {
      notification.error("Your browser is not supported. Please try to record by Safari.");
      return true;
    }
    
    this.setState({ 
          recording: true
    });
    /*if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }*/
    // audio/webm
    // video/webm;codecs=vp9
    // video/webm;codecs=vp8
    // video/webm;codecs=h264
    // video/x-matroska;codecs=avc1
    // video/mpeg -- NOT supported by any browser, yet
    // video/mp4  -- NOT supported by any browser, yet
    // audio/wav
    // audio/ogg  -- ONLY Firefox
    var options = {
            type: 'video',
            mimeType: 'video/webm;codecs=h264'
        };
   
    navigator.mediaDevices.getUserMedia({ audio: true, video: true})
      .then(stream => {
        //this.setState({ src: stream }); 
        window.localStream = stream;
        //this.state.recordVideo = RecordRTC(stream, options); // { type: 'video' }
        this.setState({ 
          src: stream,
          recording: true,
          playback: false,
          playbackUrl: "",
          recordVideo: RecordRTC(stream, options)
        });
        this.state.recordVideo.startRecording();
      })
      .catch(error => {
            notification.error("Please enable your webcam/ microphone for recording video.");
            this.setState({ 
              src: null, 
              recording: false,
              playback: false,
              playbackUrl: "",
              playbackBlob: null,
              recordVideo: null
            });
      });
  }
  
  stopRecord() { 
    this.state.recordVideo.stopRecording((videoUrl) => {

      var fileBlob = this.state.recordVideo.blob;
      //console.log(URL.createObjectURL(fileBlob));

      this.setState(
      { 
        src: null, 
        recording: false,
        playback: true,
        playbackUrl: URL.createObjectURL(fileBlob),
        playbackBlob: fileBlob
      });
      stopCaptureUserMedia(window.localStream);
    });
  }
  
  
  stopRecordFromTimer() {
    this.stopRecord();
    this.setState(
      { 
        timeIsUp: true
      });
  }
  
  markUploadFailed() {
    this.setState({ 
      uploadingVideo: false 
    });
    notification.error("Failed to submit the video. Please try again.");
  }
  
  getUploadLocation() {
    this.setState({ 
          uploadVideo: false,
          uploadingVideo: true
    });
    var data = {videoId : this.props.videoId};
    axios.post(this.props.videoUploadUrl, data, {
       onUploadProgress: data => {
         //Set the progress value to show the progress bar
         console.log(Math.round((100 * data.loaded) / data.total))
       },
     })
      .then(res => {
        if (res && res.status == 200 && res.data.isSuccess) {
          this.uploadVideo(res.data.url, res.data.fileName);
        }
        else {
          this.markUploadFailed();
        }
      })
      .catch(error => {
        this.markUploadFailed();
      });
  }
  
  uploadVideo(requestUrl, requestFileName) {
      var fileBlob = this.state.playbackBlob;
      var reader = new FileReader();
      reader.readAsArrayBuffer(fileBlob);
      reader.onloadend = (event) => {
         axios({
          method: 'put',
          url: requestUrl,
          data: reader.result
          })
          .then(res => {
            if (res && res.status == 200) {
              this.processRequest();
            }
            else {
              this.markUploadFailed();
            }
          })
          .catch(error => {
            console.log(error);
            this.markUploadFailed();
          });
      }
  }
  
  processRequest() {
     var data = {videoId : this.props.videoId};
     axios.post(this.props.processRequestUrl, data, {
       onUploadProgress: data => {
         //Set the progress value to show the progress bar
         console.log(Math.round((100 * data.loaded) / data.total))
       },
     })
      .then(res => {
        if (res && res.status == 200 && res.data.isSuccess) {
          this.setState({ 
            isUploadSuccess: true, 
            uploadingVideo: false 
          });
        }
        else {
          this.markUploadFailed();
        }
      })
      .catch(error => {
        this.markUploadFailed();
      });
  }
  
   render() {
     const {src, playback, playbackUrl, recording, uploadVideo, uploadingVideo, timeIsUp, isUploadSuccess} = this.state;
     const {buttonClass, timeLimitSec} = this.props;
    return(
      <div>
       {
         timeLimitSec != null ?
           <CountdownTimer timeLimitSec={timeLimitSec} timerState={recording ? "START" : "RESET"} callbackFunc={this.stopRecordFromTimer} />
         : null
       }
       
       {/* <Modal show={this.state.uploadSuccess}><Modal.Body>Upload success!</Modal.Body></Modal>*/}
        <div>
          {src ? <Webcam src={src}/> : ''}
          {playback ? <video className="recording-video" controls controlsList="nodownload" src={playbackUrl}/> : ''}
        </div>
        {
         recording ?
         <Button disabled={!recording} variant="contained" color="primary" className={buttonClass || "jr-btn recording-video-btn"} onClick={() => { this.stopRecord() }}>
                        <font size=""><i className="fas fa-video-slash mr-2"/></font>
                        Stop Recording
         </Button>
         
         :<Button disabled={recording} variant="contained" color="primary" className={buttonClass || "jr-btn recording-video-btn"} onClick={() => { this.startRecord() }}>
                        <font size=""><i className="fas fa-video mr-2"/></font>
                        Start Recording
          </Button>
        }
        <Button disabled={!playback} variant="contained" color="primary" className={buttonClass || "jr-btn recording-video-btn"} onClick={() => this.setState({ uploadVideo: true })}>
                        <font size=""><i className="far fa-check-circle mr-2"/></font>
                        Submit Video
        </Button>
        <SweetAlert show={uploadVideo}
                    warning
                    showCancel
                    confirmBtnText={"Yes, Submit It!"/*<IntlMessages id="sweetAlerts.yesDeleteIt"/>*/}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                    onConfirm={this.getUploadLocation}
                    onCancel={() => this.setState({ uploadVideo: false, uploadingVideo: false })}
        >
          <IntlMessages id="sweetAlerts.youWillNotAble"/>
        </SweetAlert>
        <SweetAlert 
            show={uploadingVideo}
            title="Uploading the video......" 
            onConfirm={this.onConfirm} 
            onCancel={this.onCancel}
            customButtons={
              <React.Fragment>
              </React.Fragment>
            }
        >
          <div style={{height:'30px'}}> 
             <ScaleLoader color={"#00bcd4"} loading={uploadingVideo} size={50} />
          </div>
        </SweetAlert>
        <SweetAlert show={isUploadSuccess} success title={"Congratulations!"/*<IntlMessages id="sweetAlerts.goodJob"/>*/}
                    onConfirm={ () => this.setState({ isUploadSuccess: false }, ()=>{ this.props.finishedSubmission()}) }>
          Your video has been submitted successfully.
          {/*<IntlMessages id="sweetAlerts.btnClicked"/>*/}
        </SweetAlert>
        <SweetAlert show={timeIsUp}
                    warning
                    confirmBtnText={"Got It!"}
                    confirmBtnBsStyle="danger"
                    title={"Time is up. Please submit your video."}
                    onConfirm={() => this.setState({ timeIsUp: false })}
        >
        </SweetAlert>
      </div>
    )
  }
}

export default withRouter(Recorder);

