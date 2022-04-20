import { useTimer } from "react-timer-hook";
import React from 'react';

function Timer({ expiryTimestamp, timerExpired }) {
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp, onExpire: timerExpired })
    return (
    <div style={{fontSize: '64px'}} className='row justify-content-center mx-5'>
        <div className='col-md-10 col my-4'>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
    </div>
    )
}

export default Timer;