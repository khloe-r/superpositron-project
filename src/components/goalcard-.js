import React, { useState, useEffect, useRef } from "react";
import Progress from "./progresscircle/Progress";
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, TextField } from "@material-ui/core";
//import CountDownTimer from "./timer/CountDownTimer";
import "./goalcard.css";

const GoalCard = (goal, bubble) => {
  const [time, setTime] = useState(5);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [done, setDone] = useState(false);
  const progressRef = useRef();

  function timerOver() {
    setDone(true);
  }

  function CountDownTimer() {
    const minSeconds = {};
    const { minutes = 5, seconds = 0 } = minSeconds;
    const [[mins, secs], setTime] = useState([minutes, seconds]);
    var timeID = 0;

    const tick = () => {
      if (mins === 0 && secs === 0) {
        //reset();
        setDone(true);
        clearInterval(timeID);
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
        clearInterval(timeID);
      };
    });

    return (
      <div className="timer">
        <DialogTitle id="simple-dialog-title">
          <h1>{`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</h1>
        </DialogTitle>
      </div>
    );
  }

  return (
    <div>
      <div class="goalcard" onClick={() => setOpen(true)}>
        <h2>{goal.goal.name}</h2>
        <h4>
          Completed {goal.goal.progress} out of {goal.goal.number} {goal.goal.type}
        </h4>
        <p>{`From Bubble: ${goal.bubble}`}</p>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} style={{ borderRadius: 75 }}>
        {start ? (
          <>
            {!done ? (
              <>
                <CountDownTimer />
                <Button
                  onClick={() => {
                    setStart(false);
                    setDone(false);
                  }}
                >
                  Stop the timer
                </Button>
              </>
            ) : (
              <>
                <DialogTitle id="simple-dialog-title">
                  <h1>Fragment Complete!</h1>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>You completed 5 minutes of {goal.goal.name}</DialogContentText>
                </DialogContent>
                <Button
                  onClick={() => {
                    setStart(true);
                    setDone(false);
                  }}
                >
                  Keep going!
                </Button>
                <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 450, margin: 10 }} label={`Number of ${goal.goal.type} completed`} type="number" variant="filled" inputRef={progressRef} />
                <Button
                  onClick={() => {
                    setOpen(false);
                    setDone(false);
                    setStart(false);
                  }}
                  color="primary"
                >
                  End this Session and Log Progress
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <DialogTitle id="simple-dialog-title">
              <h1>{goal.goal.name}</h1>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Completed {goal.goal.progress} out of {goal.goal.number} {goal.goal.type}
              </DialogContentText>

              <Progress progress={goal.goal.progress} total={goal.goal.number} />
            </DialogContent>
            <Button onClick={() => setStart(true)}>Start the timer</Button>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
          </>
        )}
        {/* {start ? <CountDownTimer /> : null} */}
      </Dialog>
    </div>
  );
};

export default GoalCard;
