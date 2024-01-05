import { Link } from "react-router-dom";

const Modal = ({ modalID, isCorrect, description, url, state }: any) => {
    return (
        <div id={modalID}
            className={`modal modal-lg fade bg-opacity-75 ${isCorrect === null ? "bg-primary" : isCorrect ? "bg-success" : "bg-danger"}`}
            data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}
            aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4" id="modalLabel">
                            Risposta {isCorrect ? "Corretta!" : "Errata..."}
                        </h1>
                    </div>
                    <div className="modal-body">
                        <p className="fs-5">{description}</p>
                    </div>
                    <div className="modal-footer">
                        <Link to={url} state={state}>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Continua</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;