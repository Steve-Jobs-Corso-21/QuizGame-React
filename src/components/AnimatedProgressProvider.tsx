import React, { useState, useEffect } from "react";

const AnimatedProgressProvider = (props : any) => {
  const [value, setValue] = useState(props.valueStart);
  const [isAnimated, setIsAnimated] = useState(false);
  const startTimeRef = React.useRef(0);

  useEffect(() => {
    if (!isAnimated) {
      setIsAnimated(true);
      startTimeRef.current = performance.now();

      const animate = (currentTime : number) => {
        const elapsedTime = currentTime - startTimeRef.current;
        const progress = Math.min(elapsedTime / (props.duration * 1000), 1);

        setValue(
          props.easingFunction(progress) * (props.valueEnd - props.valueStart) +
            props.valueStart
        );

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [
    isAnimated,
    props.valueStart,
    props.valueEnd,
    props.duration,
    props.easingFunction,
  ]);

  return props.children(value);
};

export default AnimatedProgressProvider;
