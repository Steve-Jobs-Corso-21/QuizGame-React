import { Link } from "react-router-dom";


export type Data = {
    "isTraining": boolean,
    "currentLevel": string,
    "quizzes": {
        [key: string]: string[]
    },
    "rightAnswers": {
        [key: string]: string[]
    }
}

const Home = () => {
    const data: Data = {
        "isTraining": true,
        "currentLevel": "mondo1",
        "quizzes": {
            "mondo1": ["1","2","3"]
        },
        "rightAnswers": {
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
