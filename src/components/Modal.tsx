import { Link } from "react-router-dom";

const Modal = ({
  modalID,
  bgColor,
  description,
  title,
  buttons,
  state,
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
        <div className="modal-content">
          {title && (
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="modalLabel">
                {title}
              </h1>
            </div>
          )}
          {description && (
            <div className="modal-body">
              <p className="fs-5">{description}</p>
            </div>
          )}
          {buttons && (
            <div className="modal-footer">
              {buttons.map(({ text, url }: { text: string; url: string }) => (
                <Link to={url} state={state}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    {text}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
