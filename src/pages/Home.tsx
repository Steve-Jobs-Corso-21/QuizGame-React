import { Link, useParams, useSearchParams } from "react-router-dom";
import "./Quiz/index.scss";
import data from "../data.json";
import { useState } from "react";

const Menu = () => {

    let x : boolean;
    
    return (
        <>
            <h1>Cyberquiz</h1>
            <h2>Scegli la modalita'</h2>
            <div>
                <button onClick={() => {x = true}}>Allenamento</button>
                <button onClick={() => {x = false}}>Sfida</button>
            </div>
            <Link to="/map">Gioca</Link>
        </>
    );
};

export default Menu;