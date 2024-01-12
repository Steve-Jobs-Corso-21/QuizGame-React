import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          strokeLinecap: "butt",
          pathColor: color,
          // pathColor: `${color}, ${percentage / 100}`,
          // trailColor: "grey", colore della parte "mancante"
          // pathColor: `${gradientColor}, ${percentage / 100}`,
          textColor: color,
          // (rgba(46, 204, 113)
        })}
      />
    </div>
  );
};

export default GreenRing;
