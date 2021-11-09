import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionConvert: {
      width: "640px",
      maxWidth: "100%",
      background: "#FFFFFF",
      borderRadius: 8,
      marginTop: 25,
      transition: "0.3s ease",

      [theme.breakpoints.down("xs")]: {
        marginTop: 10,
      },

      "&:hover": {
        boxShadow: "0 2px 4px rgb(0 0 0 / 8%)",
      },
    },

    title: {
      padding: 23,
      borderBottom: "1px solid var(--grey-light)",
      fontWeight: 600,
      fontSize: 18,
      color: "var(--purple-dark)",
      paddingBottom: 18,
    },

    contentSectionConvert: {
      padding: 24,
    },

    groupInputConvert: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },

      "&:first-child": {
        marginTop: 0,
      },
    },

    nameConvert: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--purple-dark)",
      paddingRight: 10,
      width: "calc(100% - 414px)",

      [theme.breakpoints.down("xs")]: {
        width: "calc(100%)",
        margin: "8px 25px",
      },
    },

    boxInputConvert: {
      fontSize: 14,
      position: "relative",
      width: 414,

      [theme.breakpoints.down("xs")]: {
        width: "calc(100%)",
      },
    },

    iconConvert: {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      alignItems: "center",
      color: "var(--purple)",
      fontSize: 16,
      fontWeight: 600,
      padding: "12px 0",
      height: 48,
      width: 43,
      marginLeft: 8,
    },

    inputConvert: {
      backgroundColor: "var(--grey-light)",
      border: "1px solid var(--grey-light)",
      width: "100%",
      borderRadius: 74,
      height: 48,
      marginRight: 22,
      fontSize: 16,
      appearance: "none",
      paddingLeft: 50,

      [theme.breakpoints.down("xs")]: {
        width: "calc(100%)",
        marginRight: 0,
        padding: '0px 24px',
        paddingLeft: 50,
      },

      "&::-webkit-outer-spin-button": {
        appearance: "none",
      },

      "&::-webkit-inner-spin-button": {
        appearance: "none",
      },

      "&:focus": {
        outline: 0,
        borderColor: "var(--purple)",
      },
    },
  };
});

export default useStyles;
