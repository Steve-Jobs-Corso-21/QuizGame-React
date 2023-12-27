import { Link, useParams, useSearchParams } from "react-router-dom";
import "./index.scss";
import data from "../../data.json";
import { useState } from "react";

const Quiz = () => {
    const { id } = useParams();

    const [correct, setCorrect] = useState<boolean | null>(null);

    const quiz = data.quizzes.find(({ id: quizId }) => quizId === id);

    return (
        <div>
            <h1 className="cus">QUIZ ID: {id}</h1>
            {quiz && (
                <div>
                    <h2>{quiz.question}</h2>

                    <div>
                        {quiz.answers.map(({ answer, correct }) => (
                            <button onClick={() => setCorrect(!!correct)}>
                                {answer}
                            </button>
                        ))}
                    </div>

                    {correct !== null && (
                        <p>RISPOSTA {correct ? "CORRETTA" : "ERRATA"}</p>
                    )}

                    <Link to="/quiz/2">VAI AL PROSSIMO</Link>
                </div>
            )}
        </div>
    );
};

export default Quiz;
