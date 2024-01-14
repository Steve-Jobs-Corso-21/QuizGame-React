import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";
import Modal from "./Modal";

// TODO: add icon pack

const Header = ({ htmlBlock, bgColor, audio, audioURL }: any) => {
    const { state } = useLocation();
    const [currentVolume, setCurrentVolume] = useState<boolean>(true);

    const audioClick = () => {
        setCurrentVolume(!currentVolume);
    }

    return (
        <nav className="nav d-flex align-items-center justify-content-center"
            style={{ backgroundColor: bgColor }}>
            <button data-bs-toggle="modal" data-bs-target={"#homeModal"} className="me-auto p-1"> 
                <img src="home.svg" alt="Home" />
                <Modal modalID="homeModal"
                    bgColor={"bg-dark"}
                    title="Torna alla Home"
                    description={
                        <>
                            Sei sicuro di voler tornare alla home? <strong>I tuoi progressi verranno persi.</strong>
                        </>
                        }
                    buttons={[
                        {"text": "Si", "url": "/"},
                        {"text": "No", "url": ""}
                    ]}
                    state={state}>
                </Modal>
            </button>

            {htmlBlock}

            <button className="ms-auto me-3 p-1" onClick={() => audioClick()}>
                <audio src={audioURL} id={audio} />
                <img src={!currentVolume ? "volume.svg" : "volume-mute.svg"} alt="Volume" />
            </button>
        </nav>
    );
}

export default Header;
