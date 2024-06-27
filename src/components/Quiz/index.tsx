import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Question from "../Question";
import ResultsTable from "../ResultsTable";
import useCountdown from "../../hooks/useCountdown";
import type { IQuestion, ITableData } from "../../types/Question";
import type { IJsonPlaceHolderResponse } from "../../types/ApiResponse";

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [tableData, setTableData] = useState<ITableData[]>([]);
    const TIME_PER_QUESTION = 30;
    const { timeLeft, canAnswer, resetCountdown, resetTimeLeft } = useCountdown(TIME_PER_QUESTION);

    const fetchQuestions = useCallback(async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const data = response.data.slice(0, 10).map((item: IJsonPlaceHolderResponse, index: number) => ({
            question: `Soru ${index + 1}: ${item.title}`,
            options: [
                'A. ' + item.body.slice(0, 20),
                'B. ' + item.body.slice(20, 40),
                'C. ' + item.body.slice(40, 60),
                'D. ' + item.body.slice(60, 80)
            ]
        }));
        setQuestions(data);
    }, []);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    useEffect(() => {
        function getRandomNumber(): number {
            return Math.floor(Math.random() * 4);
        }

        if (timeLeft === 0) {
            if (currentQuestionIndex < questions.length) {
                const randomIndex = getRandomNumber();

                setTableData([
                    ...tableData,
                    {
                        question: questions[currentQuestionIndex].question,
                        options: questions[currentQuestionIndex].options,
                        selectedAnswer: selectedAnswer,
                        trueAnswer: questions[currentQuestionIndex].options[randomIndex]
                    },
                ]);
            }

            setCurrentQuestionIndex(currentQuestionIndex + 1);
            resetCountdown();
            setSelectedAnswer(null);
        }
    }, [timeLeft, currentQuestionIndex, questions, selectedAnswer, tableData, resetCountdown]);

    const handleAnswerSelect = (option: string) => {
        if (canAnswer) {
            setSelectedAnswer(option);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setTableData([]);
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
                    <ResultsTable tableData={tableData} />
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