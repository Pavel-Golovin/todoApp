import { useState } from 'react';

const useTimer = (min, sec) => {
  const [timerId, setTimerId] = useState(null);
  const [timer, setTimer] = useState({ minutes: Number(min), seconds: Number(sec) });

  let currentSeconds = Number(timer.seconds);
  let currentMinutes = Number(timer.minutes);

  const tickTimer = () => {
    if (currentSeconds !== 0) {
      currentSeconds -= 1;
    } else if (currentMinutes !== 0) {
      currentSeconds = 59;
      currentMinutes -= 1;
    } else {
      clearInterval(timerId);
    }

    return setTimer({ minutes: currentMinutes, seconds: currentSeconds });
  };

  const stopTimer = () => {
    // eslint-disable-line no-unused-vars
    clearInterval(timerId);
  };

  const playTimer = () => {
    setTimerId(setInterval(tickTimer, 1000));
  };

  return [timer, timerId, stopTimer, playTimer];
};

export default useTimer;
