import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import CountdownStart from "../CountdownStart";
import useStyles from "./styles";
import ComponentVideo from "../ComponentVideo/index.js";
import { WEB_IMAGE_URL, WEB_VIDEO_URL } from 'constants/PictureUrl';

const timeLeftCountDown = 3;
const instructionsDef = [
  "Dress the way you would for an interview.",
  "Record in front of a plain background.",
  "Choose a quiet place to avoid background noise.",
  "Speak slowly and clearly.",
  "Ensure your recording is less than 3 minutes long.",
];

const ModalBeforeYouStart = (props: any) => {
  const styles = useStyles();
  const { handleClickCloseYouStart, openYouStart, handleClose } = props;
  const [instructions] = useState(instructionsDef);
  const [secondsCountDown, setSecondsCountDown] = useState(timeLeftCountDown);
  const [stepRecording, setStepRecording] = useState(0);

  useEffect(() => {
    if (stepRecording === 1) {
      if (secondsCountDown > 0) {
        setTimeout(() => setSecondsCountDown(secondsCountDown - 1), 1000);
      } else {
        setSecondsCountDown(0);
        setTimeout(() => setStepRecording(2), 1000);
      }
    } else if (stepRecording === 2) {
      
    }
  }, [secondsCountDown, stepRecording]);

  useEffect(() => {
    if (openYouStart) {
      setStepRecording(0);
    }
  }, [openYouStart]);

  const onStartRecording = () => {
    setStepRecording(1);
    setSecondsCountDown(timeLeftCountDown);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"xl"}
      aria-labelledby="max-width-dialog-title"
      open={openYouStart}
      className={styles.modalBeforeYouStart}
    >
      <div className={styles.closeModal} onClick={handleClickCloseYouStart}>
        <div className={styles.iconClose}>
          <img src={encodeURI(WEB_IMAGE_URL+"candidate/profile/icon-close.svg")} alt="" />
        </div>
        <span>Quit</span>
      </div>

      <DialogContent dividers className={styles.dialogContentBeforeYouStart}>
        {stepRecording === 0 && (
          <>
            <div className={styles.instructionHeader}>
              <div className={styles.instructionIconHolder}>
                <img src={encodeURI(WEB_IMAGE_URL+"candidate/profile/41_active.svg")} alt="" />
              </div>
              <div className={styles.instructionTextHeader}>
                Before You Start
              </div>
            </div>
            <div className={styles.instructionInformationHolder}>
              <div className={styles.listInstructions}>
                {instructions?.map((item, index) => {
                  return (
                    <div
                      className={styles.instructionInformationText}
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>

              <div className={styles.videoFunctionalityHolder}>
                <Button className={styles.btnStart} onClick={onStartRecording}>
                  <div className={styles.startRecordButtonIcon}></div>Start
                </Button>
              </div>
            </div>
          </>
        )}

        {stepRecording === 1 && (
          <div className={styles.stepRecording2}>
            <CountdownStart
              timeLeft={timeLeftCountDown}
              timeLeftDown={secondsCountDown}
            />

            <img src={encodeURI(WEB_IMAGE_URL+"candidate/profile/Mask.svg")} alt="" />
          </div>
        )}

        {(stepRecording === 1 || stepRecording === 2) && (
          <>
           /* <ComponentVideo onRecordAgain={() => setStepRecording(0)} 
            closeVideoPopup={() => handleClickCloseYouStart()}
            onUploadFinish={() => handleClose()}
            videoId={''} 
            videoUploadUrl={'/api/users/profile/video/getUrl'} 
            processRequestUrl={'/api/users/profile/video/process'}/>*/
            <ComponentVideo stepRecording={stepRecording} onRecordAgain={() => setStepRecording(0)}/>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalBeforeYouStart;
