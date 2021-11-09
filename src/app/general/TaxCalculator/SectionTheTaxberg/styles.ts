import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    sectionTheTaxberg: {
      width: "640px",
      maxWidth: "100%",
      background:
        "radial-gradient(77.83% 77.83% at 49.94% 59.95%, rgba(157, 233, 246, 0) 0%, #9DE9F6 100%)",
      position: "relative",
      height: 800,
      overflow: "hidden",
      borderRadius: 8,
      marginTop: 25,

      [theme.breakpoints.down("xs")]: {
        height: 1000,
        marginTop: 0,
      },
    },

    titleSection: {
      position: "absolute",
      top: 20,
      left: 20,
      fontWeight: 600,
      fontSize: 22,
      color: "#30183F",
      zIndex: 1,
    },

    taxBergHolder: {
      position: "relative",
      width: "100%",
      height: "100%",
    },

    taxBergFrame: {
      overflow: "hidden",
      position: "relative",
      height: 600,
    },

    taxBergWaterTop: {
      width: "100%",
      background: "linear-gradient(rgb(99, 218, 255), rgb(47, 115, 136))",
      backgroundBlendMode: "multiply",
      height: "100%",
      position: "absolute",
      mixBlendMode: "multiply",
      bottom: 0,
      backgroundImage: "url(https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/water-top4.gif)",
      backgroundSize: "cover",
      backgroundRepeat: "round",
      backgroundPositionY: "top",
    },

    taxBergWaterMiddle: {
      // height: 300,
      height: 285,
      position: "absolute",
      zIndex: 0,
      width: "100%",
      background: "#3cb2ce",
      mixBlendMode: "multiply",
      bottom: 0,
    },

    taxBergWaterBottom: {
      width: "100%",
      height: 200,
      position: "absolute",
      zIndex: 0,
      // background: "#0c2a64",
      background: "#10406c",
      backgroundBlendMode: "multiply",
      mixBlendMode: "multiply",
      bottom: 0,

      [theme.breakpoints.down("xs")]: {
        height: '40%',
      },
    },

    taxBergIceImg: {
      width: 300,
      margin: "auto",
      position: "absolute",
      height: 300,
      left: "50%",
      transform: "translate(-50%, 0)",
    },

    taxBergBoat: {
      animation: "ice 4s ease-in-out infinite",
      transformOrigin: "center",
      height: 300,
      width: 300,

      "& img": {
        width: "inherit",
      },
    },

    taxBergFlag: {
      width: "16px !important",
      height: 11,
      position: "absolute",
      left: 135,
      top: 16,
      zIndex: 1,
      transform: "rotate(346deg)",
    },

    taxBergDash: {
      right: "38%",
      transform: "translate(36%, 0)",
      position: "absolute",
      border: "0.6px dashed #ffa500",
      width: "19%",
      zIndex: 5,
      height: 0,
    },

    taxBergDotsContainer: {
      float: "left",
      height: 15,
      width: 15,
      borderRadius: 45,
      marginTop: -7,
      position: "relative",
      left: -2,
    },

    taxBergDots: {
      background: "#ffa500",
      height: 7,
      width: 7,
      position: "relative",
      top: 3,
      left: 0,
      borderRadius: 120,
    },

    taxBergTextHolder: {
      zIndex: 20,
      position: "absolute",
      textAlign: "left",
      width: 140,
      whiteSpace: "nowrap",
      color: "white",

      [theme.breakpoints.down("xs")]: {
        textAlign: "right",
        right: "14px !important",
      },
    },

    empPayText: {
      textAlign: "right",

      [theme.breakpoints.down("xs")]: {
        textAlign: "left",
        right: "auto !important",
        left: "14px !important",
      },
    },

    taxBergTaxText: {
      fontWeight: "bold",
      fontSize: 20,
      lineHeight: "35px",
    },

    taxBergSubTitle: {
      fontSize: 12,
      fontWeight: 400,
      whiteSpace: "normal",
    },

    taxBergTaxTextDark: {
      color: "var(--purple-dark)",
    },

    taxBergCloudLeft: {
      position: "absolute",
      animation: "linear infinite alternate",
      animationName: "cloud",
      animationDuration: "2s",
      width: 110,
      left: 60,
      top: 8,

      "& img": {
        width: "inherit",
      },
    },

    taxBergCloudRight: {
      position: "absolute",
      width: 135,
      right: 65,
      top: 48,

      "& img": {
        width: "inherit",
      },
    },

    totalTax: {
      position: "absolute",
      bottom: 0,
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      padding: "11px 10px",

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },

    totalTaxTex: {
      width: "281px",
      maxWidth: "48%",
      color: "white",
      padding: 20,

      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
        width: "100%",
      },
    },

    totalTaxTitle: {
      fontSize: 16,
      fontWeight: 500,
    },

    totalTaxNumber: {
      padding: 0,
      fontSize: 34,
      paddingBottom: 6,
      whiteSpace: "nowrap",
      fontWeight: "bold",
    },

    totalTaxInfo: {
      lineHeight: "22px",
      fontSize: 13,
      color: "white",
    },
  };
});

export default useStyles;
