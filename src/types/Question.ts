export interface IQuestion {
    question: string;
    options: string[];
}

export interface ITableData extends IQuestion {
    selectedAnswer: string | null;
    trueAnswer: string;
}