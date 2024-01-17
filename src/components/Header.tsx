import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";
import Modal from "./Modal";
import { Data } from "../pages/Home";

// TODO: add icon pack

const Header = ({ htmlBlock, bgColor, audio, audioURL }: any) => {
    const { state, pathname } : {state: Data, pathname: string} = useLocation();
    const [currentVolume, setCurrentVolume] = useState<boolean>(true);

    console.log(state.audio);

    const audioClick = () => {
        setCurrentVolume(!currentVolume);
        state.audio = !state.audio;
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
                    { "text": "Si", "url": "/" },
                    { "text": "No", "url": "" }
                ]}
                state={state} />

            <nav className="nav d-flex align-items-center justify-content-center"
                style={{ backgroundColor: bgColor }}>
                <button className="nav-icon me-auto" data-bs-toggle="modal" data-bs-target={"#homeModal"}>
                    <img src="cyber-logo.png" className="" style={{ height: "80px", width: "auto" }} />
                </button>

                {htmlBlock}

                <button className="nav-icon ms-auto me-3" onClick={() => audioClick()}>
                    <audio src={audioURL} id={audio} />
                    {state.audio
                        ? <span className="material-symbols-rounded" style={{ color: pathname.split('/').includes("quiz") ? "white" : "black" }}>volume_up</span>
                        : <span className="material-symbols-rounded" style={{ color: pathname.split('/').includes("quiz") ? "white" : "black" }}>volume_off</span>
                    }
                </button>
            </nav>
        </>


    );
}

export default Header;
