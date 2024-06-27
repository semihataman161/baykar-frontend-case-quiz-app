import React from "react";

interface IAnswerOptionProps {
    option: string;
    index: number;
    canAnswer: boolean;
    handleAnswerSelect: (option: string) => void;
}

const AnswerOption: React.FC<IAnswerOptionProps> = ({ option, index, canAnswer, handleAnswerSelect }) => {
    return (
        <button
            onClick={() => handleAnswerSelect(option)}
            className={`p-2 my-1 border rounded ${canAnswer ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            disabled={!canAnswer}
        >
            {String.fromCharCode(65 + index)}. {option}
        </button>
    );
};

export default AnswerOption;