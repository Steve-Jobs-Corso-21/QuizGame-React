import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";
import Modal from "./Modal";

// TODO: add icon pack

const Header = ({ htmlBlock, bgColor, audio, audioURL }: any) => {
    console.log(useLocation());
    const { state, pathname } = useLocation();
    const [currentVolume, setCurrentVolume] = useState<boolean>(true);

    const audioClick = () => {
        setCurrentVolume(!currentVolume);
    }

    return (
        <>
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
            state={state} />

            <nav className="nav d-flex align-items-center justify-content-center"
                style={{ backgroundColor: bgColor }}>
                <button className="nav-icon me-auto p-1" data-bs-toggle="modal" data-bs-target={"#homeModal"}> 
                <span className="material-symbols-rounded" style={{ color: pathname.split('/').includes("quiz") ? "white": "black"}}>house</span>
                </button>

                {htmlBlock}

                <button className="nav-icon ms-auto me-3 p-1" onClick={() => audioClick()}>
                    <audio src={audioURL} id={audio} />
                    {currentVolume
                        ? <span className="material-symbols-rounded" style={{ color: pathname.split('/').includes("quiz") ? "white": "black"}}>volume_up</span>
                        : <span className="material-symbols-rounded" style={{ color: pathname.split('/').includes("quiz") ? "white": "black"}}>volume_off</span>
                    }
                </button>
            </nav>
        </>

        
    );
}

export default Header;
