import React from "react";

interface IQuestionProps {
    question: {
        question: string;
        options: string[];
    };
    timeLeft: number;
    canAnswer: boolean;
    handleAnswerSelect: (option: string) => void;
}

const Question: React.FC<IQuestionProps> = ({
    question,
    timeLeft,
    canAnswer,
    handleAnswerSelect
}) => {
    return (
        <div className="text-center bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="mb-4">{question.question}</h2>
            <div className="flex flex-col items-center">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={!canAnswer}
                        className={`w-full mb-2 p-2 rounded ${canAnswer ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <p>Kalan süre: {timeLeft} saniye</p>
            </div>
        </div>
    );
};

export default Question;