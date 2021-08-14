import React, { useEffect, useState, useRef } from "react";

import "./ProgressCircle.css";

const ProgressCircle = (props) => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);
  const { size, total, progress, strokeWidth, circleOneStroke, circleTwoStroke } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((total - progress) / total) * circumference;
    setOffset(progressOffset);

    circleRef.current.style = "transition: stroke-dashoffset 850ms ease-in-out";
  }, [setOffset, progress, circumference, offset]);

  return (
    <>
      <svg className="svg" width={size} height={size}>
        <circle className="svg-circle-bg" stroke={circleOneStroke} cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
        <circle className="svg-circle" ref={circleRef} stroke={circleTwoStroke} cx={center} cy={center} r={radius} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} />
        <text x={`${center}`} y={`${center}`} className="svg-circle-text">
          {progress / total}%
        </text>
      </svg>
    </>
  );
};
export default ProgressCircle;
