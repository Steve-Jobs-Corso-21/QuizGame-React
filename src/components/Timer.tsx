import {useEffect, useState } from "react";

function Timer({ quizID, maxTime, stopTimer, modalID } :any ){
    const [currentTime, setCurrentTimer] = useState(maxTime);

    useEffect(() => {
        setCurrentTimer(maxTime);
    }, [quizID, maxTime]);

    useEffect(() => {
        !currentTime && endTime();
        if(stopTimer || !currentTime) return;
        const interval = setInterval(() => setCurrentTimer(currentTime-1), 1000);
        return () => clearInterval(interval);  
    },[currentTime, stopTimer]);

    const endTime = () => {
        document.getElementById("endTime")?.click();
    }

    return(
        <div className="fixed-bottom">
            <span className="fs-2 mx-3">{currentTime}s</span>
            <div className="progress bg-transparent rounded-0" role="progressbar" aria-valuenow={currentTime} aria-valuemin={0} aria-valuemax={maxTime}>
                <div className={`progress-bar ${currentTime < 3 ? "bg-danger" : currentTime < maxTime / 2 ? "bg-warning" : "bg-success"}`}
                    style={{width: (((currentTime * 100)/maxTime))+"%", transition: "width 1s linear"}}></div>
            </div>
            <button id="endTime" type="button" data-bs-target={"#" + modalID} data-bs-toggle="modal" style={{display: "none"}}></button>
        </div>
    )
}

export default Timer;