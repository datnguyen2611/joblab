import React, { useState, useRef, useEffect } from "react";
import { Button } from "@material-ui/core";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import useStyles from "./styles";
import { WEB_IMAGE_URL, WEB_VIDEO_URL } from 'constants/PictureUrl';
import { stopCaptureUserMedia } from 'util/MediaUtil';
import axios from 'axios';
import * as notification from 'actions/Notification';
const ComponentVideo = (props) => {
  const styles = useStyles();
  const { videoId, videoUploadUrl, processRequestUrl, onRecordAgain, stepRecording, closeVideoPopup, onUploadFinish } = props;
  const [showButtonStop, setShowButtonStop] = useState(false);
  const [blob, setBlob] = useState(false);
  const [timer, setTimer] = useState(0);
  const [stream, setStream] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);

  useEffect(() => {
    handleRecording();
  }, [stepRecording]);

  const handleRecording = async () => {
    /*const mediaStream = await navigator?.mediaDevices?.getDisplayMedia({
      video: {
        width: 568,
        height: 420,
        frameRate: 30,
      },
      audio: true,
    });*/
    
    try {
        /*const mediaStream = await navigator?.mediaDevices?.getUserMedia({
          video: {
            width: 568,
            height: 420,
            frameRate: 30,
          },
          audio: true,
        });
        setStream(mediaStream);
        recorderRef.current = new RecordRTC(mediaStream, { type: "video" });*/
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(cameraStream);
        recorderRef.current = new RecordRTC(cameraStream, { type: "video" });
        recorderRef.current.startRecording();
    } catch (e) {
        notification.error("Please enable your webcam/ microphone for recording video.");
        closeVideoPopup();
    }
  };

  const handleStop = () => {
    setShowButtonStop(false);
    refVideo.current.srcObject = null;
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
      stopCaptureUserMedia(stream);
    });
  };

  const handleSave = () => {
    // download video to local
    //invokeSaveAsDialog(blob); 
    // Here is the action call API to send data
    toast.success("Your video is uploaded and under process. We will inform you once the video processing job is completed");
    console.log('Call API')
    getUploadLocation(blob);    

  };

  
  var getUploadLocation = (blob) => {
      var data = {videoId : videoId};
      axios.post(videoUploadUrl, data, {
         onUploadProgress: data => {
           //Set the progress value to show the progress bar
           console.log(Math.round((100 * data.loaded) / data.total))
         },
       })
        .then(res => {
          if (res && res.status == 200 && res.data.isSuccess) {
            uploadVideo(res.data.url, res.data.fileName, blob);
          }
          else {
            markUploadFailed();
          }
        })
        .catch(error => {
          markUploadFailed();
        });
  }
    
  var uploadVideo = (requestUrl, requestFileName, fileBlob) => {
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
              processRequest();
            }
            else {
              markUploadFailed();
            }
          })
          .catch(error => {
            console.log(error);
            markUploadFailed();
          });
      }
  }
  
  var processRequest = () => {
     var data = {videoId : videoId};
     axios.post(processRequestUrl, data, {
       onUploadProgress: data => {
         //Set the progress value to show the progress bar
         console.log(Math.round((100 * data.loaded) / data.total))
       },
     })
      .then(res => {
        if (res && res.status == 200 && res.data.isSuccess) {
          markUploadSuccess();
          /*this.setState({ 
            isUploadSuccess: true, 
            uploadingVideo: false 
          });*/
        }
        else {
          markUploadFailed();
        }
      })
      .catch(error => {
        markUploadFailed();
      });
  }
  
  var markUploadSuccess = () => {
    notification.success("Successfully submitted the video.");
    closeVideoPopup();
    onUploadFinish();
  }
  
  var markUploadFailed = () => {
    notification.error("Failed to submit the video. Please try again.");
  }
  
  useEffect(() => {
    /*if (!refVideo.current) {
      return;
    }*/
    refVideo.current.srcObject = stream;
  }, [stream, refVideo]);

  useEffect(() => {
    if (!!stream) {
      setShowButtonStop(true);
    } else {
      setShowButtonStop(false);
    }
  }, [stream]);

  useEffect(() => {
    if (!!showButtonStop) {
      setTimeout(() => setTimer(timer + 1), 1000);
    } else {
      setTimer(0);
    }
  }, [showButtonStop, timer]);

  const secondsToMinute = (value) => {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
  };

  return (
    <div className={styles.boxVideo}>
      <div className={styles.video}>
        {/*blob && (
          <>
            <video
              src={URL.createObjectURL(blob)}
              controls
              autoPlay
              ref={refVideo}
              style={{ width: "100%", height: "100%" }}
            />
          </>
        )*/}
        {blob ? 
          <video
            src={URL.createObjectURL(blob)}
            controls
            autoPlay
            ref={refVideo}
            style={{ width: "100%", maxWidth: '100%', height: "100%" }}
          />
          :
          <video
            controls
            autoPlay
            ref={refVideo}
            style={{ width: "100%", maxWidth: '100%', height: "100%" }}
          />
        }
      </div>

      {!!showButtonStop && (
        <div className={styles.groupBtnDone}>
          <div className={styles.timer}>
            <div className={styles.timerIndicatorHolder}>
              <img src={encodeURI(WEB_IMAGE_URL+"candidate/profile/videoBlue.svg")} alt="" />
            </div>
            <div className={styles.timerTimeShow}>{secondsToMinute(timer)}</div>
          </div>
          <Button onClick={handleStop} className={styles.endRecordButton}>
            <div className={styles.endRecordButtonIcon}></div>
            Done
          </Button>
        </div>
      )}

      {blob && 
        <div className={styles.groupBtnDone}>
          <Button onClick={onRecordAgain} className={styles.btnRecordAgain}>Record Again</Button>
          <Button onClick={handleSave} className={styles.btnSave}>save</Button>
        </div>
      }

      {!!showButtonStop && (
        <ul className={styles.questions}>
           <li>Questions 1</li> 
           <li>Questions 2</li> 
           <li>Questions 3</li>
        </ul>
      )}
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ComponentVideo;
