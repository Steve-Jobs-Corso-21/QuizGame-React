import { Link, useParams, useSearchParams } from "react-router-dom";
import "./index.scss";
import data from "../../data.json";
import { useState } from "react";
import testAnswer from "../../testAnswer.json";

const score = (testAnswer.correctAnswers.length / data.quizzes.length) * 10;
const answerList = testAnswer.correctAnswers.map((s) => [s.id, s.answer]);

// if(data.quizzes.answer)

const Score = () => {
  const [modal, setModal] = useState<boolean | null>(null);
  return (
    <div>
      <h1 className="cus">Complimenti! Ecco mostrato il tuo punteggio:</h1>

      <div>
        <div>
          <h3>
            Numero di risposte esatte: {testAnswer.correctAnswers.length} /{" "}
            {data.quizzes.length}
          </h3>
          <h3>Punteggio totale: {score * 10} p.ti</h3>
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
