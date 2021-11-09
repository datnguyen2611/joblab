import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionWithholding: {
      padding: "15px 0px",
      width: "640px",
      maxWidth: "100%",
    },

    filterSalaryRate: {
      marginBottom: 25,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
      padding: 23,
      borderRadius: 8,
      color: "var(--grey)",
      lineHeight: "19px",
      flexWrap: "wrap",
      transition: "0.3s ease",

      "&:hover": {
        boxShadow: "0 2px 4px rgb(0 0 0 / 8%)",
      },

      [theme.breakpoints.down("xs")]: {
        alignItems: "flex-start",
        flexDirection: "column",
        marginBottom: 10,
      },
    },

    labelFilter: {
      fontWeight: 600,
      fontSize: 13,
      color: "var(--purple-dark)",

      [theme.breakpoints.down("xs")]: {
        marginBottom: 15,
      },
    },

    listFilter: {
      display: "flex",
      alignItems: "center",
      padding: 0,
      margin: 0,
      listStyle: "none",
      flexWrap: "wrap",

      [theme.breakpoints.down("xs")]: {
        flexDirection: "row",
        flexWrap: "nowrap",
        overflowY: "auto",
        width: "100%",
        paddingBottom: 5,
        "&::-webkit-scrollbar": {
          height: 5,
        },

        /* Track */
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },

        /* Handle */
        "&::-webkit-scrollbar-thumb": {
          background: "var(--deep-purple)",
          borderRadius: 5,
        },
      },
    },

    itemFilter: {
      padding: "8px 11px",
      borderRadius: 20,
      cursor: "pointer",
      textTransform: "capitalize",
      whiteSpace: "nowrap",
      fontSize: 12,
      marginRight: 12,
      color: "#3f89b4",
      transition: "0.3s ease",

      "&:hover": {
        backgroundColor: "rgb(63 137 180 / 10%)",
      },

      "&.active": {
        background: "rgb(63 137 180 / 10%)",
        color: "#3f89b4",
        fontWeight: 600,
      },
    },

    infoSectionWithholding: {
      background: "#FFFFFF",
      borderRadius: 8,
      transition: "0.3s ease",

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

    containerWithholding: {
      padding: 23,
      color: "var(--grey)",
      fontSize: 13,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },

    chartWithholding: {
      width: 245,
      maxWidth: "40%",
      textAlign: "center",

      [theme.breakpoints.down("xs")]: {
        width: "100%",
        maxWidth: "100%",
      },
    },

    deductionsHolder: {
      width: 320,
      maxWidth: "60%",

      [theme.breakpoints.down("xs")]: {
        width: "100%",
        maxWidth: "100%",
      },
    },

    cardDeduction: {
      margin: "15px 0",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",

      "&:first-of-type": {
        marginBottom: 0,
      },
    },

    cardDeductionHighlight: {
      fontWeight: 700,
      color: "var(--purple-dark)",
    },

    cardDeductionHighlightBig: {
      fontSize: "16px",

      "& *": {
        fontSize: "16px",
      },
    },

    cardDeductionName: {},

    cardDeductionValue: {},

    cardLineSplit: {
      borderBottom: "1px solid var(--grey-light)",
      marginTop: 18,
      marginBottom: 18,
    },

    hyperQuestionIcon: {
      background: "#fff",
      color: "#676767",
      border: "1.5px solid #676767",
      height: 17,
      width: 17,
      borderRadius: "50%",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 11,
      marginRight: 5,
      marginLeft: 5,
      fontWeight: 700,
      cursor: "pointer",
    },

    styleTooltip: {
      width: "300px",
      maxWidth: "100vw",
      color: "#30183F",
      fontSize: 12,
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 15,
      boxShadow: "0 12px 28px rgb(48 55 61 / 20%)",
    },
  };
});

export default useStyles;
