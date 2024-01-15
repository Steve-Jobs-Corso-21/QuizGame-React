import { useLocation, useNavigate } from "react-router-dom";
import "../Quiz/index.scss";
import "./index.scss";
import data from "../../questions.json";
import { Data, GameMode, JSON } from "../Home";
import Header from "../../components/Header";
import { useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

const Map = () => {
    const { state }: { state: Data } = useLocation();
    // console.log(state);

    const json: JSON = data;
    // console.log(json.maps);

    const navigate = useNavigate();

    const scoring = json.maps.map((map, index) => 
        state.rightAnswers[index]
            ? state.gameMode === GameMode.Training
                ? state.rightAnswers[state.currentLevel].quiz.filter(({ answers }) => answers.length === 1).length * (100 / state.rightAnswers[state.currentLevel].quiz.length)
                : state.rightAnswers[state.currentLevel].quiz.filter(({id} : {id: string}) => 
                state.rightAnswers[state.currentLevel].quiz.find(({id : quizID} : {id: string})=> quizID === id)!.answers.length > 0 &&
                json.maps[state.currentLevel].quizzess.find(({id : quizID} : {id: string})=> quizID === id)?.answers.findIndex(({correct}) => correct) === state.rightAnswers[state.currentLevel].quiz.find(({id : quizID} : {id: string})=> quizID === id)!.answers[0]
                ).length * (100 / state.rightAnswers[state.currentLevel].quiz.length)
            : 0
    );

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

    const checkLevel = (levelNumber: number) =>
        state.gameMode === GameMode.Challenge &&
        Object.keys(state.rightAnswers).includes(`map${levelNumber}`);

    return (
        !!state && (
            <>
                <Header
                htmlBlock={<h1>{state.gameMode === GameMode.Training ? "Modalità Allenamento" : "Modalità Sfida"}</h1>}
                audio={true}
                audioURL={""}/>

                <div className="mapMenu">
                    <div className="conteiner-map offset-2 col-8 align-center">
                        { json.maps.map((item, index, arr) => (
                            <div>
                                <div className={`d-flex justify-content-center gap-5 ${index % 2 && "flex-row-reverse"}`}>
                                    <div className="w-50">
                                        <button className={`map-btn d-flex flex-column ${index % 2 ? "right me-auto" : "left ms-auto"} ${checkLevel(index + 1) && "disabled"}`}
                                        onClick={() => !checkLevel(index + 1) && loadLevel(index)}
                                        key={index}>
                                            <div style={{ width: "200px", backgroundColor: "white", borderRadius: "50%"}}>
                                                <CircularProgressbarWithChildren value={scoring[index]} maxValue={100} minValue={0} styles={buildStyles({pathColor: json.maps[index].color})}>
                                                    <div className="d-flex align-items-center map-logo">
                                                        <img className="img-fluid align-middle" src={json.maps[index].imageUrl} alt={json.maps[index].name}/>
                                                    </div>
                                                </CircularProgressbarWithChildren>
                                            </div>

                                            
                                        </button>
                                    </div>
                                    <div className={`d-flex flex-column justify-content-center w-50 ${index % 2 ? "text-end" : "text-start"}`}>
                                        <h1 className="text-uppercase">{json.maps[index].name}</h1>
                                        <p className="text-world">{json.maps[index].description}</p>
                                    </div>
                                </div>
                                {index < arr.length - 1 && (
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="1 1 15 15"
                                    className={`svg ${index % 2 ? "inversed-svg" : ""}`}>
                                        <path
                                            d="M1,1 Q1,8 8,8 Q16,8 16,16"
                                            stroke="#D6D6D6"
                                            fill="none"
                                        />
                                    </svg>
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
