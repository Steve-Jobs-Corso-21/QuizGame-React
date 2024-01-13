import { Link, useLocation } from "react-router-dom";
import {JSON, Data, GameMode} from "../Home";
import data from "../../questions.json";
import "./index.scss";

const Epilogue = () => {
  const { state } : {state: Data} = useLocation();
  const json: JSON = data;

  return (
    <div>
      <h1
        style={{
          fontPalette: "Blue",
          display: "flex",
          flexDirection: "row",
          flex: "center",
        }}
      >
        Complimenti! Hai Finito il gioco!
      </h1>
      <div>
        <p>
          Sei riuscito a completarlo facendo {
              state.rightAnswers.map((map, index) =>
                json.maps[index].quizzess.reduce((acc, quiz, index, arr) => 
                  acc += (quiz.answers.findIndex(({correct}) => correct) === map.quiz[index].answers[0] ? 0 : 1)
                , 0)
              )
            } errori!
        </p>
        <p>
          {state.gameMode === GameMode.Training
            ? "Hai giocato in modalità allenamento... Che ne diresti di passare alla modalità sfida?"
            : "Complimenti per aver terminato la modalità sfida!"}
        </p>
      </div>
      <div>
        <Link to="/">Torna alla Home</Link>
      </div>
    </div>
  );
};

export default Epilogue;
