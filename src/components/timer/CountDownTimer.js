import React, { useEffect, useState } from "react";

function CountDownTimer() {
  const minSeconds = {};
  const { minutes = 5, seconds = 0 } = minSeconds;
  const [[min, secs], setTime] = useState([minutes, seconds]);

  const tick = () => {
    if (min === 0 && secs === 0) {
      reset();
    } else if (secs === 0) {
      setTime([min - 1, 59]);
    } else {
      setTime([min, secs - 1]);
    }
  };

  const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);

  useEffect(() => {
    const timeID = setInterval(() => tick(), 1000);
    return () => clearInterval(timeID);
  });

  return (
    <div className="timer">
      <h1>{`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</h1>
    </div>
  );
}

export default CountDownTimer;
