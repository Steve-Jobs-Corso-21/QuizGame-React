import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";
import Modal from "./Modal";

const Header = ({ home, htmlBlock, audio, id, url }: any) => {
    const { state } = useLocation();
    const [currentVolume, setCurrentVolume] = useState<boolean>(true);

    const audioClick = () => {
        setCurrentVolume(!currentVolume);
    }

    return (
        <nav className="mx-4 nav d-flex align-items-center justify-content-center">
            <button data-bs-toggle="modal" data-bs-target={"#homeModal"} className="me-auto p-1"> 
                <img src="../pages/Quiz/image/home.svg" alt="Home" />
                <Modal modalID="homeModal" url={"/"}
                    description={"Vuoi tornare alla home?"} state={state}>
                </Modal>
            </button>

            {htmlBlock}

            <button className="ms-auto p-1" onClick={() => audioClick()}>
                <audio src={url} id={audio} />
                <img src={!currentVolume ? "../pages/Quiz/image/volume-mute.svg" : "../pages/Quiz/image/volume.svg"} alt="Volume" />
            </button>
        </nav>
    );
}

export default Header;