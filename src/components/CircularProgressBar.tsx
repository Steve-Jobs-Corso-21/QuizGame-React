import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
interface GreenRingProps {
  percentage: number;
}

const GreenRing: React.FC<GreenRingProps> = ({ percentage }) => {
  let color: string = "";
  if (percentage > 84) {
    color = "rgba(45, 198, 46, 1)";
  } else if (percentage > 68) {
    color = "rgba(136, 217, 21,1)";
  } else if (percentage > 52) {
    color = "rgba(181, 235 7,1)";
  } else if (percentage > 36) {
    color = "rgba(255, 209, 0,1)";
  } else if (percentage > 20) {
    color = "rgba(255, 124, 0, 1)";
  } else {
    color = "rgba(255, 0, 0, 1)";
  }

  return (
    <div style={{ width: "300px" }}>
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={percentage}
        duration={1.4}
        easingFunction={easeQuadInOut}
      >
        {(value: number) => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              /* This is important to include, because if you're fully managing the
        animation yourself, you'll want to disable the CSS animation. */
              styles={buildStyles({
                pathTransition: "none",
                pathColor: `${color}, ${percentage / 100})`,
                textColor: color,
              })}
            />
          );
        }}
      </AnimatedProgressProvider>
      ;
    </div>
  );
};

export default GreenRing;
