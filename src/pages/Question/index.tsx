import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import data from "../../data.json";

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

/* const testAnswer: Data = {
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
}; */

const testAnswer: Data = {
  gameMode: GameMode.Challenge,
  currentLevel: "mondo1",
  quizzes: {
    mondo1: ["1", "2", "3"],
  },
  rightAnswers: {
    mondo1: {
      "1": [0],
      "4": [1],
      "5": [3],
      "6": [2],
    },
  },
};

const Question = () => {
  const dataKeys = Object.keys(
    testAnswer.rightAnswers[testAnswer.currentLevel]
  ).length;

  //   const testTryAnswer =  (testAnswer.gameMode===GameMode.Challenge) ?
  // Object.entries(testAnswer.rightAnswers[testAnswer.currentLevel]).reduce((acc, s) => acc +=
  //   json.quizzes[testAnswer.currentLevel].find(({ id: quizID }: { id: string }) =>
  // s[0] === quizID)?.answers.findIndex(({ correct }) => correct) === s[1][0] ? 100/Object.keys(testAnswer.rightAnswers[testAnswer.currentLevel]).length : 0, 0)

  // Riprendere da qui
  // const text = data.quizzes[testAnswer.currentLevel];

  const [risposte, setRisposte] = useState(Array(dataKeys).fill(false));

  let textQuestion: String | Quiz | undefined;
  let risposta: String | Quiz | undefined;
  const toggleRisposta = (index: number) => {
    const newRisposte = [...risposte];
    newRisposte[index] = !newRisposte[index];
    setRisposte(newRisposte);
  };

  return (
    <div className="accordion" id="domandeAccordion">
      {/* index=0 */}
      {Array.from({ length: dataKeys }, (_, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`domandaHeading${index}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#domandaCollapse${index}`}
              aria-expanded={risposte[index] ? "true" : "false"}
              aria-controls={`domandaCollapse${index}`}
              onClick={() => toggleRisposta(index)}
            >
              {
                (textQuestion = Object.entries(
                  json.quizzes[testAnswer.currentLevel]
                ).map((s) => s[1].question)[index])
              }
            </button>
          </h2>
          <div
            id={`domandaCollapse${index}`}
            className={`accordion-collapse collapse ${
              risposte[index] ? "show" : ""
            }`}
            aria-labelledby={`domandaHeading${index}`}
            data-bs-parent="#domandeAccordion"
          >
            <div className="accordion-body">
              {/*
              Da completare DA QUI
              Risposta dell'utente*/}
              <p>
                {`${
                  testAnswer.gameMode === GameMode.Training
                    ? "La tua ultima risposta è stata: "
                    : "hai risposto: "
                }`}
                {
                  // (
                  //(
                  (risposta =
                    /* testAnswer.gameMode === GameMode.Training ? */
                    String(
                      Object.values(
                        testAnswer.rightAnswers[testAnswer.currentLevel]
                      )[index].map(
                        (item) =>
                          json.quizzes[testAnswer.currentLevel].find(
                            ({ id }: { id: string }) =>
                              Object.keys(
                                testAnswer.rightAnswers[testAnswer.currentLevel]
                              )[index]
                          )?.answers[item].answer
                      )
                    ))
                  /* : "" */
                }
                ;
              </p>

              {/*
               Stato della risposta */}
              {testAnswer.gameMode === GameMode.Training ? (
                <p
                  className={
                    Object.values(
                      testAnswer.rightAnswers[testAnswer.currentLevel]
                    )[index].length == 1
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {Object.values(
                    testAnswer.rightAnswers[testAnswer.currentLevel]
                  )[index].length == 1
                    ? "Risposta corretta!"
                    : "Risposta errata!"}
                </p>
              ) : (
                //GAMEMODE.CHALLENGE
                <p
                  className={
                    Object.entries(
                      testAnswer.rightAnswers[testAnswer.currentLevel]
                    ).map((item, index) =>
                      json.quizzes[testAnswer.currentLevel]
                        .find(
                          ({ id: quizID }: { id: string }) => item[0] === quizID
                        )
                        ?.answers.findIndex(({ correct }) => correct) ===
                      item[1][0]
                        ? "text-success"
                        : "text-danger"
                    )[index]
                  }
                >
                  {
                    Object.entries(
                      testAnswer.rightAnswers[testAnswer.currentLevel]
                    ).map((item) =>
                      json.quizzes[testAnswer.currentLevel]
                        .find(
                          ({ id: quizID }: { id: string }) => item[0] === quizID
                        )
                        ?.answers.findIndex(({ correct }) => correct) ===
                      item[1][0]
                        ? "Risposta corretta!"
                        : "Risposta errata!"
                    )[index]
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Question;
