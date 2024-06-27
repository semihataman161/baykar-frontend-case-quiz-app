import React, { useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./styles.css";
import { TIME_PER_QUESTION } from "../../constants";

const renderTime = ({ remainingTime }) => {
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
    const [, setOneLastRerender] = useState(0);

    if (currentTime.current !== remainingTime) {
        isNewTimeFirstTick.current = true;
        prevTime.current = currentTime.current;
        currentTime.current = remainingTime;
    } else {
        isNewTimeFirstTick.current = false;
    }

    if (remainingTime === 0) {
        setTimeout(() => {
            setOneLastRerender((val) => val + 1);
        }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;

    return (
        <div className="time-wrapper">
            <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
                {remainingTime}
            </div>
            {prevTime.current !== null && (
                <div
                    key={prevTime.current}
                    className={`time ${!isTimeUp ? "down" : ""}`}
                >
                    {prevTime.current}
                </div>
            )}
        </div>
    );
};

interface ICountdownTimerProps {
    onCountdownComplete: () => void;
}

const CountdownTimer: React.FC<ICountdownTimerProps> = ({ onCountdownComplete }) => {
    return (
        <div className="timer-wrapper">
            <CountdownCircleTimer
                isPlaying
                duration={TIME_PER_QUESTION}
                colors={["#007f5f", "#2ec4b6", "#004777", "#F7B801", "#ff9f1c", "#A30000", "#FF0000"]}
                colorsTime={[30, 25, 20, 15, 10, 5, 0]}
                size={120}
                strokeWidth={5}
                onComplete={() => {
                    onCountdownComplete();
                    return { shouldRepeat: true, delay: 0 }
                }}
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
};

export default CountdownTimer;