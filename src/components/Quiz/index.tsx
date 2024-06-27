import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Question from "../Question";
import ResultsTable from "../ResultsTable";
import { useCountdown } from 'react-countdown-circle-timer'
import type { IQuestion, ITableData } from "../../types/Question";
import type { IJsonPlaceHolderResponse } from "../../types/ApiResponse";
import { TIME_PER_QUESTION, NUMBER_OF_QUESTIONS, DISABLE_DURATION } from "../../constants";

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [tableData, setTableData] = useState<ITableData[]>([]);
    const { elapsedTime } = useCountdown({ isPlaying: true, duration: TIME_PER_QUESTION * NUMBER_OF_QUESTIONS, colors: '#abc' });
    const canAnswer = elapsedTime % TIME_PER_QUESTION > DISABLE_DURATION + 1;

    const fetchQuestions = useCallback(async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const data = response.data.slice(0, NUMBER_OF_QUESTIONS).map((item: IJsonPlaceHolderResponse, index: number) => ({
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
    };

    const handleCountdownComplete = () => {
        function getRandomNumber(): number {
            return Math.floor(Math.random() * 4);
        }

        const randomIndex = getRandomNumber();

        setTableData(prevTableData => [
            ...prevTableData,
            {
                question: questions[currentQuestionIndex].question,
                options: questions[currentQuestionIndex].options,
                selectedAnswer: selectedAnswer,
                trueAnswer: questions[currentQuestionIndex].options[randomIndex]
            },
        ]);

        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {currentQuestionIndex < questions.length ? (
                <Question
                    question={questions[currentQuestionIndex]}
                    canAnswer={canAnswer}
                    handleAnswerSelect={handleAnswerSelect}
                    onCountdownComplete={handleCountdownComplete}
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