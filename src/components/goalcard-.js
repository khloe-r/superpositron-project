import React, { useState, useEffect, useRef } from "react";
import Progress from "./progresscircle/Progress";
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, TextField } from "@material-ui/core";
//import CountDownTimer from "./timer/CountDownTimer";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";

import "./goalcard.css";

const GoalCard = (goal, bubble) => {
  const [time, setTime] = useState(5);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [done, setDone] = useState(false);
  const progressRef = useRef();
  const { currentUser } = useAuth();

  const userRef = firebase.firestore().collection("users");
  const bubbleRef = firebase.firestore().collection("bubbles");

  const bubbleColours = { "Health and Fitness": "#61B13C", Personal: "#5BC4FF", Social: "#C082FF", Educational: "#FFB13C", "Career and Finance": "#5451FF" };

  function logProgress(progress) {
    console.log(progress, "progress");
    const prog = isNaN(progress) || progress === "" || progress === " " ? 0 : progress;
    bubbleRef
      .doc(goal.bubble.id)
      .update({
        [`goals`]: firebase.firestore.FieldValue.arrayRemove({
          name: goal.goal.name,
          number: goal.goal.number,
          progress: goal.goal.progress,
          type: goal.goal.type,
        }),
      })
      .then(() => {
        if (parseInt(prog) + parseInt(goal.goal.progress) >= goal.goal.number) {
          console.log("done!");
          userRef.doc(currentUser.uid).update({
            goalsComplete: firebase.firestore.FieldValue.increment(1),
          });
        } else {
          bubbleRef.doc(goal.bubble.id).update({
            [`goals`]: firebase.firestore.FieldValue.arrayUnion({
              name: goal.goal.name,
              number: goal.goal.number,
              progress: parseInt(prog) + parseInt(goal.goal.progress),
              type: goal.goal.type,
            }),
          });
        }
      })
      .then(() => {
        console.log("logged progress");
        window.location.reload();
        // return false;
      });
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
      <div
        class="goalcard"
        onClick={() => {
          setOpen(true);
        }}
      >
        <h2>{goal.goal.name}</h2>
        <h4>
          Completed {goal.goal.progress} out of {goal.goal.number} {goal.goal.type}
        </h4>
        <p style={{ backgroundColor: bubbleColours[goal?.bubble.category], padding: 7, borderRadius: 20 }}>{`Bubble: ${goal.bubble.name}`}</p>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} style={{ borderRadius: 75 }}>
        {start ? (
          <>
            {!done ? (
              <>
                <CountDownTimer />
                <Button
                  onClick={() => {
                    setDone(true);
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
                  <DialogContentText>
                    Nice work on your goal: {goal.goal.name}! <br />
                    You're almost there on your way to completing {goal.goal.number} {goal.goal.type}!
                  </DialogContentText>
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
                    logProgress(progressRef.current.value);
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
