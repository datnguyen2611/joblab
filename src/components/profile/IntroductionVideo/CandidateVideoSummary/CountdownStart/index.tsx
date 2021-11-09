import React from "react";
import useStyles from "./styles";

const CountdownStart = (props: any) => {
  const styles = useStyles();
  const { timeLeft, timeLeftDown } = props;

  return (
    <div className={styles.baseTimer}>
      <svg
        className={styles.baseTimerSvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.baseTimerCircle}>
          <circle
            className={styles.baseTimerPathElapsed}
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            id="base-timer-path-remaining"
            strokeDasharray={`${(283 / timeLeft) * timeLeftDown} 283`}
            className={styles.baseTimerPathRemaining}
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className={styles.baseTimerLabel}>
        {timeLeftDown}
      </span>
    </div>
  );
};

export default CountdownStart;
