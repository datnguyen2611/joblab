import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    formViewSwitcher: {
      width: "100%",
      maxWidth: 900,
      height: "auto",
      borderRadius: 5,
    },

    uiHeader: {
      fontSize: 13,
      fontFamily: "Roboto-Bold",
      lineHeight: "16px",
      color: "rgba(0,0,0,.87)",
      marginBottom: 16,
    },

    formElements: {
      border: "1px solid #e5e5e5",
      marginBottom: 20,
    },

    containerDescription: {
      width: "100%",
      height: "auto",
      padding: "15px 20px",
      borderBottom: "1px solid #e5e5e5",
    },

    subTitleHeader: {
      color: "#000",
      fontFamily: "Roboto-Bold",
      fontSize: "10pt",
      marginBottom: 5,
    },

    subTitleDescription: {
      color: "#000",
      fontWeight: 400,
      fontSize: "10pt",
    },

    containerTextArea: {
      height: "auto",
      width: "100%",
    },

    textAreaInput: {
      width: "100%",
      resize: "none",
      outline: "none",
      height: 150,
      border: "none",
      borderRadius: 5,
      padding: 20,
      position: "relative",
      fontWeight: 500,
    },
  };
});

export default useStyles;
