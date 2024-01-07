import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


const Question = () => {
  const [risposte, setRisposte] = useState(Array(10).fill(false));

  const toggleRisposta = (index: number) => {
    const newRisposte = [...risposte];
    newRisposte[index] = !newRisposte[index];
    setRisposte(newRisposte);
  };

  return (
    <div className="accordion" id="domandeAccordion">
      {Array.from({ length: 10 }, (_, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`domandaHeading${index}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#domandaCollapse${index}`}
              aria-expanded={risposte[index] ? 'true' : 'false'}
              aria-controls={`domandaCollapse${index}`}
              onClick={() => toggleRisposta(index)}
            >
              Domanda {index + 1}
            </button>
          </h2>
          <div
            id={`domandaCollapse${index}`}
            className={`accordion-collapse collapse ${risposte[index] ? 'show' : ''}`}
            aria-labelledby={`domandaHeading${index}`}
            data-bs-parent="#domandeAccordion"
          >
            <div className="accordion-body">
              {/* Descrizione della domanda */}
              <p>Descrizione della domanda {index + 1}...</p>

              {/* Stato della risposta */}
              <p className={risposte[index] ? 'text-success' : 'text-danger'}>{risposte[index] ? 'Risposta corretta!' : 'Risposta non data o errata.'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Question;
