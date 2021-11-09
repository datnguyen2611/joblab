import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    page: {
      "& *": {
        boxSizing: "content-box",
      },
    },

    appBar: {
      position: "relative",
      backgroundColor: "#00bcd4",
    },

    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },

    candidateProfileVideoSummaryForm: {},

    formTitle: {
      fontSize: 24,
      color: "#000",
      marginBottom: 5,
    },

    formCaption: {
      fontSize: 14,
      marginBottom: 30,
      color: "#000",
      lineHeight: "20px",
    },

    desFormBottom: {
      marginTop: 10,
      marginBottom: 30,
      fontSize: 12,
      lineHeight: "22px",
    },

    btnStartRecording: {
      backgroundColor: "#ff0021",
      color: "#fff",
      textShadow: "none",
      boxShadow: "inset 0 0 0 0 rgb(34 36 38 / 15%)",
      minHeight: 36,
      minWidth: 136,
      textTransform: "inherit",
      fontFamily: "Roboto-Bold",

      "&:hover": {
        backgroundColor: "#ff0021",
      },
    },
  };
});

export default useStyles;
