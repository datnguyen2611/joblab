import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionSearch: {
      display: "flex",
      backgroundColor: "white"
    },

    formSearch: {
      display: "flex",
      alignItems: "flex-end",
      position: "relative",
      paddingBottom: 15,
      flexWrap: "wrap",
    },

    iconMainHeader: {
      position: "absolute",
      bottom: 0,
      top: "auto",
      right: 0,
      width: 225,

      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },

    boxGross: {
      marginRight: 15,
      position: "relative",
      zIndex: 2,
      paddingBottom: 15,

      [theme.breakpoints.down("sm")]: {
        marginRight: 0,
      },
    },

    mobile100: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },

    mobile60: {
      [theme.breakpoints.down("sm")]: {
        width: "calc(60% - 15px)",
        marginRight: 15,
      },
    },

    mobile40: {
      [theme.breakpoints.down("sm")]: {
        width: "40%",
      },
    },

    nameInput: {
      paddingLeft: 13,
      paddingBottom: 5,
      fontSize: 12,
      lineHeight: "18px",
      color: "var(--purple-dark)",
    },

    groundGrossInput: {
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },

    inputGross: {
      borderRadius: 74,
      height: 48,
      padding: "0px 24px",
      fontSize: 14,
      backgroundColor: "var(--grey-light)",
      border: "1px solid var(--grey-light)",
      outline: "none",
      boxShadow: "none",
      paddingLeft: 60,
      width: 200,
      maxWidth: "100%",
      appearance: "none",
      "&::-webkit-inner-spin-button": {
        appearance: "none",
      },

      "&:focus": {
        outline: 0,
        borderColor: "var(--purple)",
        backgroundColor: "var(--grey-light)",
      },

      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },

    iconInput: {
      position: "absolute",
      width: 24,
      height: 24,
      left: 20,
      bottom: 12,
      zIndex: 2,
    },

    selectPer: {
      cursor: "pointer",
      borderRadius: 74,
      height: 48,
      padding: " 0px 24px",
      fontSize: 14,
      backgroundColor: "var(--grey-light)",
      border: "1px solid var(--grey-light)",
      outline: "none",
      boxShadow: "none",
      width: 140,
      maxWidth: "100%",
      backgroundImage: `url(https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/input__dropdown-menu.png)`,
      backgroundPosition: "calc(98% - .5rem), 100% 0",
      backgroundSize: 24,
      backgroundRepeat: "no-repeat",
      appearance: "none",

      "&:focus": {
        outline: 0,
        borderColor: "var(--purple)",
        backgroundColor: "var(--grey-light)",
      },
      
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },

    selectDoYou: {
      cursor: "pointer",
      borderRadius: 74,
      height: 48,
      padding: " 0px 24px",
      fontSize: 14,
      backgroundColor: "var(--grey-light)",
      border: "1px solid var(--grey-light)",
      outline: "none",
      boxShadow: "none",
      width: 225,
      maxWidth: "100%",
      backgroundImage: `url(https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/input__dropdown-menu.png)`,
      backgroundPosition: "calc(98% - .5rem), 100% 0",
      backgroundSize: 24,
      backgroundRepeat: "no-repeat",
      appearance: "none",

      "&:focus": {
        outline: 0,
        borderColor: "var(--purple)",
        backgroundColor: "var(--grey-light)",
      },

      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },

    btnCalculate: {
      backgroundColor: "var(--orange)",
      color: "white",
      border: "none",
      cursor: "pointer",
      outline: "none",
      borderRadius: 50,
      fontSize: 14,
      height: 48,
      padding: "0px 18px",
      width: 145,
      maxWidth: "100%",
      boxShadow: "none",
      transition: "0.3s ease",

      "&:hover": {
        backgroundColor: "var(--orange)",
      },
      
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  };
});

export default useStyles;
