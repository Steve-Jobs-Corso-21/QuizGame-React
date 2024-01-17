import "./index.scss";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom/dist";
import { useLocation } from "react-router/dist";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "../../components/AnimatedProgressProvider";
import { easeExpOut } from "d3-ease";
import { easeBackInOut } from "d3-ease";
import { JSON, GameMode, Data } from "../Home";
import data from "../../questions.json";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Question from "../Question";

const Score = () => {
  const { state }: { state: Data } = useLocation();
  const json: JSON = data;

  const scoring =
    state.gameMode === GameMode.Training
      ? state.rightAnswers[state.currentLevel].quiz.filter(
          ({ answers }) => answers.length === 1
        ).length *
        (100 / state.rightAnswers[state.currentLevel].quiz.length)
      : state.rightAnswers[state.currentLevel].quiz.filter(
          ({ id }: { id: string }) =>
            state.rightAnswers[state.currentLevel].quiz.find(
              ({ id: quizID }: { id: string }) => quizID === id
            )!.answers.length > 0 &&
            json.maps[state.currentLevel].quizzess
              .find(({ id: quizID }: { id: string }) => quizID === id)
              ?.answers.findIndex(({ correct }) => correct) ===
              state.rightAnswers[state.currentLevel].quiz.find(
                ({ id: quizID }: { id: string }) => quizID === id
              )!.answers[0]
        ).length *
        (100 / state.rightAnswers[state.currentLevel].quiz.length);

  // console.log(scoring);

  const color =
    scoring === 100
      ? "rgba(45, 124, 255, 1)"
      : scoring > 50
      ? "rgba(45, 198, 46, 1)"
      : scoring > 25
      ? "rgba(255, 209, 0,1)"
      : "rgba(255, 124, 0, 1)";

  return (
    <div>
      <Modal
        modalID="answerModal"
        description={<Question />}
        canClose={true}
        state={state}
      />

      <Header />

      <div className="d-flex container flex-column">
        <div className="d-flex align-items-center justify-content-center">
          <h1 className="text-center">
            Complimenti! Hai terminato il{" "}
            {state.gameMode === GameMode.Training && "training del"} mondo{" "}
            {json.maps[state.currentLevel].name.toUpperCase()}
          </h1>
        </div>

        <div className="d-flex flex-row justify-content-evenly">
          <div className="d-flex flex-column align-items-center">
            <h3>Percentuale risposte esatte:</h3>
            <div style={{ width: "300px" }}>
              <AnimatedProgressProvider
                valueStart={0}
                valueEnd={scoring}
                duration={1.4}
                easingFunction={easeBackInOut}
              >
                {(value: number) => (
                  <CircularProgressbar
                    value={value}
                    text={`${value.toFixed(0)}`}
                    minValue={0}
                    maxValue={100}
                    styles={buildStyles({
                      pathColor: color,
                      textColor: color,
                    })}
                  />
                )}
              </AnimatedProgressProvider>
            </div>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center">
            <button
              className="btn btn-secondary btn-lg m-3"
              data-bs-target={"#answerModal"}
              data-bs-toggle="modal"
            >
              Vedi le tue risposte
            </button>
            {/* <Link to="/" className="btn btn-secondary btn-lg m-3" state={state}>Torna alla home</Link> */}
            {state.currentLevel === json.maps.length - 1 &&
            state.gameMode === GameMode.Challenge ? (
              <Link
                to="/epilogue"
                className="btn btn-secondary btn-lg m-3"
                state={state}
              >
                Termina gioco
              </Link>
            ) : (
              <Link
                to="/map"
                className="btn btn-secondary btn-lg m-3"
                state={state}
                onClick={() => state.currentLevel++}
              >
                Torna alla mappa
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
