import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    baseTimer: {
      position: "relative",
      width: 75,
      height: 75,
    },

    baseTimerSvg: {
      transform: "scaleX(-1)",
    },

    baseTimerCircle: {
      fill: "none",
      stroke: "none",
    },

    baseTimerPathElapsed: {
      strokeWidth: 10,
      stroke: "rgb(0 188 212 / 30%)",
    },

    baseTimerPathRemaining: {
      strokeWidth: 10,
      strokeLinecap: "round",
      transform: "rotate(90deg)",
      transformOrigin: "center",
      transition: "1s linear all",
      fillRule: "nonzero",
      stroke: "rgb(0 188 212 / 100%)",
    },

    baseTimerPathRemainingGreen: {
      color: "rgb(65, 184, 131)",
    },

    baseTimerLabel: {
      position: "absolute",
      width: 75,
      height: 75,
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 40,
      color: "rgb(0 188 212 / 100%)",
    },
  };
});

export default useStyles;
