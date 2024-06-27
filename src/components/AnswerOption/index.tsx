import React from "react";

interface IAnswerOptionProps {
    option: string;
    canAnswer: boolean;
    handleAnswerSelect: (option: string) => void;
    selectedOption: string | null;
}

const AnswerOption: React.FC<IAnswerOptionProps> = ({
    option,
    canAnswer,
    handleAnswerSelect,
    selectedOption
}) => {
    const isSelected = selectedOption === option;

    return (
        <button
            onClick={() => handleAnswerSelect(option)}
            className={`w-full mb-2 p-2 rounded ${canAnswer
                ? isSelected ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"}`}
            disabled={!canAnswer}
            style={{ border: isSelected ? "2px solid #000" : "none" }}
        >
            {option}
        </button>
    );
};

export default AnswerOption;