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
      [key: string]: number[];
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


const json: JSON = data;

const testAnswer: Data = {
  gameMode: GameMode.Training,
  currentLevel: "mondo1",
  quizzes: {
    mondo1: ["1", "2", "3"],
  },
  rightAnswers: {
    mondo1: {
      "1": [2, 0],
      "4": [0, 1],
      "5": [1, 2],
      "6": [3],
    },
  },
};

// const partialScore =
const partialScore = Object.values(
  testAnswer.rightAnswers[testAnswer.currentLevel]
).reduce((acc, s) => (acc += s.length), 0);
// (testAnswer.rightAnswers["mondo1"][1].length / data.quizzes.length) * 100;


const testTryAnswer =  (testAnswer.gameMode===GameMode.Challenge) ?
Object.entries(testAnswer.rightAnswers[testAnswer.currentLevel]).reduce((acc, s) => acc +=
  json.quizzes[testAnswer.currentLevel].find(({ id: quizID }: { id: string }) =>
    s[0] === quizID)?.answers.findIndex(({ correct }) => correct) === s[1][0] ? 100/Object.keys(testAnswer.rightAnswers[testAnswer.currentLevel]).length : 0, 0)
:
  Object.entries(testAnswer.rightAnswers[testAnswer.currentLevel]).reduce((acc, s) => (acc += (s[1].length == 1) ? 100/Object.keys(testAnswer.rightAnswers[testAnswer.currentLevel]).length : 0), 0);

const CircularProgressBar = () => {
  return (
    <div>
      <GreenRing percentage={testTryAnswer} />
    </div>
  );
};

export default CircularProgressBar;
