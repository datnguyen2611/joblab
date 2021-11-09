import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionGetPaidMore: {
      width: "640px",
      maxWidth: "100%",
      background: "#FFFFFF",
      borderRadius: 8,
      marginTop: 25,
      border: "1px solid var(--purple)",
      padding: 24,
      transition: "0.3s ease",

      [theme.breakpoints.down("xs")]: {
        marginTop: 10,
      },

      "&:hover": {
        boxShadow: "0 2px 4px rgb(0 0 0 / 8%)",
      },
    },

    contentBox: {
      display: "flex",
      flexWrap: "wrap",
      flexGrow: 4,

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },

    bagImage: {
      "& img": {
        width: "auto",
        height: 56,
      },
    },

    grText: {
      "& div:nth-child(1)": {
        width: "auto",
        height: 21,
        color: "var(--purple-dark)",
        fontSize: 14,
        fontWeight: "400",
        marginBottom: 4,
        paddingLeft: 16,
      },
      "& div:nth-child(2)": {
        color: "var(--purple-dark)",
        fontSize: 20,
        fontWeight: 600,
        paddingLeft: 16,
      },
    },

    clearfix: {
      width: "100%",
    },

    linkGet: {
      width: 250,
      marginTop: 24,
      backgroundColor: "var(--orange)",
      color: "white",
      border: "none",
      cursor: "pointer",
      outline: "none",
      borderRadius: 50,
      fontSize: 14,
      height: 48,
      padding: "0px 18px",
      textAlign: "center",
      userSelect: "none",
      maxWidth: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "0.3s ease",

      "&:hover": {
        color: "white",
        background: "var(--orange-dark)",
        textDecoration: "none",
      },

      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  };
});

export default useStyles;
