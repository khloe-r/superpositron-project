import React from "react";
import Progress from "./progresscircle";
import {Dialog, Button} from "@material-ui/core";
import CountDownTimer from './timer/CounterDownTimer';

const GoalCard = (goal) => {
  const [time, setTime] = useState(5);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);

  return (
    <div onClick={() => setOpen(true)}>
      <h4>{goal.name}</h4>
      <h4>{goal.number}</h4>
      <h4>{goal.type}</h4>
      <h4>{goal.progress}</h4>
      <Progress progress={goal.progress} total={goal.number} />
      <Dialog open={open} onClose={() => setOpen(false)} >
        <h4>{goal.name}</h4>
        <h4>{goal.number}</h4>
        <h4>{goal.type}</h4>
        <h4>{goal.progress}</h4>
        <Progress progress={goal.progress} total={goal.number} />
        <Button onClick={() => setStart(true)} >Start the timer</Button>
        {start? <CountDownTimer> : null}
      </Dialog>
    </div>
  );
};

export default GoalCard;
