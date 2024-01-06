import { Link, useParams, useSearchParams } from "react-router-dom";
import "./index.scss";
import testAnswer from "../../testAnswer.json";
import { useState } from "react";

const sumRightAfter = testAnswer.correctAnswers.reduce(
  (acc, s) => (acc += s.rightAfter),
  0
);

const Epilogue = () => {
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
        Complimenti! Hai terminato il gioco
      </h1>
      <div>
        Sei riuscito a completare il gioco facendo {sumRightAfter} errori!
      </div>
      <div>
        <Link to="/">Torna alla Home</Link>
      </div>
    </div>
  );
};

export default Epilogue;
