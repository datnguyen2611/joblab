import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    mainHeader: {
      background: "#FFFFFF",
      paddingTop: 30,
    },

    headerTitle: {
      fontWeight: 600,
      fontSize: 32,
      color: "var(--purple-dark)",
      margin: 0,
      marginBottom: 5,
      width: 670,
      maxWidth: '100%',

      [theme.breakpoints.down("sm")]: {
        fontSize: 28,
      },
    },

    headerTitleDes: {
      fontSize: 18,
      color: "var(--purple-dark)",
      opacity: 0.9,
      margin: 0,
      paddingBottom: 30,

      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
      },
    },
  };
});

export default useStyles;
