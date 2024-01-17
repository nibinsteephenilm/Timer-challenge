import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    const timerIsActive =
        timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }
    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTImeRemaining) => prevTImeRemaining - 10);
        }, 10);
        setTimerStarted(true);
    }

    function handleStop() {
        clearInterval(timer.current);
        // setTimerStarted(false);
        dialog.current.open();
    }

    return (
        <>
            <ResultModal
                ref={dialog}
                result="Lost"
                targetTime={targetTime}
                remainingTime={timeRemaining}
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} Second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "Stop" : "Start"} challenge
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {" "}
                    {timerIsActive ? "Timer Is Running..." : "Timer Inactive.."}
                </p>
            </section>
        </>
    );
}
