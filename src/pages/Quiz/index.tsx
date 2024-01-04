import { Link, useParams } from "react-router-dom";
import "./index.scss";
import data from "../../data.json";
import { useState } from "react";

const Quiz = () => {
    const { id } = useParams();

    const [correct, setCorrect] = useState<boolean | null>(null);

    const quiz = data.quizzes.find(({ id: quizId }) => quizId === id);

    return (
        <div>
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
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                    key={answer} onClick={() => setCorrect(!!correct)}>
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

                    {correct !== null && (
                        <div>
                            <div className={`${correct ? "bg-success" : "bg-danger"} modal fade bg-opacity-75`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-4" id="staticBackdropLabel">RISPOSTA {correct ? "CORRETTA" : "ERRATA"}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p className="fs-5">Descrizione approfondita della domanda...
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in arcu nisl. Sed non mauris nunc. Donec faucibus placerat mi. Nullam tincidunt orci sit amet dui pharetra, non suscipit eros ultricies. Morbi accumsan mollis nulla. Nullam tempor accumsan nisi ac malesuada. Vivamus dignissim felis vitae lobortis interdum. Nulla neque sem, aliquam auctor nisl eget, tincidunt accumsan est. Mauris nulla justo, dapibus quis molestie sit amet, laoreet nec dolor. Nunc iaculis, nisi at posuere ultricies, ante ex sagittis magna, ac blandit erat erat ut neque. Donec sed feugiat nibh, pharetra auctor nisi.
                                            </p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary">Continua</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    { /* //! Noi non abbiamo il tasto per il prossimo livello <Link to="/quiz/2">VAI AL PROSSIMO</Link> */}
                </div>
            )}
        </div>
    );
};

export default Quiz;

// TODO: Testo che cambia in base alla lunghezza della domanda stessa
// TODO: Centrare le risposte verticalmente, se non c'è una immagine