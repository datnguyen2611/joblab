import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    boxVideo: {
      width: 800,
      height: "calc(434px + 20px + 70px)",
      maxWidth: "100%",
      display: "flex",
      flexWrap: "wrap",
      margin: "auto",
      maxHeight: "calc(75vw - 30px)",
      marginTop: 110,
      [theme.breakpoints.down('sm')]: {
        padding: "0 0px",
        height: "calc(75vw - 30px)",
      },
    },

    video: {
      width: "100%",
      height: "calc(100% - 70px)",
    },

    endRecordButton: {
      width: 75,
      height: 35,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10.7,
      fontFamily: "Roboto-Bold",
      color: "#fff",
      cursor: "pointer",
      background: "rgba(0,0,0,.6)",
      borderRadius: 2.5,

      "&:hover": {
        background: "rgba(0,0,0,.6)",
      },
    },

    endRecordButtonIcon: {
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
        background: "#ff6c5f",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
      },
    },

    timer: {
      minWidth: 75,
      height: 35,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      flexDirection: "column",
      flexShrink: 0,
      background: "rgba(0,0,0,.4)",
      borderRadius: 2.5,
    },

    timerIndicatorHolder: {
      width: 19,
      height: 19,
      backgroundPosition: 50,
      "& img": {
        width: "100%",
        height: "100%",
      },
    },

    timerTimeShow: {
      color: "#fff",
      fontSize: 10.7,
      fontFamily: "Roboto-Bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    groupBtnDone: {
      marginTop: 20,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
    },

    btnRecordAgain: {
      color: "#fff",
      fontWeight: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      transition: ".3s",
      position: "relative",
      padding: 0,
      height: 50,
      width: 160,
      borderRadius: 3,
      backgroundColor: "rgb(45, 222, 152)",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: "rgb(45, 222, 152)",
      },
    },

    btnSave: {
      color: "#fff",
      fontWeight: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      transition: ".3s",
      position: "relative",
      padding: 0,
      height: 50,
      width: 160,
      borderRadius: 3,
      backgroundColor: "rgb(28, 199, 208)",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: "rgb(28, 199, 208)",
      },
    },

    questions: {
      position: "fixed",
      bottom: 100,
      left: "15px",
      padding: 0,
      fontSize: "13px",
      color: "#FFF",
      listStyle: "none",
      lineHeight: "22px",
      fontFamily: "Roboto-Bold",
      display: "flex",
      flexDirection: "column",

      [theme.breakpoints.down('sm')]: {
        left: "15px",
        bottom: 10,
      },

      "& li": {
        marginBottom: 5,
      },
    },
  };
});

export default useStyles;
