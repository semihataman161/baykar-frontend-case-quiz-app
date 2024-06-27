import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Question from "../Question";
import ResultsTable from "../ResultsTable";
import useCountdown from "../../hooks/useCountdown";

interface IQuestionType {
    question: string;
    options: string[];
}

interface IAnswerType {
    question: string;
    options: string[];
    answer: string | null;
}

interface IJsonPlaceHolderResponse {
    id: number;
    userId: number;
    title: string;
    body: string;
}

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<IQuestionType[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answers, setAnswers] = useState<IAnswerType[]>([]);
    const TIME_PER_QUESTION = 30;
    const { timeLeft, canAnswer, resetCountdown, resetTimeLeft } = useCountdown(TIME_PER_QUESTION);

    const fetchQuestions = useCallback(async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const data = response.data.slice(0, 10).map((item: IJsonPlaceHolderResponse, index: number) => ({
            question: `Soru ${index + 1}: ${item.title}`,
            options: [
                item.body.slice(0, 20),
                item.body.slice(20, 40),
                item.body.slice(40, 60),
                item.body.slice(60, 80)
            ]
        }));
        setQuestions(data);
    }, []);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    useEffect(() => {
        if (timeLeft === 0) {
            if (currentQuestionIndex < questions.length) {
                setAnswers([
                    ...answers,
                    {
                        question: questions[currentQuestionIndex].question,
                        options: questions[currentQuestionIndex].options,
                        answer: selectedAnswer,
                    },
                ]);
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            resetCountdown();
            setSelectedAnswer(null);
        }
    }, [timeLeft, currentQuestionIndex, questions, selectedAnswer, answers, resetCountdown]);

    const handleAnswerSelect = (option: string) => {
        if (canAnswer) {
            setSelectedAnswer(option);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setSelectedAnswer(null);
        fetchQuestions();
        resetTimeLeft();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {currentQuestionIndex < questions.length ? (
                <Question
                    question={questions[currentQuestionIndex]}
                    timeLeft={timeLeft}
                    canAnswer={canAnswer}
                    handleAnswerSelect={handleAnswerSelect}
                />
            ) : (
                <div className="text-center">
                    <ResultsTable answers={answers} />
                    <button
                        onClick={handleRestartQuiz}
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                        Testi Yeniden Başlat
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;