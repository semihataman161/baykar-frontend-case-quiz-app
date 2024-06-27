import { useState, useEffect } from 'react';

const useCountdown = (initialTime: number) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [canAnswer, setCanAnswer] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            if (timeLeft <= initialTime - 10) {
                setCanAnswer(true);
            }

            return () => clearTimeout(timer);
        } else {
            setCanAnswer(false);
        }
    }, [timeLeft, initialTime]);

    const resetCountdown = () => {
        setTimeLeft(initialTime);
        setCanAnswer(false);
    };

    const resetTimeLeft = () => {
        setTimeLeft(initialTime);
    };

    return { timeLeft, canAnswer, resetCountdown, resetTimeLeft };
};

export default useCountdown;