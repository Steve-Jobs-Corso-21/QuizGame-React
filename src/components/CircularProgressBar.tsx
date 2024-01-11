import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface GreenRingProps {
  percentage: number;
}

const GreenRing: React.FC<GreenRingProps> = ({ percentage }) => {
  return (
    <div style={{ width: "300px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          strokeLinecap: "butt",
          pathColor: `rgba(46, 204, 113, ${percentage / 100})`,
          textColor: "#2ecc71",
        })}
      />
    </div>
  );
};

export default GreenRing;
