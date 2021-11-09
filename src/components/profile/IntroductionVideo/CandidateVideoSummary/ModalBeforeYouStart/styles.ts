import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    modalBeforeYouStart: {
      "& .MuiDialog-paper": {
        background: "transparent",
        boxShadow: "none",
        maxHeight: "100vh",
      },
    },

    closeModal: {
      position: "fixed",
      top: 40,
      right: 40,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 45,
      cursor: "pointer",
      fontSize: 8,
      fontFamily: "Roboto-Bold",
      color: "#fff",
      opacity: 0.5,
    },

    iconClose: {
      backgroundColor: "rgba(144, 143, 143, 0.7)",
      height: 45,
      width: " 100%",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,

      "& img": {
        width: "50%",
      },
    },

    dialogContentBeforeYouStart: {
      border: "none",
    },

    instructionHeader: {
      width: "auto",
      height: "auto",
      marginBottom: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    instructionIconHolder: {
      width: 45,
      height: 45,

      "& img": {
        width: "100%",
        height: "100%",
      },
    },

    instructionTextHeader: {
      fontSize: 18,
      color: "#fff",
      fontFamily: "Roboto-Bold",
      marginTop: 15,
      textShadow: "0 0 5px #000",
    },

    instructionInformationHolder: {
      position: "relative",
      width: 800,
      margin: "auto",
      maxWidth: "100%",
      background: "rgba(0,0,0,.7)",
      height: 434,
      display: "flex",
      alignItems: "center",
    },

    listInstructions: {
      display: "flex",
      flexDirection: "column",
      width: 560,
      maxWidth: "94%",
      margin: "auto",
    },

    instructionInformationText: {
      width: "100%",
      display: "flex",
      justifyContent: "left",
      fontSize: 14,
      color: "#fff",
      paddingLeft: 25,
      lineHeight: "22px",
      marginBottom: 15,
      background: "url(/images/4w.svg) no-repeat",
      backgroundPosition: "0 4px",
      backgroundSize: "auto 15px",
      [theme.breakpoints.down('sm')]: {
        fontSize: 10,
      },
    },

    videoFunctionalityHolder: {
      width: "100%",
      height: "auto",
      display: "flex",
      position: "absolute",
      left: 0,
      bottom: 20,
      zIndex: 10,
      padding: " 0 20px",
      justifyContent: "center",
    },

    startRecordButtonIcon: {
      width: 20,
      height: 20,
      border: "1px solid #fff",
      borderRadius: "50%",
      position: "relative",
      marginRight: 8,
      "&:before": {
        content: '""',
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#fff",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
      },
    },

    btnStart: {
      width: 75,
      height: 35,
      cursor: "pointer",
      background: "#ff0021",
      borderRadius: 2.5,
      color: "#fff",
      fontSize: 10.7,
      fontFamily: "Roboto-Bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textTransform: "inherit",

      "&:hover": {
        background: "#ff0021",
      }
    },

    stepRecording2: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      width: "100%",
      left: 0,

      "& img": {
        marginTop: 100,
        width: 300,
        maxWidth: "100%",
        [theme.breakpoints.down('sm')]: {
          width: "auto",
          height: "calc(75vw - 30px)",
          maxHeight: 300,
        },
      }
    }
  };
});

export default useStyles;
