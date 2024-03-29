import { useLocation } from "react-router-dom";
import { JSON, Data } from "../Home";
import data from "../../questions.json";

import "./index.scss";

const Question = () => {
    const { state }: { state: Data } = useLocation();
    const json: JSON = data;

    return (
        <div className="accordion" id="questionAccordion">
            {state.rightAnswers[state.currentLevel].quiz.map(
                (question, index, array) => (
                    <div className="accordion-item shadow-none" key={index}>
                        <h2
                            className="accordion-header"
                            id={`questionHeading${index}`}
                        >
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#questionCollapse${index}`}
                                aria-expanded="true"
                                aria-controls={`questionCollapse${index}`}
                            >
                                {
                                    json.maps[state.currentLevel].quizzess.find(
                                        ({ id: quizID }) =>
                                            quizID ===
                                            state.rightAnswers[
                                                state.currentLevel
                                            ].quiz[index].id
                                    )?.question
                                }
                            </button>
                        </h2>

                        <div
                            id={`questionCollapse${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#questionAccordion"
                        >
                            <div className="accordion-body">
                                <p>
                                    Hai risposto: <br />
                                    <b
                                        dangerouslySetInnerHTML={{
                                            __html: state.rightAnswers[
                                                state.currentLevel
                                            ].quiz[index].answers
                                                .map(
                                                    (item) =>
                                                        "- " +
                                                        json.maps[
                                                            state.currentLevel
                                                        ].quizzess.find(
                                                            ({
                                                                id: quizID,
                                                            }: {
                                                                id: string;
                                                            }) =>
                                                                quizID ===
                                                                state
                                                                    .rightAnswers[
                                                                    state
                                                                        .currentLevel
                                                                ].quiz[index].id
                                                        )?.answers[item].answer
                                                )
                                                .join(" <br/>"),
                                        }}
                                    />
                                </p>
                                <p
                                    className={`${
                                        json.maps[state.currentLevel].quizzess
                                            .find(
                                                ({
                                                    id: quizID,
                                                }: {
                                                    id: string;
                                                }) =>
                                                    quizID ===
                                                    state.rightAnswers[
                                                        state.currentLevel
                                                    ].quiz[index].id
                                            )
                                            ?.answers.findIndex(
                                                ({ correct }) => correct
                                            ) ===
                                        state.rightAnswers[state.currentLevel]
                                            .quiz[index].answers[0]
                                            ? "text-success"
                                            : "text-danger"
                                    }
                `}
                                >
                                    {`Risposta ${
                                        json.maps[state.currentLevel].quizzess
                                            .find(
                                                ({
                                                    id: quizID,
                                                }: {
                                                    id: string;
                                                }) =>
                                                    quizID ===
                                                    state.rightAnswers[
                                                        state.currentLevel
                                                    ].quiz[index].id
                                            )
                                            ?.answers.findIndex(
                                                ({ correct }) => correct
                                            ) ===
                                        state.rightAnswers[state.currentLevel]
                                            .quiz[index].answers[0]
                                            ? "corretta"
                                            : "sbagliata"
                                    }
                `}
                                </p>
                                <p>
                                    {
                                        json.maps[
                                            state.currentLevel
                                        ].quizzess.find(
                                            ({ id: quizID }: { id: string }) =>
                                                quizID ===
                                                state.rightAnswers[
                                                    state.currentLevel
                                                ].quiz[index].id
                                        )?.description
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Question;
