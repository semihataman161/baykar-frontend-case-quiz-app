import React from "react";
import { ITableData } from "../../types/Question";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

interface IResultsTableProps {
    tableData: ITableData[];
}

const ResultsTable: React.FC<IResultsTableProps> = ({ tableData }) => {
    return (
        <div className="text-center bg-white p-6 rounded-lg shadow-md w-full mx-auto">
            <h2 className="mb-4 font-bold">Sonuçlar</h2>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Soru</th>
                        <th className="px-4 py-2">Şıklar</th>
                        <th className="px-4 py-2">Cevabınız</th>
                        <th className="px-4 py-2">Doğru Cevap</th>
                        <th className="px-4 py-2">Doğru/Yanlış</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((element, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{element.question}</td>
                            <td className="border px-4 py-2">{element.options.join(', ')}</td>
                            <td className="border px-4 py-2">
                                {element.selectedAnswer ?? "-"}
                            </td>
                            <td className="border px-4 py-2">{element.trueAnswer}</td>
                            <td className={`border px-4 py-2 text-center ${element.selectedAnswer === element.trueAnswer ? 'bg-green-100 text-green-600 font-bold' : 'bg-red-100 text-red-600'}`}>
                                <div className="flex items-center justify-center h-full">
                                    {element.selectedAnswer === element.trueAnswer ? <FaCheck /> : <RxCross1 />}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;