import { Link, useLocation } from "react-router-dom";
import "./Quiz/index.scss";
import "./map.scss"
import data from "../data.json";
import { Data,JSON } from "./Home";
import Header from "../components/Header";

const Map = () => {
    const { state }: { state: Data } = useLocation();

    const loadLevel = (numberLevel:string) => {
        state.currentLevel = numberLevel;
        const dim = 5
        
        const json: JSON = data as JSON;
        const quizzes = json.quizzes[numberLevel].map(({id})=> id).sort(()=>0.5-Math.random()).slice(0, dim);
        console.log(quizzes);

        state.quizzes ={[numberLevel] : quizzes};
    };

    return (
        <>
            <Header
                htmlBlock={(<h1>Scegli da dove cominciare</h1>)}
                audio={true}
                audioURL={""}>
            </Header>
            <div className="mapMenu d-flex flex-column align-items-center p-5 vh-100">
                <div className="sfondoMap">
                    <div className="roadMap d-flex">
                        {/* <Link to={`/quiz/${state.quizzes[state.currentLevel][0]}`} state={data}>
                            <button className="mt-5" onClick={() => loadLevel("livello1")}>
                                1
                            </button>
                        </Link> */}

                        

                        <Link className="p-2 mt-5" to="/quiz/1" state={state}>
                            <button className="" onClick={() => loadLevel("map1")}>
                                1
                            </button>
                        </Link>
                        <Link className="p-2" to="/quiz/1" state={state}>
                            <button className="" onClick={() => loadLevel("map2")}>
                                2
                            </button>
                        </Link>
                        <Link className="p-2 mt-5" to="/quiz/1" state={state}>
                            <button className="" onClick={() => loadLevel("map3")}>
                                3
                            </button>
                        </Link>
                        <Link className="p-2" to="/quiz/1" state={state}>
                            <button className="" onClick={() => loadLevel("map4")}>
                                4
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Map;