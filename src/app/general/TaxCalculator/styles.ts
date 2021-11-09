import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    bodyPageTaxCalculator: {
      position: "relative",
      background: "#F6F6F9",
      paddingBottom: 55,
      minHeight: "100vh",
    },

    loadingModal: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },

    circularProgress: {
      outline: 'none',
    }
  };
});

export default useStyles;
