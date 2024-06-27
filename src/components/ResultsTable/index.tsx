import React from "react";

interface IResultsTableProps {
    answers: {
        question: string;
        options: string[];
        answer: string | null;
    }[];
}

const ResultsTable: React.FC<IResultsTableProps> = ({ answers }) => {
    return (
        <div className="text-center bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="mb-4">Sonuçlar</h2>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Soru</th>
                        <th className="px-4 py-2">Şıklar</th>
                        <th className="px-4 py-2">Cevabınız</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((answer, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{answer.question}</td>
                            <td className="border px-4 py-2">{answer.options.join(', ')}</td>
                            <td className="border px-4 py-2">{answer.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;