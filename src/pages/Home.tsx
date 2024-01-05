import { Link, useParams, useSearchParams } from "react-router-dom";
import "./Quiz/index.scss";
import "./home.scss";
import data from "../data.json";
import { useState } from "react";

const Menu = () => {

    let x : boolean;
    
    return (
        <>
        <div className="mainMenu">
            <h1>Cyberquiz</h1>
            <h2>Scegli la modalita'</h2>
            <div>
                <button onClick={() => {x = true}}>Allenamento</button>
                <button onClick={() => {x = false}}>Sfida</button>
            </div>
            <div className="buttonGioca">
                <Link to="/map">Gioca</Link>
            </div>
        </div>
        </>
    );
};

export default Menu;