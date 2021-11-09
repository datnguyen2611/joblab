import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionPeopleAlsoAsk: {
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

    listPeople: {
      padding: "6px 24px",
    },

    itemPeople: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--purple-dark)",
      alignItems: "center",
      borderBottom: "1px solid var(--grey-light)",
      padding: "18px 0px",

      '&:hover': {
        textDecoration: 'none'
      },

      "&:last-child": {
        borderBottom: "0",
      },
    },

    rightArrow: {
      display: "inline-block",
      height: 14,
    },
  };
});

export default useStyles;
