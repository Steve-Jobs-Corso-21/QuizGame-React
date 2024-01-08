import { Link, useParams, useSearchParams } from "react-router-dom";
import "./Quiz/index.scss";
import "./home.scss";
import { useState } from "react";

export type Data = {
    "gameMode": string,
    "currentLevel": string,
    "quizzes": {
        [key: string]: string[]
    },
    "rightAnswers": {
        [key: string]: [
            { "id": string, "answer": string, "rightAfter": number }
        ]
    }
}

let data: Data = {
    "gameMode": "allenamento",
    "currentLevel": "",
    "quizzes": {
        //"mondo1": ["1","2","3"]
    },
    "rightAnswers": {
        /* "mondo1" : [
             {"id": "1", "answer": "txt", "rightAfter": 1},
         ]*/

    }
}

const Menu = () => {
    const [y, sety] = useState<string>("allenamento");
    const modeClick = (mode: string) => {
        data.gameMode = mode;
        sety(mode);
    }

    return (
        <>
            <div className="mainMenu d-flex flex-column align-items-center justify-content-around vh-100">
                <h1>Cyberquiz</h1>
                <div className="box-mod d-flex flex-column align-items-center mt-5 px-5 py-2">
                    <h2>Scegli la modalita'</h2>
                    <button type="button" className={`btn-custom btn btn-primary p-3 m-2 ${y === "allenamento" && "active"}`} data-bs-toggle="button" aria-pressed={y === "allenamento" ? "true" : "false"} onClick={() => modeClick("allenamento")} >Allenamento</button>
                    <button type="button" className={`btn-custom btn btn-primary p-3 m-2 ${y === "sfida" && "active"}`} data-bs-toggle="button" aria-pressed={y === "sfida" ? "true" : "false"} onClick={() => modeClick("sfida")} >Sfida</button>
                </div>
                <Link to="/map" state={data}>
                    <button className="btn-custom btn btn-primary p-3">
                        Gioca
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Menu;