import { Link, useParams, useSearchParams } from "react-router-dom";
import "./index.scss";
import data from "../../data.json";
import { useState } from "react";
import CircularProgressBar from "../CircularProgressBar";
import Question from "../Question";
import Header from "../../components/Header";
import Modal from "react-bootstrap/Modal";
import ModalQuestions from "../../components/ModalButton";
import Button from "react-bootstrap/Button";
//const totalScore = "";
//const answerList = testAnswer.rightAnswers.mondo1.map((s) => [s.id, s.answer]);

// if(data.quizzes.answer)
export enum GameMode {
  Training,
  Challenge,
}

export type Data = {
  gameMode: GameMode;
  currentLevel: string;
  quizzes: {
    [key: string]: string[];
  };
  rightAnswers: {
    [key: string]: {
      [key: string]: string[];
    };
  };
};

type Answer = {
  answer: string;
  correct?: boolean;
};
/*
type Quiz = {
  id: string;
  question: string;
  description: string;
  image?: string;
  answers: Answer[];
};
*/
const testAnswer: Data = {
  gameMode: GameMode.Training,
  currentLevel: "mondo1",
  quizzes: {
    mondo1: ["1", "2", "3"],
  },
  rightAnswers: {
    mondo1: {
      "1": ["abc", "ced", "lsd"],
      "2": ["abc", "ced", "lsd"],
      "3": ["abc", "ced", "lsd"],
      "4": ["abc"],
      "5": ["abc", "ced"],
      "6": ["abc", "ced", "lsd", "hjk"],
      "7": ["abc", "ced"],
      "8": ["abc", "ced", "lsd"],
      "9": ["abc", "ced"],
      "10": ["abc"],
    },
    mondo2: {
      "1": ["abc", "ced", "lsd"],
      "2": ["abc", "ced", "lsd", "abc"],
      "3": ["abc", "ced", "lsd", "lsd"],
      "4": ["abc"],
      "5": ["abc", "ced"],
      "6": ["abc", "lsd"],
      "7": ["abc"],
      "8": ["abc", "ced", "lsd", "abc"],
      "9": ["abc", "ced"],
      "10": ["abc"],
    },
  },
};

const testTryAnswer = Object.entries(
  testAnswer.rightAnswers[testAnswer.currentLevel]
).reduce((acc, s) => (acc += s.length - 1), 0);

