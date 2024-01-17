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
    audio: boolean,
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
        audio: true,
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
                    <p>In modalità sfida dovrai testare le tue abilità in una prova a tempo, cercando di commettere il minor numero di errori possibili.</p>
                </div>
            </>}
            canClose={true}
            title="Modalità di gioco"/>

            <Header
            htmlBlock={<h1>CyberQuiz</h1>}
            bgColor={"transparent"}
            audio={true}
            audioURL={""}/>

            <div className="mainMenu d-flex flex-column align-items-center justify-content-around">
                <img className="img-fluid" src="cyber-logo.png" alt="logo"/>
                <div className="d-flex flex-column align-items-center col-3">
                    <div className="d-flex w-100 mb-4">
                        <h2 className="flex-grow-1 text-center ps-5">Scegli la modalita'</h2>
                        <button data-bs-toggle="modal" data-bs-target="#modeModal" style={{background: "transparent", border: "none"}} title="Clicka qui per scoprire le modalità">
                            <span className="material-symbols-rounded btn-info">help</span>
                        </button>
                    </div>
                    {Object.values(GameMode).filter((item) => isNaN(Number(item))).map((key) =>
                        <Link className="btn btn-primary p-3 m-2 btn-custom-home"
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
