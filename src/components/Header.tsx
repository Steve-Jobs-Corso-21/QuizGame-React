import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";
import Modal from "./Modal";
import { Data } from "../pages/Home";

const Header = ({
    htmlBlock,
    bgColor,
    data,
    backgroundAudioSrc,
}: any) => {
    const { state, pathname }: { state: Data; pathname: string } =
        useLocation();
    const [currentVolume, setCurrentVolume] = useState<boolean>(true);

    const backgroundAudio = document.getElementById(
        "background-audio"
    ) as HTMLAudioElement;

    const audioClick = () => {
        setCurrentVolume(!currentVolume);
        if (state) state.audio = !state.audio;
        if (data) data.audio = !data.audio;

        //backgroundAudio?.volume(1);

        console.log(backgroundAudio);
    };

    return (
        <>
            <Modal
                modalID="homeModal"
                bgColor={"bg-dark"}
                title="Torna alla Home"
                description={
                    <>
                        Sei sicuro di voler tornare alla home?
                        <br />
                        <strong>I tuoi progressi andranno persi.</strong>
                    </>
                }
                buttons={[
                    { text: "Si", url: "/" },
                    { text: "No", url: "" },
                ]}
                state={state}
                textAlign="center"
            />

            <nav
                className="nav d-flex align-items-center justify-content-between"
                style={{ backgroundColor: bgColor }}
            >
                {pathname !== "/" && (
                    <button
                        className="nav-icon"
                        data-bs-toggle="modal"
                        data-bs-target={"#homeModal"}
                    >
                        <img
                            src="/cyber-logo-white.png"
                            alt="logo"
                            className="logo"
                        />
                    </button>
                )}

                {htmlBlock}

                <button className="nav-icon me-3" onClick={() => audioClick()}>
                    <audio
                        src={`/audio/${backgroundAudioSrc}.mp3`}
                        id="background-audio"
                    />
                    {(state && state.audio) || (data && data.audio) ? (
                        <span
                            className="material-symbols-rounded"
                            style={{
                                color: pathname.split("/").includes("quiz")
                                    ? "white"
                                    : "black",
                            }}
                        >
                            volume_up
                        </span>
                    ) : (
                        <span
                            className="material-symbols-rounded"
                            style={{
                                color: pathname.split("/").includes("quiz")
                                    ? "white"
                                    : "black",
                            }}
                        >
                            volume_off
                        </span>
                    )}
                </button>
            </nav>
        </>
    );
};

export default Header;
