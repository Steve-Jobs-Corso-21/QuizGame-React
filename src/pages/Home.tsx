import { Link } from "react-router-dom";

export enum GameMode {
    Training,
    Challenge
}

export type Data = {
    gameMode: GameMode,
    currentLevel: string,
    quizzes: {
        [key: string]: string[]
    },
    rightAnswers: {
        [key: string]: {
            [key: string]: string[]
        }
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

const Home = () => {
    const data: Data = {
        "gameMode": GameMode.Training,
        "currentLevel": "map1",
        "quizzes": {
            "map1": ["1", "2", "3"]
            /* levelName : array of quiz id */
        },
        "rightAnswers": {
            "mondo1": {}
            /* levelName : {
                    quizID : array of answers          calculate right after by the lenght of array
            } */
        }
    }

    console.log(data.quizzes);

    return (
        <div>
            <h1>Home</h1>
            <Link to={`/quiz/${data.quizzes[data.currentLevel][0]}`} state={data}>Gioca</Link>
        </div>
    );
};

export default Home;
