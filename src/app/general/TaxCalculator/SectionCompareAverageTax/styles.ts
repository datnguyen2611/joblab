import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionCompareAverageTax: {
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

    boxChartCompareAverageTax: {
      padding: 23,
    },

    nameChart: {
      padding: "5px 10px",
      fontSize: 11,
      color: "var(--grey)",
      backgroundColor: "#F0F0F3",
      borderRadius: 4,
      marginBottom: 20,
      lineHeight: '17px',
      display: 'inline-block',
    },
  };
});

export default useStyles;
