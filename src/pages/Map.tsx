import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import "./Quiz/index.scss";
import "./map.scss"
import data from "../data.json";
import { useState } from "react";
import { Data,JSON } from "./Home";

const Map = () => {
    const { state }: { state: Data } = useLocation();

    const loadLevel = (numberLevel:string) => {
        state.currentLevel = numberLevel;
        const numberLevelTest = numberLevel as keyof typeof answers;
        const dim = 5
        
        const json: JSON = data as JSON;

        const quizzes = json.quizzes[numberMapTest].slice(dim).map(({id})=> id);
        //const quizzes = answers[numberMapTest][0].quizzes.map(({id})=> id).sort(()=>0.5-Math.random()).slice(dim);


        state.quizzes ={numberLevel : quizzes};
    };

    return (
        <>
            <div className="mapMenu d-flex flex-column align-items-center p-5 vh-100">
                <h1>Scegli da dove cominciare</h1>
                <div className="sfondoMap">
<<<<<<< Updated upstream
                    <div className="roadMap d-flex">
                        {/* <Link to={`/quiz/${state.quizzes[state.currentLevel][0]}`} state={data}>
                            <button className="mt-5" onClick={() => loadLevel("livello1")}>
                                1
                            </button>
                        </Link> */}

                        

                        <Link className="p-2 mt-5" to="/quiz/1" state={data}>
                            <button className="" onClick={() => loadLevel("livello1")}>
                                1
                            </button>
                        </Link>
                        <Link className="p-2" to="/quiz/1" state={data}>
                            <button className="" onClick={() => loadLevel("livello2")}>
                                2
                            </button>
                        </Link>
                        <Link className="p-2 mt-5" to="/quiz/1" state={data}>
                            <button className="" onClick={() => loadLevel("livello3")}>
                                3
                            </button>
                        </Link>
                        <Link className="p-2" to="/quiz/1" state={data}>
                            <button className="" onClick={() => loadLevel("livello4")}>
                                4
                            </button>
                        </Link>
                        <Link className="p-2 mt-5" to="/quiz/1" state={data}>
                            <button className="" onClick={() => loadMap("map5")}>
=======
                    <div className="roadMap d-flex justify-content-between">
                        {/* <Link to={`/quiz/${state.quizzes[state.currentLevel][0]}`} state={data}>
                            <button className="mt-5" onClick={() => loadLevel("livello1")}>
                                1
                            </button>
                        </Link>  */}
                        <Link  to="/quiz/1" state={data}>
                            <button className="btn btn-primary p-4 m-5" onClick={() => loadMap("map1")}>
                                1
                            </button>
                        </Link>
                        <Link  to="/quiz/1" state={data}>
                            <button className="btn btn-primary p-4 m-5" onClick={() => loadMap("map2")}>
                                2
                            </button>
                        </Link>
                        <Link  to="/quiz/1" state={data}>
                            <button className="btn btn-primary p-4 m-5" onClick={() => loadMap("map3")}>
                                3
                            </button>
                        </Link>
                        <Link  to="/quiz/1" state={data}>
                            <button className="btn btn-primary p-4 m-5" onClick={() => loadMap("map4")}>
                                4
                            </button>
                        </Link>
                        <Link  to="/quiz/1" state={data}>
                            <button className="btn btn-primary p-4 m-5" onClick={() => loadMap("map5")}>
                                5
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Map;