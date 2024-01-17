import { Link, useLocation } from "react-router-dom";
import { JSON, Data, GameMode } from "../Home";
import data from "../../questions.json";
import "./index.scss";

const Epilogue = () => {
  const { state }: { state: Data } = useLocation();
  const json: JSON = data;
  const scoreEpilogue = state.rightAnswers.reduce(
    (totAcc, map, index) =>
      (totAcc += map.quiz.reduce(
        (acc: number, q: { id: string; answers: number[] }) =>
          (acc +=
            q.answers[0] ===
            json.maps[index].quizzess
              .find(({ id }) => id === q.id)
              ?.answers.findIndex(({ correct }) => correct)
              ? 0
              : 1),
        0
      )),
    0
  );
  const NumberOfQuestions = data.maps.reduce(
    (acc, s) => (acc += s.quizzess.length),
    0
  );

  const result =
    ((NumberOfQuestions - scoreEpilogue) / NumberOfQuestions) * 100;

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
        <p>Sei riuscito a completarlo facendo {scoreEpilogue} errori!</p>
        <p>
          {state.gameMode === GameMode.Training
            ? "Hai giocato in modalità allenamento... Che ne diresti di passare alla modalità sfida?"
            : "Complimenti per aver terminato Il nostro quiz game!"}
        </p>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center ">
        <p className="justify-content-end">
          Attualmente sei ai livelli di un:
          {result < 25
            ? "Hacker"
            : result < 50
            ? "Esperto della cybersecurity"
            : result < 75
            ? "Principiante della Cybersecurity"
            : "Neofita della cybersecurity"}
        </p>
      </div>
      <div>
        <Link to="/">Torna alla Home</Link>
      </div>
    </div>
  );
};

export default Epilogue;
