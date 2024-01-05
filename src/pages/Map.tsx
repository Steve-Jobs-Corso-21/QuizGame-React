import { Link, useParams, useSearchParams } from "react-router-dom";
import "./Quiz/index.scss";
import data from "../data.json";
import { useState } from "react";

const Map = () => {
    
    return (
        <>
            <h1>Scegli da dove cominciare</h1>
            <h2>Prima Città</h2>
            <Link to="/quiz/1">1</Link>
            <Link to="/quiz/2">2</Link>
            <Link to="/quiz/3">3</Link>
            <Link to="/quiz/4">4</Link>
            <Link to="/quiz/5">5</Link>
        </>
    );
};

export default Map;