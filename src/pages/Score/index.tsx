import { Link, useParams, useSearchParams } from "react-router-dom";
import "./index.scss";
import data from "../../data.json";
import { useState } from "react";
import testAnswer from "../../testAnswer.json";
import CircularProgressBar from "../CircularProgressBar";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
//const totalScore = "";
//const answerList = testAnswer.rightAnswers.mondo1.map((s) => [s.id, s.answer]);

// if(data.quizzes.answer)

const Score = () => {
  const [modal, setModal] = useState<boolean | null>(null);
  return (
    <div>
      <Header></Header>
      <h1 className="cus">
        Complimenti! Hai completato il {testAnswer.currentLevel} con il seguente
        risultato:
      </h1>

      <div>
        <div>
          <h3>Numero di risposte esatte:</h3>
          <CircularProgressBar></CircularProgressBar>
        </div>

        <Link to="/" style={{ display: "flex", justifyContent: "flex-start" }}>
          Vai alla home
        </Link>
        <button
          style={{ display: "flex", justifyContent: "flex-end" }}
          onClick={() => setModal(!modal)}
        >
          <p>Vedi le risposte corrette</p>
        </button>
      </div>
    </div>
  );
};

export default Score;
