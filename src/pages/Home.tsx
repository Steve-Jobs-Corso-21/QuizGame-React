import { Link, useParams, useSearchParams } from "react-router-dom";
import "./Quiz/index.scss";
import "./home.scss";
import data from "../data.json";
import { useState } from "react";

// modalità allenamento di default ?
// altrimenti bloccare tasto gioca se non è scelta la modalità
const Menu = () => {
    const [y,sety] = useState<string>("");
    const modeClick = (mod:string) => {
        sety(mod);
        
    } 
    //modalità default fatta
    if (!y){
        sety("allenamento")
    }

    return (
        <>
        <div className="mainMenu d-flex flex-column align-items-center justify-content-around vh-100">
            <h1>Cyberquiz</h1>
            <div className="box-mod d-flex flex-column align-items-center mt-5 px-5 py-2">
                <h2>Scegli la modalita'</h2>
                <button type="button" className={`btn-custom btn btn-primary p-3 m-2 ${y === "allenamento" && "active"}`} data-bs-toggle="button" aria-pressed={y === "allenamento" ? "true" : "false"} onClick={() => modeClick("allenamento")} >Allenamento</button>
                <button type="button" className={`btn-custom btn btn-primary p-3 m-2 ${y === "sfida" && "active"}`} data-bs-toggle="button" aria-pressed={y === "sfida" ? "true" : "false"} onClick={() => modeClick("sfida")} >Sfida</button>
            </div>
            <div className="btn-custom btn btn-primary p-3">
                <Link to="/map">Gioca</Link>
            </div>
        </div>
        </>
    );
};

export default Menu;