import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Data } from "../../pages/Home";

export const useAudio = ({ audioName }: { audioName: string }) => {
    const { state }: { state: Data } = useLocation();

    let backgroundMusic: any;

    useEffect(() => {
        //backgroundMusic = new Audio(`/audio/${audioName}.mp3`).play();
    }, []);

    useEffect(() => {
        //backgroundMusic.volume(state.audio ? 1 : 0);
        console.log("Ciao")
    }, [state.audio]);

    return backgroundMusic;
};
