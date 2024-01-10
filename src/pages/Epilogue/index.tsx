import { Link, useParams, useSearchParams } from "react-router-dom";
import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
// import testAnswer from "../../testAnswer.json";
import { useState } from "react";

// const sumRightAfter = testAnswer.rightAnswers.mondo1.reduce(
//   (acc, s) => (acc += s.rightAfter),
//   0
// );
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
/*
type Quiz = {
  id: string;
  question: string;
  description: string;
  image?: string;
  answers: Answer[];
};
*/
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
      "2": ["abc", "ced", "lsd", "abc"],
      "3": ["abc", "ced", "lsd", "lsd"],
      "4": ["abc"],
      "5": ["abc", "ced"],
      "6": ["abc", "lsd"],
      "7": ["abc"],
      "8": ["abc", "ced", "lsd", "abc"],
      "9": ["abc", "ced"],
      "10": ["abc"],
    },
  },
};

const testTryAnswer = Object.entries(
  testAnswer.rightAnswers[testAnswer.currentLevel]
).reduce((acc, s) => (acc += s.length - 1), 0);
const Epilogue = () => {
  return (
    <div>
      <h1
        style={{
          fontPalette: "Blue",
          display: "flex",
          flexDirection: "row",
          flex: "center",
        }}
      >
        Complimenti! Hai Finito il {testAnswer.currentLevel}!
      </h1>
      <div>
        <p>
          Sei riuscito a completare il gioco facendo {testTryAnswer}
          errori!
        </p>
        <p>
          {testAnswer.gameMode === GameMode.Training
            ? "Hai giocato in modalità allenamento... Che ne diresti di passare alla modalità sfida?"
            : "Complimenti per aver terminato la modalità sfida!"}
        </p>
      </div>
      <div>
        <Link to="/">Torna alla Home</Link>
      </div>
    </div>
  );
};

export default Epilogue;
