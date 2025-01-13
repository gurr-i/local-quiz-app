import React, { useEffect } from "react";

function Timer({ timer, setTimer, handleNextQuestion }) {
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, handleNextQuestion]);

  return <p>Time Remaining: {timer}s</p>;
}

export default Timer;
