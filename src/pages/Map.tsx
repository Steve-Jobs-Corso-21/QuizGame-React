import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Quiz/index.scss";
import "./map.scss";
import json from "../data.json";
import { Data, GameMode, JSON } from "./Home";
import Header from "../components/Header";
import { useEffect } from "react";

const Map = () => {
    const { state }: { state: Data } = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        !!!state && navigate("/");
    }, []);

    const loadLevel = (numberLevel: string) => {
        state.currentLevel = numberLevel;
        const dim = 5;

        const quizzes = (json as JSON).quizzes[numberLevel]
            .map(({ id }) => id)
            .sort(() => 0.5 - Math.random())
            .slice(0, dim);

        state.quizzes = quizzes;

        navigate(`/quiz/${state.quizzes[0]}`, { state });
    };
    const levelGenerator = (Data: JSON) => {
        const len = Object.keys(Data.quizzes);
    };
    levelGenerator(json);

    const checkLevel = (levelNumber: number) =>
        state.gameMode === GameMode.Challenge &&
        Object.keys(state.rightAnswers).includes(`map${levelNumber}`);

    return (
        !!state && (
            <>
                <Header
                    htmlBlock={<h1>Scegli da dove cominciare</h1>}
                    audio={true}
                    audioURL={""}
                />

                <div className="mapMenu">
                            <div className="conteiner-map offset-2 col-8">
                                    {Object.values(json.quizzes).map((_, i) => (
                                        <button
                                            className={
                                                "map-btn d-flex flex-column" +
                                                (i % 2 ? "right ms-auto m-5" : "left m-5") +
                                                " " +
                                                (checkLevel(i + 1) ? "disabled" : "")
                                            }
                                            onClick={() =>
                                                !checkLevel(i + 1) &&
                                                loadLevel(`map${i + 1}`)
                                            }
                                            key={i}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
            </>
        )
    );
};

export default Map;
