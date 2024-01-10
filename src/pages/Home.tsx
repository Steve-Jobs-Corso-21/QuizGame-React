import { Link } from "react-router-dom";
import "./Quiz/index.scss";
import "./home.scss";
import { useState } from "react";
import { link } from "fs";

export enum GameMode {
    Training,
    Challenge
}

export type Data = {
    "gameMode": GameMode,
    "currentLevel": string,
    "quizzes": {
        [key: string]: string[]
    },
    "rightAnswers": {
        [key: string]: {
            [key: string] : string[]
        }
    }
}
if(!GameMode.Training)
{

}
let data: Data = {
    "gameMode": GameMode.Training,
    "currentLevel": "",
    "quizzes": {
        //"mondo1": ["1","2","3"]
    },
    "rightAnswers": {
        /* "mondo1" : [
             "id" : ["risposta1", "risposta3", "risposta2"]
         ]*/

    }
}

type Answer = {
    answer: string;
    correct?: boolean;
};

type Quiz = {
    id: string;
    question: string;
    description: string;
    image?: string;
    answers: Answer[];
};

type Quizzes = {
    [key: string]: Quiz[];
};

export type JSON = {
    quizzes: Quizzes;
};

const Menu = () => {
    const [y, sety] = useState<GameMode>(GameMode.Training);
    const modeClick = (mode: GameMode) => {
        data.gameMode = mode;
        sety(mode);
    }

    return (
        <>
            <div className="mainMenu d-flex flex-column align-items-center justify-content-around vh-100">
                <h1>Cyberquiz</h1>
                <div className="box-mod d-flex flex-column align-items-center mt-5 px-5 py-2">
                    <h2>Scegli la modalita'</h2>  
                <Link className="btn-custom btn btn-primary p-3 m-2" to="/map" state={data}
                        onClick={() => modeClick(GameMode.Training) }>allenamento
                </Link>
                <Link className="btn-custom btn btn-primary p-3 m-2" to="/map" state={data}
                        onClick={() => modeClick(GameMode.Challenge) }>sfida

                </Link>
            </div>
        </div>
        </>
    );
};

export default Menu;