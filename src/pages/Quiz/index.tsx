import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./index.scss";
import data from "../../data.json";
import { Data } from "../Home";
import Timer from "./Timer";
import Modal from "../../components/Modal";
import Header from "../../components/Header";

// TODO: Unable back to already responded questions
// TODO: Testo che cambia in base alla lunghezza della domanda stessa
// TODO: Centrare le risposte verticalmente, se non c'è una immagine
// TODO: Se è allenamento, non mostrare la modale, ma continua a fare rispondere fino alla risposta corretta, se le sbaglia tutte l'ultima è sicuro quella giusta
// se è giusta mostra la modale



// /quiz/:id
const Quiz = () => {
    // change this to change max time for answer a question (in seconds)
    const MAXTIME = 10;
    // change this to change modal id
    const explainModalID = "explainModal";

    // get id from url
    const { id } = useParams();

    // called at load of question
    useEffect(() => {
        // reset time
        setStopTimer(false);
        setMaxTime(MAXTIME);
    }, [id]);

    // get data through pages 
    const { state }: { state: Data } = useLocation();
    const currentLevel = state.currentLevel;
    const isTraining = state.isTraining;
    const quizzes = state.quizzes[currentLevel];
    const currentQuiz = quizzes.findIndex((q: string) => q === id);

    // hooks
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [stopTimer, setStopTimer] = useState<boolean>(false);
    const [maxTime, setMaxTime] = useState(MAXTIME);

    // get right quiz
    const quiz = data.quizzes.find(({ id: quizId }) => quizId === id);

    // handle answer click
    const answerClick = (correct: boolean) => {
        setCorrect(correct);
        setStopTimer(true);
        // setta variabile con correct
    }

    return (
        <div>
            {/* {isTraining ? correct && (

            ) : (

            )} */}

            <Modal modalID={explainModalID} isCorrect={correct}
                description={quiz?.description}
                url={currentQuiz >= quizzes.length - 1 ? "/stats" : `/quiz/${quizzes[currentQuiz + 1]}`}
                state={state}></Modal>

            { /* // TODO : ICON PACK DA METTERE */}
            <Header home={true} title={
                <nav className="mx-4 nav d-flex align-items-center justify-content-center">
                    <h1 className="my-2 pe-5">MONDO: {id}</h1>
                    <div className="bar d-flex justify-content-lg-end align-items-center">
                        <div className="ball"></div>
                        <div className="ball"></div>
                        <div className="ball"></div>
                        <div className="ball"></div>
                        <div className="ball"></div>
                    </div>
                </nav>} 
                audio={true} id={id} url={"/"} state ={ state }>
            </Header>

            {quiz && (
                <div>
                    <h2 className="d-flex align-items-center justify-content-center mt-3 pt-3 fs-1">{quiz.question}</h2>
                    <div className="d-flex align-items-center justify-content-between row m-0 px-5">
                        <div className={`d-flex flex-wrap col-lg-${quiz.image ? 6 : 12}`}>
                            {quiz.answers.map(({ answer, correct }) => (
                                <button className={`text-align-center btn btn-primary btn-block btn-custom col-${quiz.image ? 12 : 4}`}
                                    data-bs-toggle="modal" data-bs-target={"#" + explainModalID}
                                    key={answer} onClick={() => answerClick(!!correct)}>
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
                    { /* //! Noi non abbiamo il tasto per il prossimo livello <Link to="/quiz/2">VAI AL PROSSIMO</Link> */}

                    {!isTraining && (
                        <Timer quizID={id} maxTime={maxTime} stopTimer={stopTimer} modalID={explainModalID}></Timer>
                    )}
                </div>
            )}


        </div>
    );
};

export default Quiz;