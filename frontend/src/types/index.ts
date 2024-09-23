export type TRunProject = {
    id?: string;
    runId: string;
    projectName: string;
}

export type TRunTimeSeries = {
    id?: string;
    runId: string;
    timeStamp: number;
    parameter: string;
    processValue: number;
    units: string;
}