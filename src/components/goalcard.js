import React from "react";

const GoalCard = (goal) => {
  const [time, setTime] = useState(5);

  return (
    <div>
      <h4>{goal.name}</h4>
    </div>
  );
};

export default GoalCard;
