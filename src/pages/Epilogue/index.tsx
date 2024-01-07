import { Link, useParams, useSearchParams } from "react-router-dom";
import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import testAnswer from "../../testAnswer.json";
import { useState } from "react";

const sumRightAfter = testAnswer.rightAnswers.mondo1.reduce(
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
        Complimenti! Hai terminato il gioco!
      </h1>
      <div>
        <p>
          Sei riuscito a completare il gioco facendo {sumRightAfter} errori!
        </p>
        <p>
          {testAnswer.isTraining
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
