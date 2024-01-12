import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Quiz/index.scss";
import "./map.scss";
import data from "../questions.json";
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

    const loadLevel = (numberLevel: number) => {
        state.currentLevel = numberLevel;
        const dim = 5;

        const quizzes = json.maps[state.currentLevel].quizzess
            .map(({ id }) => id)
            .sort(() => 0.5 - Math.random())
            .slice(0, dim);

        state.quizzes = quizzes;

        state.rightAnswers = state.rightAnswers.filter((item) => item != state.rightAnswers[state.currentLevel]);

        navigate(`/quiz/${state.quizzes[0]}`, { state });
    };
    const levelGenerator = (Data: JSON) => {
        const len = Object.keys(Data.maps);
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
                        { json.maps.map((item, index, arr) => (
                            <div>
                                <div className={`box-button d-flex justify-content-between ${index % 2 && "flex-row-reverse"}`}>
                                    <button className={`map-btn d-flex flex-column ${index % 2 ? "right ms-auto" : "left"} ${checkLevel(index + 1) && "disabled"}`}
                                        onClick={() => !checkLevel(index + 1) && loadLevel(index)}
                                        key={index}>
                                        {index}
                                    </button>
                                    <div className="card-map d-flex flex-column flex-start justify-content-center">
                                        <h1 className="text-uppercase">{json.maps[index].name}</h1>
                                        <p className="text-world">{json.maps[index].description}</p>
                                    </div>
                                </div>
                                {index < arr.length && (
                                    <div className="separator"></div>
                                )}
                            </div>
                        ))

                        }
                    </div>
                </div>
            </>
        )
    );
};

export default Map;
