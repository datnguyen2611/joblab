import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Widget from "components/Widget";
import Recorder from 'components/Recorder';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';


class InterviewVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {activeIndex: 0, competitiveness: 70};
  }
  
  finishedSubmission = () => {
    window.location.reload();
  }
  
  render() {
    const {userType, title, timeLimit, videoUrl, inVideoId, isUploaded, isProcessed, isValid} = this.props;
    const {getInVideo} = this.props;
    return (
      <div className="jr-entry-sec">
        <Widget styleName="jr-card-profile">
          <div className="d-flex">
            <h3 className="card-title">{title || "Interview Video"}</h3>
          </div>
          <div>
            {
              ((userType!="candidate" && isUploaded != true) ||  (userType =="candidate" && isValid == false && isUploaded == false)) && 
               <div className="recording-video-img-container">
                <img src={encodeURI(WEB_IMAGE_URL+"candidate/interview/video_interview.png")} />
               </div>
            }
            <div style={{'text-align':'center'}}>
              {
                (isUploaded == true && isProcessed != true) && 
                <div className="recording-video-img-container">
                  <img src={encodeURI(WEB_IMAGE_URL+"candidate/interview/video_process.png")} />
                  <p>We are processing the video.</p>
                  <p>Please come back and check later.</p>
                </div>
              }
              {
                (isUploaded == true && isProcessed == true && videoUrl != null) && 
                <video className="recording-video" controls controlsList="nodownload" src={videoUrl}/>
              }
              
              {
                (userType=="candidate" && isUploaded == false && isValid == true) && 
                 <Recorder getVideo={getInVideo} 
                           finishedSubmission={getInVideo}
                           videoId={inVideoId} 
                           timeLimitSec={Number.isInteger(timeLimit) ? timeLimit * 60 : null}
                           videoUploadUrl={'/api/candidates/interview/video/getUrl'}
                           processRequestUrl={'/api/candidates/interview/video/process'}
                           buttonClass={"jr-btn recording-video-btn"} />
              }
            </div>
          </div>
        </Widget>
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { userType } = state.auth;
  return { userType };
}

export default withRouter(connect(mapStateToProps, null)(InterviewVideo));