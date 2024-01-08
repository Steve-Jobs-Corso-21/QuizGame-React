import "./index.scss";

import React from "react";
import GreenRing from "../../components/CircularProgressBar";

const CircularProgressBar = () => {
  const percentage = 95;
  return (
    <div>
      <GreenRing percentage={percentage} />
    </div>
  );
};

export default CircularProgressBar;
