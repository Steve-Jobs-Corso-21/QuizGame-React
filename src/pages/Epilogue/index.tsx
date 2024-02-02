import { Link, useLocation } from "react-router-dom";
import { Data } from "../Home";
import {maps} from "../../questions";
import "./index.scss";
import Header from "../../components/Header";
import AnimatedProgressProvider from "../../components/AnimatedProgressProvider";
import { easeExpOut } from "d3-ease";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Epilogue = () => {
    const { state }: { state: Data } = useLocation();
    const errorNumber = state.rightAnswers.reduce(
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
                        maps[index].quizzess
                            .find(({ id }) => id === q.id)
                            ?.answers.findIndex(({ correct }) => correct)
                            ? 0
                            : 1),
                0
            )),
        0
    );

    const totalQuestions = state.rightAnswers.length * state.rightAnswers[0].quiz.length;

    const scoring = (totalQuestions - errorNumber) * (100 / totalQuestions);

    const color =
        scoring === 100
            ? "rgba(45, 124, 255, 1)"
            : scoring > 50
            ? "rgba(45, 198, 46, 1)"
            : scoring > 25
            ? "rgba(255, 209, 0,1)"
            : "rgba(255, 124, 0, 1)";

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

                    <div className="epilogue-description-container ms-auto me-auto" style={{width: "300px", margin: "100px 0"}}>
                        <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={scoring}
                        duration={1.4}
                        easingFunction={easeExpOut}>
                            {(value: number) => (
                                <CircularProgressbar
                                    value={value}
                                    text={`${value.toFixed(0)}%`}
                                    minValue={0}
                                    maxValue={100}
                                    styles={buildStyles({
                                        pathColor: color,
                                        textColor: color,
                                    })}
                                />
                            )}
                        </AnimatedProgressProvider>
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
