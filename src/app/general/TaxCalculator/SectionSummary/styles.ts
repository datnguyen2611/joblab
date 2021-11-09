import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionSummary: {
      width: "640px",
      maxWidth: "100%",
      background: "#FFFFFF",
      borderRadius: 8,
      marginTop: 25,
      padding: 23,
      transition: "0.3s ease",

      [theme.breakpoints.down("xs")]: {
        marginTop: 10,
      },

      "&:hover": {
        boxShadow: "0 2px 4px rgb(0 0 0 / 8%)",
      },
    },

    title: {
      borderBottom: "1px solid var(--grey-light)",
      fontWeight: 600,
      fontSize: 18,
      color: "var(--purple-dark)",
      paddingBottom: 18,
    },

    informationSummary: {
      marginTop: 18,
      marginBottom: 45,
      fontSize: 13,
      lineHeight: "22px",
      flex: "none",
      order: 4,
      alignSelf: "center",
      color: 'var(--grey)',
    },
  };
});

export default useStyles;
