import { useState } from "react";

const Counter = () => {
    const [currentValue, setCurrentValue] = useState<number>(1);

    const decrIncrValue = (type: "decrement" | "increment") =>
        setCurrentValue((prev) => prev + (type === "decrement" ? -1 : +1));
        

    return (
        <div>
            <h1>{currentValue}</h1>
            <button onClick={() => decrIncrValue("decrement")}>-</button>
            <button onClick={() => decrIncrValue("increment")}>+</button>
        </div>
    );
};

export default Counter;
