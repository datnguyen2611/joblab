import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    iconAcronym: {
      display: "inline-block",
      height: 12,
      width: 16,
      marginRight: 10,
    },

    leastRank: {
      display: "inline-flex",
      backgroundColor: "#E34B31",
      height: 26,
      width: 26,
      color: "rgb(255, 255, 255)",
      borderRadius: "50%",
      alignItems: "center",
      justifyContent: "center",
    },

    bestRank: {
      display: "inline-flex",
      backgroundColor: "#0DA0BA",
      height: 26,
      width: 26,
      color: "rgb(255, 255, 255)",
      borderRadius: "50%",
      alignItems: "center",
      justifyContent: "center",
    },

    btnShowMore: {
      fontSize: 12,
      fontWeight: 500,
      borderRadius: 80,
      marginTop: 5,
      border: "1px solid #E1DCE2",
      width: "fit-content",
      padding: "5px 12px",
      color: "var(--grey)",
      userSelect: "none",
      transition: "0.3s ease",

      "&:hover": {
        border: "1px solid var(--purple-light)",
        backgroundColor: "var(--grey-light-30)",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
        height: 30,
      },
    },

    tableShowMore: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      position: "relative",
      padding: "14px 20px 0px",
      width: "100%",
      textAlign: "center",
    },

    groupImage: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    tableCountries: {
      width: "100%",
      borderCollapse: "collapse",
      lineHeight: "20px",

      "& thead": {
        "& tr": {
          "& th": {
            padding: "13px 0px",
            fontWeight: "bold",
            fontSize: 13,
            color: "#30183F",
            // borderTop: "1px solid var(--grey-light)",
            textAlign: "center",

            "&:nth-child(1)": {
              width: 220,
            },

            "&:nth-child(2)": {
              width: 150,
              textAlign: 'left',
            },

            "&:nth-child(3)": {
              width: 100,
            },

            "&:nth-child(4)": {
              width: 80,
            },

            "&:first-child": {
              textAlign: "left",
            },

            [theme.breakpoints.down("xs")]: {
              fontSize: 11,

              "&:nth-child(1)": {
                width: 'auto',
                paddingRight: 5,
              },
  
              "&:nth-child(2)": {
                width: '27%',
                textAlign: 'left',
              },
  
              "&:nth-child(3)": {
                width: '21%',
              },
  
              "&:nth-child(4)": {
                width: '15%',
              },
            },
          },
        },
      },

      "& tbody": {
        "& tr": {
          background: "#ffffff",
          transition: "0.3s ease",
          "&:hover": {
            background: "rgba(248, 248, 250, 0.8)",
          },
          "& td": {
            padding: "13px 0px",
            fontWeight: "bold",
            fontSize: 13,
            color: "#30183F",
            borderTop: "1px solid var(--grey-light)",
            textAlign: "center",
  
            "&:nth-child(2)": {
              textAlign: 'left',
            },

            [theme.breakpoints.down("xs")]: {
              fontSize: 11,

              "&:nth-child(1)": {
                width: 'auto',
                paddingRight: 5,
              },
  
              "&:nth-child(2)": {
                width: '27%',
                textAlign: 'left',
              },
  
              "&:nth-child(3)": {
                width: '21%',
              },
  
              "&:nth-child(4)": {
                width: '15%',
              },
            },

            "&:first-child": {
              textAlign: "left",
            },
          },
        },
      },
    },
  };
});

export default useStyles;
