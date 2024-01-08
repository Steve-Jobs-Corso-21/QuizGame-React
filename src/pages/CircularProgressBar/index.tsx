import "./index.scss";

import React from "react";
import GreenRing from "../../components/CircularProgressBar";
import Score from "../Score/index";
import data from "../../data.json";
import testAnswer from "../../testAnswer.json";

const partialScore =
  (testAnswer.rightAnswers.mondo1.length / data.quizzes.length) * 100;

const CircularProgressBar = () => {
  return (
    <div>
      <GreenRing percentage={partialScore} />
    </div>
  );
};

export default CircularProgressBar;
