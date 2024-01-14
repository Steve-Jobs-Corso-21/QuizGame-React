import { Link } from "react-router-dom";
import "./Quiz/index.scss";
import "./home.scss";
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
    const modeClick = (mode: GameMode) => {
        data.gameMode = mode;
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
            <Modal modalID="modeModal"
            bgColor="bg-dark"
            description={<>
                <div>
                    <b>Allenamento</b>
                    <p>In modalità allenamento potrai scegliere i quiz che preferisci, senza preoccuparti di sbagliare.</p>
                </div>
                <div>
                    <b>Sfida</b>
                    <p>In modalità sfida dovrai testare le tue abilità in una prova a tempo, cercando di fare il minor numero di errori possibili.</p>
                </div>
            </>}
            canClose={true}
            title="Modalità di gioco"/>

            <Header
            htmlBlock={""}
            bgColor={"transparent"}
            audio={true}
            audioURL={""}/>

            <div className="mainMenu d-flex flex-column align-items-center justify-content-around">
                <img className="img-fluid" src="cyber-logo.png" alt="logo"/>
                <h1>CyberQuiz</h1>
                <div className="box-mod d-flex flex-column align-items-center px-5">
                    <div className="d-flex">
                        <h2>Scegli la modalita'</h2>
                        <button className="" data-bs-toggle="modal" data-bs-target="#modeModal">
                            <img src="info-circle.svg" alt="info"/>
                        </button>
                    </div>
                    {Object.values(GameMode).filter((item) => isNaN(Number(item))).map((key) =>
                        <Link className="btn p-3 m-2 btn-custom-home"
                        to="/map" state={data}
                        onClick={() => modeClick(GameMode[key as keyof typeof GameMode])}>
                            {key as GameMode}
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Menu;
