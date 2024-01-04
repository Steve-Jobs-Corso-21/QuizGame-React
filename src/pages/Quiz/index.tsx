import { Link, useParams } from "react-router-dom";
import "./index.scss";
import data from "../../data.json";
import { useState } from "react";
import Timer from "./Timer";
import Modal from "../../components/Modal";

const Quiz = () => {
    const { id } = useParams();

    const [correct, setCorrect] = useState<boolean | null>(null);
    const [stopTimer, setStopTimer] = useState<boolean>(false);

    const quiz = data.quizzes.find(({ id: quizId }) => quizId === id);

    const explainModalID = "explainModal";

    const answerClick = (correct: boolean) => {
        setCorrect(correct);
        setStopTimer(true);
    }

    return (
        <div>
            <Modal modalID={explainModalID} isCorrect={correct} description={quiz?.description} url={`/quiz/2`}></Modal>

            { /* // TODO : ICON PACK DA METTERE */}
            <nav className="mx-4 nav d-flex align-items-center justify-content-center">
                <h1 className="my-2 pe-5">MONDO: {id}</h1>
                <div className="bar d-flex justify-content-lg-end align-items-center">
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                </div>
            </nav>

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

                    <Timer maxTime={10} stopTimer={stopTimer} modalID={explainModalID}></Timer>
                </div>
            )}


        </div>
    );
};

export default Quiz;

// TODO: Testo che cambia in base alla lunghezza della domanda stessa
// TODO: Centrare le risposte verticalmente, se non c'è una immagine