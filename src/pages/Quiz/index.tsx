import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./index.scss";
import { GameMode, Data, JSON } from "../Home";
import data from "../../questions.json";
import Timer from "../../components/Timer";
import Modal from "../../components/Modal";
import Header from "../../components/Header";

// TODO: Unable back to already responded questions
// TODO: Testo che cambia in base alla lunghezza della domanda stessa
// TODO: Se aggiungiamo un bottone per tornare alla mappa, resettare rightAnswers della mappa corrente

// /quiz/:id
const Quiz = () => {
    // change this to change max time for answer a question (in seconds)
    const MAXTIME = 25;
    // change this to change modal id
    const explainModalID = "explainModal";

    // get id from url
    const { id } = useParams();

    // get data through pages
    const { state }: { state: Data } = useLocation();

    // console.log(state);
    const currentLevel = state.currentLevel;
    const gameMode = state.gameMode;
    const quizzes = state.quizzes;
    const currentQuiz = quizzes.findIndex((q: string) => q === id);

    // hooks
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [stopTimer, setStopTimer] = useState<boolean>(false);
    const [maxTime, setMaxTime] = useState(MAXTIME);
    const [answered, setAnswered] = useState<number[]>([]);

    // get right quiz
    const json: JSON = data;
    const quiz = json.maps[currentLevel]?.quizzess.find(
        ({ id: quizID }: { id: string }) => quizID === id
    );

    // called at load of question
    useEffect(() => {
        setAnswered([]);
        if (!state.rightAnswers[currentLevel])
            state.rightAnswers[currentLevel] = { quiz: [] };

        if (
            !state.rightAnswers[currentLevel].quiz.find(
                ({ id: quizID }: { id: string }) => quizID === id
            )
        )
            state.rightAnswers[currentLevel].quiz.push({
                id: id!,
                answers: [],
            });

        // console.log(state);

        // reset time
        setStopTimer(false);
        setMaxTime(MAXTIME);

        //BTN PRIMARY COLOR CHANGE
        const btnsPrimary = document.querySelectorAll(
            ".btn-primary"
        ) as NodeListOf<HTMLElement>;

        if (btnsPrimary.length) {
            btnsPrimary.forEach((btn) => {
                btn.style.setProperty(
                    "--bs-btn-bg",
                    json.maps[state.currentLevel].color
                );
                btn.style.setProperty(
                    "--bs-btn-border-color",
                    json.maps[state.currentLevel].color
                );
            });
        }
    }, [id]);

    // handle answer click
    const answerClick = (correct: boolean, answerIndex: number) => {
        // setta variabile con correct
        !answered.includes(answerIndex) &&
            answered.push(answerIndex) &&
            setAnswered([...answered]);

        state.rightAnswers[currentLevel].quiz.find(
            ({ id: quizID }: { id: string }) => quizID === id
        )
            ? (state.rightAnswers[currentLevel].quiz.find(
                  ({ id: quizID }: { id: string }) => quizID === id
              )!.answers = answered)
            : state.rightAnswers[currentLevel].quiz.push({
                  id: id!,
                  answers: answered,
              });

        // console.log(state);

        if (state.audio) {
            correct
                ? new Audio("/audio/risposta_corretta.mp3").play()
                : new Audio("/audio/risposta_errata.mp3").play();
        }

        setCorrect(correct);
        setStopTimer(true);
    };

    return (
        <div className="quiz-container">
            <Modal
                modalID={explainModalID}
                bgColor={!stopTimer || !correct ? "bg-danger" : "bg-success"}
                description={quiz?.description}
                title={
                    !stopTimer
                        ? "Tempo Scaduto"
                        : `Risposta ${correct ? "Esatta" : "Sbagliata"}`
                }
                buttons={[
                    {
                        text: "Continua",
                        url:
                            currentQuiz >= quizzes.length - 1
                                ? "/score"
                                : `/quiz/${quizzes[currentQuiz + 1]}`,
                    },
                ]}
                state={state}
                textAlign="center"
            />

            <Header
                htmlBlock={
                    <div className="text-white quiz-header">
                        <h1 className="text-center w-100 quiz-header-title">
                            {json.maps[currentLevel].name}
                        </h1>
                        <div className="bar d-flex align-items-center">
                            {quizzes.map((mapQuiz) => (
                                <div
                                    className={`question-bar ${
                                        // coloro le ball in base allo stato della domanda
                                        mapQuiz === id
                                            ? "bg-warning" // DOMANDA IN CORSO
                                            : state.rightAnswers[
                                                  currentLevel
                                              ] &&
                                              state.rightAnswers[
                                                  currentLevel
                                              ].quiz.find(
                                                  ({
                                                      id: quizID,
                                                  }: {
                                                      id: string;
                                                  }) => quizID === mapQuiz
                                              )
                                            ? state.rightAnswers[
                                                  currentLevel
                                              ].quiz.find(
                                                  ({
                                                      id: quizID,
                                                  }: {
                                                      id: string;
                                                  }) => quizID === mapQuiz
                                              )!.answers.length > 0 &&
                                              json.maps[currentLevel].quizzess
                                                  .find(
                                                      ({
                                                          id: quizID,
                                                      }: {
                                                          id: string;
                                                      }) => quizID === mapQuiz
                                                  )
                                                  ?.answers.findIndex(
                                                      ({ correct }) => correct
                                                  ) ===
                                                  state.rightAnswers[
                                                      currentLevel
                                                  ].quiz.find(
                                                      ({
                                                          id: quizID,
                                                      }: {
                                                          id: string;
                                                      }) => quizID === mapQuiz
                                                  )!.answers[0]
                                                ? "bg-success" // RISPOSTA GIUSTA
                                                : "bg-danger" // RISPOSTA SBAGLIATA
                                            : "bg-secondary" // DOMANDA ANCORA DA RISPONDERE
                                    }`}
                                ></div>
                            ))}
                        </div>
                    </div>
                }
                bgColor={json.maps[currentLevel].color}
                audio={true}
                audioURL={""}
                backgroundAudioSrc="quiz"
            />

            {quiz && (
                <div className="quiz-content page-container">
                    <div className="quiz-question-container">
                        <h2 className="d-flex align-items-center justify-content-center poppins-title">
                            {quiz.question}
                        </h2>
                    </div>

                    <div
                        className={`col-lg-${
                            quiz.imageUrl ? 6 : 12
                        } btn-container`}
                    >
                        {quiz.answers.map(({ answer, correct }, index) => (
                            <button
                                className={`text-align-center btn btn-primary btn-block btn-custom poppins-text col-${
                                    quiz.imageUrl ? 12 : 4
                                } ${
                                    answered.includes(index) &&
                                    (correct ? "correct" : "wrong")
                                }`}
                                data-bs-toggle={
                                    gameMode === GameMode.Challenge || correct
                                        ? "modal"
                                        : ""
                                }
                                data-bs-target={"#" + explainModalID}
                                key={index}
                                onClick={() => answerClick(!!correct, index)}
                                disabled={answered.includes(index)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    {quiz.imageUrl && (
                        <div className="d-flex align-items-center justify-content-center col-5 overflow-hidden">
                            <img
                                className="w-100"
                                src={quiz.imageUrl}
                                alt={quiz.question}
                            />
                        </div>
                    )}

                    {gameMode === GameMode.Challenge && (
                        <Timer
                            quizID={id}
                            maxTime={maxTime}
                            stopTimer={stopTimer}
                            modalID={explainModalID}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
