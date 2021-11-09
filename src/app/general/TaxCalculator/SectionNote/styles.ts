import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionNote: {
      width: "640px",
      maxWidth: "100%",
      borderRadius: 8,
      marginTop: 25,
      background: "rgba(48, 24, 63, 0.05)",
      lineHeight: "22px",
      padding: 23,
      color: "var(--grey)",

      [theme.breakpoints.down("xs")]: {
        marginTop: 10,
      },
    },
  };
});

export default useStyles;
