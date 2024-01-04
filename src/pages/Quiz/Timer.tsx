import React, {useEffect, useState } from "react";
import "./Timer.scss";
function Timer({timer} :any ){
    const root = document.documentElement;
    const [time, setTime] = useState(timer);
    //lo sticchio(la time bar) lo possiamo fermare settando time = 0 con ovviamente setTime . 

    useEffect(() => {
        if(!time) return;
        const interval = setInterval(() => setTime(time-1), 1000);
        return () => clearInterval(interval);  
    },[time]);

    root?.style.setProperty(
        "--width",
        (((time * 100)/timer))+"%"
    );

    return(
        <div>
            <span>{time}</span>
            <div className="time-bar">
               
            </div>
        </div>          
    )
}

export default Timer;