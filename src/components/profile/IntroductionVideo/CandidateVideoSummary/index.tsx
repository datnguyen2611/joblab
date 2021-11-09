import React from "react";

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
import { TransitionProps } from "@material-ui/core/transitions/transition";

import GroupInput from "./GroupInput";
import ModalBeforeYouStart from "./ModalBeforeYouStart";
import useStyles from "./styles";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateVideoSummary = (props: any) => {
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

  return (
    <div className={styles.page}>
      <Button className="mt-5" variant="contained" onClick={handleClickOpen}>
        Introduction video
      </Button>

      <ModalBeforeYouStart
        handleClickCloseYouStart={handleClickCloseYouStart}
        openYouStart={openYouStart}
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
              onChangeValue={(value: string) => console.log(value)}
              uiHeader="1. EXPERIENCE"
              subTitleHeader="Cover your educational qualifications and experience in 1-2 sentences."
              subTitleDescription="E.g. My name is Kevin Chan and I am an investment banker with 11 years experience.&ensp;This includes 5 years covering China TMT and 6 years as part of the ECM team, covering IPO origination. "
            />

            <GroupInput
              defaultValue={""}
              onChangeValue={(value: string) => console.log(value)}
              uiHeader="2. SKILLS"
              subTitleHeader="Highlight any specialist skills you have acquired during the course of your experience."
              subTitleDescription="E.g. I am a CFA level 3 and I have a SFC type 1 and 4 RO licenses.&ensp;I have a strong knowledge of deal origination and execution background for IPO's in China."
            />

            <GroupInput
              defaultValue={""}
              onChangeValue={(value: string) => console.log(value)}
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
  );
};

export default CandidateVideoSummary;
