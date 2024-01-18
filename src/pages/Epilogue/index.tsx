import { Link, useLocation } from "react-router-dom";
import { JSON, Data, GameMode } from "../Home";
import data from "../../questions.json";
import "./index.scss";
import Header from "../../components/Header";

const Epilogue = () => {
    const { state }: { state: Data } = useLocation();
    const json: JSON = data;

    console.log(state);

    const errorNumber: number = 2;

    /* const errorNumber = state.rightAnswers.reduce(
        (totAcc, map, index) =>
            (totAcc += map.quiz.reduce(
                (
                    acc: number,
                    q: {
                        id: string;
                        answers: number[];
                    }
                ) =>
                    (acc +=
                        q.answers[0] ===
                        json.maps[index].quizzess
                            .find(({ id }) => id === q.id)
                            ?.answers.findIndex(({ correct }) => correct)
                            ? 0
                            : 1),
                0
            )),
        0
    ); */

    return (
        <div className="page-container">
            <Header />

            <div className="epilogue-container">
                <div className="epilogue-content">
                    <h1 className="epilogue-title">
                        Complimenti!
                        <br />
                        Hai completato la modalità Challenge!
                    </h1>

                    <div className="epilogue-description-container">
                        <p className="epilogue-description">
                            {errorNumber <= 0 ? (
                                <b className="epilogue-description-bold epilogue-description-no-errors">
                                    Non hai fatto nessun errore!
                                </b>
                            ) : (
                                <>
                                    Hai fatto{" "}
                                    <b className="epilogue-description-bold epilogue-description-errors">
                                        {errorNumber}{" "}
                                        {`error${
                                            errorNumber === 1 ? "e" : "i"
                                        }!`}
                                    </b>
                                </>
                            )}
                        </p>
                    </div>

                    <Link to="/" className="back-to-home-btn">
                        <button className="btn btn-primary">
                            Torna alla Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Epilogue;
