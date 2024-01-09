import { Link } from "react-router-dom";

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

const Home = () => {
    const data: Data = {
        "gameMode": GameMode.Training,
        "currentLevel": "mondo1",
        "quizzes": {
            "mondo1": ["1","2","3"]
            /* levelName : array of quiz id */
        },
        "rightAnswers": {
            "mondo1" : {}
            /* levelName : {
                    quizID : array of answers          calculate right after by the lenght of array
            } */
        }
    }

    return (
        <div>
            <h1>Home</h1>
            <Link to={`/quiz/${data.quizzes["mondo1"][0]}`} state={data}>Gioca</Link>
        </div>
    );
};

export default Home;
