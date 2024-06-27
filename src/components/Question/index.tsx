import React, { useState } from "react";
import AnswerOption from "../AnswerOption";
import { IQuestion } from "../../types/Question";

interface IQuestionProps {
    question: IQuestion;
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
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (option: string) => {
        if (canAnswer) {
            setSelectedOption(option);
            handleAnswerSelect(option);
        }
    };

    return (
        <div className="text-center bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="mb-4">{question.question}</h2>
            <div className="flex flex-col items-center">
                {question.options.map((option, index) => (
                    <AnswerOption
                        key={index}
                        option={option}
                        canAnswer={canAnswer}
                        handleAnswerSelect={handleOptionSelect}
                        selectedOption={selectedOption}
                    />
                ))}
            </div>
            <div className="mt-4">
                <p>Kalan süre: {timeLeft} saniye</p>
            </div>
        </div>
    );
};

export default Question;