const Score = () => {
  const [modal, setModal] = useState<boolean | null>(false);
  return testAnswer.gameMode===GameMode.Challenge  ?

  //MODALITA CHALLENGE
  (
    <div>
      <Header></Header>
      <div className="d-flex container flex-column">
        <div className="d-flex align-items-center justify-content-center">
          <h1 className="text-center">
            Complimenti! Hai completato il {testAnswer.currentLevel} con il
            seguente risultato:
          </h1>
        </div>
        <div className="d-flex flex-row justify-content-evenly">
          <div className="d-flex flex-column align-items-center">
            <h3>Percentuale di risposte esatte:</h3>
            <CircularProgressBar></CircularProgressBar>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center">
            <button
              className="text-center justify-content-center btn btn-secondary m-3 btn-lg"
              // style={{ display: "flex", justifyContent: "flex-end" }}
              onClick={() => {
                setModal(!modal);
                console.log("Modal State:", modal);
              }}
            >
              Vedi le risposte corrette
            </button>

            <Link className="score-button btn btn-secondary m-3 btn-lg" to="/">
              Vai alla home
            </Link>
            <Link className="score-button btn btn-secondary m-3 btn-lg" to="/">
              Prossimo Livello
            </Link>
          </div>
        </div>

        {/* Modale: Renderizza solo quando modal è true */}
        {modal && (
          // <p>Modale vera</p>
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal.Dialog>
              <Modal.Header closeButton onClick={() => setModal(!modal)}>
                {/* <Modal.Title>Modal title</Modal.Title> */}
              </Modal.Header>

              <Modal.Body>
                <Question />
                {/* <p>Modal body text goes here.</p> */}
              </Modal.Body>
            </Modal.Dialog>
          </div>

          <Link
            to="/"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            Vai alla home
          </Link>
          <button
            style={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => {
              setModal(!modal);
              console.log("Modal State:", modal);
            }}
          >
            <p>Vedi le risposte corrette</p>
          </button>
          {/* Modale: Renderizza solo quando modal è true */}
          {modal && (
            // <p>Modale vera</p>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog>
                <Modal.Header closeButton onClick={() => setModal(!modal)}>
                  {/* <Modal.Title>Modal title</Modal.Title> */}
                </Modal.Header>

                <Modal.Body>
                  <Question />
                  {/* <p>Modal body text goes here.</p> */}
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={() => setModal(!modal)} variant="secondary">
                    Close
                  </Button>
                  <Button variant="primary">Save changes</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>

            // <Modal
            //   modalID={"scoreModal"}
            //   bgColor={"bg-success"}
            //   description={"Descrizione"}
            //   title={"Le tue risposte:"}
            //   buttons={[
            //     {
            //       text: "Continua",
            //       url: "",
            //     },
            //   ]}
            //   state={testAnswer}
            // ></Modal>

            // <Modal
            //   modalID="scoreModal"
            //   isCorrect={true}
            //   description="Le tue risposte"
            //   url="/quiz/epilogue"
            //   state={testAnswer}
            //   onClose={() => setModal(false)}
            // />
          )}
        </div>
      ) : (
        <h1>ciao</h1>
      )}
    </div>
  ) : 

  //MODALITA TRAINING
  (
    <div>
      <Header></Header>
      <div className="d-flex container flex-column">
        <div className="d-flex align-items-center justify-content-center">
          <h1 className="text-center">
            Complimenti! Hai completato il training del{" "}
            {testAnswer.currentLevel} con il seguente risultato:
          </h1>
        </div>
        <div className="d-flex flex-row justify-content-evenly">
          <div className="d-flex flex-column align-items-center">
            <h3>Percentuale precisione risposte esatte:</h3>
            <CircularProgressBar></CircularProgressBar>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center">
            <button
              className="text-center justify-content-center btn btn-secondary m-3 btn-lg"
              // style={{ display: "flex", justifyContent: "flex-end" }}
              onClick={() => {
                setModal(!modal);
                console.log("Modal State:", modal);
              }}
            >
              Vedi le risposte corrette
            </button>

            <Link className="score-button btn btn-secondary m-3 btn-lg" to="/">
              Vai alla home
            </Link>
            <Link className="score-button btn btn-secondary m-3 btn-lg" to="/">
              Prossimo Livello
            </Link>
          </div>
        </div>

        {/* Modale: Renderizza solo quando modal è true */}
        {modal && (
          // <p>Modale vera</p>
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal.Dialog>
              <Modal.Header closeButton onClick={() => setModal(!modal)}>
                {/* <Modal.Title>Modal title</Modal.Title> */}
              </Modal.Header>

              <Modal.Body>
                <Question />
                {/* <p>Modal body text goes here.</p> */}
              </Modal.Body>
            </Modal.Dialog>
          </div>

          <Link
            to="/"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            Vai alla home
          </Link>
          <button
            style={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => {
              setModal(!modal);
              console.log("Modal State:", modal);
            }}
          >
            <p>Vedi le risposte corrette</p>
          </button>
          {/* Modale: Renderizza solo quando modal è true */}
          {modal && (
            // <p>Modale vera</p>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog>
                <Modal.Header closeButton onClick={() => setModal(!modal)}>
                  {/* <Modal.Title>Modal title</Modal.Title> */}
                </Modal.Header>

                <Modal.Body>
                  <Question />
                  {/* <p>Modal body text goes here.</p> */}
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={() => setModal(!modal)} variant="secondary">
                    Close
                  </Button>
                  <Button variant="primary">Save changes</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>

            // <Modal
            //   modalID={"scoreModal"}
            //   bgColor={"bg-success"}
            //   description={"Descrizione"}
            //   title={"Le tue risposte:"}
            //   buttons={[
            //     {
            //       text: "Continua",
            //       url: "",
            //     },
            //   ]}
            //   state={testAnswer}
            // ></Modal>

            // <Modal
            //   modalID="scoreModal"
            //   isCorrect={true}
            //   description="Le tue risposte"
            //   url="/quiz/epilogue"
            //   state={testAnswer}
            //   onClose={() => setModal(false)}
            // />
          )}
        </div>
    </div>
  )
};

export default Score;
