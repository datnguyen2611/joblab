import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionEurope: {
      width: "640px",
      maxWidth: "100%",
      background: "#FFFFFF",
      borderRadius: 8,
      marginTop: 25,

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

    contentCountries: {
      padding: 23,

      [theme.breakpoints.down("xs")]: {
        padding: 18,
      },
    },

    containerIncome: {
      width: "100%",
      columnCount: 5,
      columnWidth: "auto",
      pageBreakInside: "avoid",
      breakInside: "avoid",

      [theme.breakpoints.down("xs")]: {
        columnCount: 2,
      },
    },

    itemIncome: {
      fontWeight: 600,
      fontSize: 13,
      lineHeight: "32px",
      color: "#3f89b4",
      textDecoration: "none",
      width: "auto",
      wordWrap: "break-word",
      overflow: "hidden",
      cursor: "pointer",
      transition: "0.3s ease",

      "&:hover": {
        textDecoration: "underline",
      },
    },
  };
});

export default useStyles;
