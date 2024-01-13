import { Link } from "react-router-dom";
import "./Quiz/index.scss";
import "./home.scss";
import { useState } from "react";
import Modal from "../components/Modal";
import Header from "../components/Header";

export enum GameMode {
    Training,
    Challenge,
}

type Stat = {
    id: string,
    answers: number[]
}

type StatMap = {
    quiz: Stat[]
}

export type Data = {
    gameMode: GameMode;
    currentLevel: number;
    quizzes: string[];
    rightAnswers: StatMap[];
};

type Answer = {
    answer: string;
    correct?: boolean;
};

type QuizType = {
    id: string;
    question: string;
    description: string;
    imageUrl?: string;
    answers: Answer[];
};

type Map = {
    name: string,
    color: string,
    description: string,
    imageUrl: string,
    quizzess: QuizType[]
};

export type JSON = {
    maps: Map[];
};

const Menu = () => {
    const [y, sety] = useState<GameMode>(GameMode.Training);
    const modeClick = (mode: GameMode) => {
        data.gameMode = mode;
        sety(mode);
    };

    let data: Data = {
        gameMode: GameMode.Training,
        currentLevel: 0,
        quizzes: [], // ["1","2","3"]
        rightAnswers: []
        /* rightAnswers: [
            {
                "quiz": [
                    {
                        id: "1",
                        anwers: [0]
                    },
                    {
                        id: "5",
                        answers: [0,1,2]
                    }
                ]
            }
        ]
        */
    };

    return (
        <>
            <Modal modalID="11"
                bgColor=""
                description={<>
                    Allenamento: In modalità allenamento potrai esercitarti sui vari argomenti che preferisci senza preoccuparti
                    di sbagliare.
                    <br />
                    Sfida: In modalità sfida dovrai testare le tue abilità in una prova a tempo dove dovrai cercare di fare il minor numero di
                    errori possibili.
                </>}

                title="Modalità di gioco:"
                buttons={[{ "text": "continua", "url": "/" }]}
            >

            </Modal>
            <Header
                htmlBlock={""}
                audio={true}
                audioURL={""}
            />
            <div className="mainMenu d-flex flex-column align-items-center justify-content-around vh-100">
                <h1>Cyberquiz</h1>
                <div className="box-mod d-flex flex-column align-items-center mt-5 px-5 py-2">
                    <div className="d-flex">
                        <h2 className="me-5">Scegli la modalita'</h2>
                        <button className="btn-info btn-primary "
                            data-bs-toggle="modal"
                            data-bs-target="#11"
                        >
                            <img src="info-circle.svg" alt="" />
                        </button>
                    </div>
                    <Link
                        className="btn-custom-home btn btn-primary p-3 m-2"
                        to="/map"
                        state={data}
                        onClick={() => modeClick(GameMode.Training)}
                    >
                        Allenamento
                    </Link>
                    <Link
                        className="btn-custom-home btn btn-primary p-3 m-2"
                        to="/map"
                        state={data}
                        onClick={() => modeClick(GameMode.Challenge)}
                    >
                        Sfida
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Menu;
