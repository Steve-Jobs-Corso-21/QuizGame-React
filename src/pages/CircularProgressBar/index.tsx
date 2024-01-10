import "./index.scss";

import React from "react";
import GreenRing from "../../components/CircularProgressBar";
import Score from "../Score/index";
import data from "../../data.json";
// import testAnswer from "../../testAnswer.json";

export enum GameMode {
  Training,
  Challenge,
}

export type Data = {
  gameMode: GameMode;
  currentLevel: string;
  quizzes: {
    [key: string]: string[];
  };
  rightAnswers: {
    [key: string]: {
      [key: string]: string[];
    };
  };
};

type Answer = {
  answer: string;
  correct?: boolean;
};

type Quiz = {
  id: string;
  question: string;
  description: string;
  image?: string;
  answers: Answer[];
};

type Quizzes = {
  [key: string]: Quiz[];
};

export type JSON = {
  quizzes: Quizzes;
};
// const t: Data = testAnswer;

const testAnswer: Data = {
  gameMode: GameMode.Training,
  currentLevel: "mondo1",
  quizzes: {
    mondo1: ["1", "2", "3"],
  },
  rightAnswers: {
    mondo1: {
      "1": ["abc", "ced", "lsd"],
      "2": ["abc", "ced", "lsd"],
      "3": ["abc", "ced", "lsd"],
      "4": ["abc"],
      "5": ["abc", "ced"],
      "6": ["abc", "ced", "lsd", "hjk"],
      "7": ["abc", "ced"],
      "8": ["abc", "ced", "lsd"],
      "9": ["abc", "ced"],
      "10": ["abc"],
    },
    mondo2: {
      "1": ["abc", "ced", "lsd"],
      "2": ["abc", "ced", "lsd", "abc", "ced", "lsd"],
      "3": ["abc", "ced", "lsd", "lsd"],
      "4": ["abc"],
      "5": ["abc", "ced"],
      "6": ["abc", "ced", "lsd", "abc", "ced", "lsd", "abc", "ced", "lsd"],
      "7": ["abc", "ced", "lsd", "abc", "ced", "lsd", "abc"],
      "8": ["abc", "ced", "lsd", "abc", "ced", "lsd"],
      "9": ["abc", "ced"],
      "10": [],
    },
  },
};

// const partialScore =
const partialScore = Object.values(
  testAnswer.rightAnswers[testAnswer.currentLevel]
).reduce((acc, s) => (acc += s.length), 0);
// (testAnswer.rightAnswers["mondo1"][1].length / data.quizzes.length) * 100;

const CircularProgressBar = () => {
  return (
    <div>
      <GreenRing percentage={partialScore} />
    </div>
  );
};

export default CircularProgressBar;
