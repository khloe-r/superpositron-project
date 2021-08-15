import { Done } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./timer.css";

function CountDownTimer(props) {
  const minSeconds = {};
  const { minutes = 5, seconds = 0 } = minSeconds;
  const [[mins, secs], setTime] = useState([minutes, seconds]);
  var timeID = 0;

  const tick = () => {
    if (mins === 0 && secs === 0) {
      //reset();
      return;
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  const reset = () => {
    setTime([parseInt(minutes), parseInt(seconds)]);
  };

  useEffect(() => {
    timeID = setInterval(() => tick(), 5); //CHANGE BACK TO 1000
    return () => {
      props.func();
      clearInterval(timeID);
    };
  });

  return (
    <div className="timer">
      <h1>{`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</h1>
    </div>
  );
}

export default CountDownTimer;

// import React, { useEffect, useState } from "react";
// import "./timer.css";

// function CountDownTimer() {
//   const minSeconds = {};
//   const { minutes = 5, seconds = 0 } = minSeconds;
//   const [[mins, secs], setTime] = useState([minutes, seconds]);

//   const tick = () => {
//     if (mins === 0 && secs === 0) {
//       reset();
//     } else if (secs === 0) {
//       setTime([mins - 1, 59]);
//     } else {
//       setTime([mins, secs - 1]);
//     }
//   };

//   const reset = () => {
//     setTime([parseInt(minutes), parseInt(seconds)]);
//   };

//   useEffect(() => {
//     const timeID = setInterval(() => tick(), 5); //CHANGE BACK TO 1000
//     return () => clearInterval(timeID);
//   });

//   return (
//     <div className="timer">
//       <h1>{`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</h1>
//     </div>
//   );
// }

// export default CountDownTimer;
