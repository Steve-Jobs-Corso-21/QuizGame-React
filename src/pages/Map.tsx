import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Quiz/index.scss";
import "./map.scss";
import data from "../data.json";
import { Data, GameMode, JSON } from "./Home";
import Header from "../components/Header";
import { useEffect } from "react";

const Map = () => {
    const { state }: { state: Data } = useLocation();
    // console.log(state);

    const json: JSON = data;
    console.log(json.maps);

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

        state.rightAnswers[state.currentLevel] = {};

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
                    <div className="conteiner-map offset-2 col-8 align-center">
                        {Object.values(json.quizzes).map((_, i, arr) => (
                            <div>
                                <div className={`box-button d-flex justify-content-between ${i % 2 ? "flex-row-reverse" : ""}`}>
                                    <button className={`map-btn d-flex flex-column ${i % 2 ? "right ms-auto" : "left"} ${checkLevel(i + 1) ? "disabled" : ""}`}
                                        onClick={() => !checkLevel(i + 1) && loadLevel(`map${i + 1}`)}
                                        key={i}>
                                        {i + 1}
                                    </button>
                                    <div className="card-map d-flex flex-column flex-start justify-content-center">
                                        <h1 className="text-uppercase">{json.maps[i].name}</h1>
                                        <p className="text-world">{json.maps[i].description}</p>
                                    </div>
                                </div>
                                {i < arr.length - 1 && (
                                    <svg>
                                        <path d="M1,1 Q1,8 8,8 Q16,8 16,16" stroke="#000" fill="transparent" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    );
};

export default Map;
