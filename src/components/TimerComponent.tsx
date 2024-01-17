import React, { FC, useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { Colours } from "../models/Colours";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const TimerComponent: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [timeBlack, setTimeBlack] = useState(350);
  const [timeWhite, setTimeWhite] = useState(350);
  const timer = useRef<null | ReturnType<typeof setInterval>>();

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function decrementTimer() {
    currentPlayer?.colour === Colours.BLACK
      ? setTimeBlack((prev) => prev - 1)
      : setTimeWhite((prev) => prev - 1);
  }

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(decrementTimer, 1000);
  }

  function onRestart() {
    setTimeBlack(350);
    setTimeWhite(350);
    restart();
  }

  return (
    <div>
      <button onClick={onRestart}>Restart game</button>
      <h2>Black time left - {timeBlack}</h2>
      <h2>White time left - {timeWhite}</h2>
    </div>
  );
};

export default TimerComponent;
