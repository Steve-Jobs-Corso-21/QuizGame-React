import { Link, useLocation } from "react-router-dom";
import {JSON, Data, GameMode} from "../Home";
import data from "../../questions.json";
import "./index.scss";

const Epilogue = () => {
  const { state } : {state: Data} = useLocation();
  const json: JSON = data;

  console.log(state);

  return (
    <div className="page-container">
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
              state.rightAnswers.reduce((totAcc, map, index) =>
                totAcc += map.quiz.reduce((acc: number, q: {id: string, answers: number[]}) =>
                  acc += (q.answers[0] === json.maps[index].quizzess.find(({id}) => id === q.id)?.answers.findIndex(({correct}) => correct)) ? 0 : 1
                , 0)
              , 0)
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
