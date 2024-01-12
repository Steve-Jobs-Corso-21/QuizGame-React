import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./index.scss";
import { GameMode, Data, JSON } from "../Home";
import data from "../../questions.json";
import Timer from "./Timer";
import Modal from "../../components/Modal";
import Header from "../../components/Header";

// TODO: Unable back to already responded questions
// TODO: Testo che cambia in base alla lunghezza della domanda stessa
// TODO: Centrare le risposte verticalmente, se non c'è una immagine
// TODO: Se aggiungiamo un bottone per tornare alla mappa, resettare rightAnswers della mappa corrente

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
    console.log(state);
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
    const json : JSON = data;
    const quiz = json.maps[currentLevel]?.quizzess.find(({ id : quizID } : { id: string }) => quizID === id);

    // called at load of question
    useEffect(() => {
        setAnswered([]);
        // reset time
        setStopTimer(false);
        setMaxTime(MAXTIME);
    }, [id]);

    // handle answer click
    const answerClick = (correct: boolean, answerIndex: number) => {
        // setta variabile con correct
        !answered.includes(answerIndex) && answered.push(answerIndex) && setAnswered([...answered]);
        state.rightAnswers[currentLevel]
        ? state.rightAnswers[currentLevel] = {id: id!, answers: answered}
        : state.rightAnswers.push({id: id!, answers: answered})

        console.log(state);

        setCorrect(correct);
        setStopTimer(true);
    }

    return (
        <div>
            <Modal modalID={explainModalID}
                bgColor={(!stopTimer || !correct) ? "bg-danger" : "bg-success"}
                description={quiz?.description}
                title={!stopTimer ? "Tempo Scaduto" : `Risposta ${correct ? "Esatta" : "Sbagliata"}`}
                buttons={[
                    {"text": "Continua", "url": currentQuiz >= quizzes.length - 1
                        ? "/map"
                        : `/quiz/${quizzes[currentQuiz + 1]}`}
                ]}
                state={state}>
            </Modal>

            <Header
                htmlBlock={(
                    <nav className="mx-4 nav d-flex align-items-center justify-content-center">
                        <h1 className="my-2 pe-5">{json.maps[currentLevel].name}</h1>
                        <div className="bar d-flex justify-content-lg-end align-items-center">
                            {quizzes.map((mapQuiz) => (
                                <div className={`ball ${
                                    // coloro le ball in base allo stato della domanda
                                    mapQuiz === id
                                        ? "bg-warning" // DOMANDA IN CORSO
                                        : state.rightAnswers[currentLevel] && state.rightAnswers[currentLevel].id === mapQuiz
                                            ? json.maps[currentLevel].quizzess.find(({ id: quizID} : { id : string}) => mapQuiz === quizID)?.answers[state.rightAnswers[currentLevel].answers[0]].correct
                                                ? "bg-success" // RISPOSTA GIUSTA
                                                : "bg-danger" // RISPOSTA SBAGLIATA
                                            : "bg-secondary" // DOMANDA ANCORA DA RISPONDERE
                                }`}></div>
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
                        <div className={`d-flex flex-wrap col-lg-${quiz.imageUrl ? 6 : 12}`}>
                            {quiz.answers.map(({ answer, correct }, index) => (
                                <button className={`text-align-center btn btn-primary btn-block btn-custom col-${quiz.imageUrl ? 12 : 4}`}
                                    data-bs-toggle={gameMode === GameMode.Challenge || correct ? "modal" : ""} 
                                    data-bs-target={"#" + explainModalID}
                                    key={index} onClick={() => answerClick(!!correct, index)}
                                    disabled={
                                        answered.includes(index)
                                    }>
                                    {answer}
                                </button>
                            ))}
                        </div>
                        {quiz.imageUrl && (
                            <div className="d-flex align-items-center justify-content-center col-5 overflow-hidden">
                                <img className="w-100" src={quiz.imageUrl} alt={quiz.question} />
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