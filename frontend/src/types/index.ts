export type TRunClient = {
    id?: string;
    runId: string;
    clientName: string;
}

export type TRunTimeSeries = {
    id?: string;
    runId: string;
    timeStamp: number;
    parameter: string;
    processValue: number;
    units: string;
}