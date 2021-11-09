import React, {useState, useEffect} from "react";
import Timer from 'react-compound-timer';

export default function CountdownTimer(props) {
  
  //in 1000 = 1s
  const [countdownTime, setCountdownTime] = useState(Number.isInteger(props.timeLimitSec) ? props.timeLimitSec * 1000 + 999 : 10 * 1000 + 999); //180
  const [isStarted, setIsStarted] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isReseted, setIsReseted] = useState(false);
  const [direction, setDirection] = useState("backward");

  useEffect(() => {
    updateTimer(props.timerState);
  }, [props]);

  var updateTimer = (timerState) => {
    if(timerState == "START") {
      startTimer();
    } else if (timerState == "RESET") {
      resetTimer();
    }
  }
  
  var finishedRecording = () => {
    console.log("Finished!");
    props.callbackFunc();
  }
  
  var startTimer = () => {
    console.log("startTimer");   
    setIsReseted(false);
    setIsStopped(false);
    setIsStarted(true);
  }
  
  var resetTimer = () => {
    console.log("resetTimer");    
    setIsStopped(true);
    setIsStarted(false);
    setIsReseted(true);
  }
  
  return (
    <div class="countdown-timer-container">
      <h1 id="countdown-timer-headline"><font size="4"><i className="fas fa-clock mr-2"/></font>Time Remaining:</h1>
      <div id="countdown-timer-countdown">
        <Timer
            formatValue={(value) => `${(value < 10 ? `0${value}` : value)} `}
            initialTime={countdownTime}
            lastUnit="m"
            direction={direction}
            startImmediately={false}
            checkpoints={[
                {
                    time: 0,
                    callback: () => finishedRecording(),
                }
            ]}
        >
            {({ start, resume, pause, stop, reset, getTimerState }) => (
                <React.Fragment>
                    <br />
                    <div>
                        {isStarted == true ? start() : null}
                        {isStopped == true ? stop() : null }
                        {isReseted == true ? reset() : null}
                        {/*
                          <button onClick={startTimer}>start Timer</button>
                          <button onClick={resetTimer}>reset Timer</button>
                          <button onClick={start}>Start</button>
                          <button onClick={pause}>Pause</button>
                          <button onClick={resume}>Resume</button>
                          <button onClick={stop}>Stop</button>
                          <button onClick={reset}>Reset</button>
                          <div>{getTimerState()}</div>
                        */}
                    </div>
                    <li><span id="hours"><Timer.Hours /></span>Hours</li>
                    <li><span id="minutes"><Timer.Minutes /></span>Minutes</li>
                    <li><span id="seconds"><Timer.Seconds /></span>Seconds</li>
                   
                    
                </React.Fragment>
            )}
        </Timer>
      </div>
    </div>
  )
};
