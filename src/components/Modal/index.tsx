import { Link } from "react-router-dom";
import "./index.scss";

const Modal = ({
    modalID,
    bgColor,
    description,
    title,
    canClose = false,
    buttons,
    state,
    textAlign = "left",
}: any) => {
    return (
        <div
            id={modalID}
            className={`modal modal-lg fade bg-opacity-75 ${bgColor}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="modalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className={`modal-content text-align-${textAlign} p-2`}>
                    {(title || canClose) && (
                        <div className="modal-header">
                            <h1
                                className="modal-center fs-3 w-100 m-0"
                                id="modalLabel"
                            >
                                {title}
                            </h1>
                            {canClose && (
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            )}
                        </div>
                    )}
                    {description && (
                        <div className="modal-body">
                            <p className="fs-5 m-0">{description}</p>
                        </div>
                    )}
                    {buttons && (
                        <div className="modal-footer">
                            {buttons.map(
                                ({
                                    text,
                                    url,
                                }: {
                                    text: string;
                                    url: string;
                                }) => (
                                    <Link
                                        to={url}
                                        state={state}
                                        className="w-100"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                        >
                                            {text}
                                        </button>
                                    </Link>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
