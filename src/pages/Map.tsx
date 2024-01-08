import { Link, useParams, useSearchParams } from "react-router-dom";
import "./Quiz/index.scss";
import "./map.scss"
import data from "../data.json";
import { useState } from "react";

const Map = () => {
    
    return (
        <>
        <div className="mapMenu d-flex flex-column align-items-center p-5 vh-100">
                <h1>Scegli da dove cominciare</h1>
            <div className="sfondoMap">
                <div className="roadMap d-flex">
                    <div className="p-5 mt-5">
                        <Link to="/quiz/1">1</Link>
                    </div>
                    <div className="p-5">
                        <Link to="/quiz/2">2</Link>
                    </div>
                    <div className="p-5 mt-5">
                        <Link to="/quiz/3">3</Link>
                    </div>
                    <div className="p-5">
                        <Link to="/quiz/4">4</Link>
                    </div>
                    <div className="p-5 mt-5">
                        <Link to="/quiz/5">5</Link>
                    </div>
                </div>
            </div>
        <div className="mt-auto">
            <Link to="../">
                <button type="button" className="btn-custom btn btn-primary p-3 m-2">
                    Indietro
                </button>
            </Link>
        </div>
        </div>
        </>
    );
};

export default Map;