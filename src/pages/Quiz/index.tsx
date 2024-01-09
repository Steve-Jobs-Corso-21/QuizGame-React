import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./index.scss";
import { GameMode, Data, JSON } from "../Home";
import data from "../../data.json";
import Timer from "./Timer";
import Modal from "../../components/Modal";
import Header from "../../components/Header";

// TODO: Unable back to already responded questions
// TODO: Testo che cambia in base alla lunghezza della domanda stessa
// TODO: Centrare le risposte verticalmente, se non c'è una immagine

// /quiz/:id
const Quiz = () => {
    // change this to change max time for answer a question (in seconds)
    const MAXTIME = 10;
    // change this to change modal id
    const explainModalID = "explainModal";

    // get id from url
    const { id } = useParams();

    // get data through pages 
    const { state }: { state: Data } = useLocation();
    const currentLevel = state.currentLevel;
    const gameMode = state.gameMode;
    const quizzes = state.quizzes[currentLevel];
    const currentQuiz = quizzes.findIndex((q: string) => q === id);

    // hooks
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [stopTimer, setStopTimer] = useState<boolean>(false);
    const [maxTime, setMaxTime] = useState(MAXTIME);
    const [answered, setAnswered] = useState<string[]>([]);

    // get right quiz
    const json : JSON = data;
    const quiz = json.quizzes[currentLevel]?.find(({ id : quizID } : { id: string }) => quizID === id);
    console.log(quiz);

    // called at load of question
    useEffect(() => {
        setAnswered([]);
        // reset time
        setStopTimer(false);
        setMaxTime(MAXTIME);
    }, [id]);

    // handle answer click
    const answerClick = (correct: boolean, answer: string) => {
        // setta variabile con correct
        !answered.includes(answer) && setAnswered([...answered, answer]);
        state.rightAnswers[currentLevel] = {[id!]: answered};
        
        setCorrect(correct);
        setStopTimer(true);
    }

    return (
        <div>
            <Modal modalID={explainModalID}
                bgColor={correct ? "bg-success" : "bg-danger"}
                description={quiz?.description}
                title={stopTimer ? "Tempo Scaduto" : `Risposta ${correct ? "Esatta" : "Sbagliata"}`}
                buttons={[
                    {"text": "Continua", "url": currentQuiz >= quizzes.length - 1 ? "/stats" : `/quiz/${quizzes[currentQuiz + 1]}`}
                ]}
                state={state}>
            </Modal>

            <Header
                htmlBlock={(
                    <nav className="mx-4 nav d-flex align-items-center justify-content-center">
                        <h1 className="my-2 pe-5">{currentLevel}</h1>
                        <div className="bar d-flex justify-content-lg-end align-items-center">
                            {quizzes.map(() => (
                                <div className="ball"></div>
                            ))}
                        </div>
                    </nav>)}
                audio={true}
                audioURL={""}>
            </Header>

            {quiz && (
                <div>
                    <h2 className="d-flex align-items-center justify-content-center mt-3 pt-3 fs-1">
                        {quiz.question}
                    </h2>
                    <div className="d-flex align-items-center justify-content-between row m-0 px-5">
                        <div className={`d-flex flex-wrap col-lg-${quiz.image ? 6 : 12}`}>
                            {quiz.answers.map(({ answer, correct }) => (
                                <button className={`text-align-center btn btn-primary btn-block btn-custom col-${quiz.image ? 12 : 4}`}
                                    data-bs-toggle={gameMode === GameMode.Challenge || correct ? "modal" : ""} 
                                    data-bs-target={"#" + explainModalID}
                                    key={answer} onClick={() => answerClick(!!correct, answer)}
                                    disabled={
                                        answered.includes(answer)
                                    }>
                                    {answer}
                                </button>
                            ))}
                        </div>
                        {quiz.image && (
                            <div className="d-flex align-items-center justify-content-center col-5 overflow-hidden">
                                <img className="w-100" src={quiz.image} alt={quiz.question} />
                            </div>
                        )}
                    </div>

                    {gameMode === GameMode.Challenge && (
                        <Timer quizID={id} maxTime={maxTime} stopTimer={stopTimer} modalID={explainModalID}></Timer>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;