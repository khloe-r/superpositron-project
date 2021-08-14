import React from "react";

import "./Progress.css";
import ProgressCircle from "./ProgressCircle";

const Progress = ({ progress, total }) => {
  return (
    <div className="app">
      <div className="app-header">
        <h1>Progress</h1>
        <ProgressCircle total={total} progress={progress} size={500} strokeWidth={15} circleOneStroke="#d9edfe" circleTwoStroke={color} />
      </div>
    </div>
  );
};

export default Progress;
