import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Widget from "components/Widget";
import CircularProgress from '@material-ui/core/CircularProgress';
//import IconButton from '@material-ui/core/IconButton'
//import WidgetHeader from "components/WidgetHeader/index";
//import Button from '@material-ui/core/Button';
import {
  Button,
  Dialog,
  DialogContent,
  Slide,
  IconButton,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ReactTooltip from "react-tooltip";

import Recorder from 'components/Recorder';

import { WEB_IMAGE_URL } from 'constants/PictureUrl';

import GroupInput from "./CandidateVideoSummary/GroupInput";
import ModalBeforeYouStart from "./CandidateVideoSummary/ModalBeforeYouStart";
import useStyles from "./CandidateVideoSummary/styles";

const Transition = React.forwardRef(function Transition(
  props/*: TransitionProps & { children?: React.ReactElement<any, any> }*/,
  ref/*: React.Ref<unknown>*/
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function IntroductionVideo(props) {
  
  const [videoUrl, setVideoUrl] = useState("");
  const [userRole, setUserRole] = useState(props.userRole);
  const [isEdit, setIsEdit] = useState(false);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [isVideoProcessed, setIsVideoProcessed] = useState(false);
  const [loader, setLoader] = useState(true);
  
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openYouStart, setOpenYouStart] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenYouStart = () => {
    setOpenYouStart(true);
  };

  const handleClickCloseYouStart = () => {
    setOpenYouStart(false);
  };
  
  useEffect(() => {
    getVideo();
  },[setVideoUrl, setIsVideoProcessed]);
  
  var getVideo = () => {
    var token = props.token;
    axios.get('/api/users/get/encrypted/introduction/video/'+token)
    .then(res => {
      console.log(res.data)
      if (res.data.isSuccess) {
        setVideoUrl(res.data.videoUrl);
        setIsVideoUploaded(res.data.isUploaded);
        setIsVideoProcessed(res.data.isProcessed);
      }
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(() => { setLoader(false) });
  }
  
  var finishedSubmission = () => {
    setIsEdit(false);
    getVideo();
  }
  
  return (
    <div className="jr-entry-sec">
        <Widget styleName="jr-card-profile">
          <div className="d-flex">
            <h3 className="card-title mr-auto mb-1 mb-md-3">
              <div class="mr-2" style={{'display' : 'inline-block'}}>
                Introduction Video
              </div>
              <div style={{'display' : 'inline-block'}} data-tip="Do you feel like your CV is being overlooked for top jobs? <br />
                Do you feel like you’ve more to offer than what’s written in your CV? <br />
                Get your message across directly by leveraging our asynchronous video platform. <br />
                It’ll help reduce bias that often leads to a CV or application ignored and <br />
                is 3 times more likely to lead to a career match.">
                <font size=""><i style={{'color': '#00bcd4'}} className="fas fa-exclamation-circle"/></font>
              </div>
            </h3>
            
            
            <ReactTooltip 
              effect={"solid"}
              multiline={true}
              place={"top"}
              className={"intro-tooltip"}
            />
            <IconButton className="icon-btn text-dark mt-n2 mr-n2" onClick={handleClickOpen}>
              <i class="zmdi zmdi-edit"/>
            </IconButton>
            {/*{ (userRole=="candidate" ) && (
              isEdit ? 
                <IconButton className="icon-btn text-dark mt-n2 mr-n2" onClick={() => setIsEdit(false)}>
                  <i class="zmdi zmdi-mail-reply"/>
                </IconButton>
              :
                <IconButton className="icon-btn text-dark mt-n2 mr-n2" onClick={() => setIsEdit(true)}>
                  <i class="zmdi zmdi-edit"/>
                </IconButton>
              )
            }*/}
          </div>
          {
          loader ?
            <div className="loader-view">
              <CircularProgress/>
            </div> : 
            <div style={{'text-align':'center'}}>
              { isEdit==false &&
                (
                   isVideoUploaded==false ? (
                     <div className="recording-video-img-container">
                      <img src={encodeURI(WEB_IMAGE_URL+"candidate/interview/video_interview.png")} />
                     </div>
                   )
                  : (
                    isVideoProcessed==false ? (
                      <div className="recording-video-img-container">
                        <img src={encodeURI(WEB_IMAGE_URL+"candidate/interview/video_process.png")} />
                        <p>We are processing the video.</p>
                        <p>Please come back and check later.</p>
                      </div>
                    ) :
                    (
                     <div className="recording-video-img-container">
                       <video className="recording-video" controls controlsList="nodownload" src={videoUrl}/>
                     </div>
                    )
                  )
                )
              }
              
              {/*
                isEdit==true &&
                  userRole=="candidate" && 
                  <Recorder timeLimitSec={180}
                            getVideo={getVideo} 
                            finishedSubmission={finishedSubmission}
                            videoUploadUrl={'/api/users/profile/video/getUrl'}
                            processRequestUrl={'/api/users/profile/video/process'}
                            videoId={""}
                            buttonClass={"jr-btn introduction-recording-video-btn"}
                  />
              */}
            </div>
          }
          
      
        </Widget>
        
        <ModalBeforeYouStart
        handleClickCloseYouStart={handleClickCloseYouStart}
        openYouStart={openYouStart}
        handleClose={handleClose}
      />

      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <AppBar className={styles.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <div className={styles.candidateProfileVideoSummaryForm}>
            <div className={styles.formTitle}>
              A Video Introduction increases your chances of being shortlisted
            </div>
            <div className={styles.formCaption}>
              Summarize your experience using the three sections below.&ensp;Fill
              each section based on our examples & advice before you start
              recording.&ensp;Your text will appear on a teleprompter during recording.
            </div>

            <GroupInput
              defaultValue={""}
              onChangeValue={(value/*: string*/) => console.log(value)}
              uiHeader="1. EXPERIENCE"
              subTitleHeader="Cover your educational qualifications and experience in 1-2 sentences."
              subTitleDescription="E.g. My name is Kevin Chan and I am an investment banker with 11 years experience.&ensp;This includes 5 years covering China TMT and 6 years as part of the ECM team, covering IPO origination. "
            />

            <GroupInput
              defaultValue={""}
              onChangeValue={(value/*: string*/) => console.log(value)}
              uiHeader="2. SKILLS"
              subTitleHeader="Highlight any specialist skills you have acquired during the course of your experience."
              subTitleDescription="E.g. I am a CFA level 3 and I have a SFC type 1 and 4 RO licenses.&ensp;I have a strong knowledge of deal origination and execution background for IPO's in China."
            />

            <GroupInput
              defaultValue={""}
              onChangeValue={(value/*: string*/) => console.log(value)}
              uiHeader="3. ACHIEVEMENTS"
              subTitleHeader="Highlight what makes you stand out from your peer group."
              subTitleDescription="E.g. Fundamental knowledge of China TMT.&ensp;I am also the hiring champion for my team.&ensp;I have native level Mandarin and English."
            />

            <div className={styles.desFormBottom}>
              This Video Introduction will be added to your JobsLab profile
              page, which can be edited on your dashboard any time.
              <br />
              If you record a new Video Introduction, your profile page will be
              automatically updated with your new video.
            </div>

            <Button
              variant="contained"
              onClick={() => handleClickOpenYouStart()}
              className={styles.btnStartRecording}
            >
              Start recording
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      </div>
  )
};